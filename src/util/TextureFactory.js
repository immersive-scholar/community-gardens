import RandomSeed from "random-seed";
import find from "lodash/find";

class TextureFactory {
  static seed = Math.random();
  static R = RandomSeed.create(this.seed);
  static textures = [];
  //   static samples = [0xf74633, 0xca7e5e, 0x821b24, 0xe87e83];

  static async load(texturesUri) {
    const onDataComplete = () => {
      // function to be called when all ajax requests complete.
      console.log("Texture Factory data complete ", this.textures);
    };
    const onDataError = () => {
      // function to be called when data fetching fails
      console.log("Failed to fetch the data");
    };

    const ajaxRequestWithPromise = uri => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // xhr.addEventListener("load", () => {
        //   console.log("Load ", JSON.parse(xhr.reponseText));
        //   // a listener which executes when the xhr request succeeds
        //   resolve(JSON.parse(xhr.responseText));
        // });
        xhr.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            var textureJSON = JSON.parse(this.responseText);
            resolve(textureJSON);
          }
        };
        xhr.addEventListener("error", () => {
          console.log("Error ", xhr);
          // a listener which executes when the xhr request fails
          reject(new Error(xhr.statusText));
        });
        xhr.open("GET", uri);
        xhr.send();
      });
    };

    const request = async () => {
      const response = await ajaxRequestWithPromise(texturesUri);
      this.textures = response.texturesByType;
      onDataComplete();
    };

    return request().catch(error => {
      onDataError();
    }); // catch rejected promise
  }

  static getStroke() {
    return this.getRandomTexture(TextureFactory.STROKE);
  }

  static getPattern() {
    return this.getRandomTexture(TextureFactory.PATTERN);
  }

  static getRandomTexture(typeName = TextureFactory.PATTERN) {
    typeName = typeName.toUpperCase();
    let textureType, textureGroup;
    try {
      textureType = find(this.textures, t => t.type.toUpperCase() === typeName);
    } catch (e) {
      throw new Error(
        `Unknown texture name. Try PATTERN or STROKE instead of ${typeName}.`
      );
    }

    textureGroup = textureType.textures;
    const index = this.R.intBetween(0, textureGroup.length - 1);
    return textureType.baseUri + textureGroup[index];
  }

  static setSeed(seed) {
    this.R = RandomSeed.create(seed);
  }
}

TextureFactory.PATTERN = "PATTERN";
TextureFactory.STROKE = "STROKE";

export default TextureFactory;

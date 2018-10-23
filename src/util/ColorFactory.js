import RandomSeed from "random-seed";
import find from "lodash/find";

class ColorFactory {
  static seed = Math.random();
  static R = RandomSeed.create(this.seed);
  static colorSeasons = {};
  // static samples = [0xf74633, 0xca7e5e, 0x821b24, 0xe87e83];

  static async load(seasons) {
    const onDataComplete = () => {
      // function to be called when all ajax requests complete.
      console.log("Color Factory data complete ", this.colorSeasons);
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
            var seasonJSON = JSON.parse(this.responseText);
            resolve(seasonJSON);
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
      // async function always returns a promise
      for (let i in seasons) {
        const response = await ajaxRequestWithPromise(seasons[i]); // await can be only used inside async functions
        this.colorSeasons[i.toUpperCase()] = response;
      }
      onDataComplete();
    };

    return request().catch(error => {
      onDataError();
    }); // catch rejected promise
  }

  static getRandomColor(
    seasonName = ColorFactory.SUMMER,
    familyName = ColorFactory.LEAF
  ) {
    seasonName = seasonName.toUpperCase();
    familyName = familyName.toUpperCase();
    let season, family;
    try {
      season = this.colorSeasons[seasonName];
    } catch (e) {
      throw new Error(
        `Unknown color season name. Try SUMMER, FALL, or WINTER instead of ${seasonName}.`
      );
    }

    try {
      family = find(
        season.samplesByColorFamily,
        f => f.color.toUpperCase() === familyName
      ).samples;
      const index = this.R.intBetween(0, family.length - 1);
      return family[index];
    } catch (e) {
      throw new Error(
        `Unknown color family name. Try LEAF, BARK, GREENERY, or GROUND instead of ${familyName}.`
      );
    }
  }

  static setSeed(seed) {
    this.R = RandomSeed.create(seed);
  }
}

ColorFactory.SUMMER = "SUMMER";
ColorFactory.FALL = "FALL";
ColorFactory.WINTER = "WINTER";

ColorFactory.LEAF = "LEAF";
ColorFactory.BARK = "BARK";
ColorFactory.GREENERY = "GREENERY";
ColorFactory.GROUND = "GROUND";

export default ColorFactory;

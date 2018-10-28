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
          if (this.readyState === 4 && this.status === 200) {
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

  static getColors(
    seasonName = ColorFactory.DEFAULT,
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
      return family;
    } catch (e) {
      throw new Error(
        `Unknown color family name. Try LEAF, BARK, GREENERY, GROUND, or SKY instead of ${familyName}.`
      );
    }
  }

  static getRandomColor(
    seasonName = ColorFactory.DEFAULT,
    familyName = ColorFactory.LEAF
  ) {
    let family = this.getColors(seasonName, familyName);
    const index = this.R.intBetween(0, family.length - 1);
    return family[index];
  }

  static debug() {
    this.createSwatches(ColorFactory.SUMMER, ColorFactory.LEAF, 0);
    this.createSwatches(ColorFactory.SUMMER, ColorFactory.GROUND, 1);
    this.createSwatches(ColorFactory.SUMMER, ColorFactory.GREENERY, 2);
    this.createSwatches(ColorFactory.SUMMER, ColorFactory.BARK, 3);
    this.createSwatches(ColorFactory.SUMMER, ColorFactory.SKY, 4);
  }

  static createSwatches(
    seasonName = ColorFactory.DEFAULT,
    familyName = ColorFactory.LEAF,
    offsetY
  ) {
    const div = document.createElement("div");

    div.style.position = "absolute";
    div.style.display = "grid";
    div.style.gridTemplateColumns = "repeat( auto-fit, minmax(1px, 1fr) )";
    div.style.bottom = `${offsetY * 20}px`;
    div.style.left = 0;
    div.style.width = "200px";
    div.style.height = "20px";
    div.style.zIndex = 101;
    div.style.border = "2px solid white";

    const colors = ColorFactory.getColors(seasonName, familyName);
    let color, colorDiv;
    for (let c in colors) {
      color = colors[c];
      colorDiv = document.createElement("div");
      colorDiv.style.height = "20px";
      colorDiv.style.background = color;

      colorDiv.setAttribute("color", color);
      colorDiv.setAttribute("color-index", c);
      colorDiv.setAttribute("color-season", seasonName);
      colorDiv.setAttribute("color-family", familyName);
      colorDiv.onclick = function() {
        let c = this.getAttribute("color");
        let i = this.getAttribute("color-index");
        let s = this.getAttribute("color-season");
        let f = this.getAttribute("color-family");
        console.log("%c color", `background: ${c}`);
        console.log(`Color ${c} (index ${i}) is from ${s} ${f}.`);
      };

      div.appendChild(colorDiv);
    }

    document.body.appendChild(div);
  }

  static setSeed(seed) {
    this.R = RandomSeed.create(seed);
  }
}

ColorFactory.SUMMER = "SUMMER";
ColorFactory.FALL = "FALL";
ColorFactory.WINTER = "WINTER";
ColorFactory.DEFAULT = ColorFactory.FALL;

ColorFactory.LEAF = "LEAF";
ColorFactory.BARK = "BARK";
ColorFactory.GREENERY = "GREENERY";
ColorFactory.GROUND = "GROUND";
ColorFactory.SKY = "SKY";

export default ColorFactory;

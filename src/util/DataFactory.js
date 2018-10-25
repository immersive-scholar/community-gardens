const fs = require("browserify-fs");
const path = require("path");
const JSZIP = require("jszip");
const download = require("downloadjs");

class DataFactory {
  static data = [];

  static async load(jsonUri) {
    const onDataComplete = () => {
      // function to be called when all ajax requests complete.
      console.log("Data Factory data complete ", this.data);
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
            console.log("this.responseText ", this.responseText);
            DataFactory.responseText = this.responseText;
            var responseJSON = JSON.parse(this.responseText);
            console.log("responseJSON ", responseJSON);
            resolve(responseJSON);
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
      const response = await ajaxRequestWithPromise(jsonUri);
      console.log("response ", response);
      this.data = response.data;
      onDataComplete();
    };

    return request().catch(error => {
      onDataError();
    }); // catch rejected promise
  }

  static getRandomData() {
    return "random data now please";
  }
}

export default DataFactory;

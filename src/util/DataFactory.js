const fs = require("browserify-fs");
const path = require("path");
const JSZip = require("jszip");
const JSZipUtils = require("jszip-utils");
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

    const loadZip = uri => {
      return new JSZip.external.Promise(function(resolve, reject) {
        JSZipUtils.getBinaryContent(uri, function(err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      })
        .then(function(data) {
          return JSZip.loadAsync(data);
        })
        .then(function(zip) {
          return zip.file("data.json").async("string");
        })
        .then(function(contents) {
          var responseJSON = JSON.parse(contents);
          DataFactory.data = responseJSON;
          return responseJSON;
        });
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
            DataFactory.responseText = this.responseText;
            var responseJSON = JSON.parse(this.responseText);
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
      //   const response = await ajaxRequestWithPromise(jsonUri);
      const response = await loadZip(jsonUri);
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

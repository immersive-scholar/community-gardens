const JSZip = require("jszip");
const JSZipUtils = require("jszip-utils");

class DataFactory {
  static data = [];

  static async load(jsonUri, filename) {
    const onDataComplete = () => {
      // Called when all requests complete.
      console.log("Data Factory data complete ", this.data);
    };
    const onDataError = () => {
      console.log("Failed to fetch the data");
    };

    const loadZip = uri => {
      return new Promise((resolve, reject) => {
        JSZipUtils.getBinaryContent(uri, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      })
        .then(data => {
          return JSZip.loadAsync(data);
        })
        .then(zip => {
          return zip.file(filename).async("string");
        })
        .then(file => {
          var dataJson = JSON.parse(file);
          DataFactory.data = dataJson;
          console.log("dataJson ", dataJson);
          return dataJson;
        });
    };

    const request = async () => {
      const response = await loadZip(jsonUri);
      this.data = response.data;
      onDataComplete();
    };

    return request().catch(error => {
      onDataError();
    }); // catch rejected promise
  }

  static getRandomData() {
    // Return a sample from the data, based on random-seed
    return "random data now please";
  }
}

export default DataFactory;

const CSVToJSON = require("csvtojson");
const writeJson = require("./writeJson");

module.exports = (csvfile, filename, callback) => {
  CSVToJSON()
    .fromFile(`./CSVfiles/${csvfile}.csv`)
    .then(items => {
      console.log(items);
      writeJson(filename, JSON.stringify(items));
    })
    .then(callback())
    .catch(err => {
      // log error if any
      console.log(err);
    });
};

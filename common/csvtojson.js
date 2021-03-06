const CSVToJSON = require("csvtojson");
const writeJson = require("./writeJson");

module.exports = (csvfile, filename) => {
  CSVToJSON()
    .fromFile(`./CSVfiles/${csvfile}.csv`)
    .then(items => {
      console.log(items);
      writeJson(filename, JSON.stringify(items));
    })
    .catch(err => {
      // log error if any
      console.log(err);
    });
};

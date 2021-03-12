const fs = require("fs");

module.exports = (filename, data) => {
  fs.writeFile(`./JSONfiles/${filename}.json`, data, err => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      console.log(fs.readFileSync(`./JSONfiles/${filename}.json`, "utf8"));
    }
  });
};

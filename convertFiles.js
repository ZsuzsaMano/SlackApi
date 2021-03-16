const writeJson = require("./common/writeJson.js");
const csvtojson = require("./common/csvtojson.js");

csvtojson("groups", "testgroups");
csvtojson("users", "testusers");

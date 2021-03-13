const userId = require("./JSONfiles/userId.json");
const groupId = require("./JSONfiles/groupId.json");
const writeJson = require("./common/writeJson.js");

userId.map(x =>
  Object.assign(
    x,
    groupId.find(y => y.commonkey === x.commonkey)
  )
);
writeJson("mergedData", JSON.stringify(userId));

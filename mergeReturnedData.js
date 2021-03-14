const userId = require("./JSONfiles/userId.json");
const groupId = require("./JSONfiles/groupId.json");
const writeJson = require("./common/writeJson.js");

groupId.map(x => {
  userId.forEach(y => {
    if (x.GroupName === y.GroupName) {
      x.users.push(y.UserId);
    }
  });
});

console.log(groupId);
writeJson("mergeData", JSON.stringify(groupId));

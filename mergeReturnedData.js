const userId = require("./JSONfiles/userId.json");
const groupId = require("./JSONfiles/groupId.json");
const topicsId = require("./JSONfiles/topicsId.json");
const writeJson = require("./common/writeJson.js");

groupId.map(x => {
  userId.forEach(y => {
    if (x.GroupName === y.GroupName) {
      x.users.push(y.UserId);
    }
  });
});

console.log(groupId);
writeJson("mergedData", JSON.stringify(groupId));

topicsId.map(x => {
  userId.forEach(y => {
    if (x.Topic === y.Topic) {
      x.users.push(y.UserId);
    }
  });
});

console.log(groupId);
console.log(topicsId);

writeJson("mergedData", JSON.stringify(groupId));
writeJson("mergedTopicsData", JSON.stringify(topicsId));

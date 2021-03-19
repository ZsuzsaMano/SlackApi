const userId = require("./JSONfiles/userId.json");

const writeJson = require("./common/writeJson.js");

const defaultGroupId = require("./JSONfiles/defaultGroupId.json")
// groupId.map(x => {
//   userId.forEach(y => {
//     if (x.GroupName === y.GroupName) {
//       x.users.push(y.UserId);
//     }
//   });
// });
//
// console.log(groupId);
// writeJson("mergedData", JSON.stringify(groupId));
//
// topicsId.map(x => {
//   userId.forEach(y => {
//     if (x.Topic === y.Topic) {
//       x.users.push(y.UserId);
//     }
//   });
// });

const batchSize = 900;

let batches = {}
let i = 0
let users = userId.map( u => u.UserId )

for ( let batch of [1,2,3,4] ) {


  const newBatch = users.splice(0, batchSize)
  users = users.filter( (a) => !newBatch.includes(a) )
  console.log({ batch, users: users, newBatch: newBatch.length })
  batches[batch] = newBatch
  // if (batches[batch]) {
  //   batches[batch].push(newBatch)
  // } else {
  //   batches[batch] = [newBatch]
  // }

}

console.log(JSON.stringify(batches))
writeJson("userBatches", JSON.stringify(batches));

const groups = []

// foreach batch
for (let batch of [1,2,3,4] ) {

  // foreach group
  for (let group of defaultGroupId) {
    console.log(group)
    group.users = batches[batch]
    groups.push(group)
  }
}
//
//
// //
// // defaultGroupId.map(x => {
// //   userId.forEach(y => {
// //     x.users.push(y.UserId);
// //   });
// // });
//
// // const allIds = userId.map(x => {
// //     x.users.push(y.UserId);
// // });
//
//
// console.log(defaultGroupId);
// console.log(groups)
writeJson("mergedDefaultData", JSON.stringify(groups));

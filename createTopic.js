const axios = require("axios");
const qs = require("qs");
const CSVToJSON = require("csvtojson");
const fs = require("fs");
const token = require("./config.js");
const groups = require("./JSONfiles/topicsId.json");
const writeJson = require("./common/writeJson.js");
var slugify = require("slugify");

const jsonLenght = groups.length;

let groupArray = [];

const createChannel = () => {
  let groupErrorArray = [];
  groups.forEach((group, i) => {
    setTimeout(() => {
      const data = qs.stringify({
        token: token.userToken,
        name: slugify(group.Topic).toLowerCase() + "test",
        is_private: "false"
      });
      const config = {
        method: "post",
        url: "https://slack.com/api/conversations.create",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: "b=68cdyyggh2sswgno3eq3se4em"
        },
        data: data
      };

      axios(config)
        .then(function(response) {
          const groupId = response.data.channel.id;
          groupArray.push({
            groupId: groupId,
            GroupName: group.Topic,
            users: []
          });
          const toFile = JSON.stringify(groupArray);
          writeJson("topicsId", toFile);
        })
        .catch(function(error) {
          console.log(error);
          groupErrorArray.push({
            error: error.message,
            GroupName: group.Groups
          });
          const toErrorFile = JSON.stringify(groupErrorArray);
          writeJson("groupError", toErrorFile);
        });
      console.log("timeout ");
    }, 3000 * i);
  });
};

createChannel();

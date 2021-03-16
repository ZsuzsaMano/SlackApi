const axios = require("axios");
const qs = require("qs");
const CSVToJSON = require("csvtojson");
const fs = require("fs");
const token = require("./config.js");
const groups = require("./JSONfiles/testgroups.json");
const writeJson = require("./common/writeJson.js");

const jsonLenght = groups.length;

let groupArray = [];

const createChannel = () => {
  let groupErrorArray = [];
  groups.forEach(group => {
    const data = qs.stringify({
      token: token.userToken,
      name: group.group.toLowerCase(),
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
          GroupName: group.group,
          users: []
        });
        const toFile = JSON.stringify(groupArray);
        writeJson("groupId", toFile);
      })
      .catch(function(error) {
        console.log(error);
        groupErrorArray.push({
          error: error.message,
          GroupName: group.group
        });
        const toErrorFile = JSON.stringify(groupErrorArray);
        writeJson("groupError", toErrorFile);
      });
  });
};

createChannel();

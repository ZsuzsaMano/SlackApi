const axios = require("axios");
const qs = require("qs");
const groups = require("./JSONfiles/testgroups.json");
const fs = require("fs");
const token = require("./config.js");
const writeJson = require("./common/writeJson.js");

const jsonLenght = groups.length;

const groupArray = [];

const createChannel = () => {
  groups.forEach(group => {
    const data = qs.stringify({
      token: token.userToken,
      name: group.group.toLowerCase() + Math.floor(Math.random() * 1000),
      is_private: "true"
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
        groupArray.push({ groupId: groupId, GroupName: group.group });
        if (groupArray.length === jsonLenght) {
          const toFile = JSON.stringify(groupArray);

          writeJson(groupId, toFile);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};

createChannel();

const axios = require("axios");
const qs = require("qs");
const CSVToJSON = require("csvtojson");
const fs = require("fs");
const token = require("./config.js");
const groups = require("./JSONfiles/testgroups.json");
const writeJson = require("./common/writeJson.js");

const jsonLenght = groups.length;

let groupArray = [];

const getChannel = async (channelName) => {

  const data = qs.stringify({
    token: token.botToken,
    limit: 1000
  });
  const config = {
    method: "post",
    url: "https://slack.com/api/conversations.list",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: "b=y8jkoei1qsl1fwndue4t31uk"
    },
    data: data
  };

  const response = await axios(config)

  // console.log(response)

  if (response.data.error) {
    console.log("error", response.data)
    return
  }

  const {channels} = response.data
  console.log("getChannel got response", channels)
  return channels.filter( i => {
    console.log(i.name, channelName.toLowerCase())
    return i.name === channelName.toLowerCase()
  })[0]
}

const createChannel = () => {
  let groupErrorArray = [];
  groups.forEach((group, i) => {
    setTimeout(() => {
      const data = qs.stringify({
        token: token.userToken,
        name: group.Groups.toLowerCase(),
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
        .then(async (response) => {
          let groupId
          if (response.data.error) {
            console.log(`Error creating ${group.Groups}`, response.data.error)
            const channel = await getChannel(group.Groups)

            console.log("got channel", channel)

            groupId = channel.id
          } else {
            groupId = response.data.channel.id;
          }

          groupArray.push({
            groupId: groupId,
            GroupName: group.Groups,
            users: []
          });
          const toFile = JSON.stringify(groupArray);
          writeJson("groupId", toFile);
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

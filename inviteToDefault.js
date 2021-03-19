const axios = require("axios");
const qs = require("qs");
const token = require("./config.js");
const mergedDefaultData = require("./JSONfiles/mergedDefaultData.json");

const inviteToDefault = () => {
  mergedDefaultData.forEach((mData, i) => {
    setTimeout(() => {
      const data = qs.stringify({
        token: token.userToken,
        channel: mData.topicId,
        users: mData.users.join(",")
      });
      const config = {
        method: "post",
        url: "https://slack.com/api/conversations.invite",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Cookie: "b=68cdyyggh2sswgno3eq3se4em"
        },
        data: data
      };

      axios(config)
        .then(function(response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function(error) {
          console.log(error);
        });
      console.log("timeout ");
    }, 1200 * i);
  });
};

inviteToDefault();

const axios = require("axios");
const qs = require("qs");
const token = require("./config.js");

const data = qs.stringify({
  token: token.userToken,
  channel: "C01RMAH9LAC",
  users: "U01QQTLAUAZ,U01QQTFR5LM"
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

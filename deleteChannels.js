var axios = require("axios");
var qs = require("qs");
const token = require("./config.js");

var data = qs.stringify({
  token: token.userToken,
  channel: "C01S2NJSREV"
});
var config = {
  method: "post",
  url: "https://slack.com/api/conversations.archive",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: "b=y8jkoei1qsl1fwndue4t31uk"
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

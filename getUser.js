const axios = require("axios");
const qs = require("qs");
const token = require("./config.js");

module.exports = email => {
  const data = qs.stringify({
    token: token.botToken,
    email: email
  });
  var config = {
    method: "post",
    url: "https://slack.com/api/users.lookupByEmail",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: "b=y8jkoei1qsl1fwndue4t31uk"
    },
    data: data
  };

  axios(config)
    .then(function(response) {
      console.log(JSON.stringify(response.data.user.id));
    })
    .catch(function(error) {
      console.log(error);
    });
};

const axios = require("axios");
const users = require("./JSONfiles/testusers.json");
const token = require("./config.js");
const writeJson = require("./common/writeJson.js");

const createUsers = () => {
  let userArray = [];
  let userErrorArray = [];

  users.forEach(user => {
    let data = JSON.stringify({
      schemas: [
        "urn:scim:schemas:core:1.0",
        "urn:scim:schemas:extension:enterprise:1.0"
      ],
      userName:
        user.FirstName.toLowerCase() +
        "_" +
        user.LastName.toLowerCase() +
        Math.floor(Math.random() * 100),
      name: { familyName: user.FirstName, givenName: user.LastName },
      displayName: user.FirstName + " " + user.LastName,
      emails: [
        {
          value: user.EmailAddress,
          type: "work",
          primary: true
        }
      ]
    });

    const config = {
      method: "post",
      url: "https://api.slack.com/scim/v1/Users",
      headers: {
        Authorization: "Bearer " + token.userToken,
        "Content-Type": "application/json",
        Cookie: "b=68cdyyggh2sswgno3eq3se4em"
      },
      data: data
    };

    axios(config)
      .then(function(response) {
        const userId = response.data.id;
        const email = response.data.emails[0].value;
        userArray.push({
          UserId: userId,
          email: email,
          GroupName: user.GroupName
        });
        const toFile = JSON.stringify(userArray);
        writeJson("userId", toFile);
      })
      .catch(function(error) {
        console.log(error);
        userErrorArray.push({
          error: error.message,
          user: user.FirstName + " " + user.LastName,
          email: user.EmailAddress,
          GroupName: user.GroupName
        });
        const toErrorFile = JSON.stringify(userErrorArray);
        writeJson("userError", toErrorFile);
      });
  });
};

createUsers();

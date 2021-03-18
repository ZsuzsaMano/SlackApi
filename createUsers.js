const axios = require("axios");
// const users = require("./JSONfiles/userError.json");
const users = require("./JSONfiles/testusers.json");
const token = require("./config.js");
const writeJson = require("./common/writeJson.js");
const getUser = require("./getUser.js");

const slugify = require('slugify')

const isProd = process.env.NODE_ENV === 'production'

const createUsers = () => {
  let userArray = [];
  let userErrorArray = [];

  users.forEach((user, i) => {

    setTimeout(() => {

      const username = slugify(`${user.FirstName}-${user.LastName}`.substring(0,16)).toLowerCase() + Math.floor(Math.random() * 1000)

      if (
        user.FirstName &&
        user.LastName &&
        user.EmailAddress &&
        user.Topic &&
        user.GroupName
      ) {
        let data = JSON.stringify({
          schemas: [
            "urn:scim:schemas:core:1.0",
            "urn:scim:schemas:extension:enterprise:1.0"
          ],
          userName: username,
          name: { familyName: user.LastName, givenName: user.FirstName },
          displayName: user.FirstName + " " + user.LastName,
          emails: [
            {
              value: isProd ? user.EmailAddress : `dev+${Math.floor(Math.random() * 10000)}@n3xtcoder.org`,
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
              GroupName: user.GroupName,
              Topic: user.Topic
            });
            const toFile = JSON.stringify(userArray);
            writeJson("userId", toFile);
          })
          .catch(function(error) {
            console.log(error);
            userErrorArray.push({
              error: error.message,
              FirstName: user.FirstName,
              LastName: user.LastName,
              EmailAddress: user.EmailAddress,
              GroupName: user.GroupName,
              Topic: user.Topic
            });
            const toErrorFile = JSON.stringify(userErrorArray);
            writeJson("userError", toErrorFile);
          });
      } else {
        console.log("error not all fields filled", user);
      }
      console.log("timeout ");
    }, 1200 * i);
  });
};

createUsers();

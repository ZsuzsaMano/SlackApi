const axios = require("axios");
const users = require("./JSONfiles/testusers0.json");
const token = require("./config.js");

const createUsers = () => {
  users.forEach(user => {
    let data = JSON.stringify({
      schemas: [
        "urn:scim:schemas:core:1.0",
        "urn:scim:schemas:extension:enterprise:1.0"
      ],
      userName:
        user.FirstName.toLowerCase() + "_" + user.LastName.toLowerCase(),
      name: { familyName: user.FirstName, givenName: user.LastName },
      displayName: user.FirstName + " " + user.LastName,
      emails: [{ value: user.EmailAddress, type: "work", primary: true }]
    });

    console.log(data);

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
        const userId = JSON.stringify(response.data.id);
        const email = JSON.stringify(response.data.emails[0].value);
        console.log({
          UserId: userId,
          email: email,
          groupname: user.GroupName
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};

createUsers();

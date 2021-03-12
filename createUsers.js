const axios = require("axios");
const users = require("./testusers.json");
const token = require("./config.js");

const createUsers = () => {
  users.forEach(user => {
    let data =
      '{\n    "schemas": [\n        "urn:scim:schemas:core:1.0",\n     "urn:scim:schemas:extension:enterprise:1.0"\n    ],\n    "userName": "test25_username25",\n    "name": {\n        "familyName": "Last",\n   "givenName": "First",\n    },\n    "emails": [\n {\n   "value": "testh5@email.com",\n       "type": "work",\n            "primary": true\n        },\n     \n    ],\n}\n';

    const config = {
      method: "post",
      url: "https://api.slack.com/scim/v1/Users",
      headers: {
        Authorization:
          "Bearer "+token.botToken,,
        "Content-Type": "application/json",
        Cookie: "b=68cdyyggh2sswgno3eq3se4em"
      },
      data: data
    };

    axios(config)
      .then(function(response) {
        const userId = JSON.stringify(response.data.id);
        const email = JSON.stringify(response.data.emails[0].value);
        console.log(userId, email);
      })
      .catch(function(error) {
        console.log(error);
      });
  });
};

createUsers();

//IMPORTS
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const fs = require("fs");
const User = require("./models/user.js");

//VARIABLES
let username = process.argv[2];
let password = process.argv[3];
let pubKey = process.argv[4];

//FUNCTIONS AND PROMISES
const logErrorAndExit = errMsg => {
  console.log(errMsg);
  process.exit(1);
};
const findUser = username => {
  return new Promise((resolve, reject) => {
    User.findOne({ username: username }, (err, user) => {
      if (err || !user) {
        if (err) reject(err);
        if (!user) reject(`User not found. Instead you got ${user}`);
      } else {
        resolve(user);
      }
    });
  });
};

const authenticateUser = user => {
  return new Promise((resolve, reject) => {
    if (!bcrypt.compareSync(password, user.password)) {
      reject("password is wrong; please try again");
    } else {
      resolve(user);
    }
  });
};

const savePubKey = (resolve, reject) => {
  fs.readFile(pubKey, (err, data) => {
    if (err) reject(err);
    else {
      resolve(data.toString());
    }
  });
};

//MAIN APP LOGIC
mongoose
  /* Setup to deal with deprecation warnings */
  .set("useCreateIndex", true)
  .set("useNewUrlParser", true)
  .connect("mongodb://localhost:27017/CharlesPustejovsky-2019-Promises")
  .then(() => {
    //find User by username and compare password provided to the hash stored on mongodb
    if (username && password && pubKey) {
      console.log("authenticating user...");
      findUser(username)
        .catch(err => {
          logErrorAndExit(err);
        })
        .then(user => {
          console.log(`found user: ${user}`);
          console.log(`authenticating your password...`);
          authenticateUser(user)
            .then(
              savePubKey()
                .then(parsedData => {
                  user.publicKey = parsedData;
                  user
                    .save()
                    .catch(err => logErrorAndExit(err))
                    .then(user => {
                      console.log(
                        `successfully saved data from ${pubKey} to ${
                          user.username
                        }`
                      );
                      process.exit(0);
                    });
                })
                .catch(logErrorAndExit(err))
            )
            .catch(err => logErrorAndExit(err));
        });
    } else {
      logErrorAndExit(
        "try again and provide a username as the first argument, a password as the second, and a pubic key you want to store as the third"
      );
    }
  })
  .catch(err => {
    logErrorAndExit(err);
  });

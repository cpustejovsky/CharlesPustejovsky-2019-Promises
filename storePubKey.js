//IMPORTS
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const fs = require("fs");
const User = require("./models/user.js");

//VARIABLES
let username = process.argv[2];
let password = process.argv[3];
let pubKey = process.argv[4];
const logErrorAndExit = errMsg => {
  console.log(errMsg);
  process.exit(1);
};
mongoose
  /* Setup to deal with deprecation warnings */
  .set("useCreateIndex", true)
  .set("useNewUrlParser", true)
  .connect("mongodb://localhost:27017/CharlesPustejovsky-2019")
  .then(() => {
    //find User by username and compare password provided to the hash stored on mongodb
    if (username && password && pubKey) {
      console.log("authenticating user...");
      const authenticatedUser = new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
          if (err) {
            reject(err);
          } else if (!user) {
            reject("User not found.");
          } else {
            console.log(`found user!`);
            resolve(user);
          }
        });
      });
      const correctPassword = new Promise((resolve, reject) => {
        if (!bcrypt.compareSync(password, user.password)) {
          reject();
        } else {
          fs.readFile(pubKey, (err, data) => {
            if (err) logErrorAndExit(err);
            else {
              parsedData = data.toString();
              user.publicKey = parsedData;
              user.save(err => {
                if (err) {
                  logErrorAndExit(err);
                } else {
                  console.log(
                    `successfully saved data from ${pubKey} to ${user.username}`
                  );
                  process.exit(0);
                }
              });
            }
          });
        }
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

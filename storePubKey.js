//IMPORTS
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const fs = require("fs");
const User = require("./models/user.js");

//VARIABLES
let username = process.argv[2];
let password = process.argv[3];
let pubKey = process.argv[4];
let authenticated = false;
let foundUser;

const logErrorAndExit = errMsg => {
  console.log(errMsg);
  process.exit(1);
};

async function authenticateUser() {
  let user = new Promise(function(resolve, reject) {
    User.findOne({ username: username }, (err, user) => {
      //wasn't specifically catching the error of no username match and instead failing on
      //`can't read property password of null` so I set this up for clearer error handling
      if (err || !user) {
        if (err) reject(err);
        if (!user) reject(`User not found.`);
      } else {
        console.log(`found user: ${user.username}`);
        resolve(user);
      }
    });
  });
  foundUser = await user;
  authenticated = bcrypt.compareSync(password, foundUser.password);
  return authenticated;
}

async function savePubKeyFromFileToUser() {
  let pubKeyData = new Promise(function(resolve, reject) {
    fs.readFile(pubKey, (err, data) => {
      if (err) reject(err);
      else {
        resolve(data.toString());
      }
    });
  });
  foundUser.publicKey = await pubKeyData;
  foundUser
    .save()
    .then(() => {
      console.log(
        `successfully saved data from ${pubKey} to ${foundUser.username}`
      );
      process.exit(0);
    })
    .catch(err => {
      logErrorAndExit(err);
      process.exit(1);
    });
}

//find User by username and compare password provided to the hash stored on mongodb
if (username && password && pubKey) {
  /* Setup to deal with deprecation warnings */
  mongoose
    .set("useCreateIndex", true)
    .set("useNewUrlParser", true)
    .connect("mongodb://localhost:27017/CharlesPustejovsky-2019-Promises")
    .then(async () => {
      let authenticated = await authenticateUser();
      //read pubKey from file
      if (authenticated) {
        savePubKeyFromFileToUser();
      } else {
        logErrorAndExit(`passwords did not match. please try again.`);
      }
    })
    .catch(err => logErrorAndExit(err));
} else {
  logErrorAndExit("wrong paramters; try again");
}

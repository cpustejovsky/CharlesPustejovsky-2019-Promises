//IMPORTS
const bcrypt = require("bcryptjs");
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
  try {
    let user = await User.findOne({ username: username }).exec();
    if (!user) logErrorAndExit(`User not found.`);
  } catch (err) {
    if (err) logErrorAndExit(err);
  }
  authenticated = bcrypt.compareSync(password, user.password);
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

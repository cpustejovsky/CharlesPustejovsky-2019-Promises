//IMPORTS
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/user.js");

const authentication = {
  registerUser(username, password) {
    if (username && password) {
      console.log("setting up your username and password...");
      //the salt could probably be lowered, but I set it higher to make it more secure. let me know if that thinking is wrong.
      let hash = bcrypt.hashSync(password, 16);
      let user = new User({
        username: username,
        password: hash
      });
      user.save(err => {
        if (err) {
          console.log(`Something bad happened! Please try again! Here's the error:\n====================\n${err}
          `);
          success = false;
        } else {
          console.log(
            `Congratulations! ${
              user.username
            } was authenticated.\nKeep your password in a secure place.`
          );
        }
      });
    } else {
      console.log(
        "try again and provide a username as the first argument and a password as the second argument"
      );
    }
  }
};

module.exports = authentication;

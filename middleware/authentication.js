//IMPORTS
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/user.js");
const secret = "shouldBeHiddenWithDotEnv";
let authenticated = false;

const Auth = {
  async registerUser(username, password) {
    if (username && password) {
      console.log("setting up your username and password...");
      //the salt could probably be lowered, but I set it higher to make it more secure. let me know if that thinking is wrong.
      hash = bcrypt.genSalt(16, function(err, salt) {
        if (err) throw err;
        bcrypt.hash(secret, salt, function(err, hash) {
          if (err) throw err;
          return hash;
        });
      });
      let user = new User({
        username: username,
        password: hash
      });
      user.save(err => {
        if (err) {
          console.log(`Something bad happened! Please try again! Here's the error:\n====================\n${err}
          `);
        } else {
          console.log(
            `Congratulations! ${user.username} was authenticated.\nKeep your password in a secure place.`
          );
        }
      });
    } else {
      console.log(
        "try again and provide a username as the first argument and a password as the second argument"
      );
    }
  },
  async authenticateUser(req, res, next) {
    try {
      let user = await User.findOne({
        username: req.body.user.username
      }).exec();
      if (!user) res.redirect("/login");
    } catch (err) {
      if (err) res.redirect("/login");
    }
    authenticated = bcrypt.compareSync(password, user.password);
    if (authenticated) {
      return next();
    } else {
      res.redirect("/login");
    }
  }
};

module.exports = Auth;

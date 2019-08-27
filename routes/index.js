const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  res.render("index");
});

// async function authenticateUser(req, res, next) {
//   console.log("authenticating user...");
//   try {
//     let user = await User.findOne({
//       username: req.body.username
//     }).exec();
//     if (bcrypt.compareSync(req.body.password, user.password)) {
//       console.log("successfully authenticated");
//       return next();
//     } else {
//       console.log("user was not authenticated or something went wrong");
//       res.redirect("/login");
//     }
//     if (!user) res.redirect("/login");
//   } catch (err) {
//     if (err) res.redirect("/login");
//   }
// }

function authenticateUser(username, password) {
  User.findOne({ username: username }, (err, user) => {
    //wasn't specifically catching the error of no username match and instead failing on
    //`can't read property password of null` so I set this up for clearer error handling
    if (err || !user) {
      if (err) throw err;
      if (!user) console.log(`User not found.`);
    } else {
      console.log(`found user!`);
      console.log(`authenticating your password...`);
      if (bcrypt.compareSync(password, user.password)) {
        //do something
      } else {
        console.log(`passwords did not match. please try again.`);
      }
    }
  });
}

//USER SIGN UP
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  let username = req.body.user.username;
  let password = req.body.user.password;
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
      } else {
        console.log(
          `Congratulations! ${user.username} was authenticated.\nKeep your password in a secure place.`
        );
        res.redirect("/login");
      }
    });
  } else {
    console.log(
      "try again and provide a username as the first argument and a password as the second argument"
    );
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    //wasn't specifically catching the error of no username match and instead failing on
    //`can't read property password of null` so I set this up for clearer error handling
    if (err || !user) {
      if (err) throw err;
      if (!user) console.log(`User not found.`);
    } else {
      console.log(`found user!`);
      console.log(`authenticating your password...`);
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.render("keys", { username: req.body.username });
      } else {
        console.log(`passwords did not match. please try again.`);
      }
    }
  });
});

router.get("/keys", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    //wasn't specifically catching the error of no username match and instead failing on
    //`can't read property password of null` so I set this up for clearer error handling
    if (err || !user) {
      if (err) throw err;
      if (!user) console.log(`User not found.`);
    } else {
      console.log(`found user!`);
      console.log(`authenticating your password...`);
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.render("keys", { username: req.body.username });
      } else {
        console.log(`passwords did not match. please try again.`);
      }
    }
  });
});

router.post("/keys", (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    //wasn't specifically catching the error of no username match and instead failing on
    //`can't read property password of null` so I set this up for clearer error handling
    if (err || !user) {
      if (err) throw err;
      if (!user) console.log(`User not found.`);
    } else {
      console.log(`found user!`);
      console.log(`authenticating your password...`);
      if (bcrypt.compareSync(req.body.password, user.password)) {
        console.log(req.body.testFile);
        res.redirect("/");
      } else {
        console.log(`passwords did not match. please try again.`);
      }
    }
  });
});

module.exports = router;

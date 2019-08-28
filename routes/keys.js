const express = require("express");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const fs = require("fs");

const router = express.Router();
const User = require("../models/user");

async function savePubKeyFromFileToUser(pubKey, foundUser) {
  let pubKeyData = new Promise(function(resolve, reject) {
    fs.readFile(pubKey, (err, data) => {
      if (err) reject(err);
      else {
        console.log(`found the data! \n ${data.toString()}`);
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
    })
    .catch(err => {
      throw err;
    });
}

router.get("/", (req, res) => {
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

router.post("/", (req, res) => {
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
        savePubKeyFromFileToUser(req.body.testFile, user).then(() =>
          res.redirect("/")
        );
      } else {
        console.log(`passwords did not match. please try again.`);
      }
    }
  });
});

module.exports = router;

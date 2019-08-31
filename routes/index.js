const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const fs = require("fs");
const multer = require("multer");
var upload = multer({ dest: "temp/" });
const router = express.Router();
const User = require("../models/user");

const rmTempFiles = () => {
  fs.unlinkSync(req.files["signature"][0].path);
  fs.unlinkSync(req.files["message"][0].path);
};

router.get("/", (req, res) => {
  res.render("index");
});

router.post(
  "/",
  upload.fields([{ name: "signature" }, { name: "message" }]),
  (req, res) => {
    let signature = fs.readFileSync(req.files["signature"][0].path);
    let message = fs.readFileSync(req.files["message"][0].path);
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err || !user) {
        if (err) {
          rmTempFiles();
          throw err;
        }
        if (!user) {
          rmTempFiles();
          console.log(`User not found.`);
        }
        process.exit(1);
      } else {
        console.log(`found user!`);
        console.log(
          `verifying message signature with ${user.username}'s public key...`
        );
        //now the script verifies the message using the signature created by signMsg.js
        //and the public key stored using storePubKey.js
        const verifier = crypto.createVerify("sha256");
        verifier.update(message);
        verifier.end();
        //https://nodejs.org/api/crypto.html#crypto_class_verify
        const verified = verifier.verify(user.publicKey, signature);
        rmTempFiles();
        res.render("results", { verified: verified });
      }
    });
  }
);

//USER SIGN UP
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  let username = req.body.user.username;
  let password = req.body.user.password;
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
        console.log("logged in!");
        res.render("keys", { username: req.body.username });
      } else {
        console.log(`passwords did not match. please try again.`);
      }
    }
  });
});

module.exports = router;

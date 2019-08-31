const express = require("express");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const fs = require("fs");

const upload = multer({ dest: "temp/" });
const router = express.Router();
const User = require("../models/user");

async function savePubKeyFromFileToUser(pubKey, foundUser, path) {
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
      fs.unlinkSync(path);
    })
    .catch(err => {
      fs.unlinkSync(path);
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

router.post("/", upload.single("testFile"), (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    //wasn't specifically catching the error of no username match and instead failing on
    //`can't read property password of null` so I set this up for clearer error handling
    if (err || !user) {
      if (err) {
        fs.unlinkSync(req.file.path);
        throw err;
      }
      if (!user) console.log(`User not found.`);
    } else {
      console.log(`found user!`);
      console.log(`authenticating your password...`);
      if (bcrypt.compareSync(req.body.password, user.password)) {
        savePubKeyFromFileToUser(req.file.path, user, req.file.path).then(
          () => {
            console.log("successfully saved public key to user");
            res.redirect("/");
          }
        );
      } else {
        fs.unlinkSync(req.file.path);
        console.log(`passwords did not match. please try again.`);
      }
    }
  });
});

module.exports = router;

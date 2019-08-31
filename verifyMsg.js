// IMPORTS
const fs = require("fs");
const crypto = require("crypto");
const mongoose = require("mongoose");
const User = require("./models/user.js");

//VARIABLES
const username = process.argv[2];
const signature = fs.readFileSync(process.argv[3]);
const message = fs.readFileSync(process.argv[4], "utf-8");

mongoose
  /* Setup to deal with deprecation warnings */
  .set("useCreateIndex", true)
  .set("useNewUrlParser", true)
  .connect("mongodb://localhost:27017/CharlesPustejovsky-2019-v2")
  .then(() => {
    //I find the public key attached to the username stored using storePubKey.js
    User.findOne({ username: username }, (err, user) => {
      if (err || !user) {
        if (err) throw err;
        if (!user) console.log(`User not found.`);
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

        console.log(verified);
        process.exit(0);
      }
    });
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

const fs = require("fs");
const crypto = require("crypto");
const mongoose = require("mongoose");
const User = require("./models/user.js");

const username = process.argv[2];
const signature = fs.readFileSync(process.argv[3]);
const message = fs.readFileSync(process.argv[4], "utf-8");
const signature_hex = signature.toString("hex");

mongoose
  /* Setup to deal with deprecation warnings */
  .set("useCreateIndex", true)
  .set("useNewUrlParser", true)
  .connect("mongodb://localhost:27017/CharlesPustejovsky-2019")
  .then(() => {
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
        const verifier = crypto.createVerify("sha256");
        verifier.update(message);
        verifier.end();
        const verified = verifier.verify(user.publicKey, signature);

        console.log(
          JSON.stringify(
            {
              message: message,
              signature: signature_hex,
              verified: verified
            },
            null,
            2
          )
        );
        process.exit(0);
      }
    });
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

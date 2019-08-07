//IMPORTS
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const fs = require("fs");
const User = require("./models/user.js");

//VARIABLES
let username = process.argv[2];
let password = process.argv[3];
let pubKey = process.argv[4];

mongoose
  /* Setup to deal with deprecation warnings */
  .set("useCreateIndex", true)
  .set("useNewUrlParser", true)
  .connect("mongodb://localhost:27017/CharlesPustejovsky-2019")
  .then(() => {
    //find User by username and compare password provided to the hash stored on mongodb
    if (username && password && pubKey) {
      console.log("authenticating user...");
      User.findOne({ username: username }, (err, user) => {
        //wasn't specifically catching the error of no username match and instead failing on
        //`can't read property password of null` so I set this up for clearer error handling
        if (err || !user) {
          if (err) throw err;
          if (!user) console.log(`User not found.`);
          process.exit(1);
        } else {
          console.log(`found user!`);
          console.log(`authenticating your password...`);
          if (bcrypt.compareSync(password, user.password)) {
            //TODO: replace with Promise
            fs.readFile(pubKey, (err, data) => {
              if (err) throw err;
              else {
                parsedData = data.toString();
                user.publicKey = parsedData;
                user.save(err => {
                  if (err) {
                    console.log(err);
                    process.exit(1);
                  } else {
                    console.log(
                      `successfully saved data from ${pubKey} to ${
                        user.username
                      }`
                    );
                    process.exit(0);
                  }
                });
              }
            });
          } else {
            console.log(`passwords did not match. please try again.`);
            process.exit(1);
          }
        }
      });
    } else {
      console.log(
        "try again and provide a username as the first argument, a password as the second argument, and a pubic key you want to store as the third argument"
      );
      process.exit(1);
    }
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

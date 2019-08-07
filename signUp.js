//IMPORTS
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./models/user.js");

//VARIABLES
let port = (process.env.PORT = 3000);
let username = process.argv[2];
let password = process.argv[3];

mongoose
  /* Setup to deal with deprecation warnings */
  .set("useCreateIndex", true)
  .set("useNewUrlParser", true)
  .connect("mongodb://localhost:27017/CharlesPustejovsky-2019")
  .then(() => {
    // console.log("connected to database");
    //setting password for user via argument when starting server and
    if (username && password) {
      console.log("setting up your username and password...");
      let hash = bcrypt.hashSync(password, 17);
      let user = new User({
        username: username,
        password: hash
      });
      user.save(err => {
        if (err) {
          console.log(`Something bad happened! Please try again! Here's the error:\n====================\n${err}
          `);
          process.exit(1);
        } else {
          console.log(
            `Huzzah! ${
              user.username
            } was authenticated.\nKeep your password in a secure place.`
          );
          process.exit(0);
        }
      });
    } else {
      console.log(
        "try again and provide a username as the first argument and a password as the second argument"
      );
      process.exit(1);
    }
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

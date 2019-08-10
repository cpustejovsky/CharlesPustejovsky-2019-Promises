//IMPORTS
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./models/user.js");

//VARIABLES
let username = process.argv[2];
let password = process.argv[3];
const throwError = errMsg => {
  console.log(errMsg);
  process.exit(1);
};
mongoose
  /* Setup to deal with deprecation warnings */
  .set("useCreateIndex", true)
  .set("useNewUrlParser", true)
  .connect("mongodb://localhost:27017/CharlesPustejovsky-2019")
  /*setting password for user when starting server*/
  .then(() => {
    //checking that username and password were provided as arguments
    if (username && password) {
      console.log("setting up your username and password...");
      //the salt could probably be lowered, but I set it higher to make it more secure. let me know if that thinking is wrong.
      let hash = bcrypt.hashSync(password, 17);
      let user = new User({
        username: username,
        password: hash
      });
      user.save(err => {
        if (err) {
          throwError(`Something bad happened! Please try again! Here's the error:\n====================\n${err}
          `);
        } else {
          console.log(
            `Congratulations! ${
              user.username
            } was authenticated.\nKeep your password in a secure place.`
          );
          process.exit(0);
        }
      });
    } else {
      throwError(
        "try again and provide a username as the first argument and a password as the second argument"
      );
    }
  })
  .catch(err => {
    console.log(err);
    //I have the `process.exit()`s all over to make sure the file closes out either because of error or because it's finished running so this could be broken up with a couple of files
    process.exit(1);
  });

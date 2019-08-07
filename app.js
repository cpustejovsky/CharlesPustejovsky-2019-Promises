//IMPORTS
const Express = require("express");
const app = Express();
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
    console.log("connected to database");
    // authenticate to server with a password: ability to set password for user via argument when starting server
    console.log(username);
    console.log(password);

    if (username && password) {
      let user = new User({
        username: username,
        password: password
      });
      user.save(err => {
        if (err) {
          let error = "Something bad happened! Please try again!";

          if ((err.code = 11000)) {
            error = "That email is already taken, please try another.";
          }
          console.log(error);
        }
        console.log(user);
      });
    } else {
      console.log(
        "try again and provide a username as the first argument and a password as the second argument"
      );
    }
  })
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});

// store public key to server

// allow client to sign a message with private key

// allow submission of signed message to server to verify signature

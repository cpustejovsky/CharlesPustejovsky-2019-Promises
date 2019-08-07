//IMPORTS
// const Express = require("express");
// const app = Express();
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
    console.log("connected to database");
    // authenticate to server with a password: ability to set password for user via argument when starting server
    if (username && password) {
      let hash = bcrypt.hashSync(password, 14);
      let user = new User({
        username: username,
        password: hash
      });
      user.save(err => {
        if (err) {
          console.log(`Something bad happened! Please try again! Here's the error:\n====================\n${err}
          `);
        } else {
          console.log(user);
        }
      });
    } else {
      console.log(
        "try again and provide a username as the first argument and a password as the second argument"
      );
    }
  })
  .catch(err => console.log(err));

// app.listen(port, () => {
//   console.log(`Running on Port ${port}`);
// });

// store public key to server

// allow client to sign a message with private key

// allow submission of signed message to server to verify signature

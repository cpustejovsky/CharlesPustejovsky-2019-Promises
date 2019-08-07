const Express = require("express");
const app = Express();
const mongoose = require("mongoose");

let port = (process.env.PORT = 3000);

mongoose
  .connect("mongodb://localhost:27017/CharlesPustejovsky-2019")
  .then(() => console.log("connected to database"))
  .catch(err => console.log(err));

app.listen(port, () => console.log(`Running on Port ${port}`));

// authenticate to server with a password: ability to set password for user via argument when starting server

// store public key to server

// allow client to sign a message with private key

// allow submission of signed message to server to verify signature

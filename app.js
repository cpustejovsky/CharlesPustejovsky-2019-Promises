const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//SETUP
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//ROUTES
const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

//Connest DB and Start Server
mongoose
  .set("useCreateIndex", true)
  .set("useNewUrlParser", true)
  .connect("mongodb://localhost:27017/CharlesPustejovsky-2019-v2")
  .then(() => {
    console.log("database connected");
    app
      .listen(port, () => {
        console.log(`Running on port ${port}`);
      })
      /* Small thing I started doing since I often have two local projects running at the same time.*/
      .on("error", () => {
        app.listen(port + 1, () => {
          console.log(`Running on port ${port}`);
        });
      });
  })
  .catch(err => {
    logErrorAndExit(err);
  });

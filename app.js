const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

//SETUP
app.set("view engine", "ejs");

const logErrorAndExit = errMsg => {
  console.log(errMsg);
  //I have the `process.exit()`s all over to make sure the file closes out either because of error or because it's finished running so this could be broken up with a couple of files
  process.exit(1);
};

//ROUTES
const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

//Connest DB and Start Server
mongoose
  .set("useCreateIndex", true)
  .set("useNewUrlParser", true)
  .connect("mongodb://localhost:27017/CharlesPustejovsky-2019-Promises")
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

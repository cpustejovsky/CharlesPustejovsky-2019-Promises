const Express = require("express");
const app = Express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/keys", (req, res) => {
  res.render("keys");
});

app
  .listen(port, () => {
    console.log(`Running on port ${port}`);
  })
  .on("error", () => {
    app.listen(port + 1, () => {
      console.log(`Running on port ${port}`);
    });
  });

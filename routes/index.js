const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Authentication = require("../middleware/authentication");

router.get("/", (req, res) => {
  res.render("index");
});

//USER SIGN UP
router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", (req, res) => {
  Authentication.registerUser(req.body.username, req.body.password);
  res.send("IT'S SECRET TO EVERYBODY");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/keys", (req, res) => {
  res.render("keys");
});

module.exports = router;

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
  console.log(req.body.user.username);
  console.log(req.body.user.password);
  Authentication.registerUser(req.body.user.username, req.body.user.password);
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/keys", (req, res) => {
  res.render("keys");
});

module.exports = router;

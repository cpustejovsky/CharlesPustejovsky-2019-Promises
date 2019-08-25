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
  Authentication.registerUser(req.body.user.username, req.body.user.password);
  res.redirect("/keys");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/keys", Authentication.authenticateUser, (req, res) => {
  res.render("keys");
});

module.exports = router;

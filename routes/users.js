const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = await User.find();
  res.send(user);
});

router.post("/", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  await user.save();
  res.send(user);
});

module.exports = router;

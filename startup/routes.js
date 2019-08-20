const express = require("express");
const users = require("../routes/users");
const subjects = require("../routes/subjects");
const teachers = require("../routes/teachers");
const aspects = require("../routes/aspects");
const assessments = require("../routes/assessments");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/subjects", subjects);
  app.use("/api/teachers", teachers);
  app.use("/api/aspects", aspects);
  app.use("/api/assessments", assessments);
  app.get("/", (req, res) => {
    res.send("Hani Putri");
  });
  app.use(error);
};

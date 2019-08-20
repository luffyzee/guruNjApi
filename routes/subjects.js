const validateObjectId = require("../middleware/validateObjectId");
const { Subject, validate } = require("../models/subject");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const subjects = await Subject.find().sort("name");
  res.send(subjects);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let subject = await Subject.findOne({ name: req.body.name });
  if (subject) return res.status(400).send("Subject already registered.");

  subject = new Subject({ name: req.body.name });
  await subject.save();

  res.send(subject);
});

router.put("/:id", validateObjectId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let subject = await Subject.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name
    },
    { new: true }
  );
  if (!subject) return res.status(404).send("Subject not found.");

  res.send(subject);
});

router.delete("/:id", validateObjectId, async (req, res) => {
  const subject = await Subject.findByIdAndDelete(req.params.id);

  if (!subject) return res.status(404).send("Subject not found.");

  res.send(subject);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) return res.status(404).send("Subject not found");

  res.send(subject);
});

module.exports = router;

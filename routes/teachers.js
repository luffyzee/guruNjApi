const validateObjectId = require("../middleware/validateObjectId");
const { Teacher, validate } = require("../models/teacher");
const { Subject } = require("../models/subject");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const teachers = await Teacher.find().sort("name");
  res.send(teachers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const subject = await Subject.findById(req.body.subjectId);
  if (!subject) return res.status(400).send("Invalid subject.");

  let teacher = await Teacher.findOne({ name: req.body.name });
  if (teacher) return res.status(400).send("Teacher already registered");

  teacher = new Teacher({
    name: req.body.name,
    nik: req.body.nik,
    subject: {
      _id: subject._id,
      name: subject.name
    }
  });

  await teacher.save();

  res.send(teacher);
});

router.put("/:id", validateObjectId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const subject = await Subject.findById(req.body.subjectId);
  if (!subject) return res.status(400).send("Invalid subject.");

  let teacher = await Teacher.findOne({ name: req.body.name });
  if (teacher) return res.status(400).send("Teacher already registered");

  teacher = await Teacher.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      nik: req.body.nik,
      subject: {
        _id: subject._id,
        name: subject.name
      }
    },
    { new: true }
  );

  if (!teacher) return res.status(404).send("Teacher not found");

  res.send(teacher);
});

router.delete("/:id", validateObjectId, async (req, res) => {
  const teacher = await Teacher.findByIdAndDelete(req.params.id);
  if (!teacher) res.status(404).send("Teacher not found");

  res.send(teacher);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) return res.status(404).send("Teacher not found");

  res.send(teacher);
});

module.exports = router;

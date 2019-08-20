const auth = require("../middleware/auth");
const { Teacher } = require("../models/teacher");
const { Aspect } = require("../models/aspect");
const { Assessment, validate } = require("../models/assessment");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const assessments = await Assessment.find()
    .populate("aspects")
    .select("aspects");
  res.send(assessments);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const teacher = await Teacher.findById(req.body.teacherId);
  if (!teacher) return res.status(400).send("Invalid teacher.");

  //let aspect = await Aspect.find();
  //if (!aspect) return res.status(400).send("Invalid aspect.");

  let assessment = new Assessment({
    teacher: {
      _id: teacher._id,
      name: teacher.name,
      nik: teacher.nik,
      subject: teacher.subject
    },
    aspects: req.body.aspects,
    value: req.body.value,
    evaluation: req.body.evaluation
  });

  await assessment.save();
  res.send(assessment);
});

module.exports = router;

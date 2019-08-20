const validateObjectId = require("../middleware/validateObjectId");
const { Aspect, validate } = require("../models/aspect");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const aspects = await Aspect.find().sort("sub");
  res.send(aspects);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const aspect = new Aspect({
    name: req.body.name,
    sub: req.body.sub,
    value: req.body.value
  });

  await aspect.save();

  res.send(aspect);
});

router.delete("/:id", validateObjectId, async (req, res) => {
  const aspect = await Aspect.findByIdAndDelete(req.params.id);
  if (!aspect) return res.status(404).send("Aspect not found.");

  res.send(aspect);
});
module.exports = router;

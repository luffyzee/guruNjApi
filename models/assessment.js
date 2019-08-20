const { Aspect } = require("./aspect");
const { teacherSchema } = require("./teacher");
const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema({
  teacher: { type: teacherSchema, required: true },
  aspects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Aspect" }],
  value: [Number],
  evaluation: { type: String, minlength: 1, maxlength: 255, required: true },
  date: { type: Date, default: Date.now, required: true }
});

const Assessment = new mongoose.model("Assessment", assessmentSchema);

function validateAssessment(assessment) {
  const schema = {
    teacherId: Joi.objectId().required(),
    aspects: Joi.required(),
    value: Joi.required(),
    evaluation: Joi.string().required()
  };
  return Joi.validate(assessment, schema);
}

exports.Assessment = Assessment;
exports.validate = validateAssessment;

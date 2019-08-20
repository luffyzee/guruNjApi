const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true
  }
});

const Subject = new mongoose.model("Subject", subjectSchema);

function validateSubject(subject) {
  const schema = {
    name: Joi.string()
      .max(50)
      .required()
  };
  return Joi.validate(subject, schema);
}

exports.subjectSchema = subjectSchema;
exports.Subject = Subject;
exports.validate = validateSubject;

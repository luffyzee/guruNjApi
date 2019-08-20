const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const { subjectSchema } = require("./subject");

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true
  },
  subject: {
    type: subjectSchema,
    required: true
  },
  nik: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true
  }
});

const Teacher = mongoose.model("Teacher", teacherSchema);

function validateTeacher(teacher) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(50)
      .required(),
    subjectId: Joi.objectId().required(),
    nik: Joi.string()
      .min(1)
      .max(50)
      .required()
  };
  return Joi.validate(teacher, schema);
}

exports.teacherSchema = teacherSchema;
exports.Teacher = Teacher;
exports.validate = validateTeacher;

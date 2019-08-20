const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

aspectSchema = new mongoose.Schema({
  name: { type: String, minlength: 1, maxlength: 50, required: true },
  sub: { type: String, minlength: 1, maxlength: 255, required: true },
  value: { type: Number }
});

const Aspect = new mongoose.model("Aspect", aspectSchema);

function validateAspect(aspect) {
  const schema = {
    name: Joi.string()
      .min(1)
      .max(50)
      .required(),
    sub: Joi.string()
      .min(1)
      .max(255)
      .required()
  };
  return Joi.validate(aspect, schema);
}

exports.aspectSchema = aspectSchema;
exports.Aspect = Aspect;
exports.validate = validateAspect;

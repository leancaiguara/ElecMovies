const Joi = require("joi");

const joiSchema = Joi.object({
  username: Joi.string().min(3).max(25),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{4,25}$")),
});

module.exports = joiSchema;

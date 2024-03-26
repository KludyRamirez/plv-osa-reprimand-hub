const Joi = require("joi");

// backend validation middleware

const registerValidator = Joi.object({
  username: Joi.string().min(3).max(24).required(),
  firstname: Joi.string().min(3).max(24).required(),
  lastname: Joi.string().min(3).max(24).required(),
  password: Joi.string().min(6).max(24).required(),
  role: Joi.string(),
});

const loginValidator = Joi.object({
  username: Joi.string().min(3).max(24).required(),
  password: Joi.string().min(6).max(24).required(),
});

module.exports = { registerValidator, loginValidator };

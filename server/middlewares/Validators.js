const Joi = require("joi");

const registerValidator = Joi.object({
  username: Joi.string().min(3).max(24).required(),
  firstname: Joi.string().min(3).max(24).required(),
  lastname: Joi.string().min(3).max(24).required(),
  password: Joi.string().min(8).max(48).required(),
  role: Joi.string(),
});

const loginValidator = Joi.object({
  userName: Joi.string().min(3).max(48).required(),
  password: Joi.string().min(1).max(48).required(),
});

const forgotValidator = Joi.object({
  email: Joi.string().email().max(64).required(),
});

const resetValidator = Joi.object({
  password: Joi.string().min(8).max(48).required(),
});

const changePasswordValidator = Joi.object({
  password: Joi.string().min(8).max(48).required(),
});

const changeEmailValidator = Joi.object({
  email: Joi.string().email().max(64).required(),
});

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { allowUnknown: false });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    next();
  };
};

module.exports = {
  registerValidator,
  loginValidator,
  forgotValidator,
  resetValidator,
  changePasswordValidator,
  changeEmailValidator,
  validate,
};

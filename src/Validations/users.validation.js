const Joi = require("joi");

const userCreate = {
  body: Joi.object({
    email: Joi.string().email().required().trim().lowercase(),
    username: Joi.string().required().trim(),
    phone_number: Joi.string().required().trim(),
    date_of_birth: Joi.date().required(),
    address: Joi.string().required().trim(),
    role: Joi.number().required(),
    password: Joi.string().required().trim().min(6),
    confirm_password: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .options({
        messages: { "any.only": "Confirm password not match with password" },
      }),
  }),
};
const userUpdate = {
  body: Joi.object({
    email: Joi.string().email().required().trim().lowercase(),
    username: Joi.string().required().trim(),
  }),
};

const login = {
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  }),
};

module.exports = {
  userCreate,
  userUpdate,
  login,
};

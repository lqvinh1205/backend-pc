const Joi = require("joi");

const userCreate = {
  body: Joi.object({
    email: Joi.string().email().required().trim().lowercase(),
    username: Joi.string().required().trim(),
    password: Joi.string().trim(),
    phone_number: Joi.string().required().trim(),
    date_of_birth: Joi.date().required(),
    address: Joi.string().required().trim(),
    role: Joi.number(),
  }),
};
const userUpdate = {
  body: Joi.object({
    id: Joi.string().required(),
    email: Joi.string().email().required().trim().lowercase(),
    username: Joi.string().required().trim(),
    phone_number: Joi.string().required().trim(),
    date_of_birth: Joi.date().required(),
    address: Joi.string().required().trim(),
    role: Joi.number().required(),
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

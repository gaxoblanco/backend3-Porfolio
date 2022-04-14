const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().max(10);
const description = Joi.string().max(30);
const image = Joi.string();

const createValidator = Joi.object({
  name: name.required(),
  description: description.required(),
  image: image.required(),
});

const updateValidator = Joi.object({
  name: name,
  description: description,
  image: image,
});

const idValidator = Joi.object({
  id: id.required(),
});

module.exports = {createValidator, updateValidator, idValidator}

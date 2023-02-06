const Joi = require('joi');

const schemas = Joi.object({
  id: Joi.number().integer().required(),
});

module.exports = schemas;
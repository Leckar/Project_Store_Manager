const Joi = require('joi');

const idSchema = Joi.object({
  id: Joi.number().integer().required(),
});

const nameSchema = Joi.object({
  name: Joi.string().min(5).required(),
}).messages({
  'string.required': '"name" is required', // O aluno Rafael França da turma 23 B me ensinou a fazer esse tipo de mensagem customizada.
  'string.min': '"name" length must be at least 5 characters long',
});

module.exports = {
  idSchema,
  nameSchema,
};
const Joi = require('joi');

const idSchema = Joi.object({
  id: Joi.number().integer().required(),
});

const nameSchema = Joi.object({
  name: Joi.string().min(5).required(),
}).messages({ // O aluno Rafael França da turma 23 B me ensinou a fazer esse tipo de mensagem customizada.
  'string.required': '"name" is required',
  'string.min': '"name" length must be at least 5 characters long',
});

const quantitySchema = Joi.object({
  quantity: Joi.number().integer().positive().min(1)
    .required(),
}).messages({ // O aluno Rafael França da turma 23 B me ensinou a fazer esse tipo de mensagem customizada.
  'number.positive': '"quantity" must be greater than or equal to 1',
  'number.min': '"quantity" must be greater than or equal to 1', 
});

module.exports = {
  idSchema,
  nameSchema,
  quantitySchema,
};
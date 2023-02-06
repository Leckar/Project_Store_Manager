const { httpStatuses } = require('../../utils/httpStatuses');
const { quantitySchema } = require('./schemas');

const { UNPROCESSABLE_ENTITY: type } = httpStatuses;

module.exports = (quantity) => {
  const { error } = quantitySchema.validate({ quantity });
  if (error) return { type, message: error.details[0].message };
  return { type: null, message: '' };
};
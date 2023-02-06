const { httpStatuses } = require('../../utils/httpStatuses');
const { nameSchema } = require('./schemas');

const { UNPROCESSABLE_ENTITY } = httpStatuses;

module.exports = (name) => {
  const { error } = nameSchema.validate({ name });
  if (error && error.details[0].type === 'string.min') {
    return { type: UNPROCESSABLE_ENTITY, message: error.details[0].message };
  }
  return { type: null, message: '' };
};
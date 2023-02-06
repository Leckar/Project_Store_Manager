const { idSchema } = require('./schemas');

module.exports = (id) => { 
  const num = Number(id);
  const { error } = idSchema.validate({ id: num });
  if (error) return { type: 'NOT_FOUND_STATUS', message: 'Product not found' };
  return { type: null, message: '' };
};
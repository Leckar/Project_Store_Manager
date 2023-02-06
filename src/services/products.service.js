const { productsModels } = require('../models');
const validateId = require('./validations/validateId');

const listAll = async () => {
  const result = await productsModels.listAll();
  if (!result) return { type: 'NOT_FOUND_STATUS', message: 'Product not found' };
  return { type: null, message: result };
};

const listById = async (id) => {
  const err = validateId(id);
  if (err.type) return err;
  const result = await productsModels.listById(id);
  if (!result) return { type: 'NOT_FOUND_STATUS', message: 'Product not found' };
  return { type: null, message: result };
};
 
module.exports = {
  listAll,
  listById,
};
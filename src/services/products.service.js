const { productsModels } = require('../models');

const listAll = async () => {
  const result = await productsModels.listAll();
  if (!result) return { type: 'NOT_FOUND_STATUS', message: 'Product not found' };
  return { type: null, message: result };
};
 
module.exports = {
  listAll,
};
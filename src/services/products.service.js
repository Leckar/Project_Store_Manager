const { productsModels } = require('../models');
const validateId = require('./validations/validateId');
const validateName = require('./validations/validateName');

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

const insertProduct = async (data) => {
  const err = validateName(data);
  if (err.type) return err;
  const id = await productsModels.insertNew(data);
  const result = await productsModels.listById(id);
  return { type: null, message: result };
};

const updateProduct = async (id, name) => {
  const err = validateName(name);
  if (err.type) return err;
  const checkIds = await productsModels.listById(id);
  if (!checkIds) {
    return { type: 'NOT_FOUND_STATUS', message: 'Product not found' };
  }
  await productsModels.updateById(id, name);
  const result = await productsModels.listById(id);
  return { type: null, message: result };
};

const removeProduct = async (id) => {
  const checkIds = await productsModels.listById(id);
  if (!checkIds) {
    return { type: 'NOT_FOUND_STATUS', message: 'Product not found' };
  }
  await productsModels.deleteById(id);
  return { type: null, message: '' };
};
 
module.exports = {
  listAll,
  listById,
  insertProduct,
  updateProduct,
  removeProduct,
};
const { salesModels, productsModels } = require('../models');
const { httpStatuses } = require('../utils/httpStatuses');
const validateQuantity = require('./validations/validateQuantity');

const { NOT_FOUND_STATUS } = httpStatuses;

const checkSalesId = async (data) => {
  const list = await productsModels.listAll();
  const valid = data.every(({ productId }) => list.every(({ id }) => id === productId));
  if (!valid) return false;
  return true;
};

const insertSale = async (data) => {
  // console.log('service', data);
  if (await checkSalesId(data)) {
    return { type: NOT_FOUND_STATUS, message: 'Product not found' };
  }
  let check;
  data.forEach(({ quantity }) => {
    const err = validateQuantity(quantity);
    if (err.type) check = err;
  });
  if (check) {
    return check;
  }  
  console.log('validated');
  const id = await salesModels.insertNew(data);
  const message = {
    id,
    itemsSold: data,
  };

  return { type: null, message };
};

module.exports = {
  insertSale,
};
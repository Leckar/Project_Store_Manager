const { salesModels, productsModels } = require('../models');
const { httpStatuses } = require('../utils/httpStatuses');
const validateQuantity = require('./validations/validateQuantity');

const { NOT_FOUND_STATUS } = httpStatuses;

const checkSalesId = async (data) => {
  const list = await productsModels.listAllById();
  const check = data.map(({ productId }) => list.some(({ id }) => id === productId));
  if (check.every((e) => e)) return true;
  return false;
};

const insertSale = async (data) => {
  let check;
  data.forEach(({ quantity }) => {
    const err = validateQuantity(quantity);
    if (err.type) check = err;
  });
  if (check) {
    return check;
  }
  const checkIds = await checkSalesId(data);
  if (!checkIds) {
    return { type: NOT_FOUND_STATUS, message: 'Product not found' };
  }
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
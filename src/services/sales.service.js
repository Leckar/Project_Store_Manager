const { salesModels } = require('../models');

const insertSale = async (data) => {
  const id = await salesModels.insertNew(data);
  const obj = {
    id,
    itemsSold: data,
  };
  return obj;
};

module.exports = {
  insertSale,
};
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

const salesListFormatter = ({ sales, products }) => {
  const salesList = [...sales];
  const prodList = [...products];
  const arr = [];
  salesList.forEach(({ id, date }) => {
    prodList.forEach((e) => {
      if (id === e.sale_id) {
        arr.push({
          saleId: id,
          date: `${date}`,
          productId: e.product_id,
          quantity: e.quantity,
        });
      }
    });
  });
  return arr;
};

const listAll = async () => { 
  const result = await salesModels.listAll();
  const newList = salesListFormatter(result);
  return { type: null, message: newList };
};
const saleListFormatter = ({ sale, products }) => {
  const prodList = [...products];
  const arr = prodList.map((e) => (
    { date: `${sale.date}`,
      productId: e.product_id,
      quantity: e.quantity,
    }
  ));
  return arr;
};
const listSaleById = async (id) => {
  const sale = await salesModels.listById(Number(id));
  if (!sale) return { type: NOT_FOUND_STATUS, message: 'Sale not found' };
  const products = await salesModels.listProductSaleById(Number(id));
  const newList = saleListFormatter({ sale, products });
  return { type: null, message: newList };
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
  listAll,
  listSaleById,
};
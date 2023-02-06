const { salesModels, productsModels } = require('../models');
const { httpStatuses } = require('../utils/httpStatuses');
const validateQuantity = require('./validations/validateQuantity');

const { NOT_FOUND_STATUS } = httpStatuses;

const checkSalesId = async (data) => {
  const list = await productsModels.listAllById();
  const check = data.map(({ productId }) => list.some(({ id }) => id === productId));
  if (check.every((e) => e)) return { type: null, message: '' };
  return { type: NOT_FOUND_STATUS, message: 'Product not found' };
};

const salesListFormatter = (data) => {
  const { sales, products } = data;
  const arr = [];
  sales.forEach(({ id, date }) => {
    products.forEach((e) => {
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
  if (checkIds.type) {
    return checkIds;
  }
  const id = await salesModels.insertNew(data);
  const message = {
    id,
    itemsSold: data,
  };

  return { type: null, message };
};

const deleteSale = async (data) => {
  const checkId = await salesModels.listById(data);
  if (!checkId) {
    return { type: NOT_FOUND_STATUS, message: 'Sale not found' };
  }
  await salesModels.deleteSale(data);
  return { type: null, message: '' };
};

const updateSale = async (saleId, itemsUpdated) => {
  let check;
  itemsUpdated.forEach(({ quantity }) => {
    const err = validateQuantity(quantity);
    if (err.type) check = err;
  });
  if (check) {
    return check;
  }
  const checkIds = await checkSalesId(itemsUpdated);
  if (checkIds.type) {
    return checkIds;
  }
  const checkSaleId = await salesModels.listById(saleId);
  if (!checkSaleId) {
    return { type: NOT_FOUND_STATUS, message: 'Sale not found' };
  }
  await salesModels.updateById(saleId, itemsUpdated);
  return { type: null, message: { saleId, itemsUpdated } };
};

module.exports = {
  insertSale,
  listAll,
  listSaleById,
  deleteSale,
  updateSale,
};
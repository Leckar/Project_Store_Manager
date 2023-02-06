const { productsServices } = require('../services');
const { statMatch } = require('../utils/httpStatuses');

const listProducts = async (_req, res) => {
  const { type, message } = await productsServices.listAll();
  if (type) return res.status(statMatch(type)).json(message);
  res.status(200).json(message);
};

module.exports = {
  listProducts,
};
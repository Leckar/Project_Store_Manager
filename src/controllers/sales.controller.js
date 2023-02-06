const { salesServices } = require('../services');

const newSale = async (req, res) => {
  const { body } = req;
  const { type, message } = await salesServices.insertSale(body);
  if (type) return res.status(type).json({ message });
  res.status(201).json(message);
};

module.exports = {
  newSale,
};
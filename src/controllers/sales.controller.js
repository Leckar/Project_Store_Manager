const { salesServices } = require('../services');

const listSales = async (_req, res) => { 
  const { type, message } = await salesServices.listAll();
  console.log(message);
  if (type) return res.status(type).json(message);
  res.status(200).json(message);
};

const newSale = async (req, res) => {
  const { body } = req;
  const { type, message } = await salesServices.insertSale(body);
  if (type) return res.status(type).json({ message });
  res.status(201).json(message);
};

module.exports = {
  listSales,
  newSale,
};
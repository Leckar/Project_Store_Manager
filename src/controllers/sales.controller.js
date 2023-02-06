const { salesServices } = require('../services');

const listSales = async (_req, res) => { 
  const { type, message } = await salesServices.listAll();
  if (type) return res.status(type).json(message);
  res.status(200).json(message);
};

const listTargetSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.listSaleById(id);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const newSale = async (req, res) => {
  const { body } = req;
  const { type, message } = await salesServices.insertSale(body);
  if (type) return res.status(type).json({ message });
  res.status(201).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.deleteSale(id);
  if (type) return res.status(type).json({ message });
  res.status(204).end();
};

const updateSale = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const { type, message } = await salesServices.updateSale(id, body);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

module.exports = {
  listSales,
  listTargetSale,
  newSale,
  deleteSale,
  updateSale,
};
const { productsServices } = require('../services');

const listProducts = async (_req, res) => {
  const { type, message } = await productsServices.listAll();
  if (type) return res.status(type).json(message);
  res.status(200).json(message);
};

const searchProducts = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    const { type, message } = await productsServices.listAll();
    if (type) return res.status(type).json(message);
    return res.status(200).json(message);
  }
  const { type, message } = await productsServices.listByName(q);
  if (type) return res.status(type).json(message);
  return res.status(200).json(message);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.listById(id);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsServices.insertProduct(name);
  if (type) return res.status(type).json({ message });
  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsServices.updateProduct(id, name);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.removeProduct(id);
  if (type) return res.status(type).json({ message });
  res.status(204).end();
};

module.exports = {
  listProducts,
  searchProducts,
  listProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
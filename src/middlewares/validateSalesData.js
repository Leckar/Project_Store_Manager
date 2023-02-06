const { httpStatuses } = require('../utils/httpStatuses');

const { BAD_REQUEST_STATUS } = httpStatuses;

const validateProdId = (req, res, next) => {
  const data = req.body;
  const message = '"productId" is required';
  let check = true;
  data.forEach(({ productId }) => {
  if (!productId) check = false;
  });
  if (!check) return res.status(BAD_REQUEST_STATUS).json({ message });
  next();
};

const validateQuantityParam = (req, res, next) => {
  const data = req.body;
  const message = '"quantity" is required';
  let check = true;
  data.forEach(({ quantity }) => {
    if (!quantity) check = false;
  });
  if (!check) return res.status(BAD_REQUEST_STATUS).json({ message });
  next();
};

module.exports = {
  validateProdId,
  validateQuantityParam,
};
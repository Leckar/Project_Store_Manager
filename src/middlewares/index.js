const validateName = require('./validateName');
const { validateProdId, validateQuantityParam } = require('./validateSalesData');

module.exports = {
  validateName,
  validateProdId,
  validateQuantityParam,
};
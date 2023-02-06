const express = require('express');
const { salesControllers } = require('../controllers');
const { validateProdId, validateQuantityParam } = require('../middlewares');

const router = express.Router();

router.get('/', salesControllers.listSales);
router.get('/:id', salesControllers.listTargetSale);
router.post('/', validateProdId,
  validateQuantityParam,
  salesControllers.newSale);

module.exports = router;
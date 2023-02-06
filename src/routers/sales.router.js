const express = require('express');
const { salesControllers } = require('../controllers');
const { validateProdId, validateQuantityParam } = require('../middlewares');

const router = express.Router();

router.get('/', salesControllers.listSales);
router.post('/', validateProdId,
validateQuantityParam,
salesControllers.newSale);
router.get('/:id', salesControllers.listTargetSale);
router.put('/:id', validateProdId,
  validateQuantityParam,
  salesControllers.updateSale);
router.delete('/:id', salesControllers.deleteSale);

module.exports = router;
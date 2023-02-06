const express = require('express');
const { productsControllers } = require('../controllers');
const { validateName } = require('../middlewares');

const router = express.Router();

router.get('/', productsControllers.listProducts);
router.get('/:id', productsControllers.listProductById);
router.post('/',
  validateName,
  productsControllers.createProduct);
router.put('/:id',
  validateName,
  productsControllers.updateProduct);

module.exports = router;
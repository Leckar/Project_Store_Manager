const express = require('express');
const { productsControllers } = require('../controllers');

const router = express.Router();

router.get('/', productsControllers.listProducts);
router.get('/:id', productsControllers.listProductById);

module.exports = router;
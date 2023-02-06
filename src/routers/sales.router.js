const express = require('express');
const { salesControllers } = require('../controllers');

const router = express.Router();

router.post('/', salesControllers.newSale);

module.exports = router;
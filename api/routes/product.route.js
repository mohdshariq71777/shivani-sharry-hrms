const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Define routes using the controller methods
router.post('/add-product', productController.addProduct);

module.exports = router;
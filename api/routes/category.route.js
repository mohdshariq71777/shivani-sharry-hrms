const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// Define routes using the controller methods
router.post('/product-group-category', categoryController.addGroupCategory);
router.post('/product-type-category', categoryController.addTypeCategory);
router.post('/product-category', categoryController.addCategory);

module.exports = router;
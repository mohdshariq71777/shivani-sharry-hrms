const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
// Define routes using the controller methods
// Hello shivani ji, kesi ho? UPSC ki tayyari thik chalrhi he? bas bas ab kam muskurao..zada cute na lago.. kaam pe dihan do
router.get('/get-group-category-active-products', productController.getGroupCategoryActiveProducts);

module.exports = router;
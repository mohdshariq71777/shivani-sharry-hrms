const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
// Define routes using the controller methods
// Hello shivani ji, kesi ho? UPSC ki tayyari thik chalrhi he? bas bas ab kam muskurao..zada cute na lago.. kaam pe dihan do
router.get('/get-group-category-active-products', productController.getGroupCategoryActiveProducts);
router.get('/get-product-by-mapping', productController.getProductByMapping);
router.get('/get-active-group-category', productController.getActiveGroupCategory);
router.get('/get-active-type-category', productController.getActiveTypeCategory);
router.get('/get-active-category', productController.getActiveCategory);
router.get('/get-active-products', productController.getActiveProducts);
router.get('/get-active-product-by-id', productController.getActiveProductById);
module.exports = router;
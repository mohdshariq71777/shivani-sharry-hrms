const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { upload } = require('../middlewares/fileupload')
// Define routes using the controller methods
// Hello shivani ji, kesi ho? UPSC ki tayyari thik chalrhi he? bas bas ab kam muskurao..zada cute na lago.. kaam pe dihan do
router.post('/add-product', productController.addProduct);
router.post('/add-product-images', upload.single('file'), productController.addProductImages);
router.get('/get-all-active-products', productController.getAllActiveProducts);
router.get('/get-group-category-active-products', productController.getGroupCategoryActiveProducts);

module.exports = router;
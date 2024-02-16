const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { upload } = require('../middlewares/fileupload')
// Define routes using the controller methods
router.post('/add-product', productController.addProduct);
router.post('/add-product-images',upload.single('file'), productController.addProductImages);

module.exports = router;
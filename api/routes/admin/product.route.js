const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/product.controller');
const { upload } = require('../../middlewares/fileupload')
// Define routes using the controller methods
// Hello shivani ji, kesi ho? UPSC ki tayyari thik chalrhi he? bas bas ab kam muskurao..zada cute na lago.. kaam pe dihan do
router.post('/admin/add-product', productController.addProduct);
router.post('/admin/add-product-images', upload.single('file'), productController.addProductImages);
router.get('/admin/get-all-active-products', productController.getAllActiveProducts);

module.exports = router;
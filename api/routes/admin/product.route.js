const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/product.controller');
const { upload } = require('../../middlewares/fileupload')
// Define routes using the controller methods
// Hello shivani ji, kesi ho? UPSC ki tayyari thik chalrhi he? bas bas ab kam muskurao..zada cute na lago.. kaam pe dihan do
router.post('/admin/add-product', upload.array('files', 10), productController.addProduct);
router.post('/admin/add-product-images', upload.single('file'), productController.addProductImages);
router.get('/admin/get-all-products', productController.getAllProducts);
router.get('/admin/get-product-by-id/:id', productController.getProductById);
router.delete('/admin/delete-product/:id', productController.deleteProduct);

module.exports = router;
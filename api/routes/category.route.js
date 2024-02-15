const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// Define routes using the controller methods
router.post('/add-group-category', categoryController.addGroupCategory);
router.get('/get-group-category',categoryController.getAllGroupCategory)
router.post('/add-type-category', categoryController.addTypeCategory);
router.get('/get-type-category',categoryController.getAllTypeCategory)
router.post('/add-category', categoryController.addCategory);
router.get('/get-category', categoryController.getAllCategory);

module.exports = router;
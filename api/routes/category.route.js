const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// Define routes using the controller methods
router.post('/add-group-category', categoryController.addGroupCategory);
router.post('/add-type-category', categoryController.addTypeCategory);
router.post('/add-category', categoryController.addCategory);

module.exports = router;
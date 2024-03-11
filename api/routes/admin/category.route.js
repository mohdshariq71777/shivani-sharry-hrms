const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/admin/category.controller');

// Define routes using the controller methods
router.post('/admin/add-group-category', categoryController.addGroupCategory);
router.get('/admin/get-group-category', categoryController.getAllGroupCategory);
router.get('/admin/get-active-group-category', categoryController.getActiveGroupCategory);
router.post('/admin/add-type-category', categoryController.addTypeCategory);
router.get('/admin/get-type-category', categoryController.getAllTypeCategory)
router.get('/admin/get-active-type-category', categoryController.getActiveTypeCategory)
router.post('/admin/add-category', categoryController.addCategory);
router.get('/admin/get-category', categoryController.getAllCategory);
router.get('/admin/get-active-category', categoryController.getActiveCategory);

module.exports = router;
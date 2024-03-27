const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/admin/category.controller');

// Define routes using the controller methods
router.post('/admin/add-group-category', categoryController.addGroupCategory);
router.get('/admin/get-group-categories', categoryController.getAllGroupCategories);
router.get('/admin/get-filtered-group-categories', categoryController.getFilteredGroupCategories);
router.get('/admin/get-active-group-categories', categoryController.getActiveGroupCategories);
router.get('/admin/get-group-category/:id', categoryController.getGroupCategoryById);
router.put('/admin/update-group-category/:id', categoryController.updateGroupCategory);
router.delete('/admin/delete-group-category/:id', categoryController.deleteGroupCategory);
router.post('/admin/add-type-category', categoryController.addTypeCategory);
router.get('/admin/get-type-categories', categoryController.getAllTypeCategories)
router.get('/admin/get-filtered-type-categories', categoryController.getFilteredTypeCategories);
router.get('/admin/get-active-type-categories', categoryController.getActiveTypeCategories)
router.get('/admin/get-type-category/:id', categoryController.getTypeCategoryById);
router.put('/admin/update-type-category/:id', categoryController.updateTypeCategory);
router.get('/admin/get-filtered-categories', categoryController.getFilteredCategories);
router.delete('/admin/delete-type-category/:id', categoryController.deleteTypeCategory);
router.post('/admin/add-category', categoryController.addCategory);
router.get('/admin/get-categories', categoryController.getAllCategories);
router.get('/admin/get-category/:id', categoryController.getCategoryById);
router.get('/admin/get-active-categories', categoryController.getActiveCategories);
router.put('/admin/update-category/:id', categoryController.updateCategory);
router.delete('/admin/delete-category/:id', categoryController.deleteCategory);

module.exports = router;
const express = require('express');
const router = express.Router();
const loginController = require('../../controllers/admin/login.controller');
router.post('/admin/login', loginController.adminLogin);
module.exports = router;
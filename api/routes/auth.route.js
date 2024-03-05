const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
router.post('/login', authController.userLogin);
router.post('/signup', authController.userSignup);
router.post('/check-email', authController.checkEmail);
module.exports = router;
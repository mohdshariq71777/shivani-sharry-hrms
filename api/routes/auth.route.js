const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
// jwt.sign()
router.post('/login', authController.userLogin);
module.exports = router;

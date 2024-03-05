var express = require('express');
var router = express.Router();
const otpController = require('../controllers/sendOtp.controller');
router.post('/sendmail', otpController.sendMail)
// router.post('/sendsms', otpController.sendSms)
router.post('/newPassword', (req, res, next) => {
    res.json({ message: 'Haala Looya' })
})
module.exports = router;
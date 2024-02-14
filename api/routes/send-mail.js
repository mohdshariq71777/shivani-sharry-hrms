var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const db = require('../dbconfig/database')
router.post('/', async (req, res, next) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'mohd.shariq.humanitics@gmail.com',
            pass: 'yiwgagayiktxsfao'
        }
    });
    const random_otp = Math.floor(100000 + Math.random() * 900000);
    // Setup email data
    let mailOptions = {
        from: '"Shariq Khan" <9136563551aA>', // sender address
        to: `${req.body.email_id}`, // list of receivers
        subject: 'Hello from Nodemailer', // Subject line
        text: 'Rakhde ise batli!', // plain text body
        html: `<span>Enter the OTP ${random_otp} to change your password</span>` // html body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).json({ otp: random_otp })
    });
})
router.post('/newPassword', (req, res, next) => {
    // db.query(`Update employees set password=${req.body.new_password}`)
    console.log(req.body.new_password);
    res.json({ message: 'Haala Looya' })
})
module.exports = router;
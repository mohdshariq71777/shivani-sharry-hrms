const nodemailer = require('nodemailer');
// const { Vonage } = require('@vonage/server-sdk')

// const vonage = new Vonage({
//     apiKey: "483ef15f",
//     apiSecret: "E8chgczpThcbavOa"
// })

module.exports = {
    sendMail: async (req, res, next) => {
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
            subject: 'This is to verify your email on bloomcraft', // Subject line
            text: 'Please use this code to verify your email address', // plain text body
            html: `<span>Enter the OTP ${random_otp} to change your password</span>` // html body
        };
        // Send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            res.status(200).json({ otp: random_otp })
        });
    },
    // sendSms: async (req, res, next) => {
    //     const random_otp = Math.floor(100000 + Math.random() * 900000);
    //     const from = "Vonage APIs"
    //     const to = `91${req.body.phone}`;
    //     const text = `Hey there,
    //     Thank you for registering with BloomCraft! Your One-Time Password (OTP) for account verification is: ${random_otp}.
    //     Please enter this OTP on the registration page to complete your account setup.
    //     If you have any questions or need assistance, feel free to contact our support team.
    //     Best regards,
    //     Bloomcraft Team`

    //     async function sendSMS() {
    //         await vonage.sms.send({ to, from, text })
    //             .then(resp => {
    //                 console.log('Message sent successfully');
    //                 console.log(resp);
    //                 res.status(200).json({ otp: random_otp })
    //             })
    //             .catch(err => {
    //                 console.log('There was an error sending the messages.');
    //                 console.error(err);
    //             });
    //     }

    //     sendSMS();
    // }
}   
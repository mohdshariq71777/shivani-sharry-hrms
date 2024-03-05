const db = require('./../../dbconfig/database');
const jwt = require('jsonwebtoken');
const adminLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(`Select name,email,phone,password from admin where email='${email}'`, (err, result, fields) => {
        if (err) {
            return res.status(401).json({ status: 401, message: 'Please enter the correct email!' });
        }
        if (!result[0]) {
            return res.status(401).json({ status: 401, message: 'Please enter the correct email!' });
        }

        if (result[0].password === password) {
            const loggedAdmin = {
                email: result[0].email,
                name: result[0].name,
                phone: result[0].phone
            }
            token = jwt.sign(
                { adminEmail: loggedAdmin.email },
                'this_should_be_long',
                { expiresIn: '1hr' }
            );
            res.status(200).json({
                token: token,
                status: 200,
                expiresIn: 3600,
                adminName: loggedAdmin.name
            })
        }
        else {
            res.status(401).json({ status: 401, message: 'Please enter the correct password!' });
        }
    });
}
module.exports = { adminLogin };

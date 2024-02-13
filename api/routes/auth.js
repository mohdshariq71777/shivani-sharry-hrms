var express = require('express');
var router = express.Router();
const db = require('./../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// jwt.sign()
router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(`Select emp_id, name, email, gender, designation, address, phone, department, joining_date, dob,password from employees where email='${email}'`, (err, result, fields) => {
        if (err) {
            return console.log(err);
        }
        const encryptedPassword = result[0].password;
        const loggedEmployee = {
            emp_id: result[0].emp_id,
            name: result[0].name,
            email: result[0].email,
            gender: result[0].gender,
            designation: result[0].designation,
            address: result[0].address,
            phone: result[0].phone,
            department: result[0].department,
            joining_date: result[0].joining_date,
            dob: result[0].dob
        };
        bcrypt.compare(encryptedPassword, password).then((result) => {
            token = jwt.sign(
                { email: loggedEmployee.email, userId: loggedEmployee.emp_id },
                'this_should_be_long',
                { expiresIn: '1hr' }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                empId: loggedEmployee.emp_id
            })
        }).catch(error => {
            res.status(401).json({ message: 'Authorization failed!', err: error });
        })
    });
});
module.exports = router;
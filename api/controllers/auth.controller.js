const db = require('../dbconfig/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userLogin = (req, res, next) => {
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
}

const adminLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(`Select name,email,phone,password from admin where email='${email}'`, (err, result, fields) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ status: 401, message: 'Please enter the correct email!' });
        }
        console.log(result === null);
        console.log(result);
        console.log(!result[0]);
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


module.exports = { userLogin, adminLogin };

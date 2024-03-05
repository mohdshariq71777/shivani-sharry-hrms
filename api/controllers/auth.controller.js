const db = require('./../dbconfig/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query(`Select email,name,password from users where email='${email}'`, (err, result, fields) => {
        if (err) {
            return console.log(err);
        }
        const encryptedPassword = result[0].password;
        console.log(result)
        console.log(encryptedPassword)
        const loggedUser = {
            name: result[0].name,
            email: result[0].email,
        };
        bcrypt.compare(password, encryptedPassword).then((result) => {
            token = jwt.sign(
                { email: loggedUser.email },
                'this_should_be_long_new',
                { expiresIn: '1hr' }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                name: loggedUser.name
            })
        }).catch(error => {
            res.status(401).json({ message: 'Authorization failed!', err: error });
        })
    });
};
const userSignup = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(name, email, password);
    db.query(`SELECT IF(COUNT(*) = 0, 'false', 'true') AS result from users where email='${email}'`, (err, result, fields) => {
        if (err) {

            return console.error(err)
        }
        else {
            if (result[0].result !== 'true') {
                bcrypt.hash(password, 10).then(hash => {
                    db.query(`Insert into users (name,email,password) values('${name}','${email}','${hash}')`, (err, result, fields) => {
                        if (err) {
                            res.status(404).json({ message: err });
                            return console.log(err);
                        }
                        res.status(200).json({ message: 'User added successfully' });
                    });
                })
            }
            else {
                console.log('Email address already exists');
                res.status(409).json({ message: 'Email address already exists' });
            }
        }
    })
}
const checkEmail = (req, res, next) => {
    const email = req.body.email;
    db.query(`SELECT IF(COUNT(*) = 0, 'false', 'true') AS result from users where email='${email}'`, (err, result, fields) => {
        if (err) {
            return console.error(err)
        }
        else {
            if (result[0].result === 'true') {
                res.status(200).json({ status: 409, message: 'Email already exists' });
            }
            else {
                res.status(200).json({ status: 200, message: `Email doesn't exists` });
            }
        }
    })
}
module.exports = { userLogin, userSignup, checkEmail };
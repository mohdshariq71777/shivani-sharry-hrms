var express = require('express');
var router = express.Router();
const db = require('../dbconfig/database');
const bcrypt = require('bcrypt');
const checkAuth = require('./../middlewares/checkAuth');
/* GET users listing. */
router.get('/', checkAuth, function (req, res, next) {
  db.query('Select emp_id, name, email, gender, designation, address, phone, department, joining_date, dob,role from employees', (err, result, fields) => {
    if (err) {
      return console.log(err);
    }
    res.status(200).json({
      employees: result,
      message: 'Employees fetched successfully'
    })
  })
});
router.get('/:id', checkAuth, function (req, res, next) {
  db.query(`Select emp_id, name, email, gender, designation, address, phone, department, joining_date, dob,role from employees where emp_id='${req.params.id}'`, (err, result, fields) => {
    if (err) {
      return console.log(err);
    }
    console.log(result)
    console.log('test session' + req)
    res.status(200).json({
      employeeObj: result[0],
      message: `Employee fetched successfully`
    })
  })
});
router.post('/', checkAuth, (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;
  const joining_date = req.body.joining_date;
  const dob = req.body.dob;
  const department = req.body.department;
  const gender = req.body.gender;
  const designation = req.body.designation;
  db.query(`Insert into employees (name,email,phone,address,joining_date,dob,department,gender,designation,role,password) values('${name}','${email}',${phone},'${address}','${joining_date}','${dob}','${department}','${gender}','${designation}',${department === 'Human Resources' || department === 'Manager' ? '1' : '2'},'123');`, (err, result, fields) => {
    if (err) {
      return console.log(err);
    }
    bcrypt.hash('123', 10).then(hash => {
      db.query(`update employees set password='${hash}' where emp_id='${result.insertId}'`, (err, result, fields) => {
        console.log(hash)
      })
    });
    res.status(202).json({
      message: 'Employee added successfully'
    })
    console.log(result.insertId)
  })
})
module.exports = router;

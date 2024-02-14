var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH,PUT, DELETE, OPTIONS"
    );
    next();
});

app.use(cors({ origin: '*' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: false }));
app.use('/api/auth', authRouter);
app.use('/api/employees', employeesRouter);
app.use('/api/mail', mailRouter);
var employeesRouter = require('./routes/employees');
var mailRouter = require('./routes/send-mail');
app.use('/api', require('./routes/category.route'));
app.use('/api', require('./routes/product.route'));
app.use('/api', require('./routes/auth.route'));
module.exports = app;

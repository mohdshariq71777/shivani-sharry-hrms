const { createPool } = require('mysql');
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'falak',
    database: 'hrms',
    connectionLimit: 10
})
module.exports = pool;
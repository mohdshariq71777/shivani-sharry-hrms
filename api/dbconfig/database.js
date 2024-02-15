const { createPool } = require('mysql2');
const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Shivani",
    database:"mynodedb",
    connectionLimit: 10
})
pool.getConnection((err,connection)=> {
    if(err)
    throw err;
    console.log('Database connected successfully');
    connection.release();
  });
module.exports = pool;
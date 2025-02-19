const mysql = require('mysql2')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: '##aA12345'
})
module.exports= pool.promise();
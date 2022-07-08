const mysql = require('mysql')

let db = mysql.createConnection({
    host: 'localhost',
    user: 'plew',
    password: 'admin',
    database: 'buffet_project'
});

db.connect();

module.exports= db;
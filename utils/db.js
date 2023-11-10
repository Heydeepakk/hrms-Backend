const mysql = require('mysql');

const con = mysql.createConnection({
    host : process.env.LOCALHOST,
    user : process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

con.connect((err) => {
    if(err) throw err;     
    console.log('database connected!');
});


module.exports = con;
require('dotenv').config()
const mysql = require('mysql');

const hostDB = process.env.HOSTDB
const userDB = process.env.USERDB
const passwordDB = process.env.PASSWORDDB
const nameDB = process.env.NAMEDB

const conn = mysql.createConnection({
    host: hostDB,
    user: userDB,
    password: passwordDB
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    conn.query(`CREATE DATABASE ${nameDB}`, function (err, result) {
        if (err) throw console.log("Database exists");
        console.log("Database created");
    });
});
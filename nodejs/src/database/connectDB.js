require('dotenv').config()
const { Sequelize } = require('sequelize');

const hostDB = process.env.HOSTDB
const userDB = process.env.USERDB
const passwordDB = process.env.PASSWORDDB
const nameDB = process.env.NAMEDB

const sequelize = new Sequelize(nameDB, userDB, passwordDB, {
    host: hostDB,
    dialect: 'mysql'
});


module.exports = sequelize;
const dbConfig = require('../config/dbConfig.js')
const Sequelize = require('sequelize')
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'local_db',
})
connection.connect((err) => {
  if (err) throw err
  console.log('Connected!')
})

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: 0,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
// })
// var sequelize = new Sequelize('db_local', 'username', 'password', {
//   host: 'localhost',
//   port: 12345,
//   dialect: 'mysql',
//   storage: '../db_local.db',
// })

const db = {}

db.Sequelize = Sequelize

// db.tutorials = require('./tutorial.model.js')(sequelize, Sequelize)

module.exports = db

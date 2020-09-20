var mysql = require('mysql')
const Sequelize = require('sequelize')

const dbConfig = {
  HOST: '138.68.108.57',
  USER: 'team3',
  PASSWORD: 'my-strong-pass',
  DB: 'team3_db',
  dialect: 'mysql',
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}
// var db_connector = mysql.createConnection({
//   host: '138.68.108.57',
//   user: 'hackathonuser',
//   password: 'P@$$w0rd',
//   database: 'hackathon',
// })
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
})

// var sequelize = new Sequelize('local_db', 'root', 'password', {
//   host: 'localhost',
//   port: 3306,
//   dialect: 'mysql',
// })
module.exports = {
  sequelize,
  HOST: '138.68.108.57',
  USER: 'hackathonuser',
  PASSWORD: 'P@$$w0rd',
  DB: 'hackathon',
  dialect: 'mysql',
  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}

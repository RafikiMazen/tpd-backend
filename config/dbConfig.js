var mysql = require('mysql')

var db_connector = mysql.createConnection({
  host: '138.68.108.57',
  user: 'hackathonuser',
  password: 'P@$$w0rd',
  database: 'hackathon',
})
module.exports = {
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

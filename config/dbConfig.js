var mysql = require('mysql')

var db_connector = mysql.createConnection({
  host: '138.68.108.57',
  user: 'hackathonuser',
  password: 'P@$$w0rd',
  database: 'hackathon',
})
module.exports = { db_connector }

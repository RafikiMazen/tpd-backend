const dbConfig = require('../config/dbConfig.js')
const Sequelize = require('sequelize')
const mysql = require('mysql')
const models = require('./')

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   database: 'local_db',
// })
// connection.connect((err) => {
//   if (err) throw err
//   console.log('Connected!')
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

var db = {}

// var sequelize = new Sequelize('local_db', 'root', 'password', {
//   host: 'localhost',
//   port: 3306,
//   dialect: 'mysql',
// })

const modelsList = [
  require('./assignment.model'),
  require('./certification_providers.model'),
  require('./certifications.model'),
  require('./employee_certifications.model'),
  require('./employee_profiles.model'),
  require('./employee_skills.model'),
  require('./employee_skills_history.model'),
  require('./employee_training.model'),
  require('./managers.model'),
  require('./release_requests.model'),
  require('./release_requests_actions.model'),
  require('./resource_requests.model'),
  require('./resource_request_skills.model'),
  require('./resource_requests_actions.model'),
  require('./role.model'),
  require('./skills.model'),
  require('./user_role.model'),
  require('./users.model'),
  require('./skillcatalog.model'),
  require('./certifications_history.model'),
  require('./training.model'),
  // Add more models here...
  // require('./models/item'),
]
// console.log(models)

// We define all models according to their files.
// for (const modelDefiner of modelDefiners) {
//   modelDefiner(sequelize)
// }
// db.tutorials = require('./tutorial.model.js')(sequelize, Sequelize)

module.exports = { modelsList }

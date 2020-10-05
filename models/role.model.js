const Sequelize = require('sequelize')
const { sequelize } = require('../config/dbConfig')

var Role = sequelize.define('role', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  role_name: {
    type: Sequelize.STRING,
    unique: true,
  },
})
module.exports = Role

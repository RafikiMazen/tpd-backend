const Sequelize = require('sequelize')
const { sequelize } = require('../config/dbConfig')

var User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  user_name: {
    type: Sequelize.STRING(32),
  },
  password: {
    type: Sequelize.STRING(32),
  },
  email: {
    type: Sequelize.STRING(320),
  },
})

module.exports = User

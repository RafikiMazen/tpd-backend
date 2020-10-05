const Sequelize = require('sequelize')
const { sequelize } = require('../config/dbConfig')

var User = sequelize.define('users', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true,
  // },
  user_name: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
})


module.exports = User

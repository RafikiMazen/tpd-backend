const Sequelize = require('sequelize')
const userRole = require('./user_role.model')

var user = this.sequelize.define('users', {
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
user.hasMany(userRole, { foreignKey: 'user_id', sourceKey: 'id' })
module.exports = user

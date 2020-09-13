const Sequelize = require('sequelize')
const userRole = require('./user_role.model')

var role = this.sequelize.define('role', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  role_name: {
    type: Sequelize.STRING(32),
  },
})
role.hasMany(userRole, { foreignKey: 'role_id', sourceKey: 'id' })
module.exports = role

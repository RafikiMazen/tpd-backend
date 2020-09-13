const Sequelize = require('sequelize')
const role = require('./role.model')
const user = require('./users')

var userRole = this.sequelize.define('users_role', {})
userRole.belongsTo(user, { foreignKey: 'user_id' })
userRole.belongsTo(role, { foreignKey: 'role_id' })
module.exports = userRole

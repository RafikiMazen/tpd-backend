const Sequelize = require('sequelize')
const Role = require('./role.model')
const User = require('./users.model')
const { sequelize } = require('../config/dbConfig')

var UserRole = sequelize.define('users_role', {})
UserRole.belongsTo(User, { foreignKey: 'user_id' })
UserRole.belongsTo(Role, { foreignKey: 'role_id' })
module.exports = UserRole

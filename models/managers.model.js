const Sequelize = require('sequelize')
const employeeProfile = require('./employee_profiles.model')

var manager = this.sequelize.define('managers', {
  id: {
    type: Sequelize.STRING(36),
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(256),
  },
})

employeeProfile.hasMany(employeeProfile, {
  foreignKey: 'direct_manager',
  sourceKey: 'id',
})

module.exports = manager

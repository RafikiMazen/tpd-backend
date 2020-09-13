const Sequelize = require('sequelize')
const employeeProfile = require('./employee_profiles.model')

var assignment = this.sequelize.define('assignment', {
  assignment_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  workgroup: {
    type: Sequelize.STRING(128),
  },
  cost_center: {
    type: Sequelize.STRING(128),
  },
  sdm_reporting_manager: {
    type: Sequelize.STRING(256),
  },
  allocation_percentage: {
    type: Sequelize.INTEGER,
  },
  start_date: {
    type: Sequelize.DATE,
  },
  release_date: {
    type: Sequelize.DATE,
  },
})
assignment.belongsTo(employeeProfile, { foreignKey: 'employee_id' })
module.exports = assignment

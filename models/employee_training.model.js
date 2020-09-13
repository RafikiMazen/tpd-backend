const Sequelize = require('sequelize')
const employeeProfile = require('./employee_profiles.model')

var employeeTraining = this.sequelize.define('employee_training', {
  training_activity_name: {
    type: Sequelize.STRING(256),
  },
  training_event_name: {
    type: Sequelize.STRING(256),
  },
  event_from_date: {
    type: Sequelize.DATE,
  },
  event_to_date: {
    type: Sequelize.DATE,
  },
  total_training_hours: {
    type: Sequelize.INTEGER,
  },
})

employeeTraining.belongsTo(employeeProfile, { foreignKey: 'employee_id' })

module.exports = employeeTraining

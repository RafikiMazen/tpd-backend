const Sequelize = require('sequelize')
const EmployeeProfile = require('./employee_profiles.model')
const { sequelize } = require('../config/dbConfig')

var EmployeeTraining = sequelize.define('employee_training', {
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

EmployeeTraining.belongsTo(EmployeeProfile, { foreignKey: 'employee_id' })

module.exports = EmployeeTraining

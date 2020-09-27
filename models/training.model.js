const Sequelize = require('sequelize')
const EmployeeProfile = require('./employee_profiles.model')
const { sequelize } = require('../config/dbConfig')

var Training = sequelize.define('training', {
  training_name: {
    type: Sequelize.STRING,
  },
  training_event_name: {
    type: Sequelize.STRING,
  },
  sdm_reporting_manager: {
    type: Sequelize.STRING(256),
  },
  event_start_date: {
    type: Sequelize.DATE,
  },
  total_hours: {
    type: Sequelize.INTEGER,
  },
})
module.exports = Training

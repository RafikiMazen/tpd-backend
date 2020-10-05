const Sequelize = require('sequelize')
const EmployeeProfile = require('./employee_profiles.model')
const Certificate = require('./certifications.model')
const { sequelize } = require('../config/dbConfig')

var CertificationHistory = sequelize.define('certification_history', {
  employee_name: {
    type: Sequelize.STRING,
  },
  certification_name: {
    type: Sequelize.STRING,
  },
  certification_provider_name: {
    type: Sequelize.STRING,
  },
  expiration_date: {
    type: Sequelize.DATE,
  },
})
CertificationHistory.belongsTo(Certificate, { foreignKey: 'certification_id' })
CertificationHistory.belongsTo(EmployeeProfile, { foreignKey: 'employee_id' })
module.exports = CertificationHistory

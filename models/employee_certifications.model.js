const Sequelize = require('sequelize')
const EmployeeProfile = require('./employee_profiles.model')
const certification = require('./certifications.model')
const { sequelize } = require('../config/dbConfig')

var EmployeeCertification = sequelize.define('employee_certifications', {
  expiration_date: {
    type: Sequelize.DATE,
  },
})

EmployeeProfile.belongsTo(EmployeeProfile, { foreignKey: 'employee_id' })
EmployeeProfile.belongsTo(certification, { foreignKey: 'certification_id' })
module.exports = EmployeeCertification

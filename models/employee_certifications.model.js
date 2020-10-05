const Sequelize = require('sequelize')
const EmployeeProfile = require('./employee_profiles.model')
const certification = require('./certifications.model')
const { sequelize } = require('../config/dbConfig')

var EmployeeCertification = sequelize.define('employee_certifications', {
  expiration_date: {
    type: Sequelize.DATE,
  },
})

EmployeeCertification.belongsTo(EmployeeProfile, { foreignKey: 'employee_id' })
EmployeeCertification.belongsTo(certification, {
  foreignKey: 'certification_id',
})
certification.hasMany(EmployeeCertification, { foreignKey: 'certification_id' })
EmployeeProfile.hasMany(EmployeeCertification, { foreignKey: 'employee_id' })
module.exports = EmployeeCertification

const Sequelize = require('sequelize')
const employee_profile = require('./employee_profiles.model')
const certification = require('./certifications.model')

var employeeCertification = this.sequelize.define('employee_certifications', {
  expiration_date: {
    type: Sequelize.DATE,
  },
})

employee_profile.belongsTo(employee_profile, { foreignKey: 'employee_id' })
employee_profile.belongsTo(certification, { foreignKey: 'certification_id' })
module.exports = employeeCertification

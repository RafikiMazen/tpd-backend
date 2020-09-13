const Sequelize = require('sequelize')
const certificationProvider = require('./certification_providers.model')
const employeeCertification = require('./employee_certifications.model')

var certification = this.sequelize.define('certifications', {
  certification_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  certification_name: {
    type: Sequelize.STRING(128),
  },
})

certification.belongsTo(certificationProvider, {
  foreignKey: 'certification_provider_id',
})
certification.hasMany(employeeCertification, {
  foreignKey: 'certification_id',
  sourceKey: 'certification_id',
})
module.exports = certification

const Sequelize = require('sequelize')
const CertificationProvider = require('./certification_providers.model')
const { sequelize } = require('../config/dbConfig')

var Certification = sequelize.define('certifications', {
  certification_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  certification_name: {
    type: Sequelize.STRING(128),
  },
})

Certification.belongsTo(CertificationProvider, {
  foreignKey: 'certification_provider_id',
})
module.exports = Certification

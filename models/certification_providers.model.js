const Sequelize = require('sequelize')
const certification = require('./certifications.model')

var certificationProvider = this.sequelize.define('certification_providers', {
  certificatoin_provider_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  certification_provider_name: {
    type: Sequelize.STRING(128),
  },
})

certificationProvider.hasMany(certification, {
  foreignKey: 'certification_provider_id',
  sourceKey: 'certificatoin_provider_id',
})
module.exports = certification

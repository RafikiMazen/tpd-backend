const Sequelize = require('sequelize')
const { sequelize } = require('../config/dbConfig')

var CertificationProvider = sequelize.define('certification_providers', {
  certification_provider_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  certification_provider_name: {
    type: Sequelize.STRING(128),
  },
})

module.exports = CertificationProvider

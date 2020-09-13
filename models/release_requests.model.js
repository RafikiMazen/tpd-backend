const Sequelize = require('sequelize')
const employeeProfile = require('./employee_profiles.model')

var releaseRequest = this.sequelize.define('release_requests', {
  reference_number: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  manager_name: {
    type: Sequelize.STRING(256),
  },
  employee_name: {
    type: Sequelize.STRING(256),
  },
  employee_title: {
    type: Sequelize.STRING(128),
  },
  function: {
    type: Sequelize.STRING(128),
  },
  title: {
    type: Sequelize.STRING(128),
  },
  release_date: {
    type: Sequelize.DATE,
  },
  propability: {
    type: Sequelize.INTEGER,
  },
  release_percentage: {
    type: Sequelize.INTEGER,
  },
  release_reason: {
    type: Sequelize.STRING(256),
  },
  leaving: {
    type: Sequelize.STRING(1),
  },
  request_status: {
    type: Sequelize.STRING(32),
  },
})
releaseRequest.belongsTo(employeeProfile, { foreignKey: 'employee_id' })
module.exports = releaseRequest

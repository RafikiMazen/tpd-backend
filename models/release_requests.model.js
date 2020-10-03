const Sequelize = require('sequelize')
const EmployeeProfile = require('./employee_profiles.model')
const { sequelize } = require('../config/dbConfig')
const { releaseRequestStatus } = require('../constants/enums')

var ReleaseRequest = sequelize.define('release_requests', {
  reference_number: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
    default: releaseRequestStatus.OPEN,
  },
  action_owner_name: {
    type: Sequelize.STRING,
  },
})
ReleaseRequest.belongsTo(EmployeeProfile, { foreignKey: 'employee_id' })
module.exports = ReleaseRequest

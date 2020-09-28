const Sequelize = require('sequelize')
const { sequelize } = require('../config/dbConfig')
const { releaseRequestStatus } = require('../constants/enums')
var ResourceRequest = sequelize.define('resource_requests', {
  reference_number: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  manager_name: {
    type: Sequelize.STRING(256),
  },
  function: {
    type: Sequelize.STRING(128),
  },
  title: {
    type: Sequelize.STRING(128),
  },
  start_date: {
    type: Sequelize.DATE,
  },
  end_date: {
    type: Sequelize.DATE,
  },
  propability: {
    type: Sequelize.INTEGER,
  },
  percentage: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.STRING(32),
    default: releaseRequestStatus.OPEN,
  },
  core_team_member: {
    type: Sequelize.STRING(1),
  },
  replacenement: {
    type: Sequelize.STRING(1),
  },
  replacenement_for: {
    type: Sequelize.STRING(256),
  },
  requests_count: {
    type: Sequelize.INTEGER,
    default: 1,
  },
  related_opportunity: {
    type: Sequelize.STRING(128),
  },
  comments: {
    type: Sequelize.STRING(256),
  },
  assigned_resource: {
    type: Sequelize.STRING(256),
  },
  actual_percentage: {
    type: Sequelize.INTEGER,
  },
})

module.exports = ResourceRequest

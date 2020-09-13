const Sequelize = require('sequelize')
const resourceRequestSkills = require('./resource_request_skills.model')
const resourceRequestAction = require('./resource_requests_actions.model')

var resourceRequest = this.sequelize.define('resource_requests', {
  reference_number: {
    type: Sequelize.INTEGER,
    primaryKey: true,
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

resourceRequest.hasMany(resourceRequestSkills, {
  foreignKey: 'request_reference_number',
  sourceKey: 'reference_number',
})
resourceRequest.hasMany(resourceRequestAction, {
  foreignKey: 'resource_request_reference_number',
  sourceKey: 'reference_number',
})

module.exports = resourceRequest

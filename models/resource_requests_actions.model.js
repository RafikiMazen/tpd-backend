const Sequelize = require('sequelize')
const resourceRequest = require('./resource_requests.model')
const { sequelize } = require('../config/dbConfig')

var ResourceRequestAction = sequelize.define('resource_requests_actions', {
  action_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  action: {
    type: Sequelize.STRING(32),
  },
  action_note: {
    type: Sequelize.STRING(256),
  },
})

ResourceRequestAction.belongsTo(resourceRequest, {
  foreignKey: 'resource_request_reference_numbe',
})
module.exports = ResourceRequestAction

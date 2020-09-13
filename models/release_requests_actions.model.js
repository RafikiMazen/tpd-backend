const Sequelize = require('sequelize')
const releaseRequest = require('./release_requests.model')

var releaseRequestAction = this.sequelize.define('release_requests_actions', {
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

releaseRequestAction.belongsTo(releaseRequest, {
  foreignKey: 'release_request_reference_numbe',
})
releaseRequest.hasMany(releaseRequestAction, {
  foreignKey: 'releasew_request_reference_number',
  sourceKey: 'reference_number',
})
module.exports = releaseRequestAction

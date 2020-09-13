const Sequelize = require('sequelize')
const skill = require('./skills.model')
const resourceRequest = require('./resource_requests.model')

var resourceRequestSkills = this.sequelize.define('resource_request_skills', {
  category: {
    type: Sequelize.STRING(64),
  },
  subcategory: {
    type: Sequelize.STRING(64),
  },
})
resourceRequestSkills.belongsTo(skill, { foreignKey: 'skill_id' })
resourceRequestSkills.belongsTo(resourceRequest, {
  foreignKey: 'request_reference_number',
})
module.exports = resourceRequestSkills

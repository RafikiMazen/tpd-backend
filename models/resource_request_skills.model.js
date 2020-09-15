const Sequelize = require('sequelize')
const Skill = require('./skills.model')
const ResourceRequest = require('./resource_requests.model')
const { sequelize } = require('../config/dbConfig')

var ResourceRequestSkills = sequelize.define('resource_request_skills', {
  category: {
    type: Sequelize.STRING(64),
  },
  subcategory: {
    type: Sequelize.STRING(64),
  },
})
ResourceRequestSkills.belongsTo(Skill, { foreignKey: 'skill_id' })
ResourceRequestSkills.belongsTo(ResourceRequest, {
  foreignKey: 'request_reference_number',
})
module.exports = ResourceRequestSkills

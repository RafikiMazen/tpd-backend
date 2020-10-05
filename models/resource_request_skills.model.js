const Sequelize = require('sequelize')
const Skill = require('./skills.model')
const ResourceRequest = require('./resource_requests.model')
const { sequelize } = require('../config/dbConfig')

var ResourceRequestSkill = sequelize.define('resource_request_skills', {
  category: {
    type: Sequelize.STRING(64),
  },
  subcategory: {
    type: Sequelize.STRING(64),
  },
})
// ResourceRequestSkill.belongsTo(Skill, { foreignKey: 'skill_id' })
ResourceRequestSkill.belongsTo(ResourceRequest, {
  foreignKey: 'request_reference_number',
})
ResourceRequest.hasMany(ResourceRequestSkill, {
  foreignKey: 'request_reference_number',
})
module.exports = ResourceRequestSkill

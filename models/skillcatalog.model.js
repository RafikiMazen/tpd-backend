const Sequelize = require('sequelize')
const { sequelize } = require('../config/dbConfig')

var SkillCatalog = sequelize.define('skill_catalog', {
  category: {
    type: Sequelize.STRING(64),
  },
  subcategory: {
    type: Sequelize.STRING(64),
  },
})
// ResourceRequestSkill.belongsTo(Skill, { foreignKey: 'skill_id' })

module.exports = SkillCatalog

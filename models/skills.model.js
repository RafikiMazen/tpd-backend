const Sequelize = require('sequelize')
const employeeSkill = require('./employee_skills.model')
const employeeSkillHistory = require('./employee_skills_history.model')
const resourceRequestSkills = require('./resource_request_skills.model')

var skill = this.sequelize.define('skills', {
  skill_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  skill_name: {
    type: Sequelize.STRING(45),
  },
})

skill.hasMany(employeeSkill, {
  foreignKey: 'skill_id',
  sourceKey: 'skill_id',
})
skill.hasMany(employeeSkillHistory, {
  foreignKey: 'skill_id',
  sourceKey: 'skill_id',
})
skill.hasMany(resourceRequestSkills, {
  foreignKey: 'skill_id',
  sourceKey: 'skill_id',
})

module.exports = skill

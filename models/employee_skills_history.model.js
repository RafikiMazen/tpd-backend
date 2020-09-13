const Sequelize = require('sequelize')
const employeeProfile = require('./employee_profiles.model')
const skill = require('./skills.model')

var employeeSkillHistory = this.sequelize.define('employee_skills_history', {
  experience_level: {
    type: Sequelize.STRING(36),
    primaryKey: true,
  },
  last_used_date: {
    type: Sequelize.DATE,
  },
  created_on: {
    type: Sequelize.DATE,
  },
  manager_name: {
    type: Sequelize.STRING(256),
  },
  title: {
    type: Sequelize.STRING(128),
  },
  function: {
    type: Sequelize.STRING(128),
  },
})
employeeSkillHistory.belongsTo(skill, { foreignKey: 'skill_id' })
employeeSkillHistory.belongsTo(employeeProfile, { foreignKey: 'employee_id' })
module.exports = employeeSkillHistory

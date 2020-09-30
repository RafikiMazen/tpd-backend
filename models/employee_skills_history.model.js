const Sequelize = require('sequelize')
const EmployeeProfile = require('./employee_profiles.model')
const Skill = require('./skills.model')
const { sequelize } = require('../config/dbConfig')

var EmployeeSkillHistory = sequelize.define('employee_skills_history', {
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
EmployeeSkillHistory.belongsTo(Skill, { foreignKey: 'skill_id' })
EmployeeSkillHistory.belongsTo(EmployeeProfile, { foreignKey: 'employee_id' })
module.exports = EmployeeSkillHistory

const Sequelize = require('sequelize')
const EmployeeProfile = require('./employee_profiles.model')
const Skill = require('./skills.model')
const { sequelize } = require('../config/dbConfig')

var employeeSkillHistory = sequelize.define('employee_skills_history', {
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
employeeSkillHistory.belongsTo(Skill, { foreignKey: 'skill_id' })
employeeSkillHistory.belongsTo(EmployeeProfile, { foreignKey: 'employee_id' })
module.exports = employeeSkillHistory

const Sequelize = require('sequelize')
const EmployeeProfile = require('./employee_profiles.model')
const Skill = require('./skills.model')
const { sequelize } = require('../config/dbConfig')

var EmployeeSkills = sequelize.define('employee_skills', {
  experience_level: {
    type: Sequelize.STRING(32),
  },
  last_used_date: {
    type: Sequelize.DATE,
  },
})

EmployeeSkills.belongsTo(Skill, { foreignKey: 'skill_id' })
EmployeeSkills.belongsTo(EmployeeProfile, { foreignKey: 'employee_id' })
EmployeeProfile.hasMany(EmployeeSkills, { foreignKey: 'employee_id' })
module.exports = EmployeeSkills

const Sequelize = require('sequelize')
const employeeProfile = require('./employee_profiles.model')
const skill = require('./skills.model')

var employeeSkills = this.sequelize.define('employee_skills', {
  experience_level: {
    type: Sequelize.STRING(32),
  },
  last_used_date: {
    type: Sequelize.DATE,
  },
})

employeeSkills.belongsTo(skill, { foreignKey: 'skill_id' })
employeeSkills.belongsTo(employeeProfile, { foreignKey: 'employee_id' })
module.exports = employeeSkills

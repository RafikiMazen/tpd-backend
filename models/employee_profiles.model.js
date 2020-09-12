const Sequelize = require('sequelize')
const manager = require('./managers.model')
const employeeCertification = require('./employee_certifications.model')
const employeeTraining = require('./employee_training.model')
const assignment = require('./assignment.model')
const releaseRequest = require('./release_requests.model')
const employeeSkillHistory = require('./employee_skills_history.model')
const employeeSkill = require('./employee_skills.model')

var employeeProfile = this.sequelize.define('employee_profiles', {
  id: {
    type: Sequelize.STRING(36),
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(256),
  },
  title: {
    type: Sequelize.STRING(128),
  },
  hiring_date: {
    type: Sequelize.DATE,
  },
  function: {
    type: Sequelize.STRING(128),
  },
  workgroup: {
    type: Sequelize.STRING(128),
  },
  employment_type: {
    type: Sequelize.STRING(64),
  },
  allocation_percentage: {
    type: Sequelize.INTEGER,
  },
  skills_last_update_date: {
    type: Sequelize.DATE,
  },
  employee_email: {
    type: Sequelize.STRING(320),
  },
  employee_profile_picture: {
    type: Sequelize.STRING(45),
  },
  mobile_number: {
    type: Sequelize.STRING(20),
  },
  cost_center: {
    type: Sequelize.STRING(128),
  },
})

employeeProfile.belongsTo(manager, { foreignKey: 'direct_manager' })

employeeProfile.hasMany(employeeCertification, {
  foreignKey: 'employee_id',
  sourceKey: 'id',
})
employeeProfile.hasMany(employeeSkill, {
  foreignKey: 'employee_id',
  sourceKey: 'id',
})
employeeProfile.hasMany(employeeSkillHistory, {
  foreignKey: 'employee_id',
  sourceKey: 'id',
})
employeeProfile.hasMany(employeeTraining, {
  foreignKey: 'employee_id',
  sourceKey: 'id',
})
employeeProfile.hasMany(assignment, {
  foreignKey: 'employee_id',
  sourceKey: 'id',
})
employeeProfile.hasMany(releaseRequest, {
  foreignKey: 'employee_id',
  sourceKey: 'id',
})

module.exports = employeeProfile

const Sequelize = require('sequelize')
const manager = require('./managers.model')
const { sequelize } = require('../config/dbConfig')
const User = require('./users.model')

var EmployeeProfile = sequelize.define('employee_profiles', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

EmployeeProfile.belongsTo(manager, { foreignKey: 'direct_manager' })
EmployeeProfile.belongsTo(User, {foreignKey:''})
module.exports = EmployeeProfile

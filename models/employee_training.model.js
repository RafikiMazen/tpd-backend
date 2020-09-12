const Sequelize = require('sequelize')
const Manager = require('./managers.model')

var Employee_profile = this.sequelize.define('employee_profiles', {
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
    type: Sequelize.INTEGER(11),
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

Employee_profile.belongsTo(Manager, { foreignKey: 'direct_manager' })
Employee_profile.hasMany(City, { foreignKey: 'employee_id', sourceKey: 'id' })
module.exports = Employee_profile

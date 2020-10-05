const Sequelize = require('sequelize')
const { sequelize } = require('../config/dbConfig')

var Skill = sequelize.define('skills', {
  skill_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  skill_name: {
    type: Sequelize.STRING(45),
  },
})

module.exports = Skill

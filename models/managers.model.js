const { sequelize } = require('../config/dbConfig')
const Sequelize = require('sequelize')
const { Model } = Sequelize

class Manager extends Model {}

Manager.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING(256),
    },
  },
  {
    sequelize,
  }
)
module.exports = Manager

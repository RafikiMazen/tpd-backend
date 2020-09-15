const { sequelize } = require('../config/dbConfig')
const Sequelize = require('sequelize')
const { Model } = Sequelize

class Manager extends Model {}

Manager.init(
  {
    id: {
      type: Sequelize.STRING(36),
      primaryKey: true,
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

const { sequelize } = require('../config/dbConfig')
const Sequelize = require('sequelize')
const User = require('./users.model')
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
Manager.belongsTo(User, { foreignKey: 'user_id' })
module.exports = Manager

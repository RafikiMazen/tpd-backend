const Sequelize = require('sequelize')

var manager = this.sequelize.define('managers', {
  id: {
    type: Sequelize.STRING(36),
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING(256),
  },
})

module.exports = manager

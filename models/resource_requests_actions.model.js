const Sequelize = require("sequelize");
const resourceRequest = require("./resource_requests.model");
const { sequelize } = require("../config/dbConfig");

var ResourceRequestAction = sequelize.define("resource_requests_actions", {
  action_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  action: {
    type: Sequelize.STRING(32),
  },
  action_note: {
    type: Sequelize.STRING(256),
  },
  request_reference_number: {
    type: Sequelize.INTEGER,
  },
});

ResourceRequestAction.belongsTo(resourceRequest, {
  foreignKey: "request_reference_number",
});
module.exports = ResourceRequestAction;

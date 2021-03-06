const Sequelize = require("sequelize");
const ReleaseRequest = require("./release_requests.model");
const { sequelize } = require("../config/dbConfig");

var ReleaseRequestAction = sequelize.define("release_requests_actions", {
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

ReleaseRequestAction.belongsTo(ReleaseRequest, {
  foreignKey: "request_reference_number",
});
ReleaseRequest.hasMany(ReleaseRequestAction, {
  foreignKey: "request_reference_number",
});
module.exports = ReleaseRequestAction;

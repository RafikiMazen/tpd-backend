const config = require("./config");
const logger = require("./services/Logger");
require("dotenv").config();

const { sequelize } = require("./config/dbConfig");
const modelsList = require("./models");
const { populate } = require("./helpers/populate");
sequelize.models = modelsList;
sequelize
  .authenticate()
  .then(function (err) {
    console.log("Connection has been established successfully.");
    logger.info("Database connection successful");
    // Create express instance to setup API
    const ExpressLoader = require("./loaders/Express");
    new ExpressLoader();
  })
  .catch(function (err) {
    console.log("Unable to connect to the database:", err);
  });
const eraseDatabaseOnSync = false;
sequelize
  .sync({ force: eraseDatabaseOnSync, alter: false })
  .then(() => {
    console.log("Synced models with database 💃 .");
  })
  .then(async () => {
    if (eraseDatabaseOnSync) {
      populate();
    }
  })
  .catch((error) => {
    console.log("Could not sync models with database 🤦 .", error);
  });

// db_connector.connect(function (err) {
//   if (err) throw err
//   console.log('Connected!')

// })

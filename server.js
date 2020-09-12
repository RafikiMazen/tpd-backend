const config = require('./config')
const logger = require('./services/Logger')
const { db_connector } = require('./config/dbConfig')

const db = require('./models')
db.sequelize
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established successfully.')
    logger.info('Database connection successful')
    // Create express instance to setup API
    const ExpressLoader = require('./loaders/Express')
    new ExpressLoader()
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err)
  })

// db_connector.connect(function (err) {
//   if (err) throw err
//   console.log('Connected!')

// })

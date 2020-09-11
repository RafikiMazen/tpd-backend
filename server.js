const config = require('./config')
const logger = require('./services/Logger')
const { db_connector } = require('./config/dbConfig')

db_connector.connect(function (err) {
  if (err) throw err
  console.log('Connected!')
  logger.info('Database connection successful')
  // Create express instance to setup API
  const ExpressLoader = require('./loaders/Express')
  new ExpressLoader()
})

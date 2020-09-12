const express = require('express')
const cors = require('cors')
const allRoutes = require('express-list-endpoints')
const bodyParser = require('body-parser')
const path = require('path')
const routes = require('../routes')
const compression = require('compression')
const logger = require('../services/Logger')
const config = require('../config')
const morgan = require('morgan')

class ExpressLoader {
  constructor() {
    const app = express()

    // Serve static content
    app.use(express.static(path.join(__dirname, 'uploads')))

    // Set up middleware
    app.use(morgan('dev'))
    app.use(compression())
    app.use(
      bodyParser.urlencoded({
        extended: false,
        limit: '20mb',
      })
    )
    app.use(bodyParser.json({ limit: '20mb' }))

    // Setup error handling, this must be after all other middleware
    app.use(ExpressLoader.errorHandler)

    // Pass app to routes
    routes(app)

    // Start application
    this.server = app.listen(config.port, () => {
      console.log(`Express running, now listening on port ${config.port}`)
      logger.info(`Express running, now listening on port ${config.port}`)
    })
  }

  get Server() {
    return this.server
  }

  /**
   * @description Default error handler to be used with express
   * @param error Error object
   * @param req {object} Express req object
   * @param res {object} Express res object
   * @param next {function} Express next object
   * @returns {*}
   */
  static errorHandler(error, req, res, next) {
    let parsedError

    // Attempt to gracefully parse error object
    try {
      if (error && typeof error === 'object') {
        parsedError = JSON.stringify(error)
      } else {
        parsedError = error
      }
    } catch (e) {
      logger.error(e)
    }

    // Log the original error
    logger.error(parsedError)

    // If response is already sent, don't attempt to respond to client
    if (res.headersSent) {
      return next(error)
    }

    res.status(400).json({
      success: false,
      error,
    })
  }
}

module.exports = ExpressLoader

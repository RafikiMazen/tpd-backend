const template = require('./routes-template')
const express = require('express')
const allRoutes = require('express-list-endpoints')

const app = express()

const certificationProvider = require('./certification_providers.router')
const certification = require('./certifications.router')
const skill = require('./skills.router')
const employeeSkill = require('./employee_skills.router')
const employeeProfile = require('./employee_profiles.router')
const assignment = require('./assignment.router')
const releaseRequest = require('./release_requests.router')
const resourceRequest = require('./resource_requests.router')
const auth = require('./auth.router')
const role = require('./role.router')

const explore = (req, res) => {
  const routes = allRoutes(app)
  const result = {
    ServiceList: [],
  }

  routes.forEach((route) => {
    const name = route.path.split('/')[5]
    result.ServiceList.push({
      Service: {
        name,
        fullUrl: `${route.path}`,
      },
    })
  })
  return res.json(result)
}

app.use((req, res) => {
  res.status(404).send({ err: 'No such url' })
})

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Origin', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, X-Auth-Token, Accept'
  )
  next()
})
const routes = (app) => {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, content-type, x-access-token, authorization'
    )
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.removeHeader('X-Powered-By')
    next()
  })

  // app.use('/', template)
  app.use('/certification-provider', certificationProvider)
  app.use('/explore', explore)
  app.use('/certification', certification)
  app.use('/skill', skill)
  app.use('/employer-skill', employeeSkill)
  app.use('/employeer-profile', employeeProfile)
  app.use('/assignment', assignment)
  app.use('/release-request', releaseRequest)
  app.use('/resource-request', resourceRequest)
  app.use('/user', auth)
  app.use('/role', role)
}

module.exports = routes

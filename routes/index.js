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
const manager = require('./managers.router')

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
  app.use('/api/certification-provider', certificationProvider)
  app.use('/api/explore', explore)
  app.use('/api/certification', certification)
  app.use('/api/skill', skill)
  app.use('/api/employee-skill', employeeSkill)
  app.use('/api/employee-profile', employeeProfile)
  app.use('/api/assignment', assignment)
  app.use('/api/release-request', releaseRequest)
  app.use('/api/resource-request', resourceRequest)
  app.use('/api/auth', auth)
  app.use('/api/role', role)
  app.use('/api/manager', manager)
}

module.exports = routes

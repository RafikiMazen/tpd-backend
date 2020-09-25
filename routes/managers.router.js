const express = require('express')
const router = express.Router()

const {
  getAllManagers,
  getMyEmployees,
} = require('../services/managers.service')
const {
  validateGetAllManagers,
  validateGetAllMyEmployees,
} = require('../middlewares/validations/manager.validations')

router.post('/all', validateGetAllManagers, getAllManagers)
router.post('/allEmployees', validateGetAllMyEmployees, getMyEmployees)

module.exports = router

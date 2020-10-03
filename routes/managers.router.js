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
const { verifyTPDorManager, verifyManager } = require('../auth/verifyToken')

router.post('/all', verifyTPDorManager, validateGetAllManagers, getAllManagers)
router.post(
  '/allEmployees',
  verifyManager,
  validateGetAllMyEmployees,
  getMyEmployees
)

module.exports = router

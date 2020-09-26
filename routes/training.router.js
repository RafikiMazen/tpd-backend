const express = require('express')
const router = express.Router()

const {
  getEmployeeTrainings,
  getMyTrainings,
} = require('../services/trainings.service')

const {
  validateGetEmployeeTrainings,
} = require('../middlewares/validations/training.validations')
// const {
//   verifyToken,
//   verifyAdmin,
//   verifySales,
//   verifyTech,
//   authorizeUser,
//   authorizeEdit,
// } = require('../auth/verifyToken')

router.post(
  '/employeeTrainings',
  validateGetEmployeeTrainings,
  getEmployeeTrainings
)
router.get('/my', getMyTrainings)

module.exports = router

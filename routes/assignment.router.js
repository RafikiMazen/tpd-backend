const express = require('express')
const router = express.Router()

const {
  getMyAssignmentsHistory,
  getMyAssignments,
  getEmployeeAssignments,
  getEmployeeAssignmentsHistory,
} = require('../services/assignments.service')

const {
  validateEmployeeAssignment,
} = require('../middlewares/validations/assignment.validations')
// const {
//   verifyToken,
//   verifyAdmin,
//   verifySales,
//   verifyTech,
//   authorizeUser,
//   authorizeEdit,
// } = require('../auth/verifyToken')

router.get('/history', getMyAssignmentsHistory)
router.post(
  '/history/empoloyee',
  validateEmployeeAssignment,
  getEmployeeAssignmentsHistory
)
router.get('/', getMyAssignments)
router.get('/employee', validateEmployeeAssignment, getEmployeeAssignments)

module.exports = router

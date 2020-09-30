const express = require('express')
const router = express.Router()

const {
  getMyAssignmentsHistory,
  getMyAssignments,
  getEmployeeAssignments,
  getEmployeeAssignmentsHistory,
  addAssignment,
} = require('../services/assignments.service')

const {
  validateEmployeeAssignment,
  validateAddAssignment,
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
router.post('/', validateAddAssignment, addAssignment)
router.post(
  '/history/empoloyee',
  validateEmployeeAssignment,
  getEmployeeAssignmentsHistory
)
router.get('/', getMyAssignments)
router.get('/employee', validateEmployeeAssignment, getEmployeeAssignments)

module.exports = router

const express = require('express')
const router = express.Router()

const {
  getMyAssignmentsHistory,
  getMyAssignments,
  getEmployeeAssignments,
  getEmployeeAssignmentsHistory,
  addAssignment,
  deleteAssignment,
  editAssignment,
} = require('../services/assignments.service')

const {
  validateEmployeeAssignment,
  validateAddAssignment,
  validateDeleteAssignment,
  validateEditAssignment,
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
router.post('/my', getMyAssignments)
router.post('/employee', validateEmployeeAssignment, getEmployeeAssignments)
router.put('/', validateEditAssignment, editAssignment)
router.delete('/', validateDeleteAssignment, deleteAssignment)

module.exports = router

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
const {
  verifyToken,
  verifyEmployee,
  verifyManager,
  verifyTPD,
  verifyTPDorManager,
} = require('../auth/verifyToken')

router.get('/history', getMyAssignmentsHistory)
router.post('/', verifyTPD,validateAddAssignment, addAssignment)
router.post(
  '/history/empoloyee',
  verifyTPD,
  validateEmployeeAssignment,
  getEmployeeAssignmentsHistory
)
router.post('/my', getMyAssignments)
router.post(
  '/employee',
  verifyTPD,
  validateEmployeeAssignment,
  getEmployeeAssignments
)
router.put('/', verifyTPD, validateEditAssignment, editAssignment)
router.delete(
  '/',
  verifyTPD,
  validateDeleteAssignment,
  deleteAssignment
)

module.exports = router

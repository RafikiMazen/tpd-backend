const express = require('express')
const router = express.Router()

const {
  getEmployee,
  getEmployeeSkills,
  getEmployeeCertificates,
  getEmployeeTitles,
  getEmployeeNames,
  getEmployeeFunctions,
  getAllEmployees,
  getEmployeeWorkgroups,
  getEmployeeAssignment,
  exportAll,
} = require('../services/employee_profiles.service')

const {
  validateGetEmployee,
  validateGetEmployeeSkills,
  validateGetEmployeeCertificates,
  validateGetAllEmployees,
  validateGetEmployeeAssignment,
} = require('../middlewares/validations/employee_profile.validations')
const { verifyTPDorManager } = require('../auth/verifyToken')

router.post('/one', verifyTPDorManager, validateGetEmployee, getEmployee)
router.post(
  '/skills',
  verifyTPDorManager,
  validateGetEmployeeSkills,
  getEmployeeSkills
)
router.post(
  '/certificates',
  verifyTPDorManager,
  validateGetEmployeeCertificates,
  getEmployeeCertificates
)
router.post(
  '/assignments',
  verifyTPDorManager,
  validateGetEmployeeAssignment,
  getEmployeeAssignment
)
router.post(
  '/all',
  verifyTPDorManager,
  validateGetAllEmployees,
  getAllEmployees
)
router.post(
  '/all/export',
  verifyTPDorManager,
  validateGetAllEmployees,
  exportAll
)

router.get('/titles', verifyTPDorManager, getEmployeeTitles)
router.get('/names', verifyTPDorManager, getEmployeeNames)
router.get('/functions', verifyTPDorManager, getEmployeeFunctions)
router.get('/workgroups', verifyTPDorManager, getEmployeeWorkgroups)
module.exports = router

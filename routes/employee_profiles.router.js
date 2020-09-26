const express = require('express')
const router = express.Router()

const {
  getEmployee,
  getEmployeeSkills,
  getEmployeeCertificates,
  getEmployeeTitles,
  getEmployeeNames,
  getEmployeeFunctions,
} = require('../services/employee_profiles.service')

const {
  validateGetEmployee,
  validateGetEmployeeSkills,
  validateGetEmployeeCertificates,
} = require('../middlewares/validations/employee_profile.validations')
// const {
//   verifyToken,
//   verifyAdmin,
//   verifySales,
//   verifyTech,
//   authorizeUser,
//   authorizeEdit,
// } = require('../auth/verifyToken')

router.post('/one', validateGetEmployee, getEmployee)
router.post('/skills', validateGetEmployeeSkills, getEmployeeSkills)
router.post(
  '/certificates',
  validateGetEmployeeCertificates,
  getEmployeeCertificates
)
router.get('/titles', getEmployeeTitles)
router.get('/names', getEmployeeNames)
router.get('/functions', getEmployeeFunctions)
module.exports = router

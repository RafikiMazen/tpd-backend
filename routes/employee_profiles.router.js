const express = require('express')
const router = express.Router()

const { getEmployee } = require('../services/employee_profiles.service')

const {
  validateGetEmployee,
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

module.exports = router

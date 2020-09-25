const express = require('express')
const router = express.Router()

const { createAccount } = require('../services/employee_profiles.service')

// const {} = require('../middleware/validations/employee_profiles.validations')
// const {
//   verifyToken,
//   verifyAdmin,
//   verifySales,
//   verifyTech,
//   authorizeUser,
//   authorizeEdit,
// } = require('../auth/verifyToken')

// router.post(
//   '/createAccount',
//   // validateCreateOrder,
//   createAccount
// )

module.exports = router

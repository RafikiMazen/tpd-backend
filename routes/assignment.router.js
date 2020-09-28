const express = require('express')
const router = express.Router()

const { getMyAssignmentsHistory } = require('../services/assignments.service')

// const {} = require('../middleware/validations/assignments.validations')
// const {
//   verifyToken,
//   verifyAdmin,
//   verifySales,
//   verifyTech,
//   authorizeUser,
//   authorizeEdit,
// } = require('../auth/verifyToken')

router.get('/history', getMyAssignmentsHistory)

module.exports = router

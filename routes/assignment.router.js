const express = require('express')
const router = express.Router()

const {getMyCertificates} = require('../services/assignments.service')

// const {} = require('../middleware/validations/assignments.validations')
// const {
//   verifyToken,
//   verifyAdmin,
//   verifySales,
//   verifyTech,
//   authorizeUser,
//   authorizeEdit,
// } = require('../auth/verifyToken')

router.get('/my', getMyCertificates)

module.exports = router

const express = require('express')
const router = express.Router()

const {getMyCertificates} = require('../services/certificates.service')

// const {} = require('../middleware/validations/certifications.validations')
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

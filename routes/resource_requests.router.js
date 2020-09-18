const express = require('express')
const {
  viewResourceRequestList,
} = require('../services/resourcerequests.service')
const router = express.Router()

// const {} = require('../services/certifications.services')

// const {} = require('../middleware/validations/certifications.validations')
// const {
//   verifyToken,
//   verifyAdmin,
//   verifySales,
//   verifyTech,
//   authorizeUser,
//   authorizeEdit,
// } = require('../auth/verifyToken')

router.post(
  '/viewList',
  // validateCreateOrder,
  viewResourceRequestList
)

module.exports = router

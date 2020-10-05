const express = require('express')
const router = express.Router()

const { assignRole, createRole } = require('../services/roles.service')

const {
  validateAssignRole,
  validateCreateRole,
} = require('../middlewares/validations/role.validations')
const { verifyTPD } = require('../auth/verifyToken')

router.post('/',verifyTPD, validateCreateRole, createRole)
router.post('/assignRole',verifyTPD, validateAssignRole, assignRole)
module.exports = router

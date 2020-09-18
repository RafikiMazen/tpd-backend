const express = require('express')
const router = express.Router()

const { assignRole, createRole } = require('../services/roles.service')

const {
  validateAssignRole,
  validateCreateRole,
} = require('../middlewares/validations/role.validations')

router.post('/', validateCreateRole, createRole)
router.post('/assignRole', validateAssignRole, assignRole)
module.exports = router

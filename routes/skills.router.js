const express = require('express')
const router = express.Router()

const {getMySkills} = require('../services/skills.service')

const {validateGetMySkills} = require('../middlewares/validations/skill.validations')
// const {
//   verifyToken,
//   verifyAdmin,
//   verifySales,
//   verifyTech,
//   authorizeUser,
//   authorizeEdit,
// } = require('../auth/verifyToken')

router.post('/my', validateGetMySkills, getMySkills)

module.exports = router

const express = require('express')
const router = express.Router()

const {
  getMySkills,
  getCategories,
  getSubCategories,
  addEmployeeSkill,
  editEmployeeSkill,
  deleteEmployeeSkill,
  addSkill,
} = require('../services/skills.service')

const {
  validateGetMySkills,
  validateGetSubcategories,
  validateAddEmployeeSkill,
  validateEditEmployeeSkill,
  validateDeleteEmployeeSkill,
  validateAddSkill,
} = require('../middlewares/validations/skill.validations')
// const {
//   verifyToken,
//   verifyAdmin,
//   verifySales,
//   verifyTech,
//   authorizeUser,
//   authorizeEdit,
// } = require('../auth/verifyToken')

router.get('/my', validateGetMySkills, getMySkills)
router.get('/categories', getCategories)
router.post('/subcategories', validateGetSubcategories, getSubCategories)
router.post('/employee', validateAddEmployeeSkill, addEmployeeSkill)
router.put('/employee', validateEditEmployeeSkill, editEmployeeSkill)
router.delete('/employee', validateDeleteEmployeeSkill, deleteEmployeeSkill)
router.post('/', validateAddSkill, addSkill)
module.exports = router

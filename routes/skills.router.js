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
  editSkill,
  getSkills,
} = require('../services/skills.service')

const {
  validateGetMySkills,
  validateGetSubcategories,
  validateAddEmployeeSkill,
  validateEditEmployeeSkill,
  validateDeleteEmployeeSkill,
  validateAddSkill,
  validateEditSkill,
} = require('../middlewares/validations/skill.validations')
const {
  verifyToken,
  verifyEmployee,
  verifyManager,
  verifyTPD,
  verifyTPDorManager,
} = require('../auth/verifyToken')

router.get('/my', validateGetMySkills, getMySkills)
router.get('/categories', getCategories)
router.post('/subcategories', validateGetSubcategories, getSubCategories)
router.post(
  '/employee',
  verifyToken,
  verifyEmployee,
  validateAddEmployeeSkill,
  addEmployeeSkill
)
router.put('/employee', validateEditEmployeeSkill, editEmployeeSkill)
router.delete('/employee', validateDeleteEmployeeSkill, deleteEmployeeSkill)
router.post('/', validateAddSkill, addSkill)
router.put('/', validateEditSkill, editSkill)
router.get('/', getSkills)
module.exports = router

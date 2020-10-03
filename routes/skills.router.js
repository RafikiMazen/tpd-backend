const express = require("express");
const router = express.Router();

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
  getAllSkillHistory,
  getAllSkillTracking,
  exportSkillHistory,
  exportSkillTracking,
  deleteSkill,
  exportSkills,
  getEmployeeSkills,
} = require("../services/skills.service");

const {
  validateGetMySkills,
  validateGetSubcategories,
  validateAddEmployeeSkill,
  validateEditEmployeeSkill,
  validateDeleteEmployeeSkill,
  validateAddSkill,
  validateEditSkill,
  validateExportAllSkillHistory,
  validateGetAllSkillHistory,
  validateGetAllSkillTracking,
  validateDeleteSkill,
  validateGetEmployeeSkills,
} = require("../middlewares/validations/skill.validations");
const {
  verifyToken,
  verifyEmployee,
  verifyManager,
  verifyTPD,
  verifyTPDorManager,
} = require("../auth/verifyToken");

router.post("/my", validateGetMySkills, getMySkills);
router.get("/categories", getCategories);
router.post("/subcategories", validateGetSubcategories, getSubCategories);
router.post(
  "/employee",
  verifyToken,
  validateAddEmployeeSkill,
  addEmployeeSkill
);
router.post("/history", validateGetAllSkillHistory, getAllSkillHistory);

router.post("/tracking", validateGetAllSkillTracking, getAllSkillTracking);

router.post(
  "/tracking/export",
  validateGetAllSkillTracking,
  exportSkillTracking
);

router.post("/history/export", validateExportAllSkillHistory, exportSkillHistory);
router.put("/employee", validateEditEmployeeSkill, editEmployeeSkill);
router.delete("/employee", validateDeleteEmployeeSkill, deleteEmployeeSkill);
router.post("/employee/all", validateGetEmployeeSkills, getEmployeeSkills);

router.delete("/", validateDeleteSkill, deleteSkill);

router.post("/", validateAddSkill, addSkill);
router.put("/", validateEditSkill, editSkill);
router.get("/", getSkills);
router.post("/all/export", exportSkills);

module.exports = router;

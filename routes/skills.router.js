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
  validateAddEmployeeSkill,
  addEmployeeSkill
);
router.post("/history", verifyTPD,validateGetAllSkillHistory, getAllSkillHistory);

router.post("/tracking", verifyTPD,validateGetAllSkillTracking, getAllSkillTracking);

router.post(
  "/tracking/export",
  verifyTPD,
  validateGetAllSkillTracking,
  exportSkillTracking
);

router.post("/history/export", verifyTPD,validateExportAllSkillHistory, exportSkillHistory);
router.put("/employee", validateEditEmployeeSkill, editEmployeeSkill);
router.delete("/employee", validateDeleteEmployeeSkill, deleteEmployeeSkill);
router.post("/employee/all", validateGetEmployeeSkills, getEmployeeSkills);

router.delete("/", verifyTPD,validateDeleteSkill, deleteSkill);

router.post("/", verifyTPD,validateAddSkill, addSkill);
router.put("/", verifyTPD,validateEditSkill, editSkill);
router.get("/", getSkills);
router.post("/all/export", verifyTPD,exportSkills);

module.exports = router;

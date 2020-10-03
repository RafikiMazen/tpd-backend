const express = require("express");
const router = express.Router();

const {
  getEmployee,
  getEmployeeSkills,
  getEmployeeCertificates,
  getEmployeeTitles,
  getEmployeeNames,
  getEmployeeFunctions,
  getAllEmployees,
  getEmployeeWorkgroups,
  getEmployeeAssignment,
  exportAll,
} = require("../services/employee_profiles.service");

const {
  validateGetEmployee,
  validateGetEmployeeSkills,
  validateGetEmployeeCertificates,
  validateGetAllEmployees,
  validateGetEmployeeAssignment,
} = require("../middlewares/validations/employee_profile.validations");
// const {
//   verifyToken,
//   verifyAdmin,
//   verifySales,
//   verifyTech,
//   authorizeUser,
//   authorizeEdit,
// } = require('../auth/verifyToken')

router.post("/one", validateGetEmployee, getEmployee);
router.post("/skills", validateGetEmployeeSkills, getEmployeeSkills);
router.post(
  "/certificates",
  validateGetEmployeeCertificates,
  getEmployeeCertificates
);
router.post(
  "/assignments",
  validateGetEmployeeAssignment,
  getEmployeeAssignment
);
router.post("/all", validateGetAllEmployees, getAllEmployees);
router.post("/all/export", validateGetAllEmployees, exportAll);

router.get("/titles", getEmployeeTitles);
router.get("/names", getEmployeeNames);
router.get("/functions", getEmployeeFunctions);
router.get("/workgroups", getEmployeeWorkgroups);
module.exports = router;

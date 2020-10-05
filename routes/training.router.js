const express = require("express");
const router = express.Router();

const {
  getEmployeeTrainings,
  getMyTrainings,
  exportEmployeeTrainings,
  getEmployeesTrainings,
} = require("../services/trainings.service");

const {
  validateGetEmployeeTrainings,
  validateGetEmployeesTrainings,
} = require("../middlewares/validations/training.validations");
// const {
//   verifyToken,
//   verifyAdmin,
//   verifySales,
//   verifyTech,
//   authorizeUser,
//   authorizeEdit,
// } = require('../auth/verifyToken')

router.post(
  "/employeesTrainings",
  validateGetEmployeesTrainings,
  getEmployeesTrainings
);

router.post(
  "/employeeTrainings",
  validateGetEmployeeTrainings,
  getEmployeeTrainings
);

router.post(
  "/employeesTrainings/export",
  validateGetEmployeeTrainings,
  exportEmployeeTrainings
);
router.post("/my", getMyTrainings);

module.exports = router;

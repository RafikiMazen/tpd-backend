const express = require("express");
const router = express.Router();

const {
  getEmployeeTrainings,
  getMyTrainings,
  exportEmployeeTrainings,
} = require("../services/trainings.service");

const {
  validateGetEmployeeTrainings,
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
  "/employeeTrainings",
  validateGetEmployeeTrainings,
  getEmployeeTrainings
);
router.post(
  "/employeeTrainings/export",
  validateGetEmployeeTrainings,
  exportEmployeeTrainings
);
router.post("/my", getMyTrainings);

module.exports = router;

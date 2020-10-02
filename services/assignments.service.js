const Assignment = require("../models/assignment.model");
const EmployeeProfile = require("../models/employee_profiles.model");
const jwt = require("jsonwebtoken");

const getMyAssignmentsHistory = async (req, res) => {
  try {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[0], process.env.JWT_KEY);
    let result;
    result = await EmployeeProfile.findAll({
      where: [{ user_id: decoded.id }],
      include: [
        {
          model: Assignment,
        },
      ],
    });
    if (!result) {
      return res.json({
        error: "Employee does not exist",
      });
    }

    return res.json({
      Employee: result,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
    });
  }
};

const addAssignment = async (req, res) => {
  try {
    const assignment = req.body.Assignment;
    const result = await EmployeeProfile.findAll({
      where: [{ user_id: assignment.employee_id }],
    });
    if (!result) {
      return res.json({
        error: "Employee does not exist",
      });
    }

    const orderCreated = await Assignment.create(assignment);

    return res.json({
      msg: "Assignment added",
      // statusCode: statusCodes.success,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
    });
  }
};

const getMyAssignments = async (req, res) => {
  try {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[0], process.env.JWT_KEY);
    let result;
    result = await EmployeeProfile.findOne({
      where: [{ user_id: decoded.id }],
      include: [
        {
          model: Assignment,
          // where:[{release_date: [Op.gte] moment().toDate()}]
        },
      ],
    });
    if (!result) {
      return res.json({
        error: "Employee does not exist",
      });
    }

    return res.json({
      Employee: result,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
    });
  }
};

const getEmployeeAssignmentsHistory = async (req, res) => {
  try {
    let result;
    result = await EmployeeProfile.findAll({
      where: [{ id: req.body.employee_id }],
      include: [
        {
          model: Assignment,
        },
      ],
    });
    if (!result) {
      return res.json({
        error: "Employee does not exist",
      });
    }

    return res.json({
      Employee: result,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
    });
  }
};

const getEmployeeAssignments = async (req, res) => {
  try {
    let result;
    result = await EmployeeProfile.findOne({
      where: [{ id: req.body.employee_id }],
      include: [
        {
          model: Assignment,
          // where:[{release_date:[Op.gte]: moment().toDate()}]
        },
      ],
    });
    if (!result) {
      return res.json({
        error: "Employee does not exist",
      });
    }

    return res.json({
      Employee: result,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
    });
  }
};

module.exports = {
  getMyAssignmentsHistory,
  getMyAssignments,
  getEmployeeAssignments,
  getEmployeeAssignmentsHistory,
  addAssignment,
};

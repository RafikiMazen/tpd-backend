const EmployeeProfile = require("../models/employee_profiles.model");
const EmployeeTraining = require("../models/employee_training.model");
const jwt = require("jsonwebtoken");
const flatten = require("flat").flatten;
const { Parser } = require("json2csv");

const getEmployeesTrainings = async (req, res) => {
  try {
    const filters = req.body.Filters;
    var filtersMainApplied = [];
    var filtersEmployee = [];

    if (filters) {
      const values = Object.values(filters);
      Object.keys(filters).forEach((key, index) => {
        if (key == "employee_name") {
          filtersEmployee.push({
            name: filters[key],
          });
        } else {
          filtersMainApplied.push({
            [key]: filters[key],
          });
        }
      });
    }
    let result;

    result = await EmployeeTraining.findAll({
      // offset: page * limit,
      // limit,

      where: filtersMainApplied,
      order: [
        ["updatedAt", "DESC"],
        ["id", "DESC"],
      ],
      include: [{ model: EmployeeProfile, where: filtersEmployee }],
    });
    const count = result.length;

    return res.json({
      Trainings: result,
      count,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
      // statusCode: unknown
    });
  }
};

const exportEmployeeTrainings = async (req, res) => {
  try {
    const filters = req.body.Filters;
    var filtersMainApplied = [];
    var filtersEmployee = [];

    if (filters) {
      const values = Object.values(filters);
      Object.keys(filters).forEach((key, index) => {
        if (key == "employee_name") {
          filtersEmployee.push({
            name: filters[key],
          });
        } else {
          filtersMainApplied.push({
            [key]: filters[key],
          });
        }
      });
    }
    let results;

    results = await EmployeeTraining.findAll({
      // offset: page * limit,
      // limit,

      where: filtersMainApplied,
      order: [
        ["updatedAt", "DESC"],
        ["id", "DESC"],
      ],
      include: [{ model: EmployeeProfile, where: filtersEmployee }],
    });

    res.set("Content-Type", "application/octet-stream");
    const result = JSON.parse(JSON.stringify(results));
    var max_length = 0;
    var fields = [];
    var fieldNames = [];
    for (var i = 0; i < result.length; i++) {
      if (Object.keys(flatten(result[i])).length > max_length) {
        max_length = Object.keys(flatten(result[i])).length;
        fields = Object.keys(flatten(result[i]));
        fieldNames = Object.keys(flatten(result[i]));
      }
    }
    const parser = new Parser({
      fields,
      unwind: fieldNames,
    });
    const data = parser.parse(result);
    res.attachment("EmployeeTrainings.csv");
    res.status(200).send(data);

    return;
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
      // statusCode: unknown
    });
  }
};

const getMyTrainings = async (req, res) => {
  try {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[0], process.env.JWT_KEY);
    let result;
    result = await EmployeeProfile.findOne({
      where: { user_id: decoded.id },
      include: [
        {
          model: EmployeeTraining,
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

const getEmployeeTrainings = async (req, res) => {
  try {
    let result;
    result = await EmployeeProfile.findOne({
      where: { id: req.body.employee_id },
      include: [
        {
          model: EmployeeTraining,
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
  getEmployeeTrainings,
  getMyTrainings,
  exportEmployeeTrainings,
  getEmployeesTrainings,
};

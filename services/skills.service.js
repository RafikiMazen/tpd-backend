const EmployeeProfile = require("../models/employee_profiles.model");
const EmployeeSkills = require("../models/employee_skills.model");
const Skill = require("../models/skills.model");
const jwt = require("jsonwebtoken");
const ResourceRequestSkill = require("../models/resource_request_skills.model");
const SkillCatalog = require("../models/skillcatalog.model");

const getMySkills = async (req, res) => {
  try {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[0], process.env.JWT_KEY);
    let result;
    result = await EmployeeProfile.findAll({
      where: [{ user_id: decoded.id }],
      include: [{ model: EmployeeSkills, include: [{ model: Skill }] }],
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

const getCategories = async (req, res) => {
  try {
    let result;
    result = await SkillCatalog.aggregate("category", "DISTINCT", {
      plain: false,
    });
    var array = [];
    for (const row of result) {
      array.push(row.DISTINCT);
    }
    return res.json({
      Categories: array,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
    });
  }
};
const getSubCategories = async (req, res) => {
  try {
    let result;
    result = await SkillCatalog.findAll({
      where: { category: req.body.category },
      attributes: ["subcategory"],
    });
    var array = [];
    for (const row of result) {
      array.push(row.subcategory);
    }
    return res.json({
      Subcategories: array,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
    });
  }
};

const addEmployeeSkill = async (req, res) => {
  try {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[0], process.env.JWT_KEY);
    const employee = await EmployeeProfile.findOne({
      where: { user_id: decoded.id },
    });
    if (!employee) {
      return res.json({
        error: "Employee Does not exist",
        // statusCode: statusCodes.entityNotFound,
      });
    }
    const employee_id = employee.id;
    const skill_id = req.body.skill_id;

    // const resourceRequest = req.body.ResourceRequest
    const checkRequest = await Skill.findOne({
      id: skill_id,
    });
    if (!checkRequest) {
      return res.json({
        error: "Skill Does not exist",
        // statusCode: statusCodes.entityNotFound,
      });
    }
    const orderCreated = await EmployeeSkills.create({
      employee_id: employee_id,
      skill_id: skill_id,
    });

    return res.json({
      msg: "Skill successfully added to employee",
      // statusCode: statusCodes.success,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
      // statusCode: statusCodes.unknown,
    });
  }
};

const editEmployeeSkill = async (req, res) => {
  try {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[0], process.env.JWT_KEY);
    const employee = await EmployeeProfile.findOne({
      where: { user_id: decoded.id },
    });
    if (!employee) {
      return res.json({
        error: "Employee Does not exist",
        // statusCode: statusCodes.entityNotFound,
      });
    }
    const employee_id = employee.id;
    const skill_id = req.body.skill_id;

    // const resourceRequest = req.body.ResourceRequest
    const checkRequest = await Skill.findOne({
      id: skill_id,
    });
    if (!checkRequest) {
      return res.json({
        error: "Skill Does not exist",
        // statusCode: statusCodes.entityNotFound,
      });
    }
    const employeeSkill = await EmployeeSkills.findOne({
      where: { id: req.body.id },
    });
    if (!employeeSkill) {
      return res.json({
        error: "Employee Skill Does not exist",
        // statusCode: statusCodes.entityNotFound,
      });
    }
    const body = req.body;
    body.employee_id = employee_id;
    const orderCreated = await EmployeeSkills.update(body, {
      where: {
        id: req.body.skill_id,
      },
    });

    return res.json({
      msg: "Employee Skill successfully updated",
      // statusCode: statusCodes.success,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
      // statusCode: statusCodes.unknown,
    });
  }
};

const deleteEmployeeSkill = async (req, res) => {
  try {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[0], process.env.JWT_KEY);
    const employee = await EmployeeProfile.findOne({
      where: { user_id: decoded.id },
    });
    if (!employee) {
      return res.json({
        error: "Employee Does not exist",
        // statusCode: statusCodes.entityNotFound,
      });
    }
    const employee_id = employee.id;
    const skill = await EmployeeSkills.findOne({
      where: {
        id: req.body.id,
        employee_id: employee_id,
      },
    });
    if (!skill) {
      return res.json({
        error: "This skill does not exist for this employeed",
        // statusCode: statusCodes.entityNotFound,
      });
    }

    await EmployeeSkills.destroy({
      where: {
        id: req.body.id,
        employee_id: employee_id,
      },
    });

    return res.json({
      msg: "Employee Skill successfully deleted",
      // statusCode: statusCodes.success,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
      // statusCode: statusCodes.unknown,
    });
  }
};

const addSkill = async (req, res) => {
  try {
    const SkillBody = req.body.Skill;
    const skill = await Skill.findOne({
      where: { skill_name: SkillBody.skill_name },
    });
    if (skill) {
      return res.json({
        error: "This skill name already exits",
        // statusCode: statusCodes.entityNotFound,
      });
    }

    const orderCreated = await Skill.create(SkillBody);

    return res.json({
      msg: "Skill added",
      // statusCode: statusCodes.success,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
      // statusCode: statusCodes.unknown,
    });
  }
};
module.exports = {
  getMySkills,
  getCategories,
  getSubCategories,
  addEmployeeSkill,
  editEmployeeSkill,
  deleteEmployeeSkill,
  addSkill,
};

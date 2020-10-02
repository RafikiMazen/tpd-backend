const EmployeeProfile = require("../models/employee_profiles.model");
const EmployeeSkills = require("../models/employee_skills.model");
const Skill = require("../models/skills.model");
const jwt = require("jsonwebtoken");
const ResourceRequestSkill = require("../models/resource_request_skills.model");
const SkillCatalog = require("../models/skillcatalog.model");
const EmployeeSkillHistory = require("../models/employee_skills_history.model");
const Manager = require("../models/managers.model");
const flatten = require("flat").flatten;
const { Parser } = require("json2csv");
const User = require("../models/users.model");
const { sequelize } = require("../config/dbConfig");

const getMySkills = async (req, res) => {
  try {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[0], process.env.JWT_KEY);
    let result;
    result = await EmployeeProfile.findOne({
      where: { user_id: decoded.id },
      include: [
        { model: EmployeeSkills, include: [{ model: Skill }] },
        { model: Manager },
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
const getEmployeeSkills = async (req, res) => {
  try {
    // const usertoken = req.headers.authorization;
    // const token = usertoken.split(" ");
    // const decoded = jwt.verify(token[0], process.env.JWT_KEY);
    let result;
    result = await EmployeeProfile.findOne({
      where: { id: req.body.employee_id },
      include: [
        { model: EmployeeSkills, include: [{ model: Skill }] },
        { model: Manager },
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

const getAllSkillHistory = async (req, res) => {
  try {
    // const page = req.body.Page;
    // const limit = req.body.Limit;
    const filters = req.body.Filters;
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[0], process.env.JWT_KEY);
    var filtersSkill = [];
    var filtersEmployee = [];
    var filtersUser = [];

    if (filters) {
      const values = Object.values(filters);
      Object.keys(filters).forEach((key, index) => {
        if (key == "skill_id") {
          filtersSkill.push({
            [key]: filters[key],
          });
        } else {
          if (key == "user_name") {
            filtersUser.push({
              [key]: filters[key],
            });
          } else {
            filtersEmployee.push({
              [key]: filters[key],
            });
          }
        }
      });
    }
    let result;

    result = await EmployeeSkillHistory.findAll({
      // offset: page * limit,
      // limit,
      // where: filtersSkill,
      order: [
        ["updatedAt", "DESC"],
        ["id", "DESC"],
      ],
      include: [
        {
          model: EmployeeSkills,
          // where: filtersSkill,
        },
        {
          model: Skill,
          where: filtersSkill,
        },
        {
          model: EmployeeProfile,
          where: filtersEmployee,
          include: [
            {
              model: User,
              where: filtersUser,
            },
          ],
        },
      ],
    });
    const count = result.length;

    return res.json({
      Skills: result,
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

const exportSkillHistory = async (req, res) => {
  try {
    // const page = req.body.Page;
    // const limit = req.body.Limit;
    const filters = req.body.Filters;
    const usertoken = req.headers.authorization;
    const token = usertoken.split(" ");
    const decoded = jwt.verify(token[0], process.env.JWT_KEY);
    var filtersSkill = [];
    var filtersEmployee = [];
    var filtersUser = [];

    if (filters) {
      const values = Object.values(filters);
      Object.keys(filters).forEach((key, index) => {
        if (key == "skill_id") {
          filtersSkill.push({
            [key]: filters[key],
          });
        } else {
          if (key == "user_name") {
            filtersUser.push({
              [key]: filters[key],
            });
          } else {
            filtersEmployee.push({
              [key]: filters[key],
            });
          }
        }
      });
    }
    let skillHistories;

    skillHistories = await EmployeeSkillHistory.findAll({
      // offset: page * limit,
      // limit,
      // where: filtersSkill,
      order: [
        ["updatedAt", "DESC"],
        ["id", "DESC"],
      ],
      include: [
        {
          model: EmployeeSkills,
          // where: filtersSkill,
        },
        {
          model: Skill,
          where: filtersSkill,
        },
        {
          model: EmployeeProfile,
          where: filtersEmployee,
          include: [
            {
              model: User,
              where: filtersUser,
            },
          ],
        },
      ],
    });
    const count = skillHistories.length;

    res.set("Content-Type", "application/octet-stream");
    const result = JSON.parse(JSON.stringify(skillHistories));
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
    res.attachment("SkillHistory.csv");
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

const getAllSkillTracking = async (req, res) => {
  try {
    const filters = req.body.Filters;
    var filtersProfile = [];
    var filtersEmployee = [];

    if (filters) {
      const values = Object.values(filters);
      Object.keys(filters).forEach((key, index) => {
        filtersProfile.push({
          [key]: filters[key],
        });
      });
    }
    var nameQuery = "";
    var statusQuery = "";

    if (filters) {
      if (filters.name) nameQuery = ' where p.name = "' + filters.name + '" ';
      if (filters.status) {
        if (filters.status == "Last Updated")
          statusQuery = " Having max(last_used_date) IS not NULL ";
        if (filters.status == "Non-registered")
          statusQuery = "  Having max(last_used_date) IS NULL ";
      }
    }
    // let result;
    const [results, metadata] = await sequelize.query(
      " SELECT  max(last_used_date) AS LastUpdated ,employee_id ,p.* FROM employee_profiles p  left join employee_skills s on s.employee_id=p.id " +
        nameQuery +
        " group by p.id " +
        statusQuery +
        " order by LastUpdated desc;"
    );

    return res.json({
      Skills: results,
      // count,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
      // statusCode: unknown
    });
  }
};

const exportSkillTracking = async (req, res) => {
  try {
    const filters = req.body.Filters;
    var filtersProfile = [];
    var filtersEmployee = [];

    if (filters) {
      const values = Object.values(filters);
      Object.keys(filters).forEach((key, index) => {
        filtersProfile.push({
          [key]: filters[key],
        });
      });
    }
    var nameQuery = "";
    var statusQuery = "";

    if (filters) {
      if (filters.name) nameQuery = ' where p.name = "' + filters.name + '" ';
      if (filters.status) {
        if (filters.status == "Last Updated")
          statusQuery = " Having max(last_used_date) IS not NULL ";
        if (filters.status == "Non-registered")
          statusQuery = "  Having max(last_used_date) IS NULL ";
      }
    }
    // let result;
    const [results, metadata] = await sequelize.query(
      " SELECT  max(last_used_date) AS LastUpdated ,employee_id ,p.* FROM employee_profiles p  left join employee_skills s on s.employee_id=p.id " +
        nameQuery +
        " group by p.id " +
        statusQuery +
        " order by LastUpdated desc;"
    );

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
    res.attachment("SkillTracking.csv");
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

const exportSkills = async (req, res) => {
  try {
    const results = await Skill.findAll({});

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
    res.attachment("Skills.csv");
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
const getSkills = async (req, res) => {
  try {
    const result = await Skill.findAll({});

    return res.json({
      Skills: result,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
    });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skillID = req.body.skill_id;
    const checkSkill = await Skill.findOne({
      skill_id: skillID,
    });
    if (!checkSkill) {
      return res.json({
        error: "Skill Does not exist",
        // statusCode: statusCodes.entityNotFound,
      });
    }

    const skillDeleted = await Skill.destroy({
      where: {
        skill_id: skillID,
      },
    });

    return res.json({
      msg: "Skill successfully deleted",
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

    // const resourceRequest = req.body.ResourceRequest
    var checkSkill = await Skill.findOne({
      skill_id: req.body.skill_id,
    });
    if (!checkSkill) {
      return res.json({
        error: "Skill Does not exist",
        // statusCode: statusCodes.entityNotFound,
      });
    }
    var body = req.body;
    body.employee_id = employee_id;
    body.skill_id = req.body.skill_id;
    const orderCreated = await EmployeeSkills.create(body);
    const manager = await Manager.findOne({
      where: { id: employee.direct_manager },
    });
    body.title = employee.title;
    body.function = employee.function;
    body.manager_name = manager.name;
    await EmployeeSkillHistory.create(body);
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
    const manager = await Manager.findOne({
      where: { id: employee.direct_manager },
    });
    body.title = employee.title;
    body.function = employee.function;
    body.manager_name = manager.name;
    await EmployeeSkillHistory.create({
      body,
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

const editSkill = async (req, res) => {
  try {
    const SkillBody = req.body.Skill;
    const skill = await Skill.findOne({
      where: { skill_id: SkillBody.skill_id },
    });
    if (!skill) {
      return res.json({
        error: "This skill does not exist",
        // statusCode: statusCodes.entityNotFound,
      });
    }

    const orderCreated = await Skill.update(SkillBody, {
      where: { skill_id: SkillBody.skill_id },
    });

    return res.json({
      msg: "Skill updated",
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
  editSkill,
  getSkills,
  getAllSkillHistory,
  exportSkillHistory,
  deleteSkill,
  getAllSkillTracking,
  exportSkillTracking,
  exportSkills,
  getEmployeeSkills,
};

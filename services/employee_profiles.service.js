const EmployeeProfile = require('../models/employee_profiles.model')
const EmployeeSkillsProfile = require('../models/employee_skills.model')
const Skill = require('../models/skills.model')
const Certification = require('../models/certifications.model')
const EmployeeCertificationModel = require('../models/employee_certifications.model')

const getEmployee = async (req, res) => {
  try {
    let result
    result = await EmployeeProfile.findOne({
      where: [{ id: req.body.Employee.id }],
    })
    if (!result) {
      return res.json({
        error: 'Employee does not exist',
      })
    }

    return res.json({
      Employee: result,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
    })
  }
}

const getEmployeeSkills = async (req, res) => {
  try {
    let result
    result = await EmployeeProfile.findAll({
      where: [{ id: req.body.Employee.id }],
      include: [{ model: EmployeeSkillsProfile, include: [{ model: Skill }] }],
    })
    if (!result) {
      return res.json({
        error: 'Employee does not exist',
      })
    }

    return res.json({
      Employee: result,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
    })
  }
}

const getEmployeeCertificates = async (req, res) => {
  try {
    let result
    result = await EmployeeProfile.findAll({
      where: [{ id: req.body.Employee.id }],
      include: [
        {
          model: EmployeeCertificationModel,
          include: [{ model: Certification }],
        },
      ],
    })
    if (!result) {
      return res.json({
        error: 'Employee does not exist',
      })
    }

    return res.json({
      Employee: result,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
    })
  }
}

const getEmployeeTitles = async (req, res) => {
  try {
    let result
    result = await EmployeeProfile.aggregate('title', 'DISTINCT', {
      plain: false,
    })
    var array = []
    for(const row of result){
      array.push(row.DISTINCT)
    }
    return res.json({
      Titles: array,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
    })
  }
}

const getEmployeeNames = async (req, res) => {
  try {
    let result
    result = await EmployeeProfile.aggregate('name', 'DISTINCT', {
      plain: false,
    })
    var array = []
    for(const row of result){
      array.push(row.DISTINCT)
    }
    return res.json({
      Names: array,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
    })
  }
}

const getEmployeeFunctions = async (req, res) => {
  try {
    let result
    result = await EmployeeProfile.aggregate('function', 'DISTINCT', {
      plain: false,
    })
    var array = []
    for(const row of result){
      array.push(row.DISTINCT)
    }
    return res.json({
      Functions: array,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
    })
  }
}

module.exports = {
  getEmployee,
  getEmployeeSkills,
  getEmployeeCertificates,
  getEmployeeTitles,
  getEmployeeNames,
  getEmployeeFunctions
}

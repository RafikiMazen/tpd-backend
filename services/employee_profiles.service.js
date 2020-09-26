const EmployeeProfile = require('../models/employee_profiles.model')
const EmployeeSkillsProfile = require('../models/employee_skills.model')
const Skill = require('../models/skills.model')
const Certification = require('../models/certifications.model')
const EmployeeCertificationModel = require('../models/employee_certifications.model')
const Assignment = require('../models/assignment.model')
const EmployeeCertification = require('../models/employee_certifications.model')
const EmployeeSkills = require('../models/employee_skills.model')

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

const getAllEmployees = async (req, res) => {
  try {
    const page = req.body.Page
    const limit = req.body.Limit
    const filters = req.body.Filters
    var filtersMainApplied = []
    if (filters) {
      const values = Object.values(filters)
      Object.keys(filters).forEach((key, index) => {
        filtersMainApplied.push({
          [key]: filters[key],
        })
      })
    }

    let result

    result = await EmployeeProfile.findAll({
      offset: page * limit,
      limit,

      where: filtersMainApplied,
      order: [
        ['updatedAt', 'DESC'],
        ['id', 'DESC'],
      ],
    })
    const count = result.length

    return res.json({
      Employees: result,
      count,
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
    const account = await EmployeeProfile.findOne({
      where:{id:req.body.employee_id}
    })
    if(!account){
      return res.json({
        error: 'Employee does not exist',
      })
    }
    let result
    result = await EmployeeSkills.findAll({
      where: [{ employee_id: req.body.employee_id }],
      include: [{ model: Skill }],
    })
    return res.json({
      Skills: result,
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
    const account = await EmployeeProfile.findOne({
      where:{id:req.body.employee_id}
    })
    if(!account){
      return res.json({
        error: 'Employee does not exist',
      })
    }
    let result
    result = await EmployeeCertification.findAll({
      where: [{ employee_id: req.body.employee_id }],
      include: [{ model: Certification }],
    })
    return res.json({
      Certificates: result,
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
    for (const row of result) {
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
    for (const row of result) {
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

const getEmployeeWorkgroups = async (req, res) => {
  try {
    let result
    result = await EmployeeProfile.aggregate('workgroup', 'DISTINCT', {
      plain: false,
    })
    var array = []
    for (const row of result) {
      array.push(row.DISTINCT)
    }
    return res.json({
      Workgroups: array,
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
    for (const row of result) {
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

const getEmployeeAssignment = async (req, res) => {
  try {
    const account = await EmployeeProfile.findOne({
      where:{id:req.body.employee_id}
    })
    if(!account){
      return res.json({
        error: 'Employee does not exist',
      })
    }
    let result
    result = await Assignment.findAll({
      where: [{ employee_id: req.body.employee_id }],
    })

    return res.json({
      Assignments: result,
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
  getAllEmployees,
  getEmployeeSkills,
  getEmployeeCertificates,
  getEmployeeTitles,
  getEmployeeNames,
  getEmployeeFunctions,
  getEmployeeWorkgroups,
  getEmployeeAssignment,
}

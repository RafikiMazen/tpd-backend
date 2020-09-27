const { Router } = require('express')
const Certification = require('../models/certifications.model')
const EmployeeCertificationModel = require('../models/employee_certifications.model')
const EmployeeProfile = require('../models/employee_profiles.model')

const EmployeeSkills = require('../models/employee_skills.model')
const Skill = require('../models/skills.model')
const jwt = require('jsonwebtoken')
const EmployeeCertification = require('../models/employee_certifications.model')

const getMyCertificates = async (req, res) => {
  try {
    const usertoken = req.headers.authorization
    const token = usertoken.split(' ')
    const decoded = jwt.verify(token[0], process.env.JWT_KEY)
    let result
    result = await EmployeeProfile.findAll({
      where: [{ user_id: decoded.id }],
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

const addEmployeeCertificate = async (req, res) => {
  try {
    const usertoken = req.headers.authorization
    const token = usertoken.split(' ')
    const decoded = jwt.verify(token[0], process.env.JWT_KEY)
    const employee = await EmployeeProfile.findOne({
      where: { user_id: decoded.id },
    })
    if (!employee) {
      return res.json({
        error: 'Employee Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }
    const employee_id = employee.id
    const certificate_id = req.body.certificate_id

    // const resourceRequest = req.body.ResourceRequest
    const checkRequest = await Certification.findOne({
      id: certificate_id,
    })
    if (!checkRequest) {
      return res.json({
        error: 'Certification Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }
    const orderCreated = await EmployeeCertification.create({
      employee_id: employee_id,
      certification_id: certificate_id,
      expiry_date: req.body.expiry_date,
    })

    return res.json({
      msg: 'Certificate successfully added to employee',
      // statusCode: statusCodes.success,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
      // statusCode: statusCodes.unknown,
    })
  }
}

const editEmployeeCertificate = async (req, res) => {
  try {
    const usertoken = req.headers.authorization
    const token = usertoken.split(' ')
    const decoded = jwt.verify(token[0], process.env.JWT_KEY)
    const employee = await EmployeeProfile.findOne({
      where: { user_id: decoded.id },
    })
    if (!employee) {
      return res.json({
        error: 'Employee Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }
    const employee_id = employee.id
    const certificate_id = req.body.certificate_id

    // const resourceRequest = req.body.ResourceRequest
    const checkRequest = await Certification.findOne({
      id: certificate_id,
    })
    if (!checkRequest) {
      return res.json({
        error: 'Certification Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }
    const certificate = await EmployeeCertification.findOne({
      where: { id: req.body.id },
    })
    if (!certificate) {
      return res.json({
        error: 'Employee Certification Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }
    const body = req.body
    body.employee_id = employee_id
    const orderCreated = await EmployeeCertification.update(body, {
      where: {
        id: req.body.id,
      },
    })

    return res.json({
      msg: 'Employee Certificate successfully updated',
      // statusCode: statusCodes.success,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
      // statusCode: statusCodes.unknown,
    })
  }
}

const deleteEmployeeCertificate = async (req, res) => {
  try {
    const usertoken = req.headers.authorization
    const token = usertoken.split(' ')
    const decoded = jwt.verify(token[0], process.env.JWT_KEY)
    const employee = await EmployeeProfile.findOne({
      where: { user_id: decoded.id },
    })
    if (!employee) {
      return res.json({
        error: 'Employee Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }
    const employee_id = employee.id
    const certificate = await EmployeeCertification.findOne({
      where: {
        id: req.body.id,
        employee_id: employee_id,
      },
    })
    if (!certificate) {
      return res.json({
        error: 'This certification does not exist for this employeed',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    await EmployeeCertification.destroy({
      where: {
        id: req.body.id,
        employee_id: employee_id,
      },
    })

    return res.json({
      msg: 'Employee Certificate successfully deleted',
      // statusCode: statusCodes.success,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
      // statusCode: statusCodes.unknown,
    })
  }
}

const addCertification = async (req, res) => {
  try {
    const Certification = req.body.Certification
    const certification = await Certification.findOne({where:{certification_name=Certification.certification_name}})
    if(certification)
    {
      return res.json({
        error: 'This certification name already exits',
        // statusCode: statusCodes.entityNotFound,
      }) 
    }

    const orderCreated = await Certification.create(Certification)

    return res.json({
      msg: 'Certification added',
      // statusCode: statusCodes.success,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
      // statusCode: statusCodes.unknown,
    })
  }
}
module.exports = {
  getMyCertificates,
  addEmployeeCertificate,
  editEmployeeCertificate,
  deleteEmployeeCertificate,
  addCertification
}

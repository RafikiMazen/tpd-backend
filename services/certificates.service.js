const { Router } = require('express')
const Certification = require('../models/certifications.model')
const EmployeeCertificationModel = require('../models/employee_certifications.model')
const EmployeeProfile = require('../models/employee_profiles.model')
const EmployeeSkills = require('../models/employee_skills.model')
const Skill = require('../models/skills.model')
const jwt = require('jsonwebtoken')
const EmployeeCertification = require('../models/employee_certifications.model')
const CertificationProvider = require('../models/certification_providers.model')
const flatten = require('flat').flatten
const { Parser } = require('json2csv')
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
          include: [
            {
              model: Certification,
              include: [{ model: CertificationProvider }],
            },
          ],
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
    const certification_name = req.body.certification_name

    // const resourceRequest = req.body.ResourceRequest
    var checkCertification = await Certification.findOne({
      certification_name: certification_name,
    })
    if (!checkCertification) {
      checkCertification = await Certification.create({
        certification_name: certification_name,
      })
    }
    const orderCreated = await EmployeeCertification.create({
      employee_id: employee_id,
      certification_id: checkCertification.id,
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
    const CertificationBody = req.body.Certification
    const certification = await Certification.findOne({
      where: { certification_name: CertificationBody.certification_name },
    })
    if (certification) {
      return res.json({
        error: 'This certification name already exits',
        // statusCode: statusCodes.entityNotFound,
      })
    }
    const provider = await CertificationProvider.findOne({
      where: {
        certification_provider_id: CertificationBody.certification_provider_id,
      },
    })
    if (!provider) {
      return res.json({
        error: 'This certification provider does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const orderCreated = await Certification.create(CertificationBody)

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

const addCertificationProvider = async (req, res) => {
  try {
    const CertificationBody = req.body.CertificationProvider
    const certification = await CertificationProvider.findOne({
      where: {
        certification_provider_name:
          CertificationBody.certification_provider_name,
      },
    })
    if (certification) {
      return res.json({
        error: 'This certification provider name already exits',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const orderCreated = await CertificationProvider.create(CertificationBody)

    return res.json({
      msg: 'Certification Provider added',
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

const editCertificationProvider = async (req, res) => {
  try {
    const CertificationBody = req.body.CertificationProvider
    const certification = await CertificationProvider.findOne({
      where: {
        certification_provider_id: CertificationBody.certification_provider_id,
      },
    })
    if (!certification) {
      return res.json({
        error: 'This certification provider does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const orderCreated = await CertificationProvider.update(CertificationBody, {
      where: {
        certification_provider_id: CertificationBody.certification_provider_id,
      },
    })

    return res.json({
      msg: 'Certification Provider updated',
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

const deleteCertificationProvider = async (req, res) => {
  try {
    const CertificationBody = req.body.CertificationProvider
    const certification = await CertificationProvider.findOne({
      where: {
        id: CertificationBody.id,
      },
    })
    if (!certification) {
      return res.json({
        error: 'This certification provider does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const orderCreated = await CertificationProvider.destroy({
      where: {
        certification_provider_id: CertificationBody.certification_provider_id,
      },
    })

    return res.json({
      msg: 'Certification Provider deleted',
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

const getCertificateProviders = async (req, res) => {
  try {
    let result
    result = await CertificationProvider.findAll({})
    return res.json({
      CertificateProviders: result,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
    })
  }
}

const getCertificatesByProvider = async (req, res) => {
  try {
    let result
    result = await Certification.findAll({
      where: [
        { certification_provider_id: req.body.certification_provider_id },
      ],
    })
    return res.json({
      Certifications: result,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
    })
  }
}

const getCertificates = async (req, res) => {
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

    result = await Certification.findAll({
      offset: page * limit,
      limit,
      include: [
        { model: CertificationProvider },
        { where: filtersMainApplied },
      ],
      order: [
        ['updatedAt', 'DESC'],
        ['id', 'DESC'],
      ],
    })
    const count = result.length

    return res.json({
      Certifications: result,
      count,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
      // statusCode: unknown
    })
  }
}

// const exportCertificates = async (req, res) => {
//   try {
//     const page = req.body.Page
//     const limit = req.body.Limit
//     const filters = req.body.Filters
//     var filtersMainApplied = []
//     if (filters) {
//       const values = Object.values(filters)
//       Object.keys(filters).forEach((key, index) => {
//         filtersMainApplied.push({
//           [key]: filters[key],
//         })
//       })
//     }
//     let result

//     result = await Certification.findAll({
//       offset: page * limit,
//       limit,
//       include: [
//         { model: CertificationProvider },
//         { where: filtersMainApplied },
//       ],
//       order: [
//         ['updatedAt', 'DESC'],
//         ['id', 'DESC'],
//       ],
//     })
//     const count = result.length
//     res.set('Content-Type', 'application/octet-stream')
//     const result = JSON.parse(JSON.stringify(requests))
//     var max_length = 0
//     var fields = []
//     var fieldNames = []
//     for (var i = 0; i < result.length; i++) {
//       if (Object.keys(flatten(result[i])).length > max_length) {
//         max_length = Object.keys(flatten(result[i])).length
//         fields = Object.keys(flatten(result[i]))
//         fieldNames = Object.keys(flatten(result[i]))
//       }
//     }
//     const parser = new Parser({
//       fields,
//       unwind: fieldNames,
//     })
//     const data = parser.parse(result)
//     res.attachment('allReleaseRequests.csv')
//     res.status(200).send(data)

//     return
//   } catch (exception) {
//     console.log(exception)
//     return res.json({
//       error: 'Something went wrong',
//       // statusCode: unknown
//     })
//   }
// }

const deleteCertification = async (req, res) => {
  try {
    const CertificationBody = req.body.Certification
    const certification = await Certification.findOne({
      where: {
        id: CertificationBody.id,
      },
    })
    if (!certification) {
      return res.json({
        error: 'This certification does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const orderCreated = await Certification.destroy({
      where: { id: CertificationBody.id },
    })

    return res.json({
      msg: 'Certification deleted',
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

const editCertification = async (req, res) => {
  try {
    const CertificationBody = req.body.Certification
    const certification = await Certification.findOne({
      where: {
        id: CertificationBody.id,
      },
    })
    if (!certification) {
      return res.json({
        error: 'This certification does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const orderCreated = await Certification.update(CertificationBody, {
      where: { id: CertificationBody.id },
    })

    return res.json({
      msg: 'Certification updated',
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
  addCertification,
  addCertificationProvider,
  editCertificationProvider,
  deleteCertificationProvider,
  getCertificateProviders,
  getCertificatesByProvider,
  getCertificates,
  deleteCertification,
  editCertification,
}

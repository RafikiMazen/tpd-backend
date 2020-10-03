const { filter } = require('compression')
const ReleaseRequest = require('../models/release_requests.model')
const ReleaseRequestAction = require('../models/release_requests_actions.model')
const nodemailer = require('nodemailer')
const flatten = require('flat').flatten
const { Parser } = require('json2csv')
const Role = require('../models/role.model')
const { userRoles } = require('../constants/enums')
const User = require('../models/users.model')
const UserRole = require('../models/user_role.model')
const jwt = require('jsonwebtoken')
const Manager = require('../models/managers.model')

//view release requests list with fiters
const getAllReleaseRequests = async (req, res) => {
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

    result = await ReleaseRequest.findAll({
      offset: page * limit,
      limit,
      where: filtersMainApplied,
      order: [
        ['updatedAt', 'DESC'],
        ['reference_number', 'DESC'],
      ],
      include: [{ model: ReleaseRequestAction }],
    })
    const count = result.length

    return res.json({
      ReleaseRequests: result,
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

const managerGetAllReleaseRequests = async (req, res) => {
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
    const usertoken = req.headers.authorization
    const token = usertoken.split(' ')
    const decoded = jwt.verify(token[0], process.env.JWT_KEY)
    const manager = Manager.findOne({ where: { user_id: decoded.id } })
    if (!manager) {
      return res.json({
        error: 'This user is not a manager',
      })
    }
    filtersMainApplied.push({ manager_name: manager.name })

    let result

    result = await ReleaseRequest.findAll({
      offset: page * limit,
      limit,
      where: filtersMainApplied,
      order: [
        ['updatedAt', 'DESC'],
        ['reference_number', 'DESC'],
      ],
      include: [{ model: ReleaseRequestAction }],
    })
    const count = result.length

    return res.json({
      ReleaseRequests: result,
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

const exportAllReleaseRequests = async (req, res) => {
  res.set('Content-Type', 'application/octet-stream')
  try {
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
    let requests

    requests = await ReleaseRequest.findAll({
      where: filtersMainApplied,
      order: [
        ['updatedAt', 'DESC'],
        ['reference_number', 'DESC'],
      ],
      include: [{ model: ReleaseRequestAction }],
    })
    const count = requests.length

    const result = JSON.parse(JSON.stringify(requests))
    var max_length = 0
    var fields = []
    var fieldNames = []
    for (var i = 0; i < result.length; i++) {
      if (Object.keys(flatten(result[i])).length > max_length) {
        max_length = Object.keys(flatten(result[i])).length
        fields = Object.keys(flatten(result[i]))
        fieldNames = Object.keys(flatten(result[i]))
      }
    }
    const parser = new Parser({
      fields,
      unwind: fieldNames,
    })
    const data = parser.parse(result)
    res.attachment('allReleaseRequests.csv')
    res.status(200).send(data)

    return
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
      // statusCode: unknown
    })
  }
}

const managerExportAllReleaseRequests = async (req, res) => {
  res.set('Content-Type', 'application/octet-stream')
  try {
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

    const usertoken = req.headers.authorization
    const token = usertoken.split(' ')
    const decoded = jwt.verify(token[0], process.env.JWT_KEY)
    const manager = Manager.findOne({ where: { user_id: decoded.id } })
    if (!manager) {
      return res.json({
        error: 'Manager profile does not exist',
      })
    }
    filtersMainApplied.push({ manager_name: manager.name })

    let requests

    requests = await ReleaseRequest.findAll({
      where: filtersMainApplied,
      order: [
        ['updatedAt', 'DESC'],
        ['reference_number', 'DESC'],
      ],
      include: [{ model: ReleaseRequestAction }],
    })
    const count = requests.length

    const result = JSON.parse(JSON.stringify(requests))
    var max_length = 0
    var fields = []
    var fieldNames = []
    for (var i = 0; i < result.length; i++) {
      if (Object.keys(flatten(result[i])).length > max_length) {
        max_length = Object.keys(flatten(result[i])).length
        fields = Object.keys(flatten(result[i]))
        fieldNames = Object.keys(flatten(result[i]))
      }
    }
    const parser = new Parser({
      fields,
      unwind: fieldNames,
    })
    const data = parser.parse(result)
    res.attachment('allReleaseRequests.csv')
    res.status(200).send(data)

    return
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
      // statusCode: unknown
    })
  }
}

const addReleaseRequest = async (req, res) => {
  try {
    const releaseRequest = req.body.ReleaseRequest

    const orderCreated = await ReleaseRequest.create(releaseRequest)

    var emails = []
    const sendList = await Role.findAll({
      where: { role_name: 'TPD Team' },
      include: [{ model: UserRole, include: [{ model: User }] }],
    })
    for (const contact of sendList) {
      for (const userrole of contact.users_roles) {
        emails.push(userrole.user.email)
      }
    }

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.sender_email,
        pass: process.env.sender_password,
        authentication: 'plain',
      },
    })
    console.log(process.env.sender_email, process.env.sender_password)
    var mailOptions = {
      from: process.env.sender_email,
      to: emails,
      subject: 'New Release Request',
      text: orderCreated,
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    })

    return res.json({
      msg: 'Request successfully added',
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
    })
  }
}

const updateReleaseRequest = async (req, res) => {
  try {
    const releaseRequest = req.body.ReleaseRequest
    const checkCustomer = await ReleaseRequest.findOne({
      reference_number: releaseRequest.reference_number,
    })
    if (!checkCustomer) {
      return res.json({
        error: 'Request Does not exist',
      })
    }

    const requestEdited = await ReleaseRequest.update(releaseRequest, {
      where: {
        reference_number: releaseRequest.reference_number,
      },
    })
    var emails = []
    const sendList = await Role.findAll({
      where: { role_name: 'TPD Team' },
      include: [{ model: UserRole, include: [{ model: User }] }],
    })
    for (const contact of sendList) {
      for (const userrole of contact.users_roles) {
        emails.push(userrole.user.email)
      }
    }
    if (req.body.ReleaseRequest.request_status) {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.sender_email,
          pass: process.env.sender_password,
          authentication: 'plain',
        },
      })
      console.log(process.env.sender_email, process.env.sender_password)
      var mailOptions = {
        from: process.env.sender_email,
        to: emails,
        subject: 'Release Request is updated',
        text: 'A Release Request status is updated',
      }
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })
    }

    return res.json({
      msg: 'Request successfully updated',
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

const deleteReleaseRequest = async (req, res) => {
  try {
    const releaseRequest = req.body.ReleaseRequest
    const checkCustomer = await ReleaseRequest.findOne({
      reference_number: releaseRequest.reference_number,
    })
    if (!checkCustomer) {
      return res.json({
        error: 'Request Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const requestDeleted = await ReleaseRequest.destroy({
      where: {
        reference_number: releaseRequest.reference_number,
      },
    })

    return res.json({
      msg: 'Request successfully deleted',
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
const getReleaseRequest = async (req, res) => {
  try {
    const releaseRequest = await ReleaseRequest.findOne({
      where: { reference_number: req.body.ReleaseRequest.reference_number },
      include: [{ model: ReleaseRequestAction }],
    })
    if (!releaseRequest) {
      return res.json({
        msg: 'Request Not Found',
        // statusCode: statusCodes.success,
      })
    }
    return res.json({
      ReleaseRequest: releaseRequest,
      //  statusCode: success
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
      // statusCode: statusCodes.unknown,
    })
  }
}

const addReleaseRequestِAction = async (req, res) => {
  try {
    const releaseRequestAction = req.body.ReleaseRequestAction

    // const releaseRequest = req.body.ReleaseRequest
    const checkRequest = await ReleaseRequest.findOne({
      reference_number: req.body.request_reference_number,
    })
    if (!checkRequest) {
      return res.json({
        error: 'Request Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }
    const orderCreated = await ReleaseRequestAction.create(releaseRequestAction)

    return res.json({
      msg: 'Action successfully added',
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
const updateReleaseRequestAction = async (req, res) => {
  try {
    const releaseRequestAction = req.body.ReleaseRequestAction
    const checkAction = await ReleaseRequestAction.findOne({
      action_id: releaseRequestAction.action_id,
    })
    if (!checkAction) {
      return res.json({
        error: 'Action Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const actionEdited = await ReleaseRequestAction.update(
      releaseRequestAction,
      {
        where: {
          action_id: releaseRequestAction.action_id,
        },
      }
    )

    return res.json({
      msg: 'Action successfully updated',
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
const getReleaseRequestActions = async (req, res) => {
  try {
    const releaseRequest = await ReleaseRequest.findOne({
      where: {
        reference_number:
          req.body.ReleaseRequestAction.request_reference_number,
      },
    })
    if (!releaseRequest) {
      return res.json({
        msg: 'Request Not Found',
        // statusCode: statusCodes.success,
      })
    }
    const releaseRequestActions = await ReleaseRequestAction.findAll({
      where: {
        request_reference_number:
          req.body.ReleaseRequest.request_reference_number,
      },
    })
    return res.json({
      ReleaseRequestActions: releaseRequestActions,
      //  statusCode: success
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
  getAllReleaseRequests,
  addReleaseRequest,
  deleteReleaseRequest,
  getReleaseRequest,
  addReleaseRequestِAction,
  updateReleaseRequest,
  updateReleaseRequestAction,
  getReleaseRequestActions,
  exportAllReleaseRequests,
  managerExportAllReleaseRequests,
  managerGetAllReleaseRequests,
}

const { filter } = require('compression')
const ResourceRequestSkill = require('../models/resource_request_skills.model')
const ResourceRequest = require('../models/resource_requests.model')
const ResourceRequestAction = require('../models/resource_requests_actions.model')
const flatten = require('flat').flatten
const { Parser } = require('json2csv')
const { releaseRequestStatus } = require('../constants/enums')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const Role = require('../models/role.model')
const UserRole = require('../models/user_role.model')
const User = require('../models/users.model')
const Manager = require('../models/managers.model')

//view resource requests list with fiters
const getAllResourceRequests = async (req, res) => {
  try {
    const page = req.body.Page
    const limit = req.body.Limit
    const filters = req.body.Filters
    var filtersMainApplied = []
    var filtersSecondaryApplied = []
    if (filters) {
      const values = Object.values(filters)
      Object.keys(filters).forEach((key, index) => {
        if (key === 'category' || key === 'subcategory') {
          filtersSecondaryApplied.push({
            [key]: filters[key],
          })
        } else {
          filtersMainApplied.push({
            [key]: filters[key],
          })
        }
      })
    }
    let result
    if (filtersSecondaryApplied.length != 0) {
      result = await ResourceRequest.findAll({
        offset: page * limit,
        limit,
        where: filtersMainApplied,
        order: [
          ['updatedAt', 'DESC'],
          ['reference_number', 'DESC'],
        ],
        include: [
          {
            model: ResourceRequestSkill,
            where: filtersSecondaryApplied,
            required: true,
          },
          { model: ResourceRequestAction },
        ],
      })
    } else {
      result = await ResourceRequest.findAll({
        offset: page * limit,
        limit,
        where: filtersMainApplied,
        order: [
          ['updatedAt', 'DESC'],
          ['reference_number', 'DESC'],
        ],
      })
    }
    const count = result.length

    return res.json({
      ResourceRequests: result,
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

const exportAllResourceRequests = async (req, res) => {
  res.set('Content-Type', 'application/octet-stream')
  try {
    const filters = req.body.Filters
    var filtersMainApplied = []
    var filtersSecondaryApplied = []
    if (filters) {
      const values = Object.values(filters)
      Object.keys(filters).forEach((key, index) => {
        if (key === 'category' || key === 'subcategory') {
          filtersSecondaryApplied.push({
            [key]: filters[key],
          })
        } else {
          filtersMainApplied.push({
            [key]: filters[key],
          })
        }
      })
    }
    let requests
    if (filtersSecondaryApplied.length != 0) {
      requests = await ResourceRequest.findAll({
        where: filtersMainApplied,
        order: [
          ['updatedAt', 'DESC'],
          ['reference_number', 'DESC'],
        ],
        include: [
          {
            model: ResourceRequestSkill,
            where: filtersSecondaryApplied,
            required: true,
          },
        ],
      })
    } else {
      requests = await ResourceRequest.findAll({
        where: filtersMainApplied,
        order: [
          ['updatedAt', 'DESC'],
          ['reference_number', 'DESC'],
        ],
      })
    }
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
    res.attachment('allResourceRequests.csv')
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

const addResourceRequest = async (req, res) => {
  try {
    const resourceRequest = req.body.ResourceRequest

    const requestCreated = await ResourceRequest.create(resourceRequest)
    const skills = req.body.Skills
    if (skills) {
      for (const skill of skills) {
        ResourceRequestSkill.create({
          request_reference_number: requestCreated.reference_number,
          category: skill.category,
          subcategory: skill.subcategory,
        })
      }
    }
    var emails = []
    const sendList = await Role.findAll({
      where: { role_name: 'TPD Team' },
      include: [{ model: UserRole, include: [{ model: User }] }],
    })
    // console.log(sendList)
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
    var mailOptions = {
      from: process.env.sender_email,
      to: emails,
      subject: 'New Resource Request',
      text: 'A Resource Request is Added',
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

const updateResourceRequest = async (req, res) => {
  try {
    const resourceRequest = req.body.ResourceRequest
    const usertoken = req.headers.authorization
    const token = usertoken.split(' ')
    const decoded = jwt.verify(token[0], process.env.JWT_KEY)
    const checkRequest = await ResourceRequest.findOne({
      reference_number: resourceRequest.reference_number,
    })
    if (!checkRequest) {
      return res.json({
        error: 'Request Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    if (
      checkRequest.status != releaseRequestStatus.OPEN &&
      !decoded.roles.includes('TPD Team')
    ) {
      return res.json({
        error: 'Request status is not open',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const requestEdited = await ResourceRequest.update(resourceRequest, {
      where: {
        reference_number: resourceRequest.reference_number,
      },
    })

    if (req.body.ReleaseRequest.request_status) {
      var emails = []
      const sendList = await Role.findAll({
        where: { role_name: 'TPD Team' },
        include: [{ model: UserRole, include: [{ model: User }] }],
      })
      // console.log(sendList)
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
      var mailOptions = {
        from: process.env.sender_email,
        to: emails,
        subject: 'Resource Request is updated',
        text: 'A Resource Request status is updated',
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

const deleteResourceRequestSkill = async (req, res) => {
  try {
    const resourceRequestSkill = req.body.ResourceRequestSkill
    const checkRequest = await ResourceRequestSkill.findOne({
      skill_id: resourceRequestSkill.skill_id,
    })
    if (!checkRequest) {
      return res.json({
        error: 'Skill Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const requestDeleted = await ResourceRequestSkill.destroy({
      where: {
        skill_id: resourceRequestSkill.skill_id,
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

const addResourceRequestSkill = async (req, res) => {
  try {
    const resourceRequestSkill = req.body.ResourceRequestSkill
    const checkRequest = await ResourceRequest.findOne({
      reference_number: resourceRequestSkill.request_reference_number,
    })
    if (!checkRequest) {
      return res.json({
        error: 'Request Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const requestSkill = await ResourceRequestSkill.create(
      resourceRequestSkill,
      {
        where: {
          skill_id: resourceRequestSkill.skill_id,
        },
      }
    )

    return res.json({
      msg: 'Skill successfully added',
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

const deleteResourceRequest = async (req, res) => {
  try {
    const resourceRequest = req.body
    const checkCustomer = await ResourceRequest.findOne({
      reference_number: resourceRequest.reference_number,
    })
    if (!checkCustomer) {
      return res.json({
        error: 'Request Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const requestDeleted = await ResourceRequest.destroy({
      where: {
        reference_number: resourceRequest.reference_number,
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

const getResourceRequest = async (req, res) => {
  try {
    const resourceRequest = await ResourceRequest.findOne({
      where: {
        reference_number: req.body.reference_number,
      },
    })
    if (!resourceRequest) {
      return res.json({
        msg: 'Request Not Found',
        // statusCode: statusCodes.success,
      })
    }
    return res.json({
      ResourceRequest: resourceRequest,
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

const addResourceRequestِAction = async (req, res) => {
  try {
    const resourceRequestAction = req.body.ResourceRequestAction

    // const resourceRequest = req.body.ResourceRequest
    const checkRequest = await ResourceRequest.findOne({
      request_reference_number: resourceRequestAction.request_reference_number,
    })
    if (!checkRequest) {
      return res.json({
        error: 'Request Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }
    const orderCreated = await ResourceRequestAction.create(
      resourceRequestAction
    )

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
const updateResourceRequestAction = async (req, res) => {
  try {
    const resourceRequestAction = req.body.ResourceRequestAction
    const checkAction = await ResourceRequestAction.findOne({
      action_id: resourceRequestAction.action_id,
    })
    if (!checkAction) {
      return res.json({
        error: 'Action Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const actionEdited = await ResourceRequestAction.update(
      resourceRequestAction,
      {
        where: {
          action_id: resourceRequestAction.action_id,
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
const getResourceRequestActions = async (req, res) => {
  try {
    const resourceRequest = await ResourceRequest.findOne({
      where: { reference_number: req.body.reference_number },
    })
    if (!resourceRequest) {
      return res.json({
        msg: 'Request Not Found',
        // statusCode: statusCodes.success,
      })
    }
    const resourceRequestActions = await ResourceRequestAction.findAll({
      where: { reference_number: req.body.reference_number },
    })
    return res.json({
      ResourceRequestActions: resourceRequestActions,
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

const managerGetAllResourceRequests = async (req, res) => {
  try {
    const page = req.body.Page
    const limit = req.body.Limit
    const filters = req.body.Filters
    var filtersMainApplied = []
    var filtersSecondaryApplied = []
    if (filters) {
      const values = Object.values(filters)
      Object.keys(filters).forEach((key, index) => {
        if (key === 'category' || key === 'subcategory') {
          filtersSecondaryApplied.push({
            [key]: filters[key],
          })
        } else {
          filtersMainApplied.push({
            [key]: filters[key],
          })
        }
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
    let result
    if (filtersSecondaryApplied.length != 0) {
      result = await ResourceRequest.findAll({
        offset: page * limit,
        limit,
        where: filtersMainApplied,
        order: [
          ['updatedAt', 'DESC'],
          ['reference_number', 'DESC'],
        ],
        include: [
          {
            model: ResourceRequestSkill,
            where: filtersSecondaryApplied,
            required: true,
          },
          { model: ResourceRequestAction },
        ],
      })
    } else {
      result = await ResourceRequest.findAll({
        offset: page * limit,
        limit,
        where: filtersMainApplied,
        order: [
          ['updatedAt', 'DESC'],
          ['reference_number', 'DESC'],
        ],
      })
    }
    const count = result.length

    return res.json({
      ResourceRequests: result,
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

const managerExportAllResourceRequests = async (req, res) => {
  res.set('Content-Type', 'application/octet-stream')
  try {
    const filters = req.body.Filters
    var filtersMainApplied = []
    var filtersSecondaryApplied = []
    if (filters) {
      const values = Object.values(filters)
      Object.keys(filters).forEach((key, index) => {
        if (key === 'category' || key === 'subcategory') {
          filtersSecondaryApplied.push({
            [key]: filters[key],
          })
        } else {
          filtersMainApplied.push({
            [key]: filters[key],
          })
        }
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

    if (filtersSecondaryApplied.length != 0) {
      requests = await ResourceRequest.findAll({
        where: filtersMainApplied,
        order: [
          ['updatedAt', 'DESC'],
          ['reference_number', 'DESC'],
        ],
        include: [
          {
            model: ResourceRequestSkill,
            where: filtersSecondaryApplied,
            required: true,
          },
        ],
      })
    } else {
      requests = await ResourceRequest.findAll({
        where: filtersMainApplied,
        order: [
          ['updatedAt', 'DESC'],
          ['reference_number', 'DESC'],
        ],
      })
    }
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
    res.attachment('allResourceRequests.csv')
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

module.exports = {
  getAllResourceRequests,
  addResourceRequest,
  deleteResourceRequest,
  getResourceRequest,
  addResourceRequestِAction,
  updateResourceRequest,
  updateResourceRequestAction,
  getResourceRequestActions,
  deleteResourceRequestSkill,
  exportAllResourceRequests,
  addResourceRequestSkill,
  managerExportAllResourceRequests,
  managerGetAllResourceRequests,
}

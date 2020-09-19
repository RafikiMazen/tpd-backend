const { filter } = require('compression')
const ResourceRequestSkill = require('../models/resource_request_skills.model')
const ResourceRequest = require('../models/resource_requests.model')
const ResourceRequestAction = require('../models/resource_requests_actions.model')

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
    ResourceRequest.hasMany(ResourceRequestSkill, {
      foreignKey: 'request_reference_number',
    })
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

const addResourceRequest = async (req, res) => {
  try {
    const resourceRequest = req.body.ResourceeRequest

    const orderCreated = await ResourceRequest.create(resourceRequest)

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
    const checkCustomer = await ResourceRequest.findOne({
      reference_number: resourceRequest.reference_number,
    })
    if (!checkCustomer) {
      return res.json({
        error: 'Request Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const requestEdited = await ResourceRequest.update(resourceRequest, {
      where: {
        reference_number: resourceRequest.reference_number,
      },
    })

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

const deleteResourceRequest = async (req, res) => {
  try {
    const resourceRequest = req.body.ResourceRequest
    const checkCustomer = await ResourceRequest.findOne({
      reference_number: resourceRequest.reference_number,
    })
    if (!checkCustomer) {
      return res.json({
        error: 'Request Does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const requestDeleted = await ResourceRequest.destroy(resourceRequest, {
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
        request_reference_number:
          req.body.ResourceRequest.request_reference_number,
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
      request_reference_number: req.body.request_reference_number,
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
      where: { reference_number: req.body.ResourceRequest.reference_number },
    })
    if (!resourceRequest) {
      return res.json({
        msg: 'Request Not Found',
        // statusCode: statusCodes.success,
      })
    }
    const resourceRequestActions = await ResourceRequestAction.findAll({
      where: { reference_number: req.body.ResourceRequest.reference_number },
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

module.exports = {
  getAllResourceRequests,
  addResourceRequest,
  deleteResourceRequest,
  getResourceRequest,
  addResourceRequestِAction,
  updateResourceRequest,
  updateResourceRequestAction,
  getResourceRequestActions,
}

const { filter } = require('compression')
const ReleaseRequest = require('../models/release_requests.model')
const ReleaseRequestAction = require('../models/release_requests_actions.model')

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

const addReleaseRequest = async (req, res) => {
  try {
    const releaseRequest = req.body.ReleaseRequest

    const orderCreated = await ReleaseRequest.create(releaseRequest)

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

const updateReleaseRequest = async (req, res) => {
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

    const requestEdited = await ReleaseRequest.update(releaseRequest, {
      where: {
        reference_number: releaseRequest.reference_number,
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
        request_reference_number:
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
}

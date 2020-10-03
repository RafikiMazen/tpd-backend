const Assignment = require('../models/assignment.model')
const EmployeeProfile = require('../models/employee_profiles.model')
const jwt = require('jsonwebtoken')

const getMyAssignmentsHistory = async (req, res) => {
  try {
    const usertoken = req.headers.authorization
    const token = usertoken.split(' ')
    const decoded = jwt.verify(token[0], process.env.JWT_KEY)
    let result
    result = await EmployeeProfile.findAll({
      where: [{ user_id: decoded.id }],
      include: [
        {
          model: Assignment,
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

const addAssignment = async (req, res) => {
  try {
    const assignment = req.body.Assignment
    const result = await EmployeeProfile.findAll({
      where: [{ id: assignment.employee_id }],
    })
    if (!result) {
      return res.json({
        error: 'Employee does not exist',
      })
    }

    const orderCreated = await Assignment.create(assignment)

    return res.json({
      msg: 'Assignment added',
      // statusCode: statusCodes.success,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
    })
  }
}

const getMyAssignments = async (req, res) => {
  try {
    const usertoken = req.headers.authorization
    const token = usertoken.split(' ')
    const decoded = jwt.verify(token[0], process.env.JWT_KEY)
    let result
    result = await EmployeeProfile.findOne({
      where: [{ user_id: decoded.id }],
      include: [
        {
          model: Assignment,
          // where:[{release_date: [Op.gte] moment().toDate()}]
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

const getEmployeeAssignmentsHistory = async (req, res) => {
  try {
    let result
    result = await EmployeeProfile.findOne({
      where: [{ id: req.body.employee_id }],
      include: [
        {
          model: Assignment,
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

const getEmployeeAssignments = async (req, res) => {
  try {
    let result
    result = await EmployeeProfile.findOne({
      where: [{ id: req.body.employee_id }],
      include: [
        {
          model: Assignment,
          // where:[{release_date:[Op.gte]: moment().toDate()}]
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

const editAssignment = async (req, res) => {
  try {
    const AssignmentBody = req.body.Assignment
    const assignment = await Assignment.findOne({
      where: {
        assignment_id: AssignmentBody.id,
      },
    })
    if (!assignment) {
      return res.json({
        error: 'This assignment does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const orderCreated = await Assignment.update(AssignmentBody, {
      where: { assignment_id: AssignmentBody.assignment_id },
    })

    return res.json({
      msg: 'Assignment updated',
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

const deleteAssignment = async (req, res) => {
  try {
    const AssignmentBody = req.body.Assignment
    const assignment = await Assignment.findOne({
      where: {
        certification_id: AssignmentBody.id,
      },
    })
    if (!assignment) {
      return res.json({
        error: 'This assignment does not exist',
        // statusCode: statusCodes.entityNotFound,
      })
    }

    const orderCreated = await Assignment.destroy({
      where: { assignment_id: AssignmentBody.assignment_id },
    })

    return res.json({
      msg: 'Assignment deleted',
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
  getMyAssignmentsHistory,
  getMyAssignments,
  getEmployeeAssignments,
  getEmployeeAssignmentsHistory,
  addAssignment,
  editAssignment,
  deleteAssignment,
}

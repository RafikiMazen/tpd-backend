const EmployeeProfile = require('../models/employee_profiles.model')
const EmployeeTraining = require('../models/employee_training.model')
const jwt = require('jsonwebtoken')

const getEmployeeTrainings = async (req, res) => {
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
    const user = EmployeeProfile.findOne({
      where: { id: req.body.employee_id },
    })
    if (!user) {
      return res.json({
        error: 'Employee does not exist',
        // statusCode: unknown
      })
    }
    filtersMainApplied.push({ employee_id: req.body.employee_id })
    let result

    result = await EmployeeTraining.findAll({
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
      Trainings: result,
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

const getMyTrainings = async (req, res) => {
  try {
    const usertoken = req.headers.authorization
    const token = usertoken.split(' ')
    const decoded = jwt.verify(token[0], process.env.JWT_KEY)
    let result
    result = await EmployeeProfile.findAll({
      where: [{ user_id: decoded.id }],
      include: [
        {
          model: EmployeeTraining,
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

module.exports = { getEmployeeTrainings, getMyTrainings }

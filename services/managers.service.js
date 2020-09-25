const Manager = require('../models/managers.model')
const Employee = require('../models/employee_profiles.model')
const EmployeeProfile = require('../models/employee_profiles.model')
const jwt = require('jsonwebtoken')
const User = require('../models/users.model')
const getAllManagers = async (req, res) => {
  try {
    // const page = req.body.Page
    // const limit = req.body.Limit
    let result
    result = await Manager.findAll({
      // offset: page * limit,
      // limit,
      order: [
        ['updatedAt', 'DESC'],
        ['id', 'DESC'],
      ],
    })
    const count = result.length

    return res.json({
      managers: result,
      count,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
    })
  }
}

const getMyEmployees = async (req, res) => {
  try {
    const page = req.body.Page
    const limit = req.body.Limit
    const usertoken = req.headers.authorization
    const token = usertoken.split(' ')
    // console.log(token)
    const decoded = jwt.verify(token[0], 'secret')
    console.log(decoded.id)
    const user = User.findOne({
      where: [{ id: decoded.id }],
    })
    const manager = Manager.findOne({
      where: { user_id: user.id },
    })
    if (!manager) {
      return res.json({
        error: 'User is not a manager',
      })
    }
    // const thisManagerId = req.body.managerId
    let result
    result = await EmployeeProfile.findAll({
      offset: page * limit,
      limit,
      where: { direct_manager: manager.id },
      order: [
        ['updatedAt', 'DESC'],
        ['id', 'DESC'],
      ],
    })
    const count = result.length

    return res.json({
      employees: result,
      count,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
    })
  }
}

module.exports = { getAllManagers, getMyEmployees }

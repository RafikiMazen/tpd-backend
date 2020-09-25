const Manager = require('../models/managers.model')
const Employee = require('../models/employee_profiles.model')
const EmployeeProfile = require('../models/employee_profiles.model')
const getAllManagers = async (req, res) => {
  try {
    const page = req.body.Page
    const limit = req.body.Limit
    let result
    result = await Manager.findAll({
      offset: page * limit,
      limit,
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
    const thisManagerId = req.body.managerId
    let result
    result = await EmployeeProfile.findAll({
      offset: page * limit,
      limit,
      where: { direct_manager: thisManagerId },
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

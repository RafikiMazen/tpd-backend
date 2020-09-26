const Assignment = require('../models/assignment.model')
const EmployeeProfile = require('../models/employee_profiles.model')
const jwt = require('jsonwebtoken')
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

module.exports = { getMyCertificates }

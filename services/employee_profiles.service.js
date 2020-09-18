const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const EmployeeModel = require('../models/employee_profiles.model')

const { signingKey, salt } = require('../config/keys')
// const { accountType, accountStatus } = require('../constants/enums')
const statusCodes = require('../constants/statusCodes')

const createAccount = async (req, res) => {
  try {
    const account = req.body
    const checkAccountname = await EmployeeModel.findOne({
      username: account.username,
    })
    if (checkAccountname) {
      return res.json({
        error: 'username already exists',
        // statusCode: statusCodes.usernameExists,
      })
    }
    const checkAccountEmail = await EmployeeModel.findOne({
      employee_email: account.employee_email,
    })
    if (checkAccountEmail) {
      return res.json({
        error: 'email already exists',
        statusCode: statusCodes.emailExists,
      })
    }
    const checkAccountPhoneNumber = await EmployeeModel.findOne({
      phoneNumber: account.phoneNumber,
    })
    if (checkAccountPhoneNumber) {
      return res.json({
        error: 'Phone Number already exists',
        statusCode: statusCodes.phoneNumberExists,
      })
    }
    const checkAccountEmployeeId = await EmployeeModel.findOne({
      _id: account.employeeId,
    })

    if (!checkAccountEmployeeId) {
      return res.json({
        error: 'Employee doesnt exist',
        statusCode: statusCodes.employeeDoesNotExist,
      })
    }

    const checkAccountEmployeeIdAlreadyExists = await EmployeeModel.findOne({
      employeeId: account.employeeId,
    })

    if (checkAccountEmployeeIdAlreadyExists) {
      return res.json({
        error: 'Account with same employee ID already exists',
        statusCode: statusCodes.accountWithSameEmployeeId,
      })
    }

    const saltKey = bcrypt.genSaltSync(salt)

    const hashed_pass = bcrypt.hashSync(account.password, saltKey)
    account.password = hashed_pass
    // account.accountStatus = accountStatus.ACTIVE
    EmployeeModel.create(account)
    return res.json({ msg: 'Account added', statusCode: statusCodes.success })
  } catch (exception) {
    return res.json({
      error: 'Something went wrong',
      statusCode: statusCodes.unknown,
    })
  }
}

module.exports = { createAccount }

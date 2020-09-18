const jwt = require('jsonwebtoken')
const moment = require('moment-timezone')
const bcrypt = require('bcryptjs')
const { signingKey, salt } = require('../config/keys')
const User = require('../models/users.model')

const createAccount = async (req, res) => {
  try {
    const account = req.body
    const checkAccountname = await User.findOne({
      where: [
        {
          user_name: account.user_name,
        },
      ],
    })

    if (checkAccountname) {
      return res.json({
        error: 'username already exists',
        // statusCode: statusCodes.usernameExists,
      })
    }
    const checkAccountEmail = await User.findOne({
      where: [
        {
          email: account.email,
        },
      ],
    })
    if (checkAccountEmail) {
      return res.json({
        error: 'email already exists',
        // statusCode: statusCodes.usernameExists,
      })
    }

    const saltKey = bcrypt.genSaltSync(salt)

    const hashed_pass = bcrypt.hashSync(account.password, saltKey)
    account.password = hashed_pass
    User.create({
      user_name: account.user_name,
      password: account.password,
      email: account.emails,
    })
    return res.json({
      msg: 'Account added',
      // , statusCode: statusCodes.success
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
      //   statusCode: statusCodes.unknown,
    })
  }
}

const signIn = async (req, res) => {
  try {
    const { user_name, password } = req.body

    const account = await User.findOne({
      where: [
        {
          user_name: user_name,
        },
      ],
    })
    if (!account) {
      return res.json({
        error: 'wrong credentials(username)',
        // statusCode: statusCodes.entityNotFound,
      })
    }
    const match = bcrypt.compareSync(password, account.password)
    if (!match) {
      return res.json({
        error: 'wrong credentials',
        // statusCode: statusCodes.wrongCredentials,
      })
    }

    const payLoad = {
      id: account.id,
      //   name: account.firstName,
      email: account.email,
      //   type: account.type,
    }
    const token = jwt.sign(payLoad, process.env.JWT_KEY, {
      expiresIn: '8h',
    })
    return res.json({
      token,
      id: account.id,
      type: account.type,
      //   statusCode: success,
    })
  } catch (exception) {
    console.log(exception)
    return res.json({
      error: 'Something went wrong',
      //   statusCode: statusCodes.unknown,
    })
  }
}

module.exports = { signIn, createAccount }

const Role = require('../models/role.model')
const User = require('../models/users.model')
const UserRole = require('../models/user_role.model')

const createRole = async (req, res) => {
  try {
    const request = req.body
    const checkRole = await Role.findOne({
      where: [
        {
          role_name: request.role_name,
        },
      ],
    })

    if (checkRole) {
      return res.json({
        error: 'Role already exists',
        // statusCode: statusCodes.usernameExists,
      })
    }

    Role.create({
      role_name: request.role_name,
    })
    return res.json({
      msg: 'Role added',
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

const assignRole = async (req, res) => {
  try {
    const request = req.body
    const checkRole = await Role.findOne({
      where: [
        {
          role_name: request.role_name,
        },
      ],
    })

    if (!checkRole) {
      Role.create({
        role_name: request.role_name,
      })
      const checkRole = await Role.findOne({
        where: [
          {
            role_name: request.role_name,
          },
        ],
      })
    }
    const userCheck = await User.findOne({
      where: [
        {
          user_name: request.user_name,
        },
      ],
    })
    if (!userCheck) {
      return res.json({
        error: 'User does not exist',
        // statusCode: statusCodes.usernameExists,
      })
    }
    UserRole.create({
      user_id: userCheck.id,
      role_id: checkRole.id,
    })

    return res.json({
      msg: 'Role has been assigned',
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
module.exports = { createRole, assignRole }

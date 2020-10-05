const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");
const bcrypt = require("bcryptjs");
const { signingKey, salt } = require("../config/keys");
const User = require("../models/users.model");
const UserRole = require("../models/user_role.model");
const Role = require("../models/role.model");

const createAccount = async (req, res) => {
  try {
    const account = req.body;
    const checkAccountname = await User.findOne({
      where: [
        {
          user_name: account.user_name,
        },
      ],
    });

    if (checkAccountname) {
      return res.json({
        error: "username already exists",
        // statusCode: statusCodes.usernameExists,
      });
    }
    const checkAccountEmail = await User.findOne({
      where: [
        {
          email: account.email,
        },
      ],
    });
    if (checkAccountEmail) {
      return res.json({
        error: "email already exists",
        // statusCode: statusCodes.usernameExists,
      });
    }

    const saltKey = bcrypt.genSaltSync(salt);
    const hashed_pass = bcrypt.hashSync(account.password, saltKey);
    account.password = hashed_pass;

    var roles = req.body.roles;
    if (!roles) {
      roles = ["Employee"];
    }
    for (const role of roles) {
      const roleRecord = await Role.findOne({
        where: [{ role_name: role }],
      });
      if (!roleRecord) {
        return res.json({
          error: "role does not exist",
        });
      }
      const user = await User.create({
        user_name: account.user_name,
        password: account.password,
        email: account.email,
      });

      const userRole = await UserRole.create({
        user_id: user.id,
        role_id: roleRecord.id,
      });
    }

    return res.json({
      msg: "Account added",
      // , statusCode: statusCodes.success
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
      //   statusCode: statusCodes.unknown,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { user_name, password } = req.body;

    const account = await User.findOne({
      where: [
        {
          user_name: user_name,
        },
      ],
    });
    if (!account) {
      return res.json({
        error: "wrong credentials(username)",
        // statusCode: statusCodes.entityNotFound,
      });
    }
    const match = bcrypt.compareSync(password, account.password);
    if (!match) {
      return res.json({
        error: "wrong credentials",
        // statusCode: statusCodes.wrongCredentials,
      });
    }
    // console.log(account);
    const userRoles = await UserRole.findAll({
      where: [{ user_id: account.id }],
      include: [{ model: Role }],
    });
    var roles = [];
    // console.log(userRoles)
    for (const userRole of userRoles) {
      roles.push(userRole.role.role_name);
    }
    // console.log(userRoles,roles)
    const payLoad = {
      id: account.id,
      name: account.user_name,
      email: account.email,
      roles: roles,
    };
    const token = jwt.sign(payLoad, process.env.JWT_KEY, {
      expiresIn: "8h",
    });
    return res.json({
      token,
      id: account.id,
      roles: roles,
      //   statusCode: success,
    });
  } catch (exception) {
    console.log(exception);
    return res.json({
      error: "Something went wrong",
      //   statusCode: statusCodes.unknown,
    });
  }
};

module.exports = { signIn, createAccount };

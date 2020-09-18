const Joi = require('joi')

const validateCreateRole = (req, res, next) => {
  const schema = Joi.object({
    role_name: Joi.string().required(),
  })

  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      //   statusCode: statusCodes.validation,
      error: isValid.error.details[0].message,
    })
  }
  return next()
}
const validateAssignRole = (req, res, next) => {
  const schema = Joi.object({
    role_name: Joi.string().required(),
  })

  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      //   statusCode: statusCodes.validation,
      error: isValid.error.details[0].message,
    })
  }
  return next()
}
module.exports = { validateAssignRole, validateCreateRole }

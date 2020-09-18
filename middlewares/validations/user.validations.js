const Joi = require('joi')

const validateCreateAccount = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    user_name: Joi.string().required(),
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

const valdiateSignIn = (req, res, next) => {
  const schema = Joi.object({
    user_name: Joi.string().required(),
    password: Joi.string().required(),
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

module.exports = { validateCreateAccount, valdiateSignIn }

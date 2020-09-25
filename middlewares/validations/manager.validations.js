const Joi = require('joi')

const validateGetAllManagers = (req, res, next) => {
  const schema = Joi.object({
    Page: Joi.number().integer().required().min(0),
    Limit: Joi.number().integer().required().min(0),
  })
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}
const validateGetAllMyEmployees = (req, res, next) => {
  const schema = Joi.object({
    Page: Joi.number().integer().required().min(0),
    Limit: Joi.number().integer().required().min(0),
    managerId: Joi.number().integer().required().min(0),
  })
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}

module.exports = { validateGetAllManagers, validateGetAllMyEmployees }

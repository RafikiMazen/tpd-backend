const Joi = require('joi')

const validateEmployeeAssignment = (req, res, next) => {
  const schema = Joi.object({
    employee_id: Joi.string().required(),
  })
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}

const validateMyAssignment = (req, res, next) => {
  const schema = Joi.object({
    employee_id: Joi.string().required(),
  })
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}
module.exports = { validateEmployeeAssignment }

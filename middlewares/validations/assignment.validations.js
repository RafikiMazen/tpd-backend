const Joi = require('joi')

const validateEmployeeAssignment = (req, res, next) => {
  const schema = Joi.object({
    employee_id: Joi.number().integer().required(),
  })
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}

const validateAddAssignment = (req, res, next) => {
  const schema = Joi.object({
    Assignment: Joi.object({
      workgroup: Joi.string().required(),
      cost_center: Joi.string().required(),
      sdm_reporting_manager: Joi.string().required(),
      allocation_percentage: Joi.number().required(),
      start_date: Joi.date().required(),
      release_date: Joi.date(),
      employee_id: Joi.number().required(),
    }).required(),
  })
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}

const validateEditAssignment = (req, res, next) => {
  const schema = Joi.object({
    Assignment: Joi.object({
      assignment_id: Joi.number().integer().required(),
      workgroup: Joi.string(),
      cost_center: Joi.string(),
      sdm_reporting_manager: Joi.string(),
      allocation_percentage: Joi.number(),
      start_date: Joi.date(),
      release_date: Joi.date(),
      employee_id: Joi.number(),
    }).required(),
  })
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}

const validateDeleteAssignment = (req, res, next) => {
  const schema = Joi.object({
    Assignment: Joi.object({
      assignment_id: Joi.number().integer().required(),
    }).required(),
  })
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}
module.exports = {
  validateEmployeeAssignment,
  validateAddAssignment,
  validateEditAssignment,
  validateDeleteAssignment,
}

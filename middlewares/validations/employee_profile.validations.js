const Joi = require('joi')

const validateGetEmployee = (req, res, next) => {
  const schema = Joi.object({
    Employee: Joi.object({ id: Joi.string().required() }).required(),
  })
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}

const validateGetEmployeeSkills = (req, res, next) => {
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
const validateGetEmployeeCertificates = (req, res, next) => {
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
const validateGetEmployeeAssignment = (req, res, next) => {
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

const validateGetAllEmployees = (req, res, next) => {
  const schema = Joi.object({
    Page: Joi.number().integer().required().min(0),
    Limit: Joi.number().integer().required().min(0),
    Filters: Joi.object({
      name: Joi.string(),
      title: Joi.string(),
      function: Joi.string(),
      workgroup: Joi.string(),
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
  validateGetEmployee,
  validateGetEmployeeSkills,
  validateGetEmployeeCertificates,
  validateGetAllEmployees,
  validateGetEmployeeAssignment,
}

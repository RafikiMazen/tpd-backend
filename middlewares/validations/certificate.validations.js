const Joi = require('joi')

const validateAddEmployeeCertificate = (req, res, next) => {
  const schema = Joi.object({
    certificate_id: Joi.number().integer().required(),
    expiry_date: Joi.date().required(),
  })
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}

const validateEditEmployeeCertificate = (req, res, next) => {
  const schema = Joi.object({
    certificate_id: Joi.number().integer().required(),
    expiry_date: Joi.date(),
    id: Joi.number().integer().required(),
  })
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}

const validateDeleteEmployeeCertificate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
  })
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}

const validateAddCertification = (req, res, next) => {
    const schema = Joi.object({
      Certification: Joi.object({
        id: Joi.number().integer().required(),

      })  
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
  validateAddEmployeeCertificate,
  validateEditEmployeeCertificate,
  validateDeleteEmployeeCertificate,
}

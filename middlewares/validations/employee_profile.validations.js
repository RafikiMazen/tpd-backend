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

module.exports = { validateGetEmployee }

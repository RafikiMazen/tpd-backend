const Joi = require('joi')
const validateGetMySkills = (req, res, next) => {
  const schema = Joi.object({})
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}

module.exports = { validateGetMySkills }

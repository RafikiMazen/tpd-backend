const Joi = require("joi");

const validateGetEmployeesTrainings = (req, res, next) => {
  const schema = Joi.object({
    // Page: Joi.number().integer().required().min(0),
    // Limit: Joi.number().integer().required().min(0),
    Filters: Joi.object({
      employee_name: Joi.string(),
      training_activity_name: Joi.string(),
      event_from_date: Joi.string(),
      event_to_date: Joi.string(),
    }).required(),
  });
  const isValid = Joi.validate(req.body, schema);
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    });
  }
  return next();
};

const validateGetEmployeeTrainings = (req, res, next) => {
  const schema = Joi.object({
    employee_id: Joi.number().integer().required(),
  });
  const isValid = Joi.validate(req.body, schema);
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    });
  }
  return next();
};

module.exports = {
  validateGetEmployeeTrainings,
  validateGetEmployeesTrainings,
};

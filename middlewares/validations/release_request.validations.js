const Joi = require("joi");

const validateGetAllReleaseRequests = (req, res, next) => {
  const schema = Joi.object({
    Page: Joi.number().integer().required().min(0),
    Limit: Joi.number().integer().required().min(0),
    Filters: Joi.object({
      manager_name: Joi.string(),
      employee_name: Joi.string(),
      function: Joi.string(),
      employee_title: Joi.string(),
      request_status: Joi.string(),
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
const validateAddReleaseRequest = (req, res, next) => {
  const schema = Joi.object({
    ReleaseRequest: Joi.object({
      manager_name: Joi.string().required(),
      employee_name: Joi.string().required(),
      employee_title: Joi.string(),
      function: Joi.string().required(),
      title: Joi.string().required(),
      release_date: Joi.date().required(),
      propability: Joi.number().required(),
      release_reason: Joi.string().required(),
      leaving: Joi.string().max(1),
      request_status: Joi.string().required(),
      release_percentage: Joi.number().required(),
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
const validateUpdateReleaseRequest = (req, res, next) => {
  const schema = Joi.object({
    ReleaseRequest: Joi.object({
      reference_number: Joi.number().required(),
      manager_name: Joi.string(),
      employee_name: Joi.string(),
      function: Joi.string(),
      title: Joi.string(),
      release_date: Joi.date(),
      propability: Joi.number(),
      release_reason: Joi.string(),
      leaving: Joi.string(),
      request_status: Joi.string(),
      release_percentage: Joi.number(),
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
const validateDeleteReleaseRequest = (req, res, next) => {
  const schema = Joi.object({
    ReleaseRequest: Joi.object({
      reference_number: Joi.number().required(),
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
const validateGetReleaseRequest = (req, res, next) => {
  const schema = Joi.object({
    ReleaseRequest: Joi.object({
      reference_number: Joi.number().required(),
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
const validateGetReleaseRequestActions = (req, res, next) => {
  const schema = Joi.object({
    ReleaseRequestAction: Joi.object({
      request_reference_number: Joi.number().required(),
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
const validateAddReleaseRequestActions = (req, res, next) => {
  const schema = Joi.object({
    ReleaseRequestAction: Joi.object({
      request_reference_number: Joi.number().required(),
      action: Joi.string().required,
      action_note: Joi.string(),
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
const validateUpdateReleaseRequestActions = (req, res, next) => {
  const schema = Joi.object({
    ReleaseRequestAction: Joi.object({
      request_reference_number: Joi.number().required(),
      action: Joi.string(),
      action_note: Joi.string(),
    }).required,
  });
  const isValid = Joi.validate(req.body, schema);
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    });
  }
  return next();
};
const validateDeleteReleaseRequestActions = (req, res, next) => {
  const schema = Joi.object({
    ReleaseRequestAction: Joi.object({
      request_reference_number: Joi.number().required(),
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

module.exports = {
  validateGetAllReleaseRequests,
  validateAddReleaseRequest,
  validateUpdateReleaseRequest,
  validateDeleteReleaseRequest,
  validateGetReleaseRequest,
  validateGetReleaseRequestActions,
  validateDeleteReleaseRequestActions,
  validateUpdateReleaseRequestActions,
  validateAddReleaseRequestActions,
};

const Joi = require("joi");

const validateGetAllResourceRequests = (req, res, next) => {
  const schema = Joi.object({
    Page: Joi.number().integer().required().min(0),
    Limit: Joi.number().integer().required().min(0),
    Filters: Joi.object({
      manager_name: Joi.string(),
      title: Joi.string(),
      function: Joi.string(),
      status: Joi.string(),
      category: Joi.string(),
      subcategory: Joi.string(),
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
const validateExportAllResourceRequests = (req, res, next) => {
  const schema = Joi.object({
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
const validateAddResourceRequest = (req, res, next) => {
  const schema = Joi.object({
    ResourceRequest: Joi.object({
      manager_name: Joi.string().required(),
      function: Joi.string().required(),
      title: Joi.string().required(),
      replacement_for: Joi.string(),
      replacement: Joi.string().max(1),
      core_team_member: Joi.string().max(1),
      requests_count: Joi.number().integer(),
      propability: Joi.number().integer().required(),
      percentage: Joi.number().integer().required(),
      start_date: Joi.date().required(),
      end_date: Joi.date().required(),
      related_Opportunity: Joi.string().required(),
      comments: Joi.string(),
    }).required(),
    Skills: Joi.array().items(
      Joi.object({
        category: Joi.string().required(),
        subcategory: Joi.string().required(),
      })
    ),
  });
  const isValid = Joi.validate(req.body, schema);
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    });
  }
  return next();
};
const validateUpdateResourceRequest = (req, res, next) => {
  const schema = Joi.object({
    ResourceRequest: Joi.object({
      reference_number: Joi.number().required(),
      manager_name: Joi.string(),
      function: Joi.string(),
      title: Joi.string(),
      replacement_for: Joi.string(),
      replacement: Joi.string().max(1),
      core_team_member: Joi.string().max(1),
      requests_count: Joi.number().integer(),
      propability: Joi.number().integer(),
      percentage: Joi.number().integer(),
      start_date: Joi.date(),
      end_date: Joi.date(),
      related_Opportunity: Joi.string(),
      comments: Joi.string(),
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

const validateAddResourceRequestSkill = (req, res, next) => {
  const schema = Joi.object({
    ResourceRequestSkill: Joi.object({
      subcategory: Joi.string().required(),
      category: Joi.string().required(),
      request_reference_number: Joi.number().integer().required(),
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
const validateDeleteResourceRequestSkill = (req, res, next) => {
  const schema = Joi.object({
    skill_id: Joi.number().integer().required(),
  });
  const isValid = Joi.validate(req.body, schema);
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    });
  }
  return next();
};

const validateDeleteResourceRequest = (req, res, next) => {
  const schema = Joi.object({
    reference_number: Joi.number().required(),
  });
  const isValid = Joi.validate(req.body, schema);
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    });
  }
  return next();
};
const validateGetResourceRequest = (req, res, next) => {
  const schema = Joi.object({
    reference_number: Joi.number().required(),
  });
  const isValid = Joi.validate(req.body, schema);
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    });
  }
  return next();
};
const validateGetResourceRequestActions = (req, res, next) => {
  const schema = Joi.object({
    reference_number: Joi.number().required(),
  });
  const isValid = Joi.validate(req.body, schema);
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    });
  }
  return next();
};
const validateAddResourceRequestActions = (req, res, next) => {
  const schema = Joi.object({
    ResourceRequestAction: Joi.object({
      request_reference_number: Joi.number().required(),
      action: Joi.string().required(),
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
const validateUpdateResourceRequestActions = (req, res, next) => {
  const schema = Joi.object({
    ResourceRequestAction: Joi.object({
      action_id: Joi.number().required(),
      request_reference_number: Joi.number().required(),
      action: Joi.string().required(),
      action_note: Joi.string().required(),
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

module.exports = {
  validateGetAllResourceRequests,
  validateAddResourceRequest,
  validateUpdateResourceRequest,
  validateDeleteResourceRequest,
  validateGetResourceRequest,
  validateGetResourceRequestActions,
  validateUpdateResourceRequestActions,
  validateAddResourceRequestActions,
  validateExportAllResourceRequests,
  validateDeleteResourceRequestSkill,
  validateAddResourceRequestSkill,
};

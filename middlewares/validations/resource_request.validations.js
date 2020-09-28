const Joi = require('joi')

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
  })
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}
const validateExportAllResourceRequests = (req, res, next) => {
  const schema = Joi.object({
    Filters: Joi.object({
      manager_name: Joi.string(),
      employee_name: Joi.string(),
      function: Joi.string(),
      employee_title: Joi.string(),
      request_status: Joi.string(),
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
const validateAddResourceRequest = (req, res, next) => {
  const schema = Joi.object({
    ReleaseRequest: Joi.object({
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
  })
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}
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
  })
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}
const validateDeleteReleaseRequest = (req, res, next) => {
  const schema = Joi.object({
    ReleaseRequest: Joi.object({
      reference_number: Joi.number().required(),
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
const validateGetReleaseRequest = (req, res, next) => {
  const schema = Joi.object({
    ReleaseRequest: Joi.object({
      reference_number: Joi.number().required(),
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
const validateGetReleaseRequestActions = (req, res, next) => {
  const schema = Joi.object({
    ReleaseRequestAction: Joi.object({
      request_reference_number: Joi.number().required(),
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
const validateAddReleaseRequestActions = (req, res, next) => {
  const schema = Joi.object({
    ReleaseRequestAction: Joi.object({
      request_reference_number: Joi.number().required(),
      action: Joi.string().required,
      action_note: Joi.string(),
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
const validateUpdateReleaseRequestActions = (req, res, next) => {
  const schema = Joi.object({
    ReleaseRequestAction: Joi.object({
      request_reference_number: Joi.number().required(),
      action: Joi.string(),
      action_note: Joi.string(),
    }).required,
  })
  const isValid = Joi.validate(req.body, schema)
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    })
  }
  return next()
}
const validateDeleteReleaseRequestActions = (req, res, next) => {
  const schema = Joi.object({
    ReleaseRequestAction: Joi.object({
      request_reference_number: Joi.number().required(),
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
  validateGetAllResourceRequests,
  validateAddReleaseRequest: validateAddResourceRequest,
  validateUpdateReleaseRequest,
  validateDeleteReleaseRequest,
  validateGetReleaseRequest,
  validateGetReleaseRequestActions,
  validateDeleteReleaseRequestActions,
  validateUpdateReleaseRequestActions,
  validateAddReleaseRequestActions,
  validateExportAllReleaseRequests: validateExportAllResourceRequests,
}

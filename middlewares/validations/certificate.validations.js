const Joi = require("joi");

const validateAddEmployeeCertificate = (req, res, next) => {
  const schema = Joi.object({
    certification_id: Joi.number().integer().required(),
    expiry_date: Joi.date().required(),
  });
  const isValid = Joi.validate(req.body, schema);
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    });
  }
  return next();
};

const validateEditEmployeeCertificate = (req, res, next) => {
  const schema = Joi.object({
    certification_id: Joi.number().integer().required(),
    expiry_date: Joi.date(),
    id: Joi.number().integer().required(),
  });
  const isValid = Joi.validate(req.body, schema);
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    });
  }
  return next();
};

const validateDeleteEmployeeCertificate = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
  });
  const isValid = Joi.validate(req.body, schema);
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    });
  }
  return next();
};

const validateAddCertification = (req, res, next) => {
  const schema = Joi.object({
    Certification: Joi.object({
      certification_provider_id: Joi.number().integer().required(),
      certification_name: Joi.string().required(),
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
const validateAddCertificationProvider = (req, res, next) => {
  const schema = Joi.object({
    CertificationProvider: Joi.object({
      certification_provider_name: Joi.string().required(),
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
const validateEditCertificationProvider = (req, res, next) => {
  const schema = Joi.object({
    CertificationProvider: Joi.object({
      certification_provider_id: Joi.number().integer().required(),
      certification_provider_name: Joi.string().required(),
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

const validateDeleteCertificationProvider = (req, res, next) => {
  const schema = Joi.object({
    CertificationProvider: Joi.object({
      certification_provider_id: Joi.number().integer().required(),
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

const validateGetCertificationsByProvider = (req, res, next) => {
  const schema = Joi.object({
    certification_provider_id: Joi.number().required(),
  });
  const isValid = Joi.validate(req.body, schema);
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    });
  }
  return next();
};

const validateGetAllCertificates = (req, res, next) => {
  const schema = Joi.object({
    Filters: Joi.object({
      certification_provider_id: Joi.number().integer(),
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

const validateGetAllCertificatesHistory = (req, res, next) => {
  const schema = Joi.object({
    // Page: Joi.number().integer().required().min(0),
    // Limit: Joi.number().integer().required().min(0),
    Filters: Joi.object({
      certification_provider_id: Joi.number().integer(),
      certification_id: Joi.number().integer(),
      name: Joi.string(),
    }),
  });
  const isValid = Joi.validate(req.body, schema);
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    });
  }
  return next();
};

const validateDeleteCertification = (req, res, next) => {
  const schema = Joi.object({
    Certification: Joi.object({
      id: Joi.number().integer().required(),
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
const validateEditCertification = (req, res, next) => {
  const schema = Joi.object({
    Certification: Joi.object({
      id: Joi.number().integer().required(),
      certification_name: Joi.string().required(),
      certification_provider_id: Joi.number().integer().required(),
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
  validateAddEmployeeCertificate,
  validateEditEmployeeCertificate,
  validateDeleteEmployeeCertificate,
  validateAddCertification,
  validateAddCertificationProvider,
  validateEditCertificationProvider,
  validateDeleteCertificationProvider,
  validateGetCertificationsByProvider,
  validateGetAllCertificates,
  validateDeleteCertification,
  validateEditCertification,
  validateGetAllCertificatesHistory,
};

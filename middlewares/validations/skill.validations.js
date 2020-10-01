const Joi = require("joi");
const validateGetMySkills = (req, res, next) => {
  const schema = Joi.object({});
  const isValid = Joi.validate(req.body, schema);
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    });
  }
  return next();
};

const validateGetAllSkillHistory = (req, res, next) => {
  const schema = Joi.object({
    Filters: Joi.object({
      user_name: Joi.string(),
      skill_name: Joi.string(),
      function: Joi.string(),
      title: Joi.string(),
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

const validateExportAllSkillHistory = (req, res, next) => {
  const schema = Joi.object({
    Page: Joi.number().integer().required().min(0),
    Limit: Joi.number().integer().required().min(0),
    Filters: Joi.object({
      employee_id: Joi.string(),
      skill_id: Joi.string(),
      function: Joi.string(),
      title: Joi.string(),
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

const validateGetSubcategories = (req, res, next) => {
  const schema = Joi.object({ category: Joi.string().required() });
  const isValid = Joi.validate(req.body, schema);
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    });
  }
  return next();
};
const validateAddEmployeeSkill = (req, res, next) => {
  const schema = Joi.object({
    skill_name: Joi.string().required(),
    experience_level: Joi.string().required(),
    last_used_date: Joi.date().required(),
  });
  const isValid = Joi.validate(req.body, schema);
  if (isValid.error) {
    return res.json({
      error: isValid.error.details[0].message,
    });
  }
  return next();
};
const validateEditEmployeeSkill = (req, res, next) => {
  const schema = Joi.object({
    skill_id: Joi.number().integer().required(),
    experience_level: Joi.string(),
    last_used_date: Joi.date(),
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

const validateDeleteEmployeeSkill = (req, res, next) => {
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

const validateAddSkill = (req, res, next) => {
  const schema = Joi.object({
    Skill: Joi.object({
      skill_name: Joi.string().required(),
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

const validateEditSkill = (req, res, next) => {
  const schema = Joi.object({
    Skill: Joi.object({
      skill_id: Joi.number().required(),
      skill_name: Joi.string().required(),
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
  validateGetMySkills,
  validateGetSubcategories,
  validateAddEmployeeSkill,
  validateEditEmployeeSkill,
  validateDeleteEmployeeSkill,
  validateAddSkill,
  validateEditSkill,
  validateExportAllSkillHistory,
  validateGetAllSkillHistory,
};

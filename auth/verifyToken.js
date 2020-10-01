const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  return jwt.verify(
    req.headers.authorization,
    process.env.JWT_KEY,
    (err, authorizedData) => {
      if (!err) {
        const header = req.headers.authorization;
        const token = header;
        req.data = authorizedData;
        req.token = token;
        return next();
      }
      return res.json({ error: "Please sign in" });
    }
  );
};

const verifyTPD = (req, res, next) => {
  return jwt.verify(
    req.headers.authorization,
    process.env.JWT_KEY,
    (err, authorizedData) => {
      if (!err) {
        if (!authorizedData.roles.includes("TPD Team")) {
          return res.json({
            error: "Only TPD are allowed",
          });
        }
        const header = req.headers.authorization;
        const token = header;
        req.data = authorizedData;
        req.token = token;
        return next();
      }
      return res.json({ error: "breach" });
    }
  );
};

const verifyManager = (req, res, next) => {
  return jwt.verify(
    req.headers.authorization,
    process.env.JWT_KEY,
    (err, authorizedData) => {
      if (!err) {
        if (!authorizedData.roles.includes("Manager")) {
          return res.json({
            error: "Only Managers are allowed",
          });
        }
        const header = req.headers.authorization;
        const token = header;
        req.data = authorizedData;
        req.token = token;
        return next();
      }
      return res.json({ error: "breach" });
    }
  );
};

const verifyEmployee = (req, res, next) => {
  return jwt.verify(
    req.headers.authorization,
    process.env.JWT_KEY,
    (err, authorizedData) => {
      if (!err) {
        if (!authorizedData.roles.includes("Employee")) {
          return res.json({
            error: "Only Employees are allowed",
          });
        }
        const header = req.headers.authorization;
        const token = header;
        req.data = authorizedData;
        req.token = token;
        return next();
      }
      return res.json({ error: "breach" });
    }
  );
};

const verifyTPDorManager = (req, res, next) => {
  return jwt.verify(
    req.headers.authorization,
    process.env.JWT_KEY,
    (err, authorizedData) => {
      if (!err) {
        if (
          !(
            authorizedData.roles.includes("TPD Team") ||
            authorizedData.roles.includes("Manager")
          )
        ) {
          return res.json({
            error: "Only TPD are allowed",
          });
        }
        const header = req.headers.authorization;
        const token = header;
        req.data = authorizedData;
        req.token = token;
        return next();
      }
      return res.json({ error: "breach" });
    }
  );
};

module.exports = {
  verifyToken,
  verifyTPD,
  verifyManager,
  verifyEmployee,
  verifyTPDorManager,
};

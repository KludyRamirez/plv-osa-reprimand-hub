const VerifyRoles = (allowedRoles) => {
  return (req, res, next) => {
    if (!req?.role) {
      return res.status(401).send("Error 401 Unauthorized");
    }

    const result = allowedRoles.includes(req?.role);

    if (!result) {
      return res.status(401).send("Error 401 Unauthorized");
    }
    next();
  };
};

module.exports = { VerifyRoles };

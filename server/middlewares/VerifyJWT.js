const jwt = require("jsonwebtoken");
const config = process.env;

const VerifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).json({ message: "A token is required for authentication!" });
  }

  try {
    const token = authHeader.replace(/^Bearer\s+/, "");
    const decoded = jwt.verify(token, config.ACCESS_TOKEN);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ message: "Invalid authentication token!" });
  }

  return next();
};

module.exports = { VerifyJWT };

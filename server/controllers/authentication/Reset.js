const User = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Notification = require("../../models/Notifications");
const nodemailer = require("nodemailer");

const reset = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded.id !== id) {
      return res
        .status(400)
        .json({ message: "Invalid token for the given user" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(id, { password: hashedPassword });

    return res.json({ message: "Success" });
  } catch (err) {
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Error with token" });
    }

    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { reset };

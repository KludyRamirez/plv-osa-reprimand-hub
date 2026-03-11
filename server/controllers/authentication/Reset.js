const User = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const reset = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }

    if (password.length > 48) {
      return res
        .status(400)
        .json({ message: "Password must be at most 48 characters long." });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    if (decoded.id !== id) {
      return res
        .status(400)
        .json({ message: "Invalid token. Please request again." });
    }

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found. Please request again." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(id, { password: hashedPassword });

    return res.json({
      message: "You have changed your password successfully.",
    });
  } catch (err) {
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      return res
        .status(400)
        .json({ message: "Expired Token. Please request again." });
    }

    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { reset };

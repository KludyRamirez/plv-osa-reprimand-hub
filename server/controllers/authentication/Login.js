const User = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName: userName });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          _id: user._id,
          role: user.role,
          userName: userName,
          email: user.email,
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "24h",
        }
      );

      return res.status(200).json({
        userDetails: {
          _id: user._id,
          token: token,
          role: user.role,
          userName: userName,
          email: user.email,
        },
      });
    }
    return res.status(400).send("Invalid credentials. Please try again.");
  } catch (err) {
    return res.status(500).send("Something went wrong. Please try again.");
  }
};

module.exports = { login };

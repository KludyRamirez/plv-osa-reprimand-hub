const User = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Notification = require("../../models/Notifications");

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
        },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "24h",
        }
      );

      await Notification.create({
        userId: user._id,
        typeOfNotif: "Authentication",
        actionOfNotif: "Add",
        message: `${user.userName} has logged in successfully.`,
        createdAt: new Date(),
      });

      return res.status(200).json({
        userDetails: {
          _id: user._id,
          token: token,
          role: user.role,
          userName: userName,
        },
      });
    }
    return res
      .status(400)
      .json({ message: "Invalid credentials. Please try again." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

module.exports = { login };

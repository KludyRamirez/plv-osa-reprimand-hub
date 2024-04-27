const User = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const usernameExists = await User.exists({
      username: username,
    });

    if (usernameExists) {
      return res.status(409).send("Username already exists");
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user document and save in database

    const user = await User.create({
      password: encryptedPassword,
      ...req.body,
    });

    // create JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        username: username,
        email: user.email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      userDetails: {
        _id: user._id,
        token: token,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error occurred. Please try again");
  }
};

module.exports = { Register };

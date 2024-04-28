const User = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { userName, firstName, surName, password, email, contactNo, role } =
      req.body;

    const userNameExists = await User.exists({
      userName: userName,
    });

    if (userNameExists) {
      return res.status(409).send("Username already exists");
    }

    // encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user document and save in database

    const user = await User.create({
      userName,
      firstName,
      surName,
      password: encryptedPassword,
      email,
      contactNo,
      role,
    });

    // create JWT token
    const token = jwt.sign(
      {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      userDetails: {
        _id: user._id,
        token: token,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).send("Error occurred. Please try again");
  }
};

module.exports = { register };

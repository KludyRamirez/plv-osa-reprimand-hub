const User = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Notification = require("../../models/Notifications");

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName: userName });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Please try again." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid credentials. Please try again." });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        userName: userName,
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    const refreshToken = jwt.sign(
      {
        _id: user._id,
        role: user.role,
        userName: userName,
      },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

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
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

const handleRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.jwt;

    if (!refreshToken) {
      return res.status(404).send("Error");
    }

    const user = await User.findOne({ refreshToken: refreshToken });

    if (!user) {
      return res.status(404).send("Unknown user!");
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err || user.userName !== decoded.userName) {
        return res.status(404).send("Error");
      }

      const accessToken = jwt.sign(
        {
          _id: user._id,
          userName: decoded.userName,
          role: user.role,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        userDetails: {
          _id: user._id,
          token: accessToken,
          role: user.role,
          userName: user.userName,
        },
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;

  try {
    if (!cookies?.jwt) return res.status(404).send("Error");
    const refreshToken = cookies.jwt;

    const account = await User.findOne({ refreshToken: refreshToken });

    if (!account) {
      res.clearCookie("jwt", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return res.status(404).send("Unknown user!");
    }

    await User.updateOne(
      { refreshToken: refreshToken },
      { $set: { refreshToken: "" } }
    );

    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({ message: "Logout successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
};

module.exports = { login, handleRefreshToken, handleLogout };

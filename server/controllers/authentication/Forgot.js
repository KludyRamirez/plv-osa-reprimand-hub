const User = require("../../models/Users");
const jwt = require("jsonwebtoken");
const Notification = require("../../models/Notifications");
const nodemailer = require("nodemailer");

const forgot = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({
          message:
            "Sorry, cannot find email. Please enter email that is associated with this website.",
        });
    }

    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
      expiresIn: "5m",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password Link",
      text: `http://localhost:3000/reset-password/${user._id}/${token}`,
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Reset password email has been sent successfully.",
      info,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { forgot };

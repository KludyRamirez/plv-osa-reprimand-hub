const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    uid: { type: Number },
    userName: { type: String },
    firstName: { type: String },
    surName: { type: String },
    email: { type: String },
    password: { type: String },
    contactNo: { type: String },
    role: {
      type: String,
      enum: ["Student", "Instructor", "Administrator"],
    },
    statusOfUser: {
      type: String,
      default: "Enabled",
      enum: ["Enabled", "Disabled"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//Users

module.exports = mongoose.model("Users", usersSchema);

const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    surname: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    role: {
      type: String,
      enum: ["Student", "Instructor", "Administrator"],
    },
    statusOfUser: {
      type: String,
      default: "Active",
      enum: ["Active", "Disabled"],
    },
  },
  { timestamps: true }
);

//Users

module.exports = mongoose.model("Users", usersSchema);

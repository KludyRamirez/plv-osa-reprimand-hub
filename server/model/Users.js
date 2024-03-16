const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    surName: { type: String },
    userName: { type: String },
    email: { type: String },
    role: {
      type: String,
      enum: ["Student", "Instructor", "Administrator"],
    },
    statusOfAccount: {
      type: String,
      default: "Active",
      enum: ["Active", "Disabled"],
    },
  },
  { timestamps: true }
);

//Users

module.exports = mongoose.model("Users", usersSchema);

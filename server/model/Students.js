const mongoose = require("mongoose");
const studentsSchema = new mongoose.Schema(
  {
    studentNo: { type: Number },
    firstName: { type: String },
    lastName: { type: String },
    middleName: { type: String },
    college: { type: String },
    department: { type: String },
    yearAndSection: {
      type: String,
    },
    sex: { type: String },
    contactNo: { type: Number },
    guardianContactNo: { type: Number },
    email: { type: String },
    statusOfStudent: {
      type: String,
      default: "Active",
      enum: ["Active", "Disabled"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", studentsSchema);

const mongoose = require("mongoose");
const studentsSchema = new mongoose.Schema(
  {
    caseNo: { type: Number },
    firstName: { type: String },
    lastName: { type: String },
    middleName: { type: String },
    course: { type: String },
    year: { type: Number },
    section: { type: Number },
    sex: { type: String },
    contactNo: { type: Number },
    guardianContactNo: { type: Number },
    email: { type: String },
    role: {
      type: String,
      default: "Student",
      enum: ["Student", "Instructor", "Administrator"],
    },
    statusOfStudent: {
      type: String,
      default: "Active",
      enum: ["Active", "Disabled"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", studentsSchema);

const mongoose = require("mongoose");
const studentsSchema = new mongoose.Schema(
  {
    studentNo: { type: String },
    firstName: { type: String },
    surName: { type: String },
    middleName: { type: String },
    college: { type: String },
    department: { type: String },
    year: { type: Number },
    section: { type: String },
    sex: { type: String },
    contactNo: { type: String },
    guardianContactNo: { type: String },
    email: { type: String },
    statusOfStudent: {
      type: String,
      default: "Enrolled",
      enum: ["Enrolled", "Dismissed"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", studentsSchema);

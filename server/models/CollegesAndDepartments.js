const mongoose = require("mongoose");
const collegesAndDepartmentsSchema = new mongoose.Schema(
  {
    uid: { type: Number },
    college: { type: String },
    department: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "CollegesAndDepartments",
  collegesAndDepartmentsSchema
);

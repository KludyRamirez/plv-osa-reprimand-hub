const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const casesSchema = new mongoose.Schema(
  {
    caseNo: { type: Number },
    student: {
      type: ObjectId,
      ref: "Students",
    },
    reportedViolation: {
      type: String,
    },
    typeOfViolation: {
      type: String,
      enum: ["Major", "Minor"],
    },
    dateOfIncident: {
      type: Date,
    },
    dateReported: {
      type: Date,
    },
    statusOfCase: {
      type: String,
      default: "Pending",
      enum: [
        "Pending",
        "Investigation",
        "Evaluation",
        "Referral",
        "Hearing",
        "Decision",
        "Implementation",
        "Case Solved",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cases", casesSchema);

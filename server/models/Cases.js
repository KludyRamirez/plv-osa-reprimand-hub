const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const casesSchema = new mongoose.Schema(
  {
    caseNo: { type: Number },
    studentNo: { type: String },
    studentName: { type: String },
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
        "Undertaking",
        "Dismissed",
        "Categorization",
        "Show Cause",
        "Referral",
        "Hearing",
        "Decision",
        "Appeal",
        "Implementation",
        "Case Solved",
      ],
    },

    offense: { type: String },

    resetOffense: {
      type: Number,
      default: 0,
    },
    dismissalDate: { type: Date },
    appeal: { type: Boolean },
    caseSolvedDate: { type: Date },
    remarks: { type: String },
    year: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cases", casesSchema);

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const notificationsSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "Users",
    },

    message: {
      type: String,
    },

    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notifications", notificationsSchema);

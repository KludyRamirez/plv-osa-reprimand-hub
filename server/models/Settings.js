const mongoose = require("mongoose");
const settingsSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  value: { type: mongoose.Schema.Types.Mixed },
});

module.exports = mongoose.model("Settings", settingsSchema);

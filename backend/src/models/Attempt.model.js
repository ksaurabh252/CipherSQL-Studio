const mongoose = require("mongoose");

// Model for storing SQL query attempts
const attemptSchema = new mongoose.Schema({
  username: { type: String, required: true },
  assignmentTitle: { type: String, required: true },
  sqlQuery: { type: String, required: true },
  success: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Attempt", attemptSchema);

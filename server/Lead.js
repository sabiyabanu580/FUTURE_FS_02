const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  status: {
    type: String,
    default: "New"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Lead", LeadSchema);
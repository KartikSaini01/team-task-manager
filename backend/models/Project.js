const mongoose = require("mongoose");

module.exports = mongoose.model("Project", {
  title: String,
  createdBy: String,
  members: [String]
});
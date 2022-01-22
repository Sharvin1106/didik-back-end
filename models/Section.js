const mongoose = require("mongoose");

//Creating a schema

const SectionSchema = mongoose.Schema({
  dashboard: { type: mongoose.Schema.Types.ObjectId, ref: "Dashboard" },
  description: { type: String },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Sections", SectionSchema);

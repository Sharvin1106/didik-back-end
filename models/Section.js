const mongoose = require("mongoose");

//Creating a schema

const SectionSchema = mongoose.Schema({
  dashboard: { type: mongoose.Schema.Types.ObjectId, ref: "Dashboard" },
  sectionTitle: {
    type: String,
    required: true,
  },
  sectionDesc: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  platform: { type: String, required: true },
  meetingLink: { type: String, required: true },
  notesLink: { type: String, required: true },
  sectionDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Sections", SectionSchema);

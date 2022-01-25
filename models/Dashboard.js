const mongoose = require("mongoose");

//Creating a schema

const DashboardSchema = mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Services" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  message: { type: String },
  sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sections" }],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Dashboard", DashboardSchema);

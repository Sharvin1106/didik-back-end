const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Services" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Comment", CommentSchema);

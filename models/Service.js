const mongoose = require("mongoose");

//Creating a schema

const ServiceSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pricing: {
    type: String,
    required: true,
  },
  lessons: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  medium: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  students: {
    type: Number,
    default: 0,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Services", ServiceSchema);

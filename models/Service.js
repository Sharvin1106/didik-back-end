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
    required: true,
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Services", ServiceSchema);

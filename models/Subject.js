const mongoose = require("mongoose");

//Creating a schema

const SubjectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Subjects", SubjectSchema);

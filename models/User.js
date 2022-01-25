const mongoose = require("mongoose");

//Creating a schema

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dashboard: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dashboard",
    },
  ],
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
    },
  ],
});

module.exports = mongoose.model("Users", UserSchema);

const express = require("express");
const router = express.Router();
const authorizeAccessToken = require("../utils/jwtValidate");
const Comment = require("../models/Comment");
const Service = require("../models/Service");

//Gets all the comments
router.get("/", async (req, res) => {
  try {
    const comment = await Comment.find();
    res.json(comment);
  } catch (err) {
    res.json({ message: err });
  }
});



//Submit a posts
router.post("/", async (req, res) => {
  const comment = new Comment({
    message: req.body.message,
    rating: req.body.rating,
    course: req.body.course,
    student: req.body.student,
  });
  try {
    const savedComment = await comment.save();
    await Service.findByIdAndUpdate(req.body.course, {
      $push: { comments: savedComment._id },
    });
    res.json(savedComment);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

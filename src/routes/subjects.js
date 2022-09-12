const express = require("express");
const router = express.Router();
const authorizeAccessToken = require("../utils/jwtValidate");
const Subject = require("../models/Subject");

//Gets all the posts
router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submit a posts
router.post("/", async (req, res) => {
  const subject = new Subject({
    title: req.body.title,
    logo: req.body.logo,
  });
  try {
    const savedSubject = await subject.save();
    res.json(savedSubject);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

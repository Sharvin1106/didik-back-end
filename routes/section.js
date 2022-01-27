const express = require("express");
const router = express.Router();
const authorizeAccessToken = require("../utils/jwtValidate");
const Dashboard = require("../models/Dashboard");
const Section = require("../models/Section");

//Gets all the posts
router.get("/", authorizeAccessToken, async (req, res) => {
  try {
    const section = await Section.find();
    res.json(section);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:sectionId", authorizeAccessToken, async (req, res) => {
  try {
    const section = await Section.findById(req.params.sectionId);
    res.json(section);
  } catch (err) {
    res.json({ message: err });
  }
});

//Create a section
router.post("/", authorizeAccessToken, async (req, res) => {
  const section = new Section({
    dashboard: req.body.dashboard,
    sectionTitle: req.body.sectionTitle,
    sectionDesc: req.body.sectionDesc,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    platform: req.body.platform,
    meetingLink: req.body.meetingLink,
    notesLink: req.body.notesLink,
  });
  console.log(req);
  try {
    const savedSection = await section.save();
    await Dashboard.findByIdAndUpdate(req.body.dashboard, {
      $push: { sections: savedSection._id },
    });
    res.json(savedSection);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:sectionId", authorizeAccessToken, async (req, res) => {
  try {
    const updatedSection = await Section.updateOne(
      { _id: req.params.sectionId },
      { $set: { description: req.body.description } }
    );
    res.json(updatedSection);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:sectionId", authorizeAccessToken, async (req, res) => {
  try {
    const removedSection = await Section.deleteOne({ _id: req.params.sectionId });
    res.json(removedSection);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;

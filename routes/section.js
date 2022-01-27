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

router.get("/:sectionId", async (req, res) => {
  try {
    const section = await Section.findById(req.params.sectionId);
    res.json(section);
  } catch (err) {
    res.json({ message: err });
  }
});

//Create a section
router.post("/", async (req, res) => {
  const section = new Section({
    dashboard: req.body.dashboard,
    description: req.body.description,
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

router.patch("/:sectionId", async (req, res) => {
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

module.exports = router;

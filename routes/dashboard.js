const express = require("express");
const router = express.Router();
const authorizeAccessToken = require("../utils/jwtValidate");
const Dashboard = require("../models/Dashboard");
const User = require("../models/User");

//Gets all the posts
router.get("/", async (req, res) => {
  try {
    const dashboard = await Dashboard.find();
    res.json(dashboard);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:dashboardId", async (req, res) => {
  try {
    const dashboard = await Dashboard.findById(req.params.dashboardId);
    res.json(dashboard);
  } catch (err) {
    res.json({ message: err });
  }
});
//Submit a posts
router.post("/", async (req, res) => {
  const dashboard = new Dashboard({
    student: req.body.student,
    tutor: req.body.tutor,
    course: req.body.course,
  });
  console.log(req);
  try {
    const savedDashboard = await dashboard.save();
    await User.findByIdAndUpdate(req.body.student, {
      $push: { dashboard: savedDashboard._id },
    });
    await User.findByIdAndUpdate(req.body.tutor, {
      $push: { dashboard: savedDashboard._id },
    });
    res.json(savedDashboard);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:dashboardId", async (req, res) => {
  try {
    const updatedService = await Dashboard.updateOne(
      { _id: req.params.dashboardId },
      { $set: { message: req.body.message } }
    );
    res.json(updatedService);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

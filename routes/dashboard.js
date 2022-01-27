const express = require("express");
const router = express.Router();
const authorizeAccessToken = require("../utils/jwtValidate");
const Dashboard = require("../models/Dashboard");
const Service = require("../models/Service");
const User = require("../models/User");
const mongoose = require("mongoose");

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
    const dashboard = await Dashboard.findById(
      mongoose.Types.ObjectId(req.params.dashboardId)
    )
      .populate("student")
      .populate("tutor")
      .populate("sections")
      .exec();
    res.json(dashboard);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/register/student", async (req, res) => {
  //Get all courses id
  const courses = req.body.courses;

  try {
    const dashboards = courses.map((course) => {
      return new Dashboard({
        student: req.body.student,
        tutor: course.tutor,
        course: course._id,
      });
    });
    const savedDashboards = await Dashboard.insertMany(dashboards);
    const allTutors = savedDashboards.map((dashboard) => {
      return dashboard.tutor;
    });
    const allStudents = savedDashboards.map((dashboard) => {
      return dashboard.student;
    });
    const allCourses = savedDashboards.map((dashboard) => {
      return dashboard.course;
    });
    const allDashboard = savedDashboards.map((dashboard) => {
      return dashboard._id;
    });
    const bulkTutors = [];
    savedDashboards.forEach((item) => {
      let updateDoc = {
        updateOne: {
          filter: { _id: item.tutor },
          update: { $push: { dashboard: item._id } },
          upsert: false,
        },
      };
      bulkTutors.push(updateDoc);
    });
    const bulkCourses = [];
    savedDashboards.forEach((item) => {
      let updateDoc = {
        updateOne: {
          filter: { _id: item.course },
          update: { $inc: { students: 1 } },
          upsert: false,
        },
      };
      bulkCourses.push(updateDoc);
    });
    await User.bulkWrite(bulkTutors);
    await Service.bulkWrite(bulkCourses);
    await User.findByIdAndUpdate(req.body.student, {
      $push: { dashboard: { $each: allDashboard } },
    });

    res.json(savedDashboards);
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

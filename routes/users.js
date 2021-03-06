const express = require("express");
const router = express.Router();
const authorizeAccessToken = require("../utils/jwtValidate");
const User = require("../models/User");

//Gets all the posts
router.get("/", authorizeAccessToken, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submit a posts
router.post("/", authorizeAccessToken, async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    uid: req.body.uid,
    role: req.body.role,
    description: req.body.description,
    age: req.body.age,
    profilePic: req.body.imgUrl,
  });
  console.log(req);
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:id", authorizeAccessToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("courses")
      .populate({
        path: 'dashboard',
        populate: [{
          path: 'course'
        },{
          path: 'student'
        }]
      })
      .exec();
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/public/:id/user", async (req, res) => {
  try {
    const user = await User.find(
      { _id: req.params.id },
      { dashboard: 0, uid: 0 }
    );
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:id", authorizeAccessToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/authUser/:uid", authorizeAccessToken, async (req, res) => {
  try {
    const user = await User.find({ uid: req.params.uid });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
// authorizeAccessToken,
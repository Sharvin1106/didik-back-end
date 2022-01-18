const express = require("express");
const router = express.Router();
const authorizeAccessToken = require("../utils/jwtValidate");
const User = require("../models/User");

//Gets all the posts
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submit a posts
router.post("/",  async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailAddress: req.body.emailAddress,
    uid: req.body.uid,
    role: req.body.role,
  });
  console.log(req);
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    const user = await User.find({ uid: req.params.uid });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
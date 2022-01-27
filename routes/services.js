const express = require("express");
const router = express.Router();
const authorizeAccessToken = require("../utils/jwtValidate");
const Service = require("../models/Service");

//Gets all the service
router.get("/", async (req, res) => {
  const child = req.query.child;
  let parent = req.query.parent;
  if (parent !== undefined && parent == "Medium") {
    let parentLower = parent.toLowerCase();
    console.log(parentLower);
    console.log(child);
    var query = { [parentLower]: child };
    try {
      const services = await Service.find(query);
      res.json(services);
    } catch (err) {
      res.json({ message: err });
    }
  } else if (parent !== undefined && parent == "Pricing") {
    let parentLower = parent.toLowerCase();
    console.log(parentLower);
    console.log(child);
    let query = {};
    if (child === "<RM10") {
      query = { [parentLower]: { $gt: 1, $lt: 10 } };
    } else if (child == "RM10-RM50") {
      query = { [parentLower]: { $gt: 11, $lt: 49 } };
    } else if (child == "RM50-RM100") {
      query = { [parentLower]: { $gt: 51, $lt: 99 } };
    } else {
      query = { [parentLower]: { $gt: 100, $lt: 1000 } };
    }
    console.log(query);
    try {
      const services = await Service.find(query);
      res.json(services);
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    try {
      const services = await Service.find();
      res.json(services);
    } catch (err) {
      res.json({ message: err });
    }
  }
});

//Create a service
router.post("/", async (req, res) => {
  const service = new Service({
    title: req.body.title,
    description: req.body.description,
    pricing: req.body.pricing,
    lessons: req.body.lessons,
    mode: req.body.mode,
    medium: req.body.medium,
    img: req.body.imgUrl,
    tutor: req.body.tutor
  });
  console.log(req);
  try {
    const savedService = await service.save();
    await User.findByIdAndUpdate(req.body.tutor, {
      $push: { courses: savedService._id },
    });
    res.json(savedService);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:serviceId", async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId)
      .populate({ path: "comments", populate: { path: "student" } })
      .exec();
    res.json(service);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/cart/items", authorizeAccessToken, async (req, res) => {
  try {
    const service = await Service.find({
      _id: { $in: JSON.parse(req.query.services) },
    });
    res.json(service);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:serviceId", authorizeAccessToken, async (req, res) => {
  try {
    const removedService = await Service.remove({ _id: req.params.serviceId });
    res.json(removedService);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:serviceId", async (req, res) => {
  try {
    const updatedService = await Service.updateOne(
      { _id: req.params.serviceId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedService);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

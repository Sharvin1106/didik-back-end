const express = require("express");
const router = express.Router();
const authorizeAccessToken = require("../utils/jwtValidate")
const Service = require("../models/Service");


//Gets all the posts
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submit a posts
router.post("/", async (req, res) => {
  const service = new Service({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedService = await service.save();
    res.json(savedService);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:serviceId", async (req, res) => {
  try {
    const service = await Service.findById(req.params.serviceId);
    res.json(service);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:serviceId", async (req, res) => {
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

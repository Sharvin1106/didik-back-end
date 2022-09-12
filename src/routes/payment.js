const express = require("express");
const router = express.Router();
const authorizeAccessToken = require("../utils/jwtValidate");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/Payment");
const mongoose = require("mongoose");

router.post("/create-payment-intent", authorizeAccessToken, async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(req.body.amount * 100),
      currency: "MYR",
      payment_method_types: ["alipay", "card", "fpx", "grabpay"],
    });
    const payment = new Payment({
      courses: req.body.courses,
      amount: req.body.amount,
      student: req.body.student,
      paymentLink: paymentIntent.client_secret,
    });
    const savedPayment = await payment.save();
    res.json(savedPayment);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/payment/:paymentId/topay", authorizeAccessToken, async (req, res) => {
  try {
    const payment = await Payment.findById(
      new mongoose.Types.ObjectId(req.params.paymentId)
    )
      .populate("courses")
      .exec();
    res.json(payment);
  } catch (err) {
    console.log(err);
  }
});

router.get("/allpayments/:studentId/topay", async (req, res) => {
  try {
    const payment = await Payment.find(
      { student: req.params.studentId },
      { paymentType: "toPay" }
    )
      .populate("courses")
      .exec();
    res.json(payment);
  } catch (err) {
    console.log(err);
  }
});

router.post("/confirmPayment", authorizeAccessToken, async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.body.paymentId, {
      $set: { paymentType: "Paid" },
    });
    return res.json(payment);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

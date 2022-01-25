const express = require("express");
const router = express.Router();
const authorizeAccessToken = require("../utils/jwtValidate");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/Payment");
const mongoose = require("mongoose");

router.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(req.body.amount * 100),
      currency: "MYR",
      payment_method_types: ["alipay", "card", "fpx", "grabpay"],
    });
    const payment = new Payment({
      courses: req.body.courses,
      amount: req.body.amount,
      paymentLink: paymentIntent.client_secret,
    });
    const savedPayment = await payment.save();
    res.json(savedPayment);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/payment/:paymentId/topay", async (req, res) => {
  try {
    const payment = await Payment.findById(
      new mongoose.Types.ObjectId(req.params.paymentId)
    ).populate("courses");
    res.json(payment);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

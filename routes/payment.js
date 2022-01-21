const express = require("express");
const router = express.Router();
const authorizeAccessToken = require("../utils/jwtValidate");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Dashboard = require("../models/Dashboard");
const User = require("../models/User");

router.post("/create-payment-intent", async (req, res) => {
  try {
    const { paymentMethodType, currency } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1999,
      currency: currency,
      payment_method_types: ["alipay", "card", "fpx", "grabpay"],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

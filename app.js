
const express = require("express");
const app = express();
const mongoose = require("mongoose");


require("dotenv").config();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
//Import Routes

const servicesRoute = require("./routes/services");
const subjectsRoute = require("./routes/subjects");
const authorizeAccessToken = require("./utils/jwtValidate");

//Chatbox
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

app.use("/services", servicesRoute);
app.use("/subjects", subjectsRoute);

//Chatbox
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);

//ROUTES
app.get("/", (req, res) => {
  res.write(`<h1>Didik Backend System</h1>`)
  res.send();
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("Connected to DB")
);






const stripe = require('stripe');
// const express = require('express');
// const app = express();

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_FQaNTu93GB3OGBlLRxLwLjXxB8OL4GFs";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

// app.listen(3001, () => console.log('Running on port 4242'));

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), function () {
  console.log("Node server is running on port " + app.get("port"));
});


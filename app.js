const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");


app.use(express.json())
//Import Routes

const servicesRoute = require("./routes/services");

app.use("/services", servicesRoute);

//ROUTES
app.get("/", (req, res) => {
  res.write("<h1>Testing Didik</h1>");
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("Connected to DB")
);

app.listen(3000);

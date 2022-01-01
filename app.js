const express = require("express");
const app = express();
const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(express.json());
//Import Routes

const servicesRoute = require("./routes/services");

app.use("/services", servicesRoute);

//ROUTES
app.get("/", (req, res) => {
  res.write("<h1>Testing Didik</h1>");
  res.send();
});

//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("Connected to DB")
);

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), function () {
  console.log("Node server is running on port " + app.get("port"));
});

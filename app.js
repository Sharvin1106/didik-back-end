const express = require("express");
const app = express();
const mongoose = require("mongoose");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(express.json());
//Import Routes

const servicesRoute = require("./routes/services");
const subjectsRoute = require("./routes/subjects");
const authorizeAccessToken = require("./utils/jwtValidate");

app.use("/services", servicesRoute);
app.use("/subjects", subjectsRoute);

//ROUTES
app.get("/", (req, res) => {
  res.write(`<h1>Didik Backend System</h1>`)
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

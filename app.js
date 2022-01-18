const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const initFirebase = require("./config");
const authorizeAccessToken = require("./utils/jwtValidate");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
//Import Routes

const servicesRoute = require("./routes/services");
const subjectsRoute = require("./routes/subjects");
const usersRoute = require("./routes/users");
const dashboardRoute = require("./routes/dashboard")

app.use("/services", servicesRoute);
app.use("/subjects", subjectsRoute);
app.use("/users", usersRoute);
app.use("/dashboard", dashboardRoute);

//ROUTES
app.get("/", authorizeAccessToken, (req, res) => {
  res.write(`<h1>Didik Backend System</h1>`);
  res.send();
});

initFirebase();
//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () =>
  console.log("Connected to DB")
);

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), function () {
  console.log("Node server is running on port " + app.get("port"));
});

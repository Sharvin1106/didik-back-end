const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authConfig = require("./auth-config.json");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const authorizeAccessToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"],
});

app.use(express.json());
//Import Routes

const servicesRoute = require("./routes/services");

app.use("/services", servicesRoute);

//ROUTES
app.get("/", authorizeAccessToken, (req, res) => {
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

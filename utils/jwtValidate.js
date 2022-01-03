const authConfig = require("../auth-config.json");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

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

module.exports = authorizeAccessToken;

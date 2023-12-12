require("dotenv").config();
const JWT = require("jsonwebtoken");

function authorised(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(401).json({ status: "logout", message: "Login again !" });

  // authHeader = "bearer TOKEN"
  const token = authHeader.split(" ")[1];
  JWT.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ status: "err", message: "invalid token" });
    req.PHONE_NUMBER = decoded.phoneNumber;
    next();
  });
}

module.exports = { authorised };

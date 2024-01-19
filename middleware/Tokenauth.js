require("dotenv").config();

const jwt = require("jsonwebtoken");
const key = process.env.JWT_SECRET_KEY;

const VerifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log(
    "Incoming request for verification:",
    req.method,
    req.originalUrl
  );

  if (!token) {
    console.log("No token found. Sending 401 Unauthorized");
    return res.sendStatus(401);
  }

  jwt.verify(token, key, (err, user) => {
    if (err) {
      console.log("Token verification failed. Sending 403 Forbidden");
      return res.sendStatus(403);
    }

    console.log("Token verified. Proceeding to next middleware");
    req.user = user; // Attach the user object to the request for future use if needed
    next(); // Call next to proceed to the next middleware
  });
};

module.exports = VerifyToken;

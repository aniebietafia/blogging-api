const User = require("../models/users-model");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // Check header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Invalid authentication");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the blogs route
    req.user = { userId: payload.userId, first_name: payload.first_name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid authentication");
  }
};

module.exports = auth;

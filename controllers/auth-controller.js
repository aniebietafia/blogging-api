// Import user model
const User = require("../models/users-model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

// User Sign up
exports.postUserSignUp = async (req, res, next) => {
  // Storing user inputs from the req.body - v1
  // const { first_name, last_name, email, password } = req.body;

  // Storing user inputs from the req.body - v2
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
  });

  const token = user.createJWT();

  res
    .status(StatusCodes.CREATED)
    .json({ user: { first_name: user.first_name }, token });
};

// Login User
exports.postUserLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Kindly provide your correct login details");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid details");
  }

  // Check and compare passwords
  const passwordMatch = await user.pwdChecks(password);
  if (!passwordMatch) {
    throw new UnauthenticatedError("Invalid details");
  }

  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { first_name: user.first_name }, token });
};

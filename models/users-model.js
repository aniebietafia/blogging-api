const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new Schema({
  first_name: {
    type: String,
    required: [true, "Enter your first name"],
  },
  last_name: {
    type: String,
    required: [true, "Enter your last name"],
  },
  password: {
    type: String,
    required: [true, "Enter your unique password"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
});

// Using mongoose middleware to hash passwords before saving to database
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

// Generating token using instance method
userSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, first_name: this.first_name },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Retrieving and comparing passwords from the databse
userSchema.methods.pwdChecks = async function (enteredPassword) {
  const matchedPwd = await bcrypt.compare(enteredPassword, this.password);
  return matchedPwd;
};

module.exports = mongoose.model("User", userSchema);

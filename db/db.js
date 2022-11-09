const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;

const MONGODB_CONNECTION = () => {
  mongoose.connect(MONGODB_URL);

  mongoose.connection.on("connected", () => {
    console.log("MongoDB has succesfully connected");
  });

  mongoose.connection.on("error", (error) => {
    console.log("Connection error to MongoDb");
    console.log(error);
  });
};

module.exports = {
  MONGODB_CONNECTION,
};

// Importing node core modules
const path = require("path");

// Importing third party modules
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
require("express-async-errors");

// Connection to MongoDB database
const { MONGODB_CONNECTION } = require("./db/db");

// Importing router modules
const authenticateUser = require("./middleware/authentication");
const blogsRoute = require("./routes/blogs-route");
const authRoute = require("./routes/auth-route");

// Error Handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Initilizing express app
const app = express();
const PORT = process.env.PORT || 3000;

// Setting up the ejs templating engine
app.set("view engine", "ejs");
app.set("views", "views");

// Middlewares for parsing the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Using the middlewares
app.use(express.json());

app.use("/admin", authRoute);
app.use("/blogs", authenticateUser, blogsRoute);

// Implementing error middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Using the MongoDB function
MONGODB_CONNECTION();

// Starting the server
app.listen(PORT);

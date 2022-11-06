// Importing node core modules
const path = require("path");

// Importing third-party modules
const express = require("express");
//const passport = require("passport");
require("dotenv").config();
const bodyParser = require("body-parser");

//Signup and login authentication middleware
//require("./authentication/auth");

// Initializing express app
const app = express();
const PORT = process.env.PORT;

// Importing local modules
const blogsRoute = require("./routes/blogs-route");
const usersRoute = require("./routes/users-route");
const errorController = require("./controllers/error");

//Connecting to MongoDB
const { MONGODB_CONNECTION } = require("./db/db");

//Setting up the ejs templating engine
app.set("view engine", "ejs");
app.set("views", "views");

//Middleware for parsing the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Connecting to database
MONGODB_CONNECTION();


//Using the middlewares
app.use(express.json());
app.use(blogsRoute);
app.use(usersRoute);
app.use(errorController.errorPage);

// Listening to server
app.listen(PORT);

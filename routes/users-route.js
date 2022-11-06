const express = require("express");

const router = express.Router();
const userController = require("../controllers/user-controller");
const blogsController = require("../controllers/blogs-controller");

router.get("/admin/signup", userController.getSignUpForm);

router.post("/admin/signup", userController.postCreatedUser);

router.get("/admin/login", userController.getLogin);

router.post("/admin/login", userController.postLogin);

router.get("/admin/admin-blog", userController.getAdminBlog);

router.get("/admin/:id", userController.getAdminBlog);

module.exports = router
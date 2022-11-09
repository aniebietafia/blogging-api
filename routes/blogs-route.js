const express = require("express");

const router = express.Router();

const blogsController = require("../controllers/blogs-controller");

// Route to get all blogs without signing up or logging in
router.get("/", blogsController.getBlogs);

// Route to get all blogs posted by a signed up user
router.get("/admin", blogsController.getAdminBlogs);

// Route to create new blog - must be signed up and logged in
router.post("/admin", blogsController.postNewBlog);

// Route to get a single blog - must be signed up and logged in
router.get("/:id", blogsController.getSingleBlog);

// Route to to update a blog - must be signed up and logged in
router.patch("/:id", blogsController.updateBlog);

// Route to delete a blog - must be signed up and logged in
router.delete("/:id", blogsController.deleteBlog);

module.exports = router;

const express = require("express");

const router = express.Router();

const blogsController = require("../controllers/blogs-controller");
const userController = require("../controllers/user-controller");

router.get("/blogs", blogsController.getIndexPage);

router.get("/blogs/create-blog", blogsController.getCreateBlog);

router.post("/blogs", blogsController.postCreatedBlog);

router.get("/blogs/:id", blogsController.getFullBlog);

router.get("/blogs/edit-blog/:id", blogsController.getEditBlog);

router.post("/blogs/edit-blog/:id", blogsController.postEditedBlog);

router.post("/blogs/delete-blog/:id", blogsController.postDeleteBlog);


module.exports = router;

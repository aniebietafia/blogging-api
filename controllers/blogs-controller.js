const Blog = require("../models/blog-model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

//Algorithm to calculate for reading time
const calculateReadingTime = (text) => {
  let readTime;
  try {
    const wpm = 275;
    const words = text.split(" ");
    const textWordAmount = words.length;
    readTime = Math.ceil(textWordAmount / wpm);
  } catch (e) {
    return null;
  }
  return readTime;
};

// Get all blogs without signing up or logging in
exports.getBlogs = async (req, res, next) => {
  const blogs = await Blog.find();
  res.status(StatusCodes.OK).json({ blogs });
};

// Get all blogs when signed in with pagination
exports.getAdminBlogs = async (req, res, next) => {
  let page = req.query.page * 1 || 1;
  let limit = req.query.limit * 1 || 20;
  let skip = (page - 1) * limit;
  const blogs = await Blog.find({ author: req.user.userId })
    .skip(skip)
    .limit(limit);
  res.status(StatusCodes.OK).json({ blogs });
};

// Get single Blog
exports.getSingleBlog = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: blogId },
  } = req;

  const blog = await findOne({
    _id: blogId,
    author: userId,
  });

  res.status(StatusCodes.OK).json({ blog });
};

// Post Blog
exports.postNewBlog = async (req, res) => {
  req.body.author = req.user.userId;
  req.body.reading_time = calculateReadingTime(req.body.blogBody);

  const blog = await Blog.create(req.body);
  res.status(StatusCodes.CREATED).json({ blog });
};

// Update Blog
exports.updateBlog = async (req, res, next) => {
  const {
    //body: { title, category, description, blogBody, reading_time },
    user: { userId },
    params: { id: blogId },
  } = req;

  const blog = await Blog.findByIdAndUpdate(
    { _id: blogId, author: userId },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ blog });
};

// Delete Blog
exports.deleteBlog = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: blogId },
  } = req;

  const blog = await Blog.findByIdAndRemove({
    _id: blogId,
    author: userId,
  });

  res.status(StatusCodes.OK).json({ blog });
};

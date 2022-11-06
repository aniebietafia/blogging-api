const Blogs = require("../models/blogs-model");
const {text} = require("body-parser");

const ITEMS_PER_PAGE = 2;

//Algorithm to calculate for reading time
const calculateReadingTime = (text) => {
    let readTime;
    try {
        const wpm = 275;
        const words = text.split(' ');
        const textWordAmount = words.length;
        readTime = Math.ceil(textWordAmount / wpm);
    }catch (e) {
        return null;
    }
    return readTime;
}

//Index page to render (fetch) all blogs from the database
exports.getIndexPage = (req, res, next) => {
    const page = +req.query.page || 1;
    let totalItems;

    Blogs.find()
        .countDocuments()
        .then(numBlogs => {
            totalItems = numBlogs;
            return Blogs.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        }).then(blogs => {
    res.render("blogs/index", {
      blogs: blogs,
      pageTitle: "All Blogs",
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
    });
  });
};

exports.getCreateBlog = (req, res, next) => {
  res.render("blogs/create-blog", {
    pageTitle: "Create a Blog",
  });
}

//Function to create a new blog
exports.postCreatedBlog = (req, res, next) => {
  const imageUrl = req.body.imageUrl;
  const title = req.body.title;
  const description = req.body.description;
  const blogBody = req.body.blogBody;
  const reading_time = calculateReadingTime(req.body.blogBody);
  const blog = new Blogs({
    imageUrl: imageUrl,
    description: description,
    title: title,
    blogBody: blogBody,
    reading_time: reading_time
    //userId: req.user
  });
  blog.save().then(() => {
    res.redirect(`/blogs/${blog._id}`);
  })
      .catch(error => {
        console.log(error);
      });
}

exports.getEditBlog = (req, res, next) => {
    const { id } = req.params;
    Blogs.findOne({
        _id: id
    })
        .then(blog => {
            res.render("blogs/edit-blog", {
                pageTitle: "Edit Blog",
                blog: blog,
            });
        })
        .catch(error => {
            console.log(error);
        });
};

exports.postEditedBlog = (req, res, next) => {
    const { id } = req.params;
    const updatedTitle = req.body.title;
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;
    const updatedBlogBody = req.body.blogBody;
    const updatedReading_time = calculateReadingTime(req.body.blogBody);

    Blogs.findById({
        _id: id
    }).then(blog => {
        blog.title = updatedTitle;
        blog.description = updatedDescription;
        blog.blogBody = updatedBlogBody;
        blog.imageUrl = updatedImageUrl;
        blog.reading_time = updatedReading_time;

        return blog.save();
    }).then(result => {
        res.redirect("/blogs");
    }).catch(error => {
        console.log(error);
    })
}

//Function to handle the Full blog based on id of the blog
exports.getFullBlog = (req, res, next) => {
  const blogId = req.params.id;
  Blogs.findById(blogId).then(blog => {
        res.render("blogs/showFullBlog", {
          blog: blog,
          pageTitle: blog.title
        });
      })
      .catch(error => {
        console.log(error);
      })
}

exports.postDeleteBlog = (req, res, next) => {
    const { id } = req.params;
    Blogs.deleteOne({
        _id: id
    })
        .then(() => {
            res.redirect("/blogs");
        })
        .catch(error => {
            console.log(error);
        });
}

const User = require("../models/users-model");
const bcrypt = require("bcrypt");
const Blogs = require("../models/blogs-model");

exports.getSignUpForm = (req, res, next) => {
    res.render("admin/signup", {
        pageTitle: "Sign Up"
    });
};

exports.getAdminBlog = (req, res, next) => {
    Blogs.find().then(blogs => {
        res.render("admin/admin-blog", {
            blogs: blogs,
            pageTitle: "Admin Blogs",
        });
    });
}

exports.postCreatedUser = (req, res, next) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
        .then(userDoc => {
            if (userDoc) {
                return res.redirect("/admin/login");
            }
            return bcrypt.hash(password, 12);

        })
        .then(hashedPassword => {
            const user = new User({
                first_name: first_name,
                last_name: last_name,
                email: email,
                password: hashedPassword,
                blogs: []
            });
            return user.save();
        })
        .then(result => {
            res.redirect("/admin/login");
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getLogin = (req, res, next) => {
    res.render("admin/login", {
        pageTitle: "Login"
    });
}

exports.postLogin = (req, res, next) => {
    res.redirect("/blogs/admin-blog");
}

exports.getAdminFullBlog = (req, res, next) => {
    const blogId = req.params.id;
    Blogs.findById(blogId).then(blog => {
        res.render("admin/adminFullBlog", {
            blog: blog,
            pageTitle: blog.title
        });
    })
        .catch(error => {
            console.log(error);
        })
}
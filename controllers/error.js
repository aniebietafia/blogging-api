exports.errorPage = (req, res, next) => {
  res.render("error", {
    pageTitle: "Error | Page Not Found",
    path: "/404",
  });
};

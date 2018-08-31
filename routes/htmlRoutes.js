var ensureLogin = require("connect-ensure-login");

module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/login", function (req, res) {
    res.render("index", {
      login: true,
      onload: function () {
        document.getElementById("signin-btn").click();
      }
    });
  });

  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  app.get("/board",
    ensureLogin.ensureLoggedIn("/login"),
    function (req, res) {
      res.render("board", {
        username: req.user.username
      });
    });

  app.get("/controller",
    ensureLogin.ensureLoggedIn("/login"),
    function (req, res) {
      res.render("controller", {
        username: req.user.username
      });
    });

  app.get("/settings",
    ensureLogin.ensureLoggedIn("/login"),
    function (req, res) {
      res.render("settings", {
        username: req.user.username
      });
    });

  app.get("/dashboard",
    ensureLogin.ensureLoggedIn("/login"),
    function (req, res) {
      res.render("dashboard", {
        username: req.user.username
      });
    });

  app.get("/instructions", function (req, res) {
    res.render("instructions");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
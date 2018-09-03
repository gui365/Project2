var ensureLogin = require("connect-ensure-login");
var questions = require("../data/questions");

module.exports = function (app) {
  
  app.get("/", function (req, res) {
    res.render("index", {
      loginFailed: false
    });
  });

  app.get("/login", function (req, res) {
    res.render("index", {
      loginFailed: true
    });
  });

  app.get("/signup", function (req, res) {
    res.render("signup");
  });

  app.get("/board",
    // ensureLogin.ensureLoggedIn("/login"),
    function (req, res) {
      res.render("board", {
        // username: req.user.username
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

  app.get("/selectPredator",
    ensureLogin.ensureLoggedIn("/login"),
    function (req, res) {
      res.render("selectPredator");
    }
  );

  app.get("/selectAvatar",
    ensureLogin.ensureLoggedIn("/login"),
    function (req, res) {
      res.render("selectAvatar");
    }
  );

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  app.get("/board", function(req, res){
    var hbsObject = {
      questions: questions
    };
    console.log(hbsObject.questions);
    res.render("board", hbsObject);
  });
};
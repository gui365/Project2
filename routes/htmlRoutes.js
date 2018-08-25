module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/board", function(req, res) {
    res.render("board");
  });

  app.get("/controller", function(req, res) {
    res.render("controller");
  });

  app.get("/dashboard", function(req, res) {
    res.render("dashboard");
  });

  app.get("/instructions", function(req, res) {
    res.render("instructions");
  });

  app.get("/settings", function(req, res) {
    res.render("settings");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

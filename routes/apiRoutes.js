var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

  app.post("/login",
    passport.authenticate("local"),
    function (req, res) {
      res.redirect("/users/" + req.user.username);
    });

  app.post("/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect("/dashboard");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

};
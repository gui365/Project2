var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

  // app.post("/login",
  //   passport.authenticate("local", {
  //     successRedirect: "/dashboard",
  //     failureRedirect: "/",
  //   }));

  app.post("/login",
    passport.authenticate("local", {
      failureRedirect: "/"
    }),
    function (req, res) {
      res.json("/dashboard");
    });

  // app.post("/login",
  //   passport.authenticate("local"),
  //   function (req, res) {
  //     res.redirect("/dashboard");
  //   });

  app.post("/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect("/");
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
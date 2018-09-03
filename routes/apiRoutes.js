var db = require("../models");

module.exports = function (app, passport) {
  app.post("/login",
    passport.authenticate("local", {
      failureRedirect: "/login",
    }),
    function (req, res) {
      db.User.findOne({
        where: {
          email: req.body.email
        }
      }).then(function(dbPost) {
        res.json(dbPost.username);
      });
    });


  app.post("/signup", function (req, res) {
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
};
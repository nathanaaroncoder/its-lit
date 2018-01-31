var db = require("../models");

var passport = require("../config/passport");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    db.User.findAll({
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        UserId: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.put("/api/users/:id", function(req, res) {
    db.User.update(
      req.body,
      {
      where: {
        UserId: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};

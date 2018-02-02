var db = require("../models");

var passport = require("../config/passport");

module.exports = function(app) {

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        UserId: req.user.UserId
      });
    }
  });
  
// Get a JSON of all the users 
  app.get("/api/users", function(req, res) {
    db.User.findAll({
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });


// Get a JSON of one specific user by ID
  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        UserId: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

// Create a new user
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });


//
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

  app.put("/api/users/:id/:genre", function(req, res) {
    var genre = req.params.genre;
    console.log(genre);
    console.log('id: ', req.params.id)

  var user = db.User.find({
      where: {UserId: req.params.id}
    });

  user.then(function(data) {
    data.update({[genre]:true})
      .then(function(data) {
      console.log("Data: ", data);
      res.send(data);
    });
  })

  });

};

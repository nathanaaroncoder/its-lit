// Requiring our models
var db = require("../models");
var passport = require("../config/passport");

// Routes
// =============================================================
module.exports = function(app) {



  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/matches");
  });


  app.post("/api/change", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    // res.json("/profile");
  });
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      city: req.body.city,
      state: req.body.state
    }).then(function() {
      res.redirect(307, "/api/change");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });


 


  // GET route for getting all of the books
  app.get("/api/books", function(req, res) {
    var query = {};
    if (req.query.UserUserId) {
      console.log(req.query)
      query.UserUserId = req.query.UserUserId;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Book.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });



  // Get route for retrieving books that match user's preferences,
  //are checked in, and don't belong to them
 app.get("/api/books/:userid/:category/:category2?/:category3?/:category4?/:category5?/:category6?/", function(req, res) {
    
    console.log("here")
    db.Book.findAll({
      where: { checkedOut:false, UserUserId: {$ne: req.params.userid},
       $or: [{genre: {$eq: req.params.category} }, { genre: {$eq: req.params.category2}},
       { genre: {$eq: req.params.category3}}, { genre: {$eq: req.params.category4}}, 
       { genre: {$eq: req.params.category5}}, { genre: {$eq: req.params.category6}  }]
       // ,[{UserId: {$ne: req.body.id}}]
    
    },
      include: [db.User]
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  // POST route for saving a new book
  app.post("/api/books", function(req, res) {
    db.Book.create(req.body).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  // DELETE route for deleting books
  app.delete("/api/books/:id", function(req, res) {
    db.Book.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBook) {
      res.json(dbBook);
    });
  });

  // PUT route for updating books
  app.put("/api/books/:id?/:isCheckedOut", function(req, res) {
    db.Book.update({
      checkedOut: req.params.isCheckedOut
    },
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbBook) {
        res.json(dbBook);
      });
  });

};





  




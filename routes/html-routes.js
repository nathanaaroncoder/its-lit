// Dependencies
// =============================================================
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads login.html
  // app.get("/", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/login.html"));
  // });

  // signup route loads signup.html
  // app.get("/signup", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/signup.html"));
  // });


  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    if (req.user) {
      res.redirect("/profile");
    }
    res.sendFile(path.join(__dirname, "../public/landing.html"));
  });
 

  // app.get("/signup", function(req, res) {
  //   if (req.user) {
      
  //     res.redirect("/profile");
  //   }
  //   res.sendFile(path.join(__dirname, "../public/signup.html"));
  // });

   app.get("/register", function(req, res) {
    // If the user already has an account send them to the profile page
    if (req.user) {
      res.redirect("/matches");
    }
    res.sendFile(path.join(__dirname, "../public/register.html"));
  });

   // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/profile", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });

  app.get("/matches", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/matches.html"));
  });

  app.get("/results", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/results.html"));
  });

   // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

};







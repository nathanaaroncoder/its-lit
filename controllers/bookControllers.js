// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the books
  app.get("/api/books", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
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

  // Get route for retrieving a single book
  app.get("/api/books/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Book.findOne({
      where: {
        id: req.params.id
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
  app.put("/api/books", function(req, res) {
    db.Book.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbBook) {
        res.json(dbBook);
      });
  });
};

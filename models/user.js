// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    UserId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    horror: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    YA: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    fantasy: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    action: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    mystery: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    classic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    other: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  });

  User.associate = function(models) {
    // Associating User with Books
    // When a User is deleted, also delete any associated Books
    User.hasMany(models.Book, {
      onDelete: "cascade"
    });
  };

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
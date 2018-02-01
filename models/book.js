module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define("Book", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    checkedOut: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    picLink: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
    }
  });

  Book.associate = function(models) {
      // We're saying that a Book should belong to User
      // A Book can't be created without User due to the foreign key constraint
      Book.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        }
      });
    };

return Book;
};
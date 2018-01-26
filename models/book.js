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
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.TEXT
      }
    });
};
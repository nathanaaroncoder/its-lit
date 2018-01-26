module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
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
        type: DataTypes.BOOLEAN
      },
      YA: {
        type: DataTypes.BOOLEAN
      },
      fantasy: {
        type: DataTypes.BOOLEAN
      },
      action: {
        type: DataTypes.BOOLEAN
      },
      mystery: {
        type: DataTypes.BOOLEAN
      },
      classic: {
        type: DataTypes.BOOLEAN
      }
    });
};
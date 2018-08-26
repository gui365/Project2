module.exports = function(sequelize, DataTypes) {
      var User = sequelize.define("User", {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      wins: DataTypes.INT,
      deaths: DataTypes.INT
    });
    return User;
};

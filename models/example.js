module.exports = function(sequelize, DataTypes) {
  var Questions = sequelize.define("Question", {
    question: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    correctAnswer: DataTypes.STRING,
    allAnswers: DataTypes.ARRAY
  });
  return Questions;

      var User = sequelize.define("User", {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      wins: DataTypes.INT,
      deaths: DataTypes.INT
    });
    return User;
};

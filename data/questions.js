var mysql = require("mysql");
var questions = [];

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "trivia_db"
});

connection.connect(function(err) {
  if (err) {
    throw err;
  }
  pickEasyQuestions();
  pickMediumQuestions();
  pickHardQuestions();
});

function pickEasyQuestions() {
  connection.query("SELECT * FROM questions WHERE difficulty = 'easy' ORDER BY RAND() LIMIT 4", function(err, results){
    if (err) {
      throw err;
    }
    populateQuestions(results);
  });
}

function pickMediumQuestions() {
  connection.query("SELECT * FROM questions WHERE difficulty = 'medium' ORDER BY RAND() LIMIT 4", function(err, results){
    if (err) {
      throw err;
    }
    populateQuestions(results);
  });
}

function pickHardQuestions() {
  connection.query("SELECT * FROM questions WHERE difficulty = 'hard' ORDER BY RAND() LIMIT 2", function(err, results){
    if (err) {
      throw err;
    }
    populateQuestions(results);
  });
}

function populateQuestions(results) {
  for (var i = 0; i < results.length; i++) {
    var question = {};
    question.difficulty = results[i].difficulty;
    question.question = results[i].question;
    question.correct = results[i].correct_answer;
    question.incorrect1 = results[i].incorrect0;
    question.incorrect2 = results[i].incorrect1;
    question.incorrect3 = results[i].incorrect2;
    questions.push(question);
  }
  if (questions.length === 10) {
    connection.end();
  }
}

module.exports = questions;

var mysql = require("mysql");
var questions = [];

var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "trivia_db"
  });
} 

connection.connect(function(err) {
  if (err) {
    throw err;
  }
  pickEasyQuestions();
  pickMediumQuestions();
  pickHardQuestions();
});

function pickEasyQuestions() {
  connection.query("SELECT * FROM questions WHERE difficulty = 'easy' ORDER BY RAND() LIMIT 7", function(err, results){
    if (err) {
      throw err;
    }
    populateQuestions(results);
  });
}

function pickMediumQuestions() {
  connection.query("SELECT * FROM questions WHERE difficulty = 'medium' ORDER BY RAND() LIMIT 5", function(err, results){
    if (err) {
      throw err;
    }
    populateQuestions(results);
  });
}

function pickHardQuestions() {
  connection.query("SELECT * FROM questions WHERE difficulty = 'hard' ORDER BY RAND() LIMIT 1", function(err, results){
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
  if (questions.length === 13) {
    console.log(questions);
    connection.end();
  }
}

module.exports = questions;
module.exports = connection;
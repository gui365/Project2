var questions = [
  {
    correctAnswer: "yellow",
    incorrect1: "seven",
    incorrect2: "elephant",
    incorrect3: "panda"
  }
];
roundNumber = 0;


var randomizeAnswerOptions = function() {
  var A = "";
  var B = "";
  var C = "";
  var D = "";
  var indexes = [];
  var answerArray = [];
  answerArray.push(questions[roundNumber].correctAnswer);
  answerArray.push(questions[roundNumber].incorrect1);
  answerArray.push(questions[roundNumber].incorrect2);
  answerArray.push(questions[roundNumber].incorrect3);


  while (indexes.length < 4) {
    var randomizedAnswer = Math.floor(Math.random() * answerArray.length);
    console.log(indexes.length);
    if (indexes.indexOf(randomizedAnswer) === -1) {
      indexes.push(randomizedAnswer);
    } 
  }
  A = answerArray[indexes[0]];
  B = answerArray[indexes[1]];
  C = answerArray[indexes[2]];
  D = answerArray[indexes[3]];
  console.log(A, B, C, D);
};

randomizeAnswerOptions();
var sessionCode = localStorage.getItem("sessionCode");
var currentGame = JSON.parse(localStorage.getItem("currentGame"))[sessionCode];
var initialCountdown = 6;

//who signed in from firebase (need the user object info)
//need to toggle the dashboard div to show the question and then the players/correct answers

// answer A on the screen equals 1st answer from the question array (randomize the answers)
//display the player stats/correct answers after the setTimeout completes (15 sec)
// Note: need to add timer div probably
$(document).ready(function () {
  // --------------------------------------------------------------
  // --------- GENERATE CHARACTERS AND LOGIC FOR MOVEMENT ---------
  // --------------------------------------------------------------

  // Use data in currentSession to render the predator and avatars on the game board
  $("#predator-img").attr("src", "/images/" + currentGame.predatorAvatar);
  $("#p1-img").attr("src", "/images/" + currentGame.p1Avatar);
  $("#p2-img").attr("src", "/images/" + currentGame.p2Avatar);
  $("#p3-img").attr("src", "/images/" + currentGame.p3Avatar);

  // Use data in currentSession to display the predator and avatar names
  $("#predator-name").text(currentGame.predatorName);
  $("#p1-name").text(currentGame.p1Username);
  $("#p2-name").text(currentGame.p2Username);
  $("#p3-name").text(currentGame.p3Username);

  // Trigger question modal pop-up
  // $("#modal-question").click();

  // Start a 5 seconds timer before displaying the first question
  // Activate the modal
  $("#initial-countdown").click();
  var startGame = setInterval(function () {
    if (initialCountdown === 1) {
      // Stop the timer
      clearInterval(startGame);
      // Close the modal
      $(".close-modal").click();
      reset();
    }

    initialCountdown--;
    $("#countdown").text(initialCountdown);

  }, 1000);

  var timer = 15;
  var answerArray = [];
  var intervalID;
  var clockRunning = false;


  function run() {
    if (!clockRunning) {
      intervalID = setInterval(decrement, 1500);
      document.getElementById("question").innerHTML = questionBeingAsked;
      answerArray.forEach(function (answer) {
        answerButtons = $("#choices").append("<button class=choice data-correct=" + answer + ">" + answer + "</button>");
      });
      clockRunning = true;
    }
  }

  function decrement() {
    timer--;
    var ticktock = timeConverter(timer);
    $("#timer").html(ticktock);
    if (timer === 0) {
      stop();
    }
  }

  function stop() {
    clearInterval(intervalID);
    clockRunning = false;
  }

  function timeConverter(t) {
    var seconds = t;
    if (t < 10) {
      seconds = "0" + t;
    }
    return "00:00:" + seconds;
  }

  function reset() {
    timer = 15;
    document.getElementById("timer").innerHTML = "00:00:15";
    $("#question").empty();
    $("#choices").empty();
    run();
  }





  // -----------------------------------------------------------------------------------------

  // on chosen answer click
  var roundNumber = 0;
  //this questions variable will be an array of objects
  var questions = require("../../data/questions");

  var randomizeAnswerOptions = function (question) {
    var A = "";
    var B = "";
    var C = "";
    var D = "";
    var indexes = [];
    var answerArrayUnordered = [];
    answerArrayUnordered.push(question.correctAnswer);
    answerArrayUnordered.push(question.incorrect1);
    answerArrayUnordered.push(question.incorrect2);
    answerArrayUnordered.push(question.incorrect3);

    while (indexes.length < 4) {
      var randomizedAnswer = Math.floor(Math.random() * answerArray.length);
      // console.log(indexes.length);
      if (indexes.indexOf(randomizedAnswer) === -1) {
        indexes.push(randomizedAnswer);
      }
    }
    A = answerArrayUnordered[indexes[0]];
    B = answerArrayUnordered[indexes[1]];
    C = answerArrayUnordered[indexes[2]];
    D = answerArrayUnordered[indexes[3]];
    answerArray.push(A, B, C, D);
  };

  for (roundNumber = 0; roundNumber < 14; roundNumber++) {
    var question = questions[roundNumber];
    randomizeAnswerOptions(question);

    $(".answer").on("click", function () {
      //this just returns the letter that was clicked on, A, B, C, D
      var chosenAnswer = $(this).attr("data-correct");
      var correctAnswer = questions[roundNumber].correctAnswer;
      if (chosenAnswer === correctAnswer) {
        //do stuff
      } else {
        //do other stuff
      }
    });
  }


});


// compare chosen answer with object's correct answer property
// if chosen answer matches correct answer then increase user object position property by one - make the player move one spot (front-end)
//Note: this needs to be saved in MYSQL - Need to add a position property to the user model object
// else keep the user object position the same (don't do anything)
// for the bear - move position after 2 questions
//NOTE: Need a bear object - put this in game.js to start, can move later.
// Compare user object position property to the bear object's:
// if they are equal, the user is eaten, some sort of visualization pops up telling them they are dead
// Compare the user's position to the cabin's position
// If user's position === position 11 (cabin), then that player sees some sort of visualization telling them that they won and are safe
//go through this for 13 rounds/questions
// Once all of the questions/rounds are done
// Show on dashboard who won, who died and say that the game is over
// Update user object with win++ or death++ -----> maybe a future implementation
// If they all died - some sort of visualization of the bear turning into an alien - Anh
// Display the above with a timer before ending the connection and showing the home screen again

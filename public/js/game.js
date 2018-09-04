var sessionCode = localStorage.getItem("sessionCode");
var currentGame = JSON.parse(localStorage.getItem("currentGame"))[sessionCode];
var initialCountdown = 6;
var questionNumber = 0;
// This variable will unable the players to choose an answer when there's no question displayed
var answerNow = false;
// This variable will be set to true when all players have answered
var allPlayersAnswered = false;
// If this var is true it will reset all players' choices in Firebase to ""
var resetChoices = false;
// This variable will determine if a player moves forward on not
var moveForward = false;
var correctAnswer = $("#" + questionNumber).attr("data-correct");

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

  
  // Start a 5 seconds timer before displaying the first question
  // Activate the modal
  $("#initial-countdown").click();
  var startGame = setInterval(function () {
    if (initialCountdown === 1) {
      // Stop the timer
      clearInterval(startGame);
      // Close the modal
      $(".close-modal").click();
      // Trigger question modal pop-up
      answerNow = true;
      resetChoices = false;
      $("#" + questionNumber).toggleClass("no-show");
      $("#modal-question").click();
      reset();
    }

    initialCountdown--;
    $("#countdown").text(initialCountdown);

  }, 1000);

  var timer = 15;
  var intervalID;
  var clockRunning = false;

  function run() {
    if (!clockRunning) {
      intervalID = setInterval(decrement, 1000);
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
    // If all players have answered, stop the clock and show the correct response
    if (allPlayersAnswered) {
      stop();
      // Select the correct choice and change its CSS
      $("#" + correctAnswer).toggleClass("correct");
      
      // PLAY CORRESPONDING SOUND ON CONTROLLER.HANDLEBARS ACCORDINGLY
      if (localStorage.getItem("boardScreen")) {
        // Change the CSS back to what is was and close the question modal after 5 seconds
        setTimeout(function() {
          $("#" + correctAnswer).toggleClass("correct");
          $(".close-modal-question").click();
          animateAvatars();
        }, 5000);
        // console.log("SCREEN");
      }
    }
  }

  function stop() {
    clearInterval(intervalID);
    clockRunning = false;
  }

  function timeConverter(t) {
    var seconds = t;
    if (t < 10) {
      seconds = t;
    }
    return seconds;
  }

  function reset() {
    timer = 150;
    $("#timer").text(timer);
    run();
  }

  // Moving the avatars
  function animateAvatars() {
    for (let i = 1; i < 4; i++) {
      var playerChoice = "p" + i + "Choice";
      if (currentGame[sessionCode][playerChoice] === correctAnswer) {
        var playerAvatar = $(".player" + i);
        // Move it forward
        playerAvatar.animate({
          left: "+8vw"
        }, 1000);
        
        console.log("p" + i + " correct");
        
      } else {
        console.log("p" + i + " incorrect");
        
      }
    }
      
    // Reset all variables
    moveForward = false;
    allPlayersAnswered = false;
    answerNow = false;
    resetChoices = true;
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

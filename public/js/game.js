var sessionCode = localStorage.getItem("sessionCode");
var currentGame = JSON.parse(localStorage.getItem("currentGame"))[sessionCode];
var questionNumber = 0;
// This variable will unable the players to choose an answer when there's no question displayed
var answerNow = false;
// This variable will be set to true when all players have answered
var allPlayersAnswered = false;
var finish = false;

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
  function generateQuestion() {
    console.log("Question: " + questionNumber);
    
    database.ref().child(localStorage.getItem("sessionCode")).update({
      questionNumber: questionNumber,
      p1Choice: "",
      p2Choice: "",
      p3Choice: ""
    });

    $("#question-number").text(questionNumber+1)
    var correctAnswer = $("#" + questionNumber).attr("data-correct");
    console.log("correct: " + correctAnswer);
    
    var initialCountdown = 6;

    if (questionNumber === 0) {
      $("#initial-countdown").click();
    };
      
    var startGame = setInterval(function () {
      if (initialCountdown === 1) {
        // Stop the timer
        clearInterval(startGame);
        // Close the modal
        $(".close-modal").click();
        // Trigger question modal pop-up
        answerNow = true;
        $("#" + questionNumber).toggleClass("no-show");
        $("#modal-question").click();
        initialCountdown = 6;
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
        allPlayersAnswered = true;
        
      }
      // If all players have answered, stop the clock and show the correct response
      if (allPlayersAnswered) {
        stop();
        // Select the correct choice and change its CSS
        $("." + correctAnswer).toggleClass("correct");
        
        // Controller will play sound
        var choice = "p" + localStorage.getItem("playerNumber") + "Choice";
        if (localStorage.getItem("controller")) {
          if (currentGame[sessionCode][choice] === correctAnswer) {
            var audio = new Audio("/sounds/answer_correct.mp3");
            audio.play();
            // console.log("Played sound: (correct)");
          } else {
            var audio = new Audio("/sounds/answer_wrong.mp3");
            audio.play();
            // console.log("Played sound: (incorrect)");
          }
        }
        
        // Show correct answer on board screen
        if (localStorage.getItem("boardScreen")) {
          // Change the CSS back to what is was and close the question modal after 5 seconds
          setTimeout(function() {
            $("." + correctAnswer).toggleClass("correct");
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
      timer = 15;
      $("#timer").text(timer);
      run();
    }
    
    // Moving the avatars
    function animateAvatars() {

      for (let i = 1; i < 4; i++) {
        var playerChoice = "p" + i + "Choice";
        if (currentGame[sessionCode][playerChoice] === correctAnswer) {
          var playerAvatar = $(".player" + i);

          // Record the numbe rof right answers under the data-correct attribute
          var numberCorrect = $(".player" + i).attr("data-correct");
          $(".player" + i).attr("data-correct", parseInt(numberCorrect) + 1)

          // Move it forward
          playerAvatar.animate({
            left: "+=10vw"
          }, 2000);
          // console.log("p" + i + " correct");
        }
      }
      
      
      if (questionNumber > 1) {
        var random = Math.floor(Math.random() * 5);
        if (random !== 1) {
          $(".predator").animate({
            left: "+=10vw"
          }, 1000);
        }
      }
      
      setTimeout(() => {
        checkWinLose();
        resetQuestion();
      }, 2200);
    }

    // WORK ON THIS FUNCTION NEXT - 9/4/18 9:55 PM
    function checkWinLose() {
      for (let i = 1; i < 4; i++) {
        var pPosition = $(".player" + i).attr("style");
        console.log(i + ": " + pPosition);
        
        console.log($(".player" + i).css("left"));
        
        // IF THE PLAYER GOT TO THE CABIN
        if ($(".player" + i).attr("style") === "left: 80vw;") {
          // On the board screen...
          if (localStorage.getItem("boardScreen")) {
            // Write name of player
            var avatarFile = currentGame[sessionCode]["p" + i + "Avatar"];
            var userFile = currentGame[sessionCode]["p" + i + "Username"];
            $("#winners").append(`<div style="d-flex flex-wrap flex-column align-items-center justify-content-center"><img src="./images/${avatarFile}"><p>${userFile}</p></div>`)
            $("#winners-modal").click();
            finish = true;
            setTimeout(() => {
              database.ref().child(sessionCode).remove();
              window.location.href = "/dashboard";
            }, 5000);
          // On the controller screen...
          } else if (localStorage.getItem("controller")) {
            var audio = new Audio("/sounds/game_win.mp3");
            audio.play();
          }
        // IF THE PLAYER GETS EATEN
        } else if ($(".predator").attr("style") !== undefined && $(".player" + i).attr("style") === $(".predator").attr("style")) {
          if (localStorage.getItem("boardScreen")) {
            $(".player" + i).hide();
            $(".player" + i).css("left", "-100vw;");
          } else if (localStorage.getItem("controller")) {
            var audio = new Audio("/sounds/game_lose.mp3");
            audio.play();
          }
        }
      }

      // if ($(".player1").is(":hidden") && $(".player2").is(":hidden") && $(".player3").is(":hidden")) {
      //   endGame();
      // }
    }

    function resetQuestion() {
      $("#" + questionNumber).toggleClass("no-show");
      questionNumber++;
      console.log(questionNumber);
      // Reset all variables
      allPlayersAnswered = false;
      answerNow = false;
      
      // Stop the game after 13 questions if nobody won
      // if (questionNumber === 14) {
      //   endGame();
      // } else {
      if (finish) {
        console.log("If True: " + finish);
        return;
      } else {
        console.log("If False: " + finish);
        generateQuestion();
      }
      // }
    }
  };

  function endGame() {
    $("#game-over").click();
        setTimeout(() => {
          window.location.href = "/dashboard";
          database.ref().child(sessionCode).delete();
        }, 5000);
  }

  generateQuestion();

});
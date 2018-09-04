//hide these keys in .dotenv file
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAVctAeThQ7WFsUui0Zdmf_2Mrr-8CoiNg",
  authDomain: "chooseyourpredator.firebaseapp.com",
  databaseURL: "https://chooseyourpredator.firebaseio.com",
  projectId: "chooseyourpredator",
  storageBucket: "chooseyourpredator.appspot.com",
  messagingSenderId: "921283071395"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// ----------------
// Global variables
// ----------------
var playerNumber = 0;
var sessionCode;
// Data coming back from Firebase for the current session
var currentGame;
// Grab the username from the dashboard
var userName;
// Initial structure sent to Firebase when the session is created
var gameStructure = {
  questionNumber: 0,
  correctAnswer: "",
  predatorAvatar: "",
  predatorName: "",
  p1Choice: "",
  p2Choice: "",
  p3Choice: "",
  p1Avatar: "",
  p2Avatar: "",
  p3Avatar: ""
};
// 

// This boolean will render the game board only on the device used to create the session
var boardScreen = false; 
// This boolean will avoid the game board to be rendered more than once
var boardRendered = false;


// ----------------

//generates random code which creates a session and allows other users to join the session
function generateCode() {
  sessionCode = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  for (var i = 0; i < 6; i++) {
    sessionCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  // console.log(sessionCode);
  return sessionCode;
}

function renderBoard() {
  if (boardScreen && boardRendered === false) {
    var p1Avatar = currentGame[sessionCode].p1Avatar;
    var p2Avatar = currentGame[sessionCode].p2Avatar;
    var p3Avatar = currentGame[sessionCode].p3Avatar;

    if (p1Avatar !== "" && p2Avatar !== "" & p3Avatar !== "") {
      window.location.href = "/board";
      boardRendered = true;
      localStorage.setItem("boardScreen", "true");
    }
    
  } else {
    return;
  }
};



//when create button is clicked, a code is generated
//and the session is created in firebase
$(document).ready(function(){
  $(".create-button").click(function(){
    event.preventDefault();
    // Run the function to generate a code
    sessionCode = generateCode();

    // Display the code to the screen and set the game structure in Firebase for that session
    $(".session-code").text(sessionCode);
    database.ref("/" + sessionCode).set(gameStructure);
    
    // This boolean identifies this client as the board.
    boardScreen = true;
  });

  // At the initial load and subsequent value changes, get a snapshot of the stored data.
  // This function allows you to update your page in real-time when the firebase database changes.
  database.ref().on("value", function(snapshot) {
    currentGame = snapshot.val();
    localStorage.setItem("currentGame", JSON.stringify(currentGame));
    console.log(currentGame);

    // Run the renderBoard function to check if all players have been logged in
    // If so, render the board only on the "boardScreen = true" device (the one that created the session)
    renderBoard();

    var p1Choice = currentGame[sessionCode].p1Choice;
    var p2Choice = currentGame[sessionCode].p2Choice;
    var p3Choice = currentGame[sessionCode].p3Choice;
    // Listen for players' answers when there is a question
    if (answerNow && p1Choice !== "" && p2Choice !== "" && p3Choice !== "") {
      allPlayersAnswered = true;
    }
  }, function(errorObject) {
    // If any errors are experienced, log them to console.
    console.log("The read failed: " + errorObject.code);
  });


  //click event on modal join button
  //wrap click event in a check to make sure the array of players does not exceed 3
  $("#joinSession-button").click(function(){
    localStorage.clear();
    //capture uniquely generated session code from text box
    var sessionEnter = $("#session-code").val();
    userName = $("#username").text();

    // Save the session code and username in local storage
    localStorage.setItem("sessionCode", sessionEnter);
    localStorage.setItem("userName", userName);
    
    //check to see if players variable exists in the current game 
    //and that the number of players does not exceed 3
    if ( !("players" in currentGame[sessionEnter]) || Object.keys(currentGame[sessionEnter].players).length < 3) {
      //add player
      database.ref().child(sessionEnter + "/players").push(userName);
      playerNumber = Object.keys(currentGame[sessionEnter].players).length;
      localStorage.setItem("playerNumber", playerNumber);
      // Push the username to Firebase
      database.ref().child(localStorage.getItem("sessionCode")).update({
        ["p" + playerNumber + "Username"]: userName
      });
      
      if (Object.keys(currentGame[sessionEnter].players).length === 1) {
        window.location.href = "/selectPredator";
      } else {
        window.location.href = "/selectAvatar";
      }

    }
    else {
      // MODAL POPS UP SAYING SESSION IS FULL
      $(".modal-full-button").click();
    }
  });

  // Event listener on the predator buttons to select predator
  $(".predator-option").click(function() {
    var predatorImg = $(this).attr("data-predator");
    var predatorName = $(this).attr("data-name");

    database.ref().child(localStorage.getItem("sessionCode")).update({
      predatorAvatar: predatorImg,
      predatorName: predatorName
    });

    window.location.href = "/selectAvatar";
  });

  // Event listener on the avatar buttons to select character
  $(".avatar-option").click(function() {
    var avatarImg = $(this).attr("data-avatar");
    localStorage.setItem("playerAvatar", avatarImg)
    var player = "p" + localStorage.getItem("playerNumber") + "Avatar"
    
    database.ref().child(localStorage.getItem("sessionCode")).update({
      [player]: avatarImg
    });

    window.location.href = "/controller";
  });

  // LOGIC FOR CONTROLLER
  $(".player-img").attr("src", "/images/" + localStorage.getItem("playerAvatar"));
  $(".player-name").text(localStorage.getItem("userName"));

  $(".option").click(function() {
    var keyToUpdate = "p" + localStorage.getItem("playerNumber") + "Choice";
    // SET answerNow to true when the question appears in board. Set it to false when time runs out or all pChoice(s) have been recorded
    if (answerNow) {
      var answer = $(this).attr("data-option");
      localStorage.setItem("answer", answer);
      database.ref().child(localStorage.getItem("sessionCode")).update({
        [keyToUpdate]: answer
      })
    }

  });
});
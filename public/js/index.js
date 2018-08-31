//Initialize Firebase
//hide these keys in .dotenv file
//link to add to relevant files
//<script src="https://www.gstatic.com/firebasejs/5.4.1/firebase.js"></script>

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


//global variables
var sessionCode;

var gameStructure = {
  players: [],
  questionNumber: 0,
  p1Choice: "",
  p2Choice: "",
  p3Choice: "",
  correctAnswer: "",
  p1Avatar: "",
  p2Avatar: "",
  p3Avatar: "",
  predatorAvatar: ""
};

var currentGame;

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



//when create button is clicked, a code is generated
//and the session is created in firebase
$(document).ready(function(){
  $(".create-button").click(function(){
    event.preventDefault();
    sessionCode = generateCode();
    $(".session-code").text(sessionCode);
    database.ref("/" + sessionCode).set(gameStructure);

  });


  // At the initial load and subsequent value changes, get a snapshot of the stored data.
  // This function allows you to update your page in real-time when the firebase database changes.
  database.ref().on("value", function(snapshot) {
    currentGame = snapshot.val();
    console.log(currentGame);

    // If any errors are experienced, log them to console.
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });


  //click event on modal join button
  //wrap click event in a check to make sure the array of players does not exceed 3
  $("#joinSession-button").click(function(){
    //capture uniquely generated session code from text box
    var sessionEnter = $("#session-code").val();
    
    // grab the username from the dashboard
    var userName = $("#username").text();
    console.log(userName);
    

    //check to see if players variable exists in the current game 
    //and that the number of players does not exceed 3
    if ( !("players" in currentGame[sessionEnter]) || Object.keys(currentGame[sessionEnter].players).length < 3) {
      //add player
      database.ref().child(sessionEnter + "/players").push(userName);
      console.log("game is open");
      // RENDER CONTROLLER WHERE SESSION WAS JOINED
    }
    else {
      console.log("game is full");
      // RENDER BOARD WHERE SESSION WAS CREATED
    }
    
  });
});

//create code that captures each user's answers to questions (form)

//create code that captures each user's wins/losses



//once the user logs out of the system, the connection to firebase will need to be closed
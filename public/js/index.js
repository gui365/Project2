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

var game = {
  players: [],
  question: 0
};
//generates random code which creates a session and allows other users to join the session
function generateCode() {
  var sessionCode = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  for (var i = 0; i < 6; i++) {
    sessionCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  // console.log(sessionCode);
  return sessionCode;
}

//establish variables for player values to be added to firebase
// var pID= "";
// var pOneActive = 0;
// var pTwoActive = 0;
// var pThreeActive = 0;



//when create button is clicked, a code is generated
//and the session is created in firebase
$(document).ready(function(){
  $(".create-button").click(function(){
    event.preventDefault();
    sessionCode = generateCode();
    $(".session-code").text(sessionCode);
    database.ref("/" + sessionCode).set(game);
  });
});

//Once three users have input the same code, the session begins
//Create click event for the #join-button, which presumably will begin once 3 users have entered their codes
// $("#join-button").on("click", function(event){
//   //prevents page from refreshing
//   event.preventDefault();
//   var isConnected;
//   if(nameInput === 0) {

//   }


// //these brackets close the join-button click event
// });
//create code that counts the connections
//once there are 3 connections, that will trigger the change in HTML

// connectionsRef references a specific location in our database.
// All of our connections will be stored in this directory.
// var connectionsRef = database.ref("/connections")
// '.info/connected' is a special location provided by Firebase that is updated
// every time the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
// var connectedRef = database.ref(".info/connected");

//Will need to cap the amount of connections at 3

//create code that captures each user's answers to questions (form)

//create code that captures each user's wins/losses



//once the user logs out of the system, the connection to firebase will need to be closed
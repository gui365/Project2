// on chosen answer click 
//need to toggle the dashboard div to show the question and then the players/correct answers
//display the player stats/correct answers after the setTimeout completes (15 sec)
// Note: need to add timer div probably
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

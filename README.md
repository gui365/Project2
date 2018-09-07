# Project2
# **Choose Your Predator**

This project was developed as part of the Penn Coding Boot Camp.

## Goal
To create a multi-player trivia game in which players answer questions to move closer to safety while being chased by a predator of their choice. The goal is to build this game by leveraging relational database technology, specifically MYSQL and NPM helper package, Sequelize. 

## Installation and Set-up
Make sure to run *npm install* at the root directory after cloning the project.
To set up the application, you must set up an **.env** file conatining the following information:
```
# MySQL Information

MYSQL_PASSWRD=your-local-password-here
MYSQL_USER=your-local-username-here

# For All Users Running App Locally
Change the port number for MYSQL in questions.js

# For Mac Users Running App Locally

Add following after "dialect": "mysql" line in the development section of the config.json file

"dialectOptions": {
     "socketPath": "/Applications/MAMP/tmp/mysql/mysql.sock"
   }

```

## Functionality
This app requires users to sign up and input thier login credentials.
    **Step 1** User launches web application and arrives on the landing page.
    **Step 2** If user does not have an account, they must click on the "sign up" link and input username, email and password for a new account.
    **Step 3** Once the user has an account, they can log in from the landing page.
    **Step 4** Once logging in, the user will arrive at the dashboard where they can create a game session. This page needs to be kept open as it will later display the game board. 
    **Step 5** After creating a session, the user will receive a unique session code. That user and two other players will then navigate to the application from their cellphones where they will login to the application and click 'join a session' from the dahsboard. This is where all users will input the unique session code.
    **Step 6** Once all players have successfully logged into the game, a countdown will commence on the laptop screen displaying the game board before showing the first question. The first question will appear and all users will have 15 seconds to select an answer option from their phone's screen. Once all answers have been collected, users are see who was correct and those who were correct advance one space on the board. Those who were incorrect do not advance. 
    **Step 7** This pattern continues for 13 questions. If a player reaches the safe cabin on the game board by the time the 13th question has been anwered, then they win. The predator begins advancing after the second question has been asked. If the predator catches up to a player, then that player is eaten and loses the game. 
    **Step 8** When the game is over, the users will be returned to the dashboard page. 

This application is hosted on Heroku and can be accessed at https://chooseyourpredator.herokuapp.com/

If running app locally: 

Run *npm start* or *node server.js* to launch the game on your localhost port

## Objective
* Apply all the technologies learned up to current point in bootcamp to create a full-stack web application


## Built using:

* HTML
* CSS
* Javascript
* jQuery
* Photoshop
* dotenv
* Travis CI
* ES Lint
* Handlebars
* Passport
* Firebase
* MySQL
* Node.JS
* Sequelize
* Express
* Heroku

## Authors
**Guillermo Barila** - *Author*
**Anh Lucci** - *Author*
**Lexi Cummins** - *Author*
**Michaela White** - *Author*
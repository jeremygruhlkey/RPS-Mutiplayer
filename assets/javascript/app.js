// initialize firebase
var config = {
    apiKey: "AIzaSyCs4MsbwApVlQ7eyEfDJcyH1uA7jWAfnU4",
    authDomain: "rockpaperscissors-ead68.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-ead68.firebaseio.com",
    projectId: "rockpaperscissors-ead68",
    storageBucket: "rockpaperscissors-ead68.appspot.com",
    messagingSenderId: "763194146992"
  };
  firebase.initializeApp(config);

// create a variable to reference the database
var database = firebase.database();

var choices = [ "Rock", "Paper", "Scissors", "Lizard", "Spock"];

var playerOneName;
var playerTwoName;

var playerOneWins = 1;
var playerOneLosses = 0;

var playerTwoWins = 0;
var playerTwoLosses = 0;

var playerOneChoice;
var playerTwoChoice;

$("#add-player").on("click", function() {
    event.preventDefault();
     playerOneWins++;
      database.ref().set({
        wins: playerOneWins,
        // something: wins.playerTwoWins
      });
    
      // Log the value of playerOneWins
      console.log(playerOneWins);

    
    });

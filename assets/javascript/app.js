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

database.ref().on("value", function(snapshot) {
    if (snapshot.child("playerOne").exists()) {
        $(".player-one-name").text(snapshot.val().playerOne);
    }
    if (snapshot.child("playerTwo").exists()) {
        $(".player-two-name").text(snapshot.val().playerTwo);
    }

    else {
    $(".player-one-name").text("Waiting for Player One");
    $(".player-two-name").text("Waiting for Player Two");
    }

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

$("#add-player").on("click", function() {
    event.preventDefault();
    var name = $("input[type='text']").val();

    if (!playerOneName) {
        $(".player-one-name").text(name);
        // $(".p-one-wins-losses").text("Wins " + playerOneWins + ", Losses " + playerOneLosses);
        playerOneName = name;
        
        console.log("player one: " + playerOneName);
          
    }
    else {
        $(".player-two-name").text(name);
        playerTwoName = name;
        
        console.log("player two: " + playerTwoName);
        
    }
    
    database.ref().set({
        playerOne: playerOneName,
        playerTwo: playerTwoName
      });

    });

   
      
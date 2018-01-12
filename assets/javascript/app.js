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

var playerOneName = "";
var playerTwoName = "";

var playerOneWins = 0;
var playerOneLosses = 0;

var playerTwoWins = 0;
var playerTwoLosses = 0;

var playerOneChoice;
var playerTwoChoice;

var playerOne = {
    name: "",
    wins: 0,
    losses: 0,
    choice: ""
}

var playerTwo = {
    name: "",
    wins: 0,
    losses: 0,
    choice: ""
}

database.ref().on("value", function(snapshot) {
    if (snapshot.child("playerOne/name").exists()) {
        $(".player-one-name").text(playerOne.name);
        playerOneName = snapshot.val().playerOne;
    }
    if (snapshot.child("playerTwo/name").exists()) {
        $(".player-two-name").text(playerTwo.name);
        playerTwoName = snapshot.val().playerTwo;
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
        $(".p-one-wins-losses").text("Wins " + playerOneWins + ", Losses " + playerOneLosses);
        playerOne.name = name;
        // oneWins = ref.child("playerOneName/" + playerOneWins)
        
        console.log("player one: " + playerOne.name);
          
    }
    else {
        $(".player-two-name").text(name);
        $(".p-two-wins-losses").text("Wins " + playerTwoWins + ", Losses " + playerTwoLosses); 
        playerTwo.name = name;
        
        console.log("player two: " + playerTwo.name);
        
    }

    database.ref().update({
        playerOne: playerOne,
        playerTwo: playerTwo


      });

    });

   
      

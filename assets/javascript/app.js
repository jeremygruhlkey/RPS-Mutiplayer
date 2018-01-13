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

var playerOne = {
    name: "",
    wins: 1,
    losses: 0,
    choice: ""
}

var playerTwo = {
    name: "",
    wins: 0,
    losses: 2,
    choice: ""
}

database.ref().on("value", function(snapshot) {
    if (snapshot.child("playerOne").exists()) {
        $(".player-one-name").text(playerOne.name);
        // playerOne.name = snapshot.val().name;

    }
    if (snapshot.child("playerTwo").exists()) {
        $(".player-two-name").text(playerTwo.name);
        // playerTwo.name = snapshot.val().name;
          
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
    var newName = $("input[type='text']").val();

    if (!playerOne.name) {
        playerOne.name = newName;
        $(".player-one-name").text(playerOne.name);
        $(".p-one-wins-losses").text("Wins " + playerOne.wins + ", Losses " + playerOne.losses);
        
        database.ref().update({
            playerOne: playerOne,
            // playerTwo: playerTwo
          });
        console.log("player one: " + playerOne.name);
          
    }
    else {
        playerTwo.name = newName;
        $(".player-two-name").text(playerTwo.name);
        $(".p-two-wins-losses").text("Wins " + playerTwo.wins + ", Losses " + playerTwo.losses); 
        
        
        database.ref().update({
            // playerOne: playerOne,
            playerTwo: playerTwo
          });

        console.log("player two: " + playerTwo.name);
        
    }

    // database.ref().update({
    //     playerOne: playerOne,
    //     playerTwo: playerTwo


    //   });

    });

   
      

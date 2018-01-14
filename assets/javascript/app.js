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

var oneWins = 0;
var oneLosses = 0;

var twoWins = 0;
var twoLosses = 0;

var playerOne = {};
var playerTwo = {};
// from Nema
var playerRefForRemove = "";
var removeThisPlayer;
// 
database.ref('players').on('value', function(snapshot) {
    const playerOneExists = snapshot.child('playerOne').exists();
    const playerTwoExists = snapshot.child('playerTwo').exists();
    const oneChoiceExists = snapshot.child('playerOne/choice').exists();
    const twoChoiceExists = snapshot.child('playerTwo/choice').exists();
    console.log("oneChoiceExists " + oneChoiceExists);
    console.log("twoChoiceExists " + twoChoiceExists);

    if (playerOneExists && playerTwoExists) {
      $('#add-player').prop('disabled', true);

      $('.p-two-wins-losses').text(
        ' Wins ' + playerTwo.wins + ', Losses ' + playerTwo.losses,
      );
    }

    if (playerOneExists) {
      playerOne = snapshot.child('playerOne').val();
      console.log(playerOne);
      $('.player-one-name').text(playerOne.name);
      $('.p-one-wins-losses').text(
        'Wins ' + playerOne.wins + ', Losses ' + playerOne.losses,
      );
    } else {
      $('.player-one-name').text('Waiting for Player One');
      $('.player-two-name').text('Waiting for Player Two');
      return;
    }

    if (playerTwoExists) {
      playerTwo = snapshot.child('playerTwo').val();
      $('.player-two-name').text(playerTwo.name);
      $('.p-two-wins-losses').text(
        ' Wins ' + playerTwo.wins + ', Losses ' + playerTwo.losses,
      );
    } else {
      $('.player-two-name').text('Waiting for Player Two');
    }

    if (oneChoiceExists && twoChoiceExists) {
        console.log("both choices exist");
        checkWin();
    }
  },
  function(errorObject) {
    console.log('The read failed: ' + errorObject.code);
  },
);

$('#add-player').on('click', function(event) {
  event.preventDefault();
  var newName = $("input[type='text']").val();

  if (!playerOne.name) {
    // from Nema
    playerRefForRemove = "playerOne";

    database.ref("/players").update({
      playerOne: {
        name: newName,
        wins: 0,
        losses: 0,
        // choice: '',
      },
    });
    console.log('player one: ' + playerOne.name);
  } else {
    // from Nema
    playerRefForRemove = "playerTwo";

    database.ref("/players").update({
      playerTwo: {
        name: newName,
        wins: 0,
        losses: 0,
        // choice: '',
      },
    });
    console.log('player two: ' + playerTwo.name);
  }
  // from Nema
  removeThisPlayer = database.ref("players/" + playerRefForRemove);
  removeThisPlayer.onDisconnect().remove();

});  

$(".choice-1").on("click", function(event){
    playerOneChoice = $(this).attr("attr");
    console.log("player one choice is " + playerOneChoice);
    database.ref("/players/playerOne").update({
            choice: playerOneChoice,    
    });
});

$(".choice-2").on("click", function(event){
    playerTwoChoice = $(this).attr("attr");
    console.log("player two choice is " + playerTwoChoice);
    database.ref("/players/playerTwo").update({
            choice: playerTwoChoice,    
    });
});

function checkWin(){
    console.log("game in motion");
    console.log("player one choice " + playerOne.choice);

    // for tie
    if (playerOne.choice === playerTwo.choice) {
        console.log("It's a tie!!");
        $("#result").text("It's a tie");
        setTimeout(resetResultDiv, 3000);
    }

    // for player one choice of paper
    if (playerOne.choice === "paper" && (playerTwo.choice === "rock" || playerTwo.choice === "spock")) {
        console.log("player one wins!");
        oneWins++;
        twoLosses++;
        $("#result").text("paper beats " + playerTwo.choice);
        setTimeout(resetResultDiv, 3000);
        database.ref("/players/playerOne").update({
            wins: oneWins,
            choice: "",
        });
        database.ref("/players/playerTwo").update({
            losses: twoLosses,
            choice: ".",
        });
    }

    if (playerOne.choice === "paper" && (playerTwo.choice === "scissors" || playerTwo.choice === "lizard")) {
        console.log("player two wins!");
        oneLosses++;
        twoWins++;
        $("#result").text(playerTwo.choice + " beats paper");
        setTimeout(resetResultDiv, 3000);
        database.ref("/players/playerOne").update({
            losses: oneLosses,
            choice: "",
        });
        database.ref("/players/playerTwo").update({
            wins: twoWins,
            choice: ".",
        });
    }

    // for player one choice of rock
    if (playerOne.choice === "rock" && (playerTwo.choice === "scissors" || playerTwo.choice === "lizard")) {
        console.log("player one wins!");
        oneWins++;
        twoLosses++;
        $("#result").text("rock beats " + playerTwo.choice);
        setTimeout(resetResultDiv, 3000);
        database.ref("/players/playerOne").update({
            wins: oneWins,
            choice: "",
        });
        database.ref("/players/playerTwo").update({
            losses: twoLosses,
            choice: ".",
        });
    }

    if (playerOne.choice === "rock" && (playerTwo.choice === "paper" || playerTwo.choice === "spock")) {
        console.log("player two wins!");
        oneLosses++;
        twoWins++;
        $("#result").text(playerTwo.choice + " beats rock");
        setTimeout(resetResultDiv, 3000);
        database.ref("/players/playerOne").update({
            losses: oneLosses,
            choice: "",
        });
        database.ref("/players/playerTwo").update({
            wins: twoWins,
            choice: ".",
        });
    }
   
    // for player one choice of scissors
    if (playerOne.choice === "scissors" && (playerTwo.choice === "paper" || playerTwo.choice === "lizard")) {
        console.log("player one wins!");
        oneWins++;
        twoLosses++;
        $("#result").text("scissors beats " + playerTwo.choice);
        setTimeout(resetResultDiv, 3000);
        database.ref("/players/playerOne").update({
            wins: oneWins,
            choice: "",
        });
        database.ref("/players/playerTwo").update({
            losses: twoLosses,
            choice: ".",
        });
    }

    if (playerOne.choice === "scissors" && (playerTwo.choice === "rock" || playerTwo.choice === "spock")) {
        console.log("player two wins!");
        oneLosses++;
        twoWins++;
        $("#result").text(playerTwo.choice + " beats scissors");
        setTimeout(resetResultDiv, 3000);
        database.ref("/players/playerOne").update({
            losses: oneLosses,
            choice: "",
        });
        database.ref("/players/playerTwo").update({
            wins: twoWins,
            choice: ".",
        });
    }

    // for player one choice of lizard
    if (playerOne.choice === "lizard" && (playerTwo.choice === "spock" || playerTwo.choice === "paper")) {
        console.log("player one wins!");
        oneWins++;
        twoLosses++;
        $("#result").text("lizard beats " + playerTwo.choice);
        setTimeout(resetResultDiv, 3000);
        database.ref("/players/playerOne").update({
            wins: oneWins,
            choice: "",
        });
        database.ref("/players/playerTwo").update({
            losses: twoLosses,
            choice: ".",
        });
    }

    if (playerOne.choice === "lizard" && (playerTwo.choice === "rock" || playerTwo.choice === "scissors")) {
        console.log("player two wins!");
        oneLosses++;
        twoWins++;
        $("#result").text(playerTwo.choice + " beats lizard");
        setTimeout(resetResultDiv, 3000);
        database.ref("/players/playerOne").update({
            losses: oneLosses,
            choice: "",
        });
        database.ref("/players/playerTwo").update({
            wins: twoWins,
            choice: ".",
        });
    }

    // for player one choice of spock
    if (playerOne.choice === "spock" && (playerTwo.choice === "scissors" || playerTwo.choice === "rock")) {
        console.log("player one wins!");
        oneWins++;
        twoLosses++;
        $("#result").text("Spock beats " + playerTwo.choice);
        setTimeout(resetResultDiv, 3000);
        database.ref("/players/playerOne").update({
            wins: oneWins,
            choice: "",
        });
        database.ref("/players/playerTwo").update({
            losses: twoLosses,
            choice: ".",
        });
    }

    if (playerOne.choice === "spock" && (playerTwo.choice === "lizzard" || playerTwo.choice === "paper")) {
        console.log("player two wins!");
        oneLosses++;
        twoWins++;
        $("#result").text(playerTwo.choice + " beats Spock");
        setTimeout(resetResultDiv, 3000);
        database.ref("/players/playerOne").update({
            losses: oneLosses,
            choice: "",
        });
        database.ref("/players/playerTwo").update({
            wins: twoWins,
            choice: ".",
        });
    }
};

function resetResultDiv() {
    $("#result").text("Play Again");
    
};

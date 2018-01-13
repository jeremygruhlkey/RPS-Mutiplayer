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

var choices = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];

var playerOne = {};
var playerTwo = {};

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
  },
  function(errorObject) {
    console.log('The read failed: ' + errorObject.code);
  },
);

$('#add-player').on('click', function(event) {
  event.preventDefault();
  var newName = $("input[type='text']").val();

  if (!playerOne.name) {
    // $('.player-one-name').text(playerOne.name);

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
    // $('.player-two-name').text(playerTwo.name);

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
    console.log("player one choice is " + playerTwoChoice);
    database.ref("/players/playerTwo").update({
            choice: playerTwoChoice,    
    });
});


   
      

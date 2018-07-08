//Declare our global variables
var player = 0;
var name = '';
var playerCount = 0;


//Hide the game on load

$(document).ready(function() {
	$('#game').hide();

});

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyApyCL1CrC21zLRnsia93t3zMiuzubsLvA",
    authDomain: "rps-multiplayer-51100.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-51100.firebaseio.com",
    projectId: "rps-multiplayer-51100",
    storageBucket: "rps-multiplayer-51100.appspot.com",
    messagingSenderId: "1089597714380"
  };

  firebase.initializeApp(config);
  var database = firebase.database();

  //Initialize initial keys

  database.ref().on("child_added", function(childSnapshot){
    player = childSnapshot.val().player;
    name = childSnapshot.val().name;
  })


$('#start-button').on('click', function(e) {
  //prevent page refresh
  e.preventDefault();

  var playerName = $("#player-name").val().trim();

  //assign player number or hold
  if(player === 1){
    playerCount = 2;
  } else if(player === 2){
    playerCount = 0;
  } else {
    playerCount = 1;
  }

    var newPlayer = {
      name: playerName,
      player: playerCount,
      wins: 0,
      losses: 0
    };

  	// Uploads the user to the database
    database.ref().push()
  	database.ref().push(newPlayer);


    // Remove input bar and start game
    $('#game').show();
    $('#start-game').hide();
    $('.name').text(playerName);
    $('.player').text(playerCount);
    $('#pl' + playerCount + '> .card-header').text(playerName);
});

$('button').on('click',function() {
  if ($(this).attr('id') === 'rock') {
    $('#pl' + playerCount).find('.card-title').addClass('fas fa-hand-rock').text('');
  } else if ($(this).attr('id') === 'paper') {
    $('#pl' + playerCount).find('.card-title').addClass('fas fa-hand-paper').text('');
  } else if ($(this).attr('id') === 'scissors'){
    $('#pl' + playerCount).find('.card-title').addClass('fas fa-hand-scissors').text('');
  } else {
    return false;
  }
});


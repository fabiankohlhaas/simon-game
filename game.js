
// array to save what the user clicked
var userClickedPattern = [];

// array to save the game Status
var gamePattern = [];

// array that contains the 4 button colors
var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$("body").keydown(function() {
  if (started === false) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1)
});

/* to generate a random number between 0 and 3,
assign it to a variable, store it in an array,
make the chosen button flash and play the corresponding sound*/
function nextSequence() {
  var randomNumber = Math.floor((Math.random() * 4));
  //return randomNumber;
  randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  $("#level-title").text("Level " + level);
  level++;
  userClickedPattern = [];
}

/*to make the buttons play a sound*/
function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

/* to make the buttons flash */
function animatePress(currentColor) {

  var activeButton = $("#" + currentColor);

  activeButton[0].classList.add("pressed");
  setTimeout(function() {
    activeButton[0].classList.remove("pressed");
  }, 100);
}

/* to check if the clicked button was correct */
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length)
    setTimeout(function(){
      nextSequence();
    }, 1000);

  } else {
    var wrongSound = new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");

    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);
    startOver()
  }
}

/* to reset the game */
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$("body").keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }     
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePressed(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success!");
        if (userClickedPattern.length === gamePattern.length) { 
            setTimeout(function () {
                nextSequence()
            }, 1000);
        }
    } else {
        console.log("wrong!")
        var soundGameOver = new Audio("./sounds/wrong.mp3");
        soundGameOver.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, press any key to restart.")
        startOver();
    }
}

function startOver() {
    started = false;
    gamePattern = [];
    level = 0;
}

function nextSequence() {
    level++;
    userClickedPattern = [];
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
};

function playSound(name) {
    var audioColor = new Audio("./sounds/"+ name + ".mp3")
    audioColor.play();
}

function animatePressed(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}








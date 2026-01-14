
var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;

//game start logic
$(document).keypress(function(){
    if(!started) {
        $("h1").text("Level " + level)
        nextSequence();
        started = true;
    }
    
});
//user clicking logic
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

//check answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
    
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    }
    else {
        
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern.length=0;
    level++;
    $("h1").text("Level " + level);

    var randNum =  Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randNum];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
  }



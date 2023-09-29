
var gamePattern=[];
var userClickedPattern=[];
var buttonColors = ["red","blue","green","yellow"];

var started = false;//to keep track whether the game has started or not.

var level=0;//starting level from 0

$(document).keydown(function(){
    if(!started){
        //h1 title saying "press a key to start"
        $("#level-title").text(" Level " + level);
        nextSequence();
        started=true;
    }
});
$(".btn").click(function(){
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
//new fun to check such that it should take one input at the currentLevel
function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            //call nextSequence after 1000ms delay
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        //play sound called wrong.mp3
        playSound("wrong");
        //applying the css class "game-over" which is shown to user and will be taken away after 200ms
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        //changing the title to "Game Over, Press Any Key to Restart"
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }
}
function nextSequence(){
    userClickedPattern = [];
    //increment the level by 1 every time
    level++;
    //update the h1 too
    $("#level-title").text(" Level " + level);

    var randNumber= Math.floor(Math.random()*4);
    var randomChosenColour =buttonColors[randNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function startOver(){
    //we need to reset the values of level
    level=0;
    gamePattern=[];
    started=false;
}
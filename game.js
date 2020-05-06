let userClickedPattern = [];
let gamePattern = [];
let isStarted = false;
let level = 0;

const buttonColors = ["red", "blue", "green", "yellow"];

function playSound(name) {
    let audio = new Audio(`./sounds/${name}.mp3`)
    audio.allow = "autoplay"
    audio.play();
}

function nextSequence() {
    userClickedPattern = [];
    const randomNumber = Math.floor(Math.random() * 4)
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100)    
    playSound(randomChosenColor)

    level++;
    $("h1").text("Level " + level);
}

function animationPress(currentColor) {
    $(`#${currentColor}`).addClass("pressed")
    setTimeout( function() {
        $(`#${currentColor}`).removeClass("pressed");

    }, 100)
}

$(".btn").on("click", e => {
    const userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animationPress(userChosenColor)
    checkAnswer(userClickedPattern.length - 1)
})

$(window).on("keydown", function(e) {
    if (isStarted === false) {
            gamePattern = [];
            userClickedPattern = [];
            nextSequence()
        }
        isStarted = true;
})

function waitForRestart() {
    isStarted = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            console.log("good");
            console.log("LEVEL : " + currentLevel, "YOU : " + userClickedPattern, "COM : " + gamePattern)
            setTimeout(nextSequence, 1000)
        } 
    } else {
        console.log("wrong");
        console.log("LEVEL : " + currentLevel, "YOU : " + userClickedPattern, "COM : " + gamePattern)
        
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout($("body").removeClass("game-over"), 200)
        $("h1").text("Game Over, Press any key to restart.");
        waitForRestart();
        return
    }
}
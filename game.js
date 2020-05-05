let userClickedPattern = [];
let gamePattern = [];
let isStarted = false;
let level = 0;
let userCount = 0;

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
    userCount++;        
    const userChosenColor = e.target.id;
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animationPress(userChosenColor)
    if (userCount === gamePattern.length) {
        checkAnswer(userClickedPattern.length - 1)
    }
})

$(window).on("keydown", function(e) {
    if (isStarted === false) {
        if (e.key === "a") {
            nextSequence()
        }
        isStarted = true;
    }
})


function checkAnswer(currentLevel) {
    userCount = 0
    console.log(currentLevel, userClickedPattern, gamePattern)
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("good");
        setTimeout(nextSequence, 1000)
    } else {
        console.log("fuck");
    }
}
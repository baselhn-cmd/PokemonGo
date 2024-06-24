var allCards = document.querySelectorAll(".card");
var restartButton = document.getElementById("restartButton");
var timeH = document.querySelector('.timer-memory');
var matchesSpan = document.getElementById("matches");
var resultPanel = document.getElementById("resultPanel");
var finalScore = document.getElementById("finalScore");
var timeTaken = document.getElementById("timeTaken");
var playAgainButton = document.getElementById("playAgainButton");
var timeSecond = 100;
var timerInterval;

var firstCard = null;
var secondCard = null;
var canClick = false;
var score = 0;
var matchesFound = 0;

allCards.forEach(function(card) {
    card.addEventListener('click', handleCardClick);
});

restartButton.addEventListener("click", handleRestart);
timeH.addEventListener('click', startGame);
playAgainButton.addEventListener('click', startGame);

function handleCardClick() {
    if (!canClick) return;

    if (this.classList.contains("flip")) return;
    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
    } else if (!secondCard) {
        secondCard = this;

        var img1 = firstCard.firstElementChild.src;
        var img2 = secondCard.firstElementChild.src;

        if (img1 === img2) {
            firstCard = null;
            secondCard = null;

            score++;
            matchesFound++;
            updateMatches();

            if (score === 6) handleGameOver(true);
        } else {
            canClick = false;

            setTimeout(function() {
                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");
                firstCard = null;
                secondCard = null;
                canClick = true;
            }, 1000);
        }
    }
}

function handleRestart() {
    allCards.forEach(function(card) {
        card.classList.remove("flip");
    });
    firstCard = null;
    secondCard = null;
    canClick = false;
    score = 0;
    matchesFound = 0;
    timeSecond = 100;
    updateMatches();
    resultPanel.classList.add("hidden");
    clearInterval(timerInterval);
    displayTime(timeSecond);
}

function startGame() {
    handleRestart();
    canClick = true;

    // Shuffle cards
    allCards.forEach(function(card) {
        var randPos = Math.floor(Math.random() * 12);
        card.style.order = randPos;
    });

    // Start the timer
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(function() {
        timeSecond--;
        displayTime(timeSecond);
        if (timeSecond === 0) {
            clearInterval(timerInterval);
            handleGameOver(false);
        }
    }, 1000);
}

// Display time
function displayTime(second) {
    var min = Math.floor(second / 60);
    var sec = Math.floor(second % 60);
    timeH.innerHTML = (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
}

function updateMatches() {
    matchesSpan.textContent = matchesFound;
}

// Game over
function handleGameOver(win) {
    clearInterval(timerInterval);
    finalScore.textContent = "Final Score: " + matchesFound;
    var totalTime = 100 - timeSecond;
    timeTaken.textContent = "Time Taken: " + totalTime + " seconds";

    setTimeout(function() {
        if (win) {
            resultPanel.querySelector("h2").textContent = "You Win!";
        } else {
            resultPanel.querySelector("h2").textContent = "You Lose! Time's up!";
        }
        resultPanel.classList.remove("hidden");
    }, 1000);
}

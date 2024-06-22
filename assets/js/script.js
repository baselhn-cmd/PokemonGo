const allCards = document.querySelectorAll(".card");
const restartButton = document.getElementById("restartButton");
const timeH = document.querySelector('.timer-memory');
const matchesSpan = document.getElementById("matches");
const resultPanel = document.getElementById("resultPanel");
const finalScore = document.getElementById("finalScore");
const timeTaken = document.getElementById("timeTaken");
const playAgainButton = document.getElementById("playAgainButton");
let timeSecond = 100;
let timerInterval;

let firstCard = null;
let secondCard = null;
let canClick = false;
let score = 0;
let matchesFound = 0;

allCards.forEach(card => {
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

        let img1 = firstCard.firstElementChild.src;
        let img2 = secondCard.firstElementChild.src;

        if (img1 === img2) {
            firstCard = null;
            secondCard = null;

            score++;
            matchesFound++;
            updateMatches();

            if (score === 6) handleGameOver(true);
        } else {
            canClick = false;

            setTimeout(() => {
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
    allCards.forEach(card => {
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
    allCards.forEach(card => {
        let randPos = Math.floor(Math.random() * 12);
        card.style.order = randPos;
    });

    // Start the timer
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
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
    const min = Math.floor(second / 60);
    const sec = Math.floor(second % 60);
    timeH.innerHTML = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function updateMatches() {
    matchesSpan.textContent = matchesFound;
}

// Game over
function handleGameOver(win) {
    clearInterval(timerInterval);
    finalScore.textContent = `Final Score: ${matchesFound}`;
    const totalTime = 100 - timeSecond;
    timeTaken.textContent = `Time Taken: ${totalTime} seconds`;

    setTimeout(() => {
        if (win) {
            resultPanel.querySelector("h2").textContent = "You Win!";
        } else {
            resultPanel.querySelector("h2").textContent = "You Lose! Time's up!";
        }
        resultPanel.classList.remove("hidden");
    }, 1000);
}
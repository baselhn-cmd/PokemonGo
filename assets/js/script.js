const allCards = document.querySelectorAll(".card");
const restartButton = document.getElementById("restartButton");
const timeH = document.querySelector('.timer-memory');
const matchesSpan = document.getElementById("matches");
let timeSecond = 260;

let firstCard = null;
let secondCard = null;
let canClick = true;
let score = 0;
let matchesFound = 0;

allCards.forEach(card => {
    card.addEventListener('click', handleCardClick);
});

restartButton.addEventListener("click", handleRestart);
timeH.addEventListener('click', startGame);

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
            console.log("matching.....");
            firstCard = null;
            secondCard = null;

            score++;
            matchesFound++;
            updateMatches();

            if (score === 6) handleGameOver();
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
    updateMatches();
}

function startGame() {
    canClick = true;
    allCards.forEach(card => {
        card.classList.remove("flip");
    });
    firstCard = null;
    secondCard = null;
    score = 0;
    matchesFound = 0;
    updateMatches();

    // Shuffle cards
    allCards.forEach(card => {
        let randPos = Math.floor(Math.random() * 12);
        card.style.order = randPos;
    });

    // Start the timer
    startTimer();
}

function startTimer() {
    const timerInterval = setInterval(() => {
        timeSecond--;
        displayTime(timeSecond);
        if (timeSecond === 0) {
            clearInterval(timerInterval);
            handleGameOver();
        }
    }, 1000);
}

function displayTime(second) {
    const min = Math.floor(second / 60);
    const sec = Math.floor(second % 60);
    timeH.innerHTML = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function updateMatches() {
    matchesSpan.textContent = matchesFound;
}

function handleGameOver() {
    setTimeout(() => {
        let retVal = confirm("You Win");
        if (retVal === true) {
            location.reload();
        }
    }, 1000);
}

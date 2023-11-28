const allCards = document.querySelectorAll(".card");

let firstCard = null;
let secondCard = null;

let canClick = true; // Fix the variable name

let score = 0;

allCards.forEach(card => {
    card.addEventListener('click', handelCardClick);
});

// generate a number between 1 and 12
let num = 6;
// get card element for that number
const dataCards = document.querySelectorAll(`[data-card="${num}"] .front`);
console.log(dataCards.length);

// assign image to card
dataCards[0].src = "/assets/images/pokemon3.png";



// Handel clicking on a card
function handelCardClick() {
    if (!canClick) return;

    if (this.classList.contains("flip")) return;
    this.classList.add("flip");

    if (!firstCard) firstCard = this;
    else if (!secondCard) secondCard = this;

    let img1 = firstCard ? firstCard.firstElementChild.src : null;
    let img2 = secondCard ? secondCard.firstElementChild.src : null;

    if (img1 === img2) {
        console.log("matching.....");
        firstCard = null;
        secondCard = null;

        score++;
        if (score === 6) handleGameOver();
    } else if (img1 && img2) {
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

function handleGameOver() {
    setTimeout(() => {
        let retVal = confirm("You Win");
        if (retVal === true){
            location.reload();
        }
    }, 1000);
}


// === Suffle Cards ===
allCards.forEach((card) => {
    let randPos = Math.floor(Math.random() * 12);
    card.style.order = randPos
});


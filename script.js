const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) {
        return;
    }
    
    if (this == firstCard) {
        return;
    }

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();

    hasFlippedCard = false;
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework == secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();

    resetBoard();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;
    }, 1500)
}

cards.forEach(card => {
    card.addEventListener('click', flipCard);
});

function resetBoard() {
    firstCard = null;
    secondCard = null;
    hasFlippedCard = false;
    lockBoard = false;
}
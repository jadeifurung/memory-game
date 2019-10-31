const firstStar = document.getElementById("first-star");
const secondStar = document.getElementById("second-star");
const thirdStar = document.getElementById("third-star");
const counter = document.getElementById("moves");
const timer = document.getElementById("timer");
const restartBtn = document.getElementById("restart");
const cards = document.querySelectorAll(".memory-card");
const modal = document.querySelector(".modal");
const totalMoves = document.getElementById("total-moves");
const totalTime = document.getElementById("total-time");
const rating = document.getElementById("rating");
const closeBtn = document.querySelector(".close");
const playAgainBtn = document.getElementById("play-again");

let timerInterval;
const cardCount = 12;
let moveCount = 0;
let matchCount = 0;
let seconds = 0;
let minutes = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

restartBtn.onclick = startGame;
playAgainBtn.onclick = startGame;
closeBtn.onclick = modal.classList.remove("show");

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
    countMove();
    checkForMatch();

    hasFlippedCard = false;
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework == secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchCount += 2;

    if (matchCount == cardCount) {
        showModal();
    }

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;
        resetBoard();
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

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * cardCount);
        card.style.order = randomPos;
    });
}

function startGame() {
    modal.classList.remove("show");
    
    resetBoard();
    shuffle();
    resetHeader();
}

function resetHeader() {
    secondStar.style.visibility = 'visible';
    thirdStar.style.visibility = 'visible';

    moveCount = 0;
    minutes = 0;
    seconds = 0;
    clearInterval(timerInterval);

    counter.innerHTML = moveCount + " move(s)";
    timer.innerHTML = minutes + " mins " + seconds + " seconds ";
}

function countMove() {
    moveCount++;
    counter.innerHTML = moveCount + " move(s)";

    // start timer on first move
    if (moveCount == 1) {
        startTimer();
    }

    // setting rating based on number of moves
    // if (moveCount > 6 && moveCount < 10) {
    //     thirdStar.style.visibility = 'hidden';
    // } else if (moveCount >= 10) {
    //     secondStar.style.visibility = 'hidden';
    // }
}

function startTimer() {
    timerInterval = setInterval(() =>  {
        timer.innerHTML = minutes + " mins " + seconds + " seconds ";

        seconds++;

        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }

    }, 1000);
}

function showModal() {
    const stars = document.querySelector(".stars");

    totalMoves.innerHTML = moveCount;
    totalTime.innerHTML = timer.innerHTML;
    rating.innerHTML = firstStar.innerHTML + secondStar.innerHTML + thirdStar.innerHTML;

    modal.classList.add("show");
}

window.onload = startGame();
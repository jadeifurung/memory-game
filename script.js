const moves = document.getElementById("moves");
const timer = document.getElementById("timer");
const cards = document.querySelectorAll(".memory-card");
const modal = document.querySelector(".modal");
const stars = document.querySelectorAll(".star");

let timerInterval;
const cardCount = cards.length;
let moveCount = 0;
let matchCount = 0;
let seconds = 0;
let minutes = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

const restartBtn = document.getElementById("restart");
const closeBtn = document.querySelector(".close");
const playAgainBtn = document.getElementById("play-again");

restartBtn.onclick = startGame;
playAgainBtn.onclick = startGame;
closeBtn.onclick = hideModal;

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
    let isMatch = firstCard.dataset.name == secondCard.dataset.name;
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

    cards.forEach(card => {
        card.addEventListener('click', flipCard);
        card.classList.remove("flip");
    });
    
    matchCount = 0;
    rating.innerHTML = "";
    
    resetBoard();
    shuffle();
    resetHeader();
}

function resetHeader() {
    stars[1].style.visibility = 'visible';
    stars[2].style.visibility = 'visible';

    moveCount = 0;
    minutes = 0;
    seconds = 0;
    clearInterval(timerInterval);

    moves.innerHTML = moveCount + " move(s)";
    timer.innerHTML = minutes + " mins " + seconds + " seconds ";
}

function countMove() {
    moveCount++;
    moves.innerHTML = moveCount + " move(s)";

    // start timer on first move
    if (moveCount == 1) {
        startTimer();
    }

    // set rating based on number of moves
    if (moveCount > 6 && moveCount < 10) {
        stars[2].style.visibility = 'hidden';
    } else if (moveCount >= 10) {
        stars[1].style.visibility = 'hidden';
    }
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
    const totalMoves = document.getElementById("total-moves");
    const totalTime = document.getElementById("total-time");
    let rating = document.getElementById("rating");
    

    totalMoves.innerHTML = moveCount;
    totalTime.innerHTML = timer.innerHTML;

    
    stars.forEach(star => {
        if (star.style.visibility != 'hidden') {
            rating.innerHTML += star.innerHTML;
        }
    });
    
    
    rating.style.listStyle = "none";
    rating.style.display = "flex";

    modal.classList.add("show");
}

function hideModal() {
    modal.classList.remove("show");
}

window.onload = startGame();
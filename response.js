// script.js

const toggleButton = document.getElementById('toggleButton');
const body = document.body;
const container = document.querySelector('.container');

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    container.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Memory game code...

const cardSymbols = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍑', '🍋'];
let cards = [...cardSymbols, ...cardSymbols];
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    shuffle(cards);
    cards.forEach(symbol => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.symbol = symbol;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.innerText = this.dataset.symbol;

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // second click
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerText = '';
        secondCard.innerText = '';
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

document.getElementById('restart-button').addEventListener('click', createBoard);

createBoard();

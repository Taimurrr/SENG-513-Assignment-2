/* Course: SENG 513
Due Date: October 23rd 2023
Assignment 2
Name: Muhammad Taimur Rizwan
UCID: 30078941
*/

const words = ['audi', 'bmw', 'mercedes', 'toyota', 'lexus', 'lamborghini', 'ferrari', 'honda', 'kia', 'dodge', 'ford', 'gmc', 'mitsubishi', 'subaru', 'porsche', 'hyundai', 'mclaren', 'skoda', 'volkswagen', 'suzuki', 'acura', 'infiniti', 'maserati'];

let wordChosen;
let wordDisplayArray = [];
let wrongGuesses = 0;
let currentPlayer = 1;
let player1Guesses = [];
let player2Guesses = [];
let player1Score = 0;
let player2Score = 0;

document.addEventListener("DOMContentLoaded", function () {
    start();
});

function start() {
    currentPlayer = 1;
    document.getElementById("current-player").textContent = currentPlayer;
    wordChosen = words[Math.floor(Math.random() * words.length)];
    wordDisplayArray = Array(wordChosen.length).fill('_');
    wrongGuesses = 0;
    player1Guesses = [];
    player2Guesses = [];

    updateTheWordDisplayed();
    updateHGFigure();
    updateTheIncorrectGuessMade();
    updatePlayerGuesses();
}

function submit() {
    const letterGuess = document.getElementById("letter-input").value.toLowerCase();

    if (!letterGuess.match(/^[a-z]$/) || letterGuess.length !== 1) {
        alert("Please enter a valid single letter.");
        return;
    }

    if (currentPlayer === 1) {
        player1Guesses.push(letterGuess);
    } else if (currentPlayer === 2) {
        player2Guesses.push(letterGuess);
    }

    if (wordChosen.includes(letterGuess)) {

        for (let i = 0; i < wordChosen.length; i++) {
            if (wordChosen[i] === letterGuess) {
                wordDisplayArray[i] = letterGuess;
            }
        }
        updateTheWordDisplayed();

        if (!wordDisplayArray.includes('_')) {
            alert(`Player ${currentPlayer} guessed the Brand!: ${wordChosen}`);
            updateScore(currentPlayer);
            start();
        }
    } else {
        wrongGuesses++;
        updateHGFigure();
        updateTheIncorrectGuessMade();

        if (wrongGuesses === 6) {
            alert(`Player ${currentPlayer} lost! The car brand was: ${wordChosen}`);
            start();
        }
    }

    document.getElementById("letter-input").value = '';
    
    if (!wordDisplayArray.includes('_')) {
        alert(`Player ${currentPlayer} wins! They completed the Brand!: ${wordChosen}`);
        updateScore(currentPlayer);
        start();
    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        document.getElementById("current-player").textContent = currentPlayer;
        updatePlayerGuesses();
    }
}

function updateTheWordDisplayed() {
    document.getElementById("word-display").innerText = wordDisplayArray.join(' ');
}

function updateHGFigure() {
    // hangman figure lines
}

function updateTheIncorrectGuessMade() {
    document.getElementById("incorrect-guesses").innerText = wrongGuesses;
}

function updatePlayerGuesses() {
    document.getElementById("player1-guesses").innerText = player1Guesses.join(', ');
    document.getElementById("player2-guesses").innerText = player2Guesses.join(', ');
}

function updateScore(player) {
    if (player === 1) {
        player1Score++;
        document.getElementById("player1-score").textContent = player1Score;
    } else if (player === 2) {
        player2Score++;
        document.getElementById("player2-score").textContent = player2Score;
    }
}

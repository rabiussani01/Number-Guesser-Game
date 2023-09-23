// Generate a random number between 1 and 100
let randomNumber = Math.floor(Math.random() * 10) + 1;

// Initialize game variables
let guessCount = 0;
const maxAttempts = 2; // Set the maximum number of attempts to 3
let previousGuesses = [];

// DOM elements
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const message = document.getElementById('message');
const attempts = document.getElementById('attemptsNum');
const guessList = document.getElementById('guessList');
const resetButton = document.getElementById('resetButton');

// Function to check the user's guess
function checkGuess() {
    const userGuess = Number(guessInput.value);
    guessInput.value = '';

    if (userGuess === randomNumber) {
        setMessage(`Congratulations! You guessed the correct number: ${randomNumber}`, 'bg-green-500');
        gameOver();
    } else {
        previousGuesses.push(userGuess);
        guessList.textContent = previousGuesses.join(', ');

        if (guessCount === maxAttempts) {
            setMessage(`You lose! The correct number was ${randomNumber}.`, 'bg-red-500');
            gameOver();
        } else {
            const higherOrLower = userGuess < randomNumber ? 'higher' : 'lower';
            setMessage(`Wrong guess. Try a ${higherOrLower} number. ${maxAttempts - guessCount} attempts left.`, 'bg-red-500');
        }

        guessCount++;
        attempts.textContent = guessCount;
    }
}

// Function to display a message
function setMessage(msg, bgColor) {
    message.textContent = msg;
    message.className = `mt-4 p-2 rounded-lg ${bgColor}`;
}

// Function to end the game
function gameOver() {
    guessInput.disabled = true;
    guessButton.disabled = true;
    resetButton.style.display = 'block';
}

// Reset the game
resetButton.addEventListener('click', () => {
    guessCount = 0;
    previousGuesses = [];
    attempts.textContent = guessCount;
    guessList.textContent = '';
    message.textContent = '';
    guessInput.disabled = false;
    guessButton.disabled = false;
    resetButton.style.display = 'none';
    randomNumber = Math.floor(Math.random() * 10) + 1;
});

// Event listener for the "Guess" button
guessButton.addEventListener('click', checkGuess);

// Event listener for the input field (enter key)
guessInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

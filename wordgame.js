let popularWords;
let allWords;
let restartButton = document.getElementById(restart)

function loadGame() {
    Promise.all([
        fetch('./popular.txt')
            .then(response => response.text())
            .then(text => {
                popularWords = text.split("\r\n");
                popularWords.pop(); // Remove the '' at the end
            })
            .catch(error => {
                console.error('Error fetching words: ', error);
            }),
        fetch("./enable1.txt")
            .then(response => response.text())
            .then(text => {
                allWords = text.split("\r\n");
                allWords.pop(); // Remove the '' at the end
            })
            .catch(error => {
                console.error('Error fetching words: ', error);
            })]).finally(wordsLoaded);
}

let popularWordsSorted = {};

function winGame() {
    alert("Congrats! You win!")
    location.reload()
}

const remaining = document.getElementById("remain")
remaining.innerHTML = "You have 5 guesses remaining"


function wordsLoaded() {
    console.log(`Loaded ${popularWords.length} popular words and ${allWords.length} dictionary words!`);
    for (let i = 0; i < popularWords.length; i++) {
        let word = popularWords[i];
        let len = word.length;
        if (popularWordsSorted[len] === undefined) {
            popularWordsSorted[len] = [];
        }
        popularWordsSorted[len].push(word);
    }
    startGame();
}

let secret;
let numLetters = 5;
function startGame() {
    // Get the array that contains words with numLetters
    let popularWordsLength = popularWordsSorted[numLetters];

    // Choose a random word from the array
    let randomIndex = randInt(0, popularWordsLength.length);
    secret = popularWordsLength[randomIndex];

    // TODO: reset other game elements (attempts, history, etc.)
}

const guessWord = document.getElementById("guess-word");
const guessHistory = document.getElementById("guess-history");
let numGuesses = 5;
function makeGuess() {
    let guess = guessWord.value;

    if (guess.length != numLetters){
        return;
    }
    
    if (!allWords.includes(guess)) { //checks if its not in allwords
        guessWord.value = ""; //clears box
        return;
    }

    console.log(`Guess: "${guess}"`);

    //the guess is a real word with 5 letters
    numGuesses--

    for (let i = 0; i < numLetters; i++){

        if (guess[i] == secret[i]){
            guessHistory.innerHTML += `<div class = "rightSpot">${guess[i]}</span>`
        }

        else if (guess[i] != secret[i] && secret.includes(guess[i])) {
            guessHistory.innerHTML += `<div class = "inWord">${guess[i]}</span>`
            
        }
        else{
        guessHistory.innerHTML += `<div class = "letter">${guess[i]}</span>`
        }
    }
    guessHistory.innerHTML += `<br>`
    guessWord.value = ""; //clears box

    if (guess == secret) {
        winGame();
        return;
    }

    else if (guess != secret && parseInt(numGuesses) <= 0){
        alert(`You Lose! the words was "${secret}"`)
            location.reload()
    }
    remaining.innerHTML = `You have ${parseInt(numGuesses)} guesses remaining`

}

// TODO: write function isWord(word)

/**
* Generate a random integer within min and max
* @param {number} min 
* @param {number} max 
* @returns a random integer between min and max, inclusive
*/
function randInt(min, max) {
    let rand = Math.random();
    rand = rand * (max - min + 1);
    rand = rand + min;
    rand = Math.floor(rand);
    return rand;
}

document.addEventListener('keydown', function(e) {
    // 'event' parameter contains information about the key that was pressed
    // Check if the key pressed is 'Enter' (key code 13)
    if (e.keyCode === 13) {
        // Replace this with the action you want to perform
        makeGuess(); // Example action: Logging to console
        // You can call a function, change styles, update content, etc.
    }
});


let popularWords;
let allWords;
let restartButton = document.getElementById(restart)

function loadGame() {
    Promise.all([
        fetch('./popular.txt')
            .then(response => response.text())
            .then(text => {
                popularWords = text.replaceAll("\r", "").split("\n");;
                popularWords.pop(); // Remove the '' at the end
            })
            .catch(error => {
                console.error('Error fetching words: ', error);
            }),
        fetch("./enable1.txt")
            .then(response => response.text())
            .then(text => {
                allWords = text.replaceAll("\r", "").split("\n");
                allWords.pop(); // Remove the '' at the end
            })
            .catch(error => {
                console.error('Error fetching words: ', error);
            })]).finally(wordsLoaded);
}


const winSound = document.getElementById("win")
const correctSound = document.getElementById("correct")
const wrongSound = document.getElementById("wrong")

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
var myConfetti = confetti.create(null, {
    resize: true,
    useWorker: true
});

function spawnConfetti()
{
    for (var i = 0; i < 5; i++)
    {
        myConfetti({particleCount: 100, spread: 160})
    }
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

    let pastInWord = [];

    for (let i = 0; i < numLetters; i++){

        if (guess[i] == secret[i]){
            guessHistory.innerHTML += `<div class = "rightSpot">${guess[i]}</span>`
            // correctSound.play();
        }

        else if (guess[i] != secret[i] && secret.includes(guess[i]) && !pastInWord.includes(guess[i])) {
            guessHistory.innerHTML += `<div class = "inWord">${guess[i]}</span>`
            pastInWord.push(guess[i])
            // correctSound.play();

            
        }
        else{
        guessHistory.innerHTML += `<div class = "letter">${guess[i]}</span>`
        // wrongSound.play();

        }
    }
    guessHistory.innerHTML += `<br>`
    guessWord.value = ""; //clears box

    if (guess == secret) {
        
        spawnConfetti()
        winSound.play();
        setTimeout(winGame, 100)
        //winGame();
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


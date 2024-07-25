let popularWords;
let allWords;

// TODO: write function isWord(word)

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

let secret;
let fiveLetterWords = [];

function wordsLoaded() {
    // console.log(`Loaded ${popularWords.length} popular words and ${allWords.length} dictionary words!`)
    

    popularWords.sort();

    for (let i = 0; i < popularWords.length; i++) {
        let word = popularWords[i];
        if (word.length == 5) {
            fiveLetterWords.push(word);
        }

        else if (word.length > 5) {

            break;
        }
    }; 

    return fiveLetterWords; 
}


function startGame() {
    // Get the array that contains words with numLetters
    let popularWordsLength = popularWordsSorted[numLetters];

    // Choose a random word from the array
    let randomIndex = randInt(0, popularWordsLength.length);
    secret = popularWordsLength[randomIndex];
}




function randInt(min, max) {
    let rand = Math.random();
    rand = rand * (max - min + 1);
    rand = rand + min;
    rand = Math.floor(rand);
    return rand;
}

const guessWord = document.getElementById("guess-word")
function makeGuess() {
    let guess = guessWord.value;

    

    if (guess.length != 5){
        return;
    }
    
    if (allWords.includes(guess) === false) {
        guessWord.value = "";
        return;
    }

    console.log(`Guess: "${guess}"`);

}

function chooseWord() {
    
}
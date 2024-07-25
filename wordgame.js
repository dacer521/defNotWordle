let popularWords;
let allWords;

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

function wordsLoaded() {
    console.log(`Loaded ${popularWords.length} popular words and ${allWords.length} dictionary words!`)
}

function randInt(min, max) {
    let rand = Math.random();
    rand = rand * (max - min + 1);
    rand = rand + min;
    rand = Math.floor(rand);
    return rand;
}

// TODO: copy randInt
// TODO: write function isWord(word)

// For checking word:  json.hasOwnProperty("programming")
// For array of words: let arr = Object.keys(json)
// For a random word:  let word = arr[randInt(0, arr.length - 1)];
    
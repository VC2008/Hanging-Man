//Word list
const wordList = [
    'word',
    'luck',
    'rain',
    'silly',
    'great',
    'love',
    'dreams',
    'laughs',
    'tomfoolery',
    'unfunny',
    'shenanigans',
    'hatred',
    'psychological',
    'exaggerated',
    'coding',
    'procrastination',
    'emotion',
    'happy',
    'friend',
    'fancy',
    'phenomenal',
    'linguistic',
    'aquarium',
    'script',
    'commit',
    'termination',
    'fifty',
    'hope',
    'gift',
    'extraordinary',
    'fool',
]

//variable declaration
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6


// Start Game Function
function startGame(level){
    //reset game
    wrongGuesses = 0
    guessedLetters = []

    selectedWord = getRandomWord(level) 
    displayedWord = '_'.repeat(selectedWord.length)

    updateDifficultyDisplay(level)
    updateUI()

    //show game area + difficulty, hide selection buttons

    document.getElementById('gameArea').classList.remove('d-none')
    document.getElementById('gameArea').classList.add('d-block')

    document.getElementById('difficultyBox').classList.remove('d-none')
    document.getElementById('difficultyBox').classList.add('d-block')

    document.getElementById('difficultySelection').classList.add('d-none')

    document.getElementById('letterInput').focus()
}



function getRandomWord(level) {
    let filteredWords = wordList.filter ( word => {
        if (level === 'easy') return word.length <= 4
        if (level === 'medium') return word.length >= 5 && word.length <= 7
        if (level === 'hard') return word.length >= 8 && word.length <= 10
        if (level === 'random') return word.length >= 4
    })
    return filteredWords[Math.floor(Math.random()*filteredWords.length)]
}


//update difficulty display
function updateDifficultyDisplay(level){
    let difficultyBox = document.getElementById('difficultyBox')
    difficultyBox.classList.remove('easy', 'medium', 'hard')

    if(level === 'easy') {
      difficultyBox.textContent = 'Easy Level'
    difficultyBox.classList.add('easy')
    }else if(level === 'medium'){
        difficultyBox.textContent = 'Medium Level'
        difficultyBox.classList.add('medium')
    }else if(level === 'hard'){
        difficultyBox.textContent = 'Hard Level'
        difficultyBox.classList.add('hard')
    }else if(level === 'random'){
        difficultyBox.textContent = 'Random Level'
        difficultyBox.classList.add('random')
    }
}

function updateUI() {
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ')
}

function guessLetter () {
  let inputField = document.getElementById('letterInput')
  let guessedLetter = inputField.value.toLowerCase()
   
 //check valid letters 
 if (!guessedLetter.match(/^[a-z]$/)){
    alert('Please enter a valid letter from a-z')
    inputField.value = ''
    return;
 }  

 if(guessedLetters.includes(guessLetter)){
    alert('You already guessed this letter')
    inputField.value = ''
    return;
 }

guessedLetters.push(guessedLetter)

//hangman mechanics, checking letter
if (selectedWord.includes(guessedLetter)){
    updateCorrectGuess(guessedLetter)
} else {
    updateWrongGuess(guessedLetter)
}

 inputField.value = ''
 document.getElementById('letterInput').focus()

}

function updateWrongGuess(guessedLetter){
  wrongGuesses++
  document.getElementById('wrongLetters').textContent += `${guessedLetter}`
  document.getElementById('Glaggle').src = 'IMGS/Gaggle degrade 1.png'
  if (wrongGuesses === 2){
    document.getElementById('Glaggle').src = 'IMGS/Glaggle degrade 2.png'
  }
  if (wrongGuesses === 3){
    document.getElementById('Glaggle').src = 'IMGS/Glaggle degrade 3.png'
  }
  if (wrongGuesses === 4){
    document.getElementById('Glaggle').src = 'IMGS/Glaggle degrade 4.png'
  }
  if (wrongGuesses === 5){
    document.getElementById('Glaggle').src = 'IMGS/Glaggle degrade 5.png'
  }
  //
  
  if (wrongGuesses === maxMistakes){
    endGame(false)
    document.getElementById('Glaggle').src = 'IMGS/Glaggle degrade 6.png'
  }
}

function updateCorrectGuess(guessedLetter){
    let newDisplayedWord =''

    for (let i=0; i < selectedWord.length; i++){
        if (selectedWord[i] === guessedLetter){
            newDisplayedWord += guessedLetter
        }else{
        newDisplayedWord += displayedWord[i]
        }
    }

    displayedWord = newDisplayedWord
    updateUI()

    if (!displayedWord.includes('_')) {
        endGame(true)
    }
}
//custom word thing
function startGameAlt(level) {
    wrongGuesses = 0;
    guessedLetters = [];
    selectedWord = prompt("Put in your own word!").toLowerCase();
    displayedWord = '_'.repeat(selectedWord.length);
    updateDifficultyDisplay(level);
    updateUI();
}

function endGame(won){
    let message = won
        ? `Woaaahh that was so coool good job on guessing the word ${selectedWord}`

        : `Ran out of letters dumbo! btw your word was ${selectedWord}`

        setTimeout(() => alert(message), 100) 
        let endMessage = document.getElementById('end');
        endMessage.textContent = message; // Set the text content of the element
        endMessage.classList.remove('d-none'); // Show the message
        endMessage.classList.add('d-block'); // Ensure it's displayed properly
    
        // Hide the game area
        document.getElementById('gameArea').classList.add('d-none');
    
        // Hide the difficulty box
        document.getElementById('difficultyBox').classList.add('d-none'); // Hide the difficulty box
    
        // Show the difficulty selection buttons again
        document.getElementById('difficultySelection').classList.remove('d-none');
        document.getElementById('difficultySelection').classList.add('d-block');
    
        // Optional: Add a 3-second delay before resetting the game state
        setTimeout(() => {
            // Reset game variables
            wrongGuesses = 0;
            guessedLetters = [];
            selectedWord = '';
            displayedWord = '';
            document.getElementById('Glaggle').src = 'IMGS/Glaggle.png';
            document.getElementById('wrongLetters').innerText = ('Wrong Guesses:')
            // Hide the end message
            endMessage.classList.add('d-none');
    
            // Show the difficulty selection buttons
            document.getElementById('difficultySelection').classList.remove('d-none');
            document.getElementById('difficultySelection').classList.add('d-block');
        }, 3000); // 3-second delay before showing difficulty selection
    }

document.getElementById('letterInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        guessLetter();
    }
});


//restarting the game
function restartGame(end) {
    let message = end
    ? ' Restarting...'
    : `Restarting...`;

let endMessage = document.getElementById('end');
endMessage.textContent = message; 
endMessage.classList.remove('d-none'); 
endMessage.classList.add('d-block'); 

// Hide the game area
document.getElementById('gameArea').classList.add('d-none');


document.getElementById('difficultyBox').classList.add('d-none'); 


document.getElementById('difficultySelection').classList.remove('d-none');
document.getElementById('difficultySelection').classList.add('d-block');


setTimeout(() => {
    // Reset game variables
    wrongGuesses = 0;
    guessedLetters = [];
    selectedWord = '';
    displayedWord = '';

    document.getElementById('wrongLetters').innerText = ('Wrong Guesses:')
    document.getElementById('Glaggle').src = 'IMGS/Glaggle.png';
    
   
    endMessage.classList.add('d-none');

    // Show the difficulty selection buttons
    document.getElementById('difficultySelection').classList.remove('d-none');
    document.getElementById('difficultySelection').classList.add('d-block');
}, 3000); // 3-second delay before showing difficulty selection
}
function startGameTwo(level) {
    // Reset game
    wrongGuesses = 0;
    guessedLetters = [];
    selectedWord = prompt("Enter your desired word").toLowerCase();
    displayedWord = '_'.repeat(selectedWord.length);
    updateDifficultyDisplay(level);
    updateUI();

    // Show game area and difficulty display, hide selection button
    document.getElementById('gameArea').classList.remove('d-none');
    document.getElementById('gameArea').classList.add('d-block');

    document.getElementById('difficultyBox').classList.remove('d-none');
    document.getElementById('difficultyBox').classList.add('d-block');
    document.getElementById('difficultySelection').classList.add('d-none');

    document.getElementById('letterInput').focus(); // Type without clicking
}
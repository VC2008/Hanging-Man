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
    'Tomfoolery',
    'Unfunny',
    'shenanigans',
    'hatred',
    'psychological',
    'exaggerated',
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
    return
 }  

 if(guessedLetters.includes(guessLetter)){
    alert('You already guessed this letter')
    inputField.value = ''
    return
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
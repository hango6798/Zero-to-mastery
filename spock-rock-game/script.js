// import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

const playerScoreEl = document.getElementById('playerScore'),
      playerChoiceEl = document.getElementById('playerChoice'),
      computerScoreEl = document.getElementById('computerScore'),
      computerChoiceEl = document.getElementById('computerChoice'),
      resultText = document.getElementById('resultText'),
      resetIcon = document.querySelector('.reset-icon')

const playerRock = document.getElementById('playerRock')
const playerPaper = document.getElementById('playerPaper')
const playerScissors = document.getElementById('playerScissors')
const playerLizard = document.getElementById('playerLizard')
const playerSpock = document.getElementById('playerSpock')

const computerRock = document.getElementById('computerRock')
const computerPaper = document.getElementById('computerPaper')
const computerScissors = document.getElementById('computerScissors')
const computerLizard = document.getElementById('computerLizard')
const computerSpock = document.getElementById('computerSpock')

const allGameIcons = document.querySelectorAll('.far')

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let computerChoice = ''
let playerScoreNumber = 0
let computerScoreNumber = 0

// Reset all 'selected' icon
function resetSelected() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected')
  })
}

// Random computer choice
function computerRandomChoice() {
  const computerChoiceNumber = Math.floor(Math.random()*Object.keys(choices).length)
  switch(computerChoiceNumber){
    case 1:
      computerChoice = 'rock'
      break
    case 2:
      computerChoice = 'paper'
      break
    case 3:
      computerChoice = 'scissors'
      break
    case 4:
      computerChoice = 'lizard'
      break
    case 5:
      computerChoice = 'spock'
      break
  }
}

// Add 'selected' styling & computer choice
function displayComputerChoice(){
  switch (computerChoice) {
    case 'rock':
      computerRock.classList.add('selected')
      computerChoiceEl.textContent = ' --- Rock'
      break;
    case 'paper':
      computerPaper.classList.add('selected')
      computerChoiceEl.textContent = ' --- Paper'
      break;
    case 'lizard':
      computerLizard.classList.add('selected')
      computerChoiceEl.textContent = ' --- Lizard'
      break;
    case 'scissors':
      computerScissors.classList.add('selected')
      computerChoiceEl.textContent = ' --- Scissors'
      break;
    case 'spock':
      computerSpock.classList.add('selected')
      computerChoiceEl.textContent = ' --- Spock'
      break;
  }
}

// Check result, increase scores, update result text
function updateScore(playerChoice){
  if(playerChoice === computerChoice){
    resultText.textContent = "It's a tie."
  }
  else{
    const choice = choices[playerChoice]
    if(choice.defeats.includes(computerChoice)){
      import ('./confetti.js')
      .then((module) => {
        module.startConfetti()
        resultText.textContent = "You won!"
        playerScoreNumber++
        playerScoreEl.textContent = playerScoreNumber
        setTimeout(() => module.stopConfetti(), 3000)
      })
    }
    else{
      resultText.textContent = "You lost!"
      computerScoreNumber++
      computerScoreEl.textContent = computerScoreNumber
      import ('./confetti.js')
      .then((module) => {
        module.stopConfetti()
      })
    }
  }
}

// Call functions to process turn
function checkResult(playerChoice){
  resetSelected()
  computerRandomChoice()
  displayComputerChoice()
  updateScore(playerChoice)
}

// Passing player selection value and styling icons
function select(playerChoice){
  checkResult(playerChoice)
  // Add 'selected' styling & playerChoice
  switch (playerChoice) {
    case 'rock':
      playerRock.classList.add('selected')
      playerChoiceEl.textContent = ' --- Rock'
      break;
    case 'paper':
      playerPaper.classList.add('selected')
      playerChoiceEl.textContent = ' --- Paper'
      break;
    case 'lizard':
      playerLizard.classList.add('selected')
      playerChoiceEl.textContent = ' --- Lizard'
      break;
    case 'scissors':
      playerScissors.classList.add('selected')
      playerChoiceEl.textContent = ' --- Scissors'
      break;
    case 'spock':
      playerSpock.classList.add('selected')
      playerChoiceEl.textContent = ' --- Spock'
      break;
  }
}

window.select = select

// Reset All
function resetAll() {
  playerScoreNumber = 0
  computerScoreNumber = 0
  playerScoreEl.textContent = playerScoreNumber
  computerScoreEl.textContent = computerScoreNumber
  resultText.textContent = ''
  playerChoiceEl.textContent = ' --- Choice'
  computerChoiceEl.textContent = ' --- Choice'
  resetSelected()
}
window.resetAll = resetAll

// Event listener
resetIcon.addEventListener('click', resetAll)

// Onload
resetAll()

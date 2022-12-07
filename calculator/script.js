

const calculatorDisplay = document.querySelector('.calculator-display h1'),
    inputBtns = document.querySelectorAll('button'),
    clearBtn = document.querySelector('#clear-btn')

let firstValue = 0
let operatorValue = ''
let awaitingNextValue = false

function sendNumberValue(number){
    // Replace current display value if first value is entered
    if(awaitingNextValue){
        calculatorDisplay.textContent = number
        awaitingNextValue = false
    }
    else{
        const displayValue = calculatorDisplay.textContent
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number
    }
}

function addDecimal(){
    // If operator pressed dont add decimal
    if(awaitingNextValue) return;
    // If no decimal, add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent+='.'
    }
}

// Calculate first and second values depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber
}

function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent)
    // Prevent multiple operators
    if(operatorValue && awaitingNextValue) {
        operatorValue = operator
        return
    }
    // Assign firstValue if no value
    if(!firstValue){
        firstValue = currentValue
    }
    else{
        const calculation = calculate[operatorValue](firstValue, currentValue)
        calculatorDisplay.textContent = calculation
        firstValue = calculation
    }
    awaitingNextValue = true
    operatorValue = operator
}

// Add eventlistener for numbers, operators, decimal buttons
inputBtns.forEach((btn) => {
    if(btn.classList.length === 0){
        btn.addEventListener('click', () => sendNumberValue(btn.value))
    }
    else if(btn.classList.contains('operator')){
        btn.addEventListener('click', () => useOperator(btn.value))
    }
    else if(btn.classList.contains('decimal')){
        btn.addEventListener('click', () => addDecimal())
    }
})

// Reset display
function resetAll() {
    firstValue = 0
    operatorValue = ''
    awaitingNextValue = false
    calculatorDisplay.textContent = '0'
}

clearBtn.addEventListener('click', resetAll)


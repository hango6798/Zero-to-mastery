
const inputContainer = document.getElementById('input-container'),
    countdownForm = document.getElementById('countdown-form'),
    dateEl = document.getElementById('date-picker'),
    titleEl = document.getElementById('title')

const countdownEl = document.getElementById('countdown'),
    countdownElTitle = document.getElementById('countdown-title'),
    countdownButton = document.getElementById('countdown-button'),
    timeElements = countdownEl.querySelectorAll('span')

const completeEl = document.getElementById('complete'),
    completeElInfo = document.getElementById('complete-info'),
    completeButton = document.getElementById('complete-button')

let countdownTitle = ''
let countdownDate = ''
let countdownValue = Date
let countdownActive
let savedCountdown

const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24


// Set Date Input Minimum with Tomorrow's date
const todayDate = new Date()
let tomorrowDate = new Date()
tomorrowDate.setDate(todayDate.getDate() + 1)
const tomorrow = tomorrowDate.toISOString().split('T')[0]
const today = todayDate.toISOString().split('T')[0]
dateEl.setAttribute('min', today)

// Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime()
        const distance = countdownValue - now
        const days = Math.floor(distance / day),
            hours = Math.floor((distance % day) / hour),
            minutes = Math.floor((distance % hour) / minute),
            seconds = Math.floor((distance % minute) / second)
            
        // Hide input
        inputContainer.hidden = true

        // If the countdown has ended, show complete
        if(distance < 0){
            countdownEl.hidden = true
            clearInterval(countdownActive)
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
            completeEl.hidden = false
        }
        else{
            // Show the countdown in progress
            countdownElTitle.textContent = `${countdownTitle}`
            timeElements[0].textContent = `${days}`
            timeElements[1].textContent = `${hours}`
            timeElements[2].textContent = `${minutes}`
            timeElements[3].textContent = `${seconds}`
            completeEl.hidden = true
            countdownEl.hidden = false
        }
    }, second)
}

// Take values from form input
function updateCountdown(e) {
    e.preventDefault()
    countdownTitle = e.srcElement[0].value
    countdownDate = e.srcElement[1].value
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    }
    if(countdownDate === '')
    {
        alert('Please select a date for the countdown.')
    }
    else{
        localStorage.setItem('countdown', JSON.stringify(savedCountdown))
        // Get number verson of current Date, update DOM
        countdownValue = new Date(countdownDate).getTime()
        updateDOM()
    }
}

// Reset All value
function reset(){
    // Hide countdowns, complete and show input
    countdownEl.hidden = true
    completeEl.hidden = true
    inputContainer.hidden = false
    // Stop the countdown
    clearInterval(countdownActive)
    // Reset values
    countdownTitle = ''
    countdownDate = ''
    dateEl.value = ''
    localStorage.removeItem('countdown')
}

// Restore previous countdown
function restorePreviousCountdown(){
    // Get countdown form localStorage if available
    if(localStorage.getItem('countdown')) {
        inputContainer.hidden = true
        savedCountdown = JSON.parse(localStorage.getItem('countdown'))
        countdownTitle = savedCountdown.title
        countdownDate = savedCountdown.date
        countdownValue = new Date(countdownDate).getTime()
        updateDOM()
    }
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown)
countdownButton.addEventListener('click', reset)
completeButton.addEventListener('click', reset)


// On load, check local storage
restorePreviousCountdown()
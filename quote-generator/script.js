
// Cach 1

const quoteContainer = document.querySelector('#quote-container'),
    quoteText = document.querySelector('#quote'),
    authorText = document.querySelector('#author'),
    twitterBtn = document.querySelector('#twitter'),
    newQuoteBtn = document.querySelector('#new-quote'),
    loader = document.querySelector('#loader')

let apiQuotes = []

function showLoadingSpinner(){
    loader.hidden = false
    quoteContainer.hidden = true
}

function removeLoadingSpinner() {
    quoteContainer.hidden = false
    loader.hidden = true
}

// Show new quote
function newQuote(){
    showLoadingSpinner()
    // Pick a random quote from apiQuotes
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)]

    // Check if author field is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown'
    }
    else{
        authorText.textContent = quote.author
    }

    // Check Quote length to determin styling
    if(quoteText.length > 50){
        quoteText.classList.add('long-quote')
    }
    else{
        quoteText.classList.remove('long-quote')
    }
    // Set quote, hide loader
    quoteText.textContent = quote.text
    removeLoadingSpinner()
}

// Get quotes from API
async function getQuotes(){
    showLoadingSpinner()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        newQuote()
    } catch (error) {
        // Catch Error here
    }
}

// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}

// Event listener
twitterBtn.addEventListener('click', tweetQuote)
newQuoteBtn.addEventListener('click', newQuote)

// On load
getQuotes()


// Cach 2

// const quoteContainer = document.getElementById('quote-container'),
//     quoteText = document.getElementById('quote'),
//     authorText = document.getElementById('author'),
//     twitterBtn = document.getElementById('twitter'),
//     newQuoteBtn = document.getElementById('new-quote'),
//     loader = document.getElementById('loader')


// // Show loading
// function loading(){
//     loader.hidden = false
//     quoteContainer.hidden = true
// }

// // Hide loading
// function complete(){
//     if(!loader.hidden){
//         loader.hidden = true
//         quoteContainer.hidden = false
//     }
// }

// // Get quote from api
// async function getQuote(){
//     loading()
//     const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
//     const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
//     try {
//         const response = await fetch(proxyUrl + apiUrl)
//         const data = await response.json()
//         if(!data.quoteAuthor || data.quoteAuthor === ''){
//             authorText.innerText = 'Unknown'
//         }
//         else{
//             authorText.innerText = data.quoteAuthor
//         }
//         if(data.quoteText.length > 50){
//             quoteText.classList.add('long-quote')
//         }
//         else{
//             quoteText.classList.remove('long-quote')
//         }
//         quoteText.innerText = data.quoteText
//         complete()
//         throw new Error('oops)
//     } catch(error) {
//         getQuote()
//     }
// }


// // tweet quote
// function tweetQuote() {
//     const quote = quoteText.innerText
//     const author = authorText.innerText
//     const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
//     window.open(twitterUrl, '_blank')
// }

// // Event Listener
// newQuoteBtn.addEventListener('click', getQuote)
// twitterBtn.addEventListener('click', tweetQuote)

// // On load
// getQuote()

const quoteContainer = document.querySelector('#quote-container'),
    quoteText = document.querySelector('#quote'),
    authorText = document.querySelector('#author'),
    twitterBtn = document.querySelector('#twitter'),
    newQuoteBtn = document.querySelector('#new-quote'),
    loader = document.querySelector('#loader')

let apiQuotes = []

// Show loading
function loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}

// Hide loading
function complete() {
    quoteContainer.hidden = false
    loader.hidden = true
}

// Show new quote
function newQuote(){
    loading()
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
    complete()
}

// Get quotes from API
async function getQuotes(){
    loading()
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


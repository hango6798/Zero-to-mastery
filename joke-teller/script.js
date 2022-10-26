
const audioElement = document.querySelector('#audio'),
    button = document.querySelector('#button')


// Toggle button
function toggleButton() {
    button.disabled = !button.disabled
}


function tellJoke(joke){
    const jokeString = joke.trim().replace(/ /g, '%20')
    VoiceRSS.speech({
        key: '1c675147b8c64408b365ccadded261c0',
        src: jokeString,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get joke from jokesApi
async function getRandomJoke() {
    let joke = ''
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
    try{
        const response = await fetch(apiUrl)
        const data = await response.json()
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        }
        else{
            joke = data.joke
        }
        // Text-to-Speech
        tellJoke(joke)
        // Disable the button
        toggleButton()
    }
    catch(error){
        // Catch error
    }
}

button.addEventListener('click', getRandomJoke)
audioElement.addEventListener('ended', toggleButton)


const resultsNav = document.getElementById('resultsNav'),
    favoritesNav = document.getElementById('favoritesNav'),
    imagesContainer = document.querySelector('.images-container'),
    saveConfirmed = document.querySelector('.save-confirmed'),
    loader = document.querySelector('.loader')

// NASA API

const apiKey = 'DEMO_KEY'
const count = 10
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`

let resultsArray = []
let favorites = {}

function showContent(page){
    window.scrollTo({top: 0, behavior: 'instant'})
    if(page === 'results'){
        resultsNav.classList.remove('hidden')
        favoritesNav.classList.add('hidden')
    }
    else if(page === 'favorites'){
        favoritesNav.classList.remove('hidden')
        resultsNav.classList.add('hidden')
    }
    loader.classList.add('hidden')
}

function createDOMNodes(page) {
    const currentArray = page === 'results' ? resultsArray : Object.values(favorites)
    currentArray.forEach((result) => {
        // Card container
        const card = document.createElement('div')
        card.classList.add('card')
        // Link
        const link = document.createElement('a')
        link.href = result.hdurl
        link.title = 'View Full Image'
        link.target = '_blank'
        // Image
        const image = document.createElement('img')
        image.src = result.url
        image.alt = 'NASA Picture of the day'
        image.loading = 'lazy'
        image.classList.add('card-img-top')
        // Card body
        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')
        // Card title
        const cardTitle = document.createElement('h5')
        cardTitle.classList.add('card-title')
        cardTitle.textContent = result.title
        // Add to favorites
        const addToFavorites = document.createElement('div')
        addToFavorites.classList.add('clickable')
        if(page === 'results'){
            addToFavorites.textContent = 'Add to favorites'
            addToFavorites.setAttribute('onclick',`saveFavorite('${result.url}')`)
        }
        else if(page === 'favorites'){
            addToFavorites.textContent = 'Remove favorites'
            addToFavorites.setAttribute('onclick',`removeFavorite('${result.url}')`)
        }
        // card text
        const cardText = document.createElement('p')
        cardText.classList.add('card-text')
        cardText.textContent = result.explanation
        // text muted
        const textMuted = document.createElement('small')
        textMuted.classList.add('text-muted')
        // date
        const date = document.createElement('strong')
        date.textContent = result.date
        // copyright
        const copyright = document.createElement('span')
        result.copyright ? copyright.textContent = result.copyright :  copyright.textContent = ''

        link.append(image)
        textMuted.append(date, copyright)
        cardBody.append(cardTitle, addToFavorites, cardText, textMuted)
        card.append(link,cardBody)
        imagesContainer.appendChild(card)
    })
}

function updateDOM(page) {
    // Get favorites from localstorage
    if(localStorage.getItem('nasaFavorites')){
        favorites = JSON.parse(localStorage.getItem('nasaFavorites'))
    }
    imagesContainer.textContent = ''
    createDOMNodes(page)
    showContent(page)
}

// Get 10 Images from NASA API
async function getNasaPictures() {
    // Show loader
    loader.classList.remove('hidden')
    try {
        const res = await fetch(apiUrl)
        resultsArray = await res.json()
        updateDOM('results')
    }
    catch(error) {

    }
}

// Add result to favorites
function saveFavorite(itemUrl) {
    // Loop through results array to select favorite
    resultsArray.forEach((item) => {
        if(item.url.includes(itemUrl) && !favorites[itemUrl]){
            favorites[itemUrl] = item
            // Show save confirmation for 2 seconds
            saveConfirmed.hidden = false
            setTimeout(() => {
                saveConfirmed.hidden = true
            }, 2000)
            // Set favorites in localstorage
            localStorage.setItem('nasaFavorites', JSON.stringify(favorites))
        }
    })
}
// Remove result from favorites
function removeFavorite(itemUrl){
    if(favorites[itemUrl]){
        delete favorites[itemUrl]
        localStorage.setItem('nasaFavorites', JSON.stringify(favorites))
        updateDOM('favorites')
    }
}

getNasaPictures()

// AddEventListener
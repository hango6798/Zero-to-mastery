
const toggleSwitch = document.querySelector('input[type="checkbox"]'),
    toggleIcon = document.getElementById('toggle-icon'),
    nav = document.getElementById('nav'),
    image1 = document.getElementById('image1'),
    image2 = document.getElementById('image2'),
    image3 = document.getElementById('image3'),
    textBox = document.getElementById('text-box')
    

// Dark or Light images
function imageMode(color){
    image1.src = `img/undraw_proud_coder_${color}.svg`
    image2.src = `img/undraw_feeling_proud_${color}.svg`
    image3.src = `img/undraw_conceptual_idea_${color}.svg`
}

function toggleDarkLightMode(isDark){
    nav.style.backgroundColor = isDark ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)'
    textBox.style.backgroundColor = isDark ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)'
    toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode'
    isDark ? toggleIcon.children[1].classList.replace('fa-sun','fa-moon') : toggleIcon.children[1].classList.replace('fa-moon','fa-sun')
    isDark ? imageMode('dark') : imageMode('light')
}

// Switch theme dynamically
function switchTheme(e){
    if(e.target.checked){
        document.documentElement.setAttribute('data-theme','dark')
        localStorage.setItem('theme','dark')
        toggleDarkLightMode(true)
    }
    else{
        document.documentElement.setAttribute('data-theme','light')
        localStorage.setItem('theme','light')
        toggleDarkLightMode(false)
    }
}

// Event Listener
toggleSwitch.addEventListener('change', switchTheme)

// Check local Storage for theme
const currentTheme = localStorage.getItem('theme')

if(currentTheme) {
    document.documentElement.setAttribute('data-theme',currentTheme)
    if(currentTheme === 'dark'){
        toggleSwitch.checked = true
        toggleDarkLightMode(true)
    }
}
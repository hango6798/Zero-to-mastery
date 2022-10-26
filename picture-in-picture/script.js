
const videoElement = document.querySelector('#video'),
    button = document.querySelector('#button')

// Prompt to select media stream, pass to video element, then play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia()
        videoElement.srcObject = mediaStream
        videoElement.onloadedmetadata = () => {
            videoElement.play()
        }
    }
    catch(error){
        // catch error
    }
}

button.addEventListener('click', async () => {
    // Disable the button
    button.disable = true
    // Start picture in picture
    await videoElement.requestPictureInPicture()
    // Reset the button
    button.disable = false
})

// On load
selectMediaStream()
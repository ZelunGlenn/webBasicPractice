
const audio0 = new Audio(`./sounds/music0.mp3`)
const audio1 = new Audio(`./sounds/music1.mp3`)

const buttons = document.querySelectorAll('button');


const videos = document.querySelectorAll('video');
videos.forEach((video) => {
  video.pause()
})


buttons.forEach((button, index) => {
  const audio = new Audio(`./sounds/music${index}.mp3`)

  // Create a Web Audio API context
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  const track = audioContext.createMediaElementSource(audio)
  const gainNode = audioContext.createGain()
  track.connect(gainNode).connect(audioContext.destination)

  button.addEventListener('mouseenter', (e) => {
    const titleDiv = e.currentTarget.querySelector('.titles');
    
    playVideo(titleDiv.innerText)
    audioContext.resume().then(() => {
    gainNode.gain.setValueAtTime(1, audioContext.currentTime) // Reset volume to 1
    audio.play()
    })
  })

  button.addEventListener('mouseleave', () => {
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1)

    pauseVideo()
    // Pause the audio after the fade-out is complete
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0 // Reset the audio to the beginning
      gainNode.gain.setValueAtTime(1, audioContext.currentTime) // Reset volume to 1 for next play
    }, 1000)
  })
})

document.addEventListener('keydown', (event) => {

  switch (event.key) {
    case "ArrowLeft":
      console.log("wat")
      audio0.play()
      setTimeout(() => {
        audio0.pause()
        audio0.currentTime = 0
      }, 3000)
      audio1.pause()
      audio1.currentTime = 0
      break
    case "ArrowRight":
      console.log("sup")
      audio1.play()
      setTimeout(() => {
        audio1.pause()
        audio1.currentTime = 0
      }, 3000)
      audio0.pause()
      audio0.currentTime = 0
      break
    default:
      break
  }

})

const playVideo = (text) => {
  console.log(text)
  if (text === "AirPods Pro") {
    videos[0].play()
    videos[1].pause()
  } else {
    videos[1].play()
    videos[0].pause()
  }
}
const pauseVideo = () => {

  videos[1].pause()
  videos[0].pause()
}


// const playMusic = () => {
//   // const audios = document.querySelectorAll('audio')
//   // for (var i = 0; i < audios.length; i++) {
//   //   audios[i].play()
//   // }
//   alert('in')
// }

// const pauseMusic = () => {
//   // const audios = document.querySelectorAll('audio')
//   // for (var i = 0; i < audios.length; i++) {
//   //   audios[i].pause()
//   // }
//   alert('off')
// }





const buttons = document.querySelectorAll('button');
buttons.forEach((button, index) => {
  const audio = new Audio(`./sounds/music${index}.mp3`);

  // Create a Web Audio API context
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const track = audioContext.createMediaElementSource(audio);
  const gainNode = audioContext.createGain();
  track.connect(gainNode).connect(audioContext.destination);

  button.addEventListener('mouseenter', () => {
    audioContext.resume().then(() => {
    gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Reset volume to 1
    audio.play();
    });
  });

  button.addEventListener('mouseleave', () => {
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

    // Pause the audio after the fade-out is complete
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0; // Reset the audio to the beginning
      gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Reset volume to 1 for next play
    }, 1000);
  });
});


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


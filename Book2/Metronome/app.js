// Function to play or pause all tracks in sync
  function togglePlayPause() {
    const masterTrack = document.getElementById('metronome-audio');
    const masterButton = document.getElementById('metronome-play-pause');

    if (masterTrack.paused) {
      masterTrack.currentTime = 0;
      masterTrack.play();
      masterButton.textContent = '⏸︎';
    }
    else {
      masterTrack.pause();
      masterButton.textContent = '⏵︎';
    }
  }

// Function to change the playback speed based on the input BPM
function changeSpeed(bpm) {
  const masterTrack = document.getElementById('metronome-audio');
  
  const baseBpm = 100;
  const speed = bpm / baseBpm;
  
  // Adjust the playback speed
  masterTrack.playbackRate = speed;
}
//Function to Reset the Speed to default
// function resetSpeed() {
//   const slider = document.getElementById('speed');
//   slider.value = 100; // Reset the slider to 100
//   changeSpeed(100); // Reset the speed to default
// }

let metronomeTrack = document.getElementById('metronome-audio');
metronomeTrack.addEventListener('ended', endTracks);

  function endTracks() {
    const playButton = document.getElementById('metronome-play-pause');
    metronomeTrack.pause();
    metronomeTrack.currentTime = 0;
    playButton.textContent = '⏵︎';
  }
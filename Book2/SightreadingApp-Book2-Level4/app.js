let CURRENT_KEY = 'E blues';

// Each array has 8 entries (2 rows x 4 measures).
// 'folder' is the subfolder name under images/<key>/
// 'images' lists the valid numbered image files in that folder.
const MEASURE_MAPS = {
  'E blues': [
    { folder: 'Start',            images: [1,2,3,4,5,6,7] },
    { folder: 'Measure 2 & 6',   images: [1,2,3,4,5,6,7,8] },
    { folder: 'Measure 3 & 8',   images: [1,2,3,4,5,6,7,8] },
    { folder: 'Measure 4 & 7',   images: [1,2,3,4,5,6,7,8] },
    { folder: 'Measure 5 (break)', images: [1,2,3,4,5,6,7,8] },
    { folder: 'Measure 2 & 6',   images: [1,2,3,4,5,6,7,8] },
    { folder: 'Measure 4 & 7',   images: [1,2,3,4,5,6,7,8] },
    { folder: 'Final',           images: [1] },
  ],
  'E minor pop': [
    { folder: 'Start',            images: [1,2,3,4,5,6,7] },
    { folder: 'Measure 2 & 7',   images: [1,2,3,4,5,6,7,8] },
    { folder: 'Measure 3 & 6',   images: [1,2,3,4,5,6,7] },
    { folder: 'Measure 4 & 8',   images: [1,2,3,4,5,6,7,8] },
    { folder: 'Measure 5 (break)', images: [1,2,3,4,5,6,7] },
    { folder: 'Measure 3 & 6',   images: [1,2,3,4,5,6,7] },
    { folder: 'Measure 2 & 7',   images: [1,2,3,4,5,6,7,8] },
    { folder: 'Final',           images: [1] },
  ],
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function selectKey(key) {
  CURRENT_KEY = key;
}

function generateActivity() {
  const rows = [
    document.getElementById('row1'),
    document.getElementById('row2'),
  ];

  rows.forEach(row => row.innerHTML = '');

  MEASURE_MAPS[CURRENT_KEY].forEach(({ folder, images }, index) => {
    const rowIndex = Math.floor(index / 4);
    const imageNum = getRandom(images);
    const src = `images/${CURRENT_KEY}/${folder}/${imageNum}.jpg`;

    const img = document.createElement('img');
    img.src = src;
    rows[rowIndex].appendChild(img);
  });
}

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
function resetSpeed() {
  const slider = document.getElementById('speed');
  slider.value = 100; // Reset the slider to 100
  changeSpeed(100); // Reset the speed to default
}

let metronomeTrack = document.getElementById('metronome-audio');
metronomeTrack.addEventListener('ended', endTracks);

  function endTracks() {
    const playButton = document.getElementById('metronome-play-pause');
    metronomeTrack.pause();
    metronomeTrack.currentTime = 0;
    playButton.textContent = '⏵︎';
  }

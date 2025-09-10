const NOTES = ['D', 'Eb1', 'F1', 'G1', 'Ab1', 'Bb1', 'C1', 'D1'];
const NOTEINTERVALS = [-1, 0, 2, 4, 5, 7, 9, 11];
const CADENCENOTES = ['D', 'F1', 'Bb1'];
const CADENCEINTERVALS = [-1, 2, 7];
let previousNote = null;
let accidentalFlag = false;

function getRandom(arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
}

function getRandomNote(notes, intervals, previousNote) {
  let note, interval;
  let attempts = 0;
  const maxAttempts = 10;
  do {
    const index = Math.round(Math.random() * (notes.length - 1));
    note = notes[index];
    interval = intervals[index];
    attempts++;
    if (attempts >= maxAttempts) {
      break;
    }
  } while (
    previousNote !== null &&
    Math.abs(interval - NOTEINTERVALS[NOTES.indexOf(previousNote)]) > 5
  );
  return note;
}

function generateMeasureImages(isFirst, isBreak, beats, meter) {
  const measure = [];
  let remaining = beats;
  const beatsConst = beats;

  beats--;
  if (isFirst) {
    beats++; // Adjust to be one less for break measures
    accidentalFlag = true;
  }

  // if (isFirst && beats === 4) {
  //   beats--; // Adjust to be one less for the first measure in 4-4 
  // }

  while (remaining > 0) {
    let noteMax = Math.min(remaining, beats); 
    let duration = getRandom([...Array(noteMax).keys()].map(i => i + 1));
    let note;
    do {
      note = getRandomNote(NOTES, NOTEINTERVALS, previousNote);
    } while (accidentalFlag && (note.includes('S') || note.includes('b')));
    if (note.includes('S') || note.includes('b')) {
      accidentalFlag = true;
    }
    let folder = ``;
    if (duration === beatsConst) {
      folder = `images/${meter}/barline/${duration}/${note}.jpg`;
    }
    else {
      folder = `images/${meter}/internal/${duration}/${note}.jpg`;
    }
    measure.push(folder);
    previousNote = note;
    remaining -= duration;
  }
  measure[measure.length - 1] = measure[measure.length - 1].replace('/internal/', '/barline/');
  if (isFirst) {
    measure[0] = measure[0].replace('/internal/', '/start/');
    measure[0] = measure[0].replace('/barline/', '/start/');
    measure[0] = measure[0].replace(new RegExp(`\\/(${NOTES.join('|')})\\.jpg$`), '.jpg');

  }
  if (isBreak) {
    measure[0] = measure[0].replace('/internal/', '/break/');
    measure[0] = measure[0].replace('/barline/', '/break/');
  }

  accidentalFlag = false; // Reset accidental flag after each measure
  return measure;
}


function generateLastMeasureImage(beats, meter) { 
  const measure = [];
  let firstDuration = getRandom([0, 1]);
  if (beats === 4) {
    firstDuration = getRandom([1, 2]);
  }
  let folder = ``;
  if (firstDuration > 0) {
    let firstNote;
    do {
      firstNote = getRandomNote(NOTES, NOTEINTERVALS, previousNote);
    } while (firstNote.includes('S') || firstNote.includes('b'));
    folder = `images/${meter}/internal/${firstDuration}/${firstNote}.jpg`;
    previousNote = firstNote;
    measure.push(folder);
  }
  let secondDuration = beats - firstDuration - 1;
  secondDuration = getRandom([...Array(secondDuration).keys()].map(i => i + 1));
  let secondNote = getRandomNote(CADENCENOTES, CADENCEINTERVALS, previousNote);
  folder = `images/${meter}/end/cadence/${secondDuration}/${secondNote}.jpg`;
  measure.push(folder);

  let lastDuration = beats - firstDuration - secondDuration;
  folder = `images/${meter}/end/final/${lastDuration}.jpg`;
  measure.push(folder);

  return measure;
  


}


function generateActivity(meter) {
  const beats = meter === '3-4' ? 3 : 4;
  const row1 = document.getElementById('row1');
  const row2 = document.getElementById('row2');
  row1.innerHTML = '';
  row2.innerHTML = '';

  const rows = [row1, row2];

  for (let row = 0; row < 2; row++) {
    for (let i = 0; i < 4; i++) {
      const isFirst = row === 0 && i === 0;
      const isLast = row === 1 && i === 3;
      const isBreak = row === 1 && i === 0;

      let images;
      if (isLast) {
        images = generateLastMeasureImage(beats, meter);
      } else {
        images = generateMeasureImages(isFirst, isBreak, beats, meter);
      }
      

      images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        rows[row].appendChild(img);
      });
    }
  }
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
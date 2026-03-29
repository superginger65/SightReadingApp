const NOTES = ['A', 'B', 'C', 'D', 'E1', 'F1', 'GS1', 'A1', 'B1'];
const NOTEINTERVALS = [-12, -10, -9, -7, -5, -4, -1, 0, 2];
const CADENCENOTES = ['E1', 'GS1', 'B1'];
const CADENCEINTERVALS = [-5, -1, 2];
const STARTNOTES = ['A', 'A1'];
const STARTINTERVALS = [-12, 0];
const EIGHTH_NOTES = ['A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-GS1', 'B1-A1', 'B1-C1', 'B1-D1', 'B1-G1', 'B1-GS1', 'C1-A1', 'C1-B1', 'C1-D1', 'C1-G1', 'D1-A1', 'D1-B1', 'D1-C1', 'D1-GS1', 'E1-F1', 'E1-GS1', 'F1-A1', 'F1-C1', 'F1-D', 'GS1-A1', 'GS1-B1', 'GS1-D1', 'GS1-E1'];
const EIGHTH_NOTEINTERVALS = [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 3, 3, 3, 3, 5, 5, 5, 5, -5, -5, -4, -4, -4, -1, -1, -1, -1];
let CURRENT_KEY = 'A minor';
let previousNote = null;
let accidentalFlag = false;

const NOTES_Aminor = ['A', 'B', 'C', 'D', 'E1', 'F1', 'GS1', 'A1', 'B1']; //Add D1 (5) back when gotten from Alan
const NOTEINTERVALS_Aminor = [-12, -10, -9, -7, -5, -4, -1, 0, 2];
const CADENCENOTES_Aminor = ['E1', 'GS1', 'B1'];
const CADENCEINTERVALS_Aminor = [-5, -1, 2];
const STARTNOTES_Aminor = ['A', 'A1'];
const STARTINTERVALS_Aminor = [-12, 0];
const EIGHTH_NOTES_Aminor = ['A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-GS1', 'B1-A1', 'B1-C1', 'B1-D1', 'B1-G1', 'B1-GS1', 'C1-A1', 'C1-B1', 'C1-D1', 'C1-G1', 'D1-A1', 'D1-B1', 'D1-C1', 'D1-GS1', 'E1-F1', 'E1-GS1', 'F1-A1', 'F1-C1', 'F1-D', 'GS1-A1', 'GS1-B1', 'GS1-D1', 'GS1-E1'];
const EIGHTH_NOTEINTERVALS_Aminor = [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 3, 3, 3, 3, 5, 5, 5, 5, -5, -5, -4, -4, -4, -1, -1, -1, -1];

const NOTES_Eminor = ['E', 'FS', 'G', 'A', 'B', 'C', 'DS', 'E1', 'FS1', 'G1', 'A1', 'B1'];
const NOTEINTERVALS_Eminor = [-12, -10, -9, -7, -5, -4, -1, 0, 2, 3, 5, 7];
const CADENCENOTES_Eminor = ['DS', 'FS1'];
const CADENCEINTERVALS_Eminor = [-1, 2];
const STARTNOTES_Eminor = ['E', 'E1'];
const STARTINTERVALS_Eminor = [-12, 0];
const EIGHTH_NOTES_Eminor = ['A1-B1', 'A1-C1', 'A-B', 'A-C', 'A-G', 'B1-A1', 'B1-C1', 'B1-G1', 'B-A', 'B-C', 'C1-A1', 'C1-B1', 'C1-G1', 'DS-E1', 'E1-B1', 'E1-FS1', 'G1-FS1', 'G-A'];
const EIGHTH_NOTEINTERVALS_Eminor = [5, 5, -7, -7, -7, 7, 7, 7, -5, -5, 8, 8, 8, -1, 0, 0, 3, 9];


function getRandom(arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
}

function getRandomNote(notes, intervals, previousNote) {
  let note, interval;
  let attempts = 0;
  const maxAttempts = 20;
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
  let previousDuration = null;

  if (beatsConst === 4) {
    beats--;
  }
  if (isFirst) {
    beats++;
  }
  if (isFirst && beats === 4) {
    beats--; // Adjust to be one less for the first measure in 4-4 
  }

  while (remaining > 0) {
    let isEighth = false;
    let noteMax = Math.min(Math.round(remaining * 2), beats);
    let duration;
    let note;
    do {
      duration = (getRandom([...Array(noteMax).keys()].map(i => i + 1)) / 2);
    } while (
      duration === 2.5 ||                                                        // No duration of 2.5 (no such folder)
      (remaining - duration > 0 && remaining - duration < 1 && duration !== 1.5) ||  // Remaining can't land between 0 and 1 (except dotted rhythm: 1.5 may leave 0.5)
      (duration === 1.5 && remaining - duration === 0) ||                       // 1.5 can't be the final (barline) note
      (remaining === beatsConst && (duration === 0.5 || duration === 1.5) && (isFirst || isBreak)) ||  // First note can't be .5 or 1.5
      (duration === 0.5 && previousDuration !== 1.5) ||                         // 0.5 must follow a 1.5 note
      (duration === 1.5 && remaining !== beatsConst && !(beatsConst === 4 && remaining === 2) && !(beatsConst === 3 && remaining === 2)) ||  // 1.5 only on beat 1 (any meter), beat 3 (4/4), or beat 2 (3/4)
      (remaining - duration === 1.5 && duration !== 1.5)                        // Prevent deadlock: remaining=1.5 is only reachable via a 1.5 note
    );
    do {
      note = getRandomNote(NOTES, NOTEINTERVALS, previousNote);
    }
    while (accidentalFlag && (note.includes('S') || note.includes('b')));
    if (note.includes('S') || note.includes('b')) {
      accidentalFlag = true;
    }

    if (remaining > 1 && isFirst == false && isBreak == false && duration === 1 && Math.random() < 0.5) {
      note = getRandomNote(EIGHTH_NOTES, EIGHTH_NOTEINTERVALS, previousNote);
      // isEighth = true;
    }

    
    let folder = ``;
    if (duration === beatsConst) {
      folder = `images/${CURRENT_KEY}/${meter}/Barlines/${duration}/${note}.jpg`;
    }
    // else if (isEighth) {
    //   folder = `images/${CURRENT_KEY}/${meter}/Internal/Eighths-${difficulty === 'easy' ? 'Easier' : 'Harder'}/${note}.jpg`;
    // }
    else {
      folder = `images/${CURRENT_KEY}/${meter}/Internal/${duration}/${note}.jpg`;
    }
    measure.push(folder);
    previousNote = note;
    if (previousNote.includes('-')) {
      previousNote = note.substring(note.indexOf('-') + 1);
    }
    previousDuration = duration;
    remaining -= duration;
  }
  measure[measure.length - 1] = measure[measure.length - 1].replace('/Internal/', '/Barlines/');
  if (isFirst) {
      let startNote = getRandomNote(STARTNOTES, STARTINTERVALS, null);
      measure[0] = measure[0].replace('/Internal/', '/Start/');
      measure[0] = measure[0].replace('/Barlines/', '/Start/');
      measure[0] = measure[0].replace(new RegExp(`\\/(${NOTES.join('|')})\\.jpg$`), `/${startNote}.jpg`);
  
    }
  if (isBreak) {
    measure[0] = measure[0].replace('/Internal/', '/Break/');
    measure[0] = measure[0].replace('/Barlines/', '/Break/');
  }

  accidentalFlag = false; // Reset accidental flag at the end of the measure
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
    let firstNote = getRandomNote(NOTES, NOTEINTERVALS, previousNote);
    folder = `images/${CURRENT_KEY}/${meter}/Internal/${firstDuration}/${firstNote}.jpg`;
    previousNote = firstNote;
    measure.push(folder);
  }
  let secondDuration = beats - firstDuration - 1;
  secondDuration = getRandom([...Array(secondDuration).keys()].map(i => i + 1));
  let secondNote = getRandomNote(CADENCENOTES, CADENCEINTERVALS, previousNote);
  folder = `images/${CURRENT_KEY}/${meter}/Final/Penultimate/${secondDuration}/${secondNote}.jpg`;
  measure.push(folder);

  let lastDuration = beats - firstDuration - secondDuration;
  folder = `images/${CURRENT_KEY}/${meter}/Final/Final/${lastDuration}.jpg`;
  measure.push(folder);

  return measure;
}

function selectKey(key) {
  switch (key) {
    case 'A minor':
      NOTES = NOTES_Aminor;
      NOTEINTERVALS = NOTEINTERVALS_Aminor;
      CADENCENOTES = CADENCENOTES_Aminor;
      CADENCEINTERVALS = CADENCEINTERVALS_Aminor;
      STARTNOTES = STARTNOTES_Aminor;
      STARTINTERVALS = STARTINTERVALS_Aminor;
      EIGHTH_NOTES = EIGHTH_NOTES_Aminor;
      CURRENT_KEY = 'A minor';
      break;
    case 'E minor':
      NOTES = NOTES_Eminor;
      NOTEINTERVALS = NOTEINTERVALS_Eminor;
      CADENCENOTES = CADENCENOTES_Eminor;
      CADENCEINTERVALS = CADENCEINTERVALS_Eminor;
      STARTNOTES = STARTNOTES_Eminor;
      STARTINTERVALS = STARTINTERVALS_Eminor;
      EIGHTH_NOTES = EIGHTH_NOTES_Eminor;
      CURRENT_KEY = 'E minor';
      break;
    default:
      break;
  }
}

function selectDifficulty(dif) {
  switch (dif) {
    case 'easy':
      difficulty = 'easy';
      break;
    case 'hard':
      difficulty = 'hard';
      break;
    default:
      break;
  }
}


function generateActivity(meter) {
  previousNote = null; // Reset previous note for each activity
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

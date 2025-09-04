let NOTES = ['D', 'E1', 'F1', 'G1', 'A1', 'Bb1', 'CS1', 'D1', 'E2', 'F2'];
let NOTEINTERVALS = [-12, -10, -9, -7, -5, -4, -1, 0, 2, 3];
let CADENCENOTES = ['A1', 'CS1', 'E2'];
let CADENCEINTERVALS = [-5, -1, 2];
let STARTNOTES = ['D', 'D1'];
let STARTINTERVALS = [-12, 0];
let CURRENT_KEY = 'D minor';
let previousNote = null;
let difficulty = 'easy';

const NOTES_CMajor = ['D', 'E1', 'F1', 'G1', 'A1', 'B1', 'C1', 'D1'];
const NOTEINTERVALS_CMajor = [-10, -8, -7, -5, -3, -1, 0, 2];
const CADENCENOTES_CMajor = ['G1', 'B1', 'D1'];
const CADENCEINTERVALS_CMajor = [-5, -1, 2];
const STARTNOTES_CMajor = ['C1'];
const STARTINTERVALS_CMajor = [0];

const NOTES_DMajor = ['D', 'G1', 'A1', 'B1', 'CS1', 'D1', 'E2', 'FS2', 'G2'];
const NOTEINTERVALS_DMajor = [-12, -7, -5, -3, -1, 0, 2, 4, 5];
const CADENCENOTES_DMajor = ['A1', 'CS1', 'E2'];
const CADENCEINTERVALS_DMajor = [-5, -1, 2];
const STARTNOTES_DMajor = ['D1'];
const STARTINTERVALS_DMajor = [0];

const NOTES_FMajor = ['D', 'E1', 'F1', 'G1', 'A1', 'Bb1', 'C1', 'D1', 'E2', 'F2', 'G2'];
const NOTEINTERVALS_FMajor = [-3, -1, 0, 2, 4, 5, 7, 9, 11, 12, 14];
const CADENCENOTES_FMajor = ['E1', 'G1', 'C1'];
const CADENCEINTERVALS_FMajor = [-1, 2, 7];
const STARTNOTES_FMajor = ['F1'];
const STARTINTERVALS_FMajor = [0];

const NOTES_GMajor = ['D', 'G1', 'A1', 'B1', 'C1', 'D1', 'E2', 'FS2', 'G2'];
const NOTEINTERVALS_GMajor = [-5, 0, 2, 4, 5, 7, 9, 11, 12];
const CADENCENOTES_GMajor = ['D', 'A1'];
const CADENCEINTERVALS_GMajor = [-5, 2];
const STARTNOTES_GMajor = ['G1'];
const STARTINTERVALS_GMajor = [0];

const NOTES_Aminor = ['A', 'D', 'GS1', 'A1', 'B1', 'C1', 'D1', 'E2', 'F2'];
const NOTEINTERVALS_Aminor = [-12, -7, -1, 0, 2, 3, 5, 7, 8];
const CADENCENOTES_Aminor = ['GS1', 'B1'];
const CADENCEINTERVALS_Aminor = [-1, 2];
const STARTNOTES_Aminor = ['A1'];
const STARTINTERVALS_Aminor = [0];

const NOTES_Dminor = ['D', 'E1', 'F1', 'G1', 'A1', 'Bb1', 'CS1', 'D1', 'E2', 'F2'];
const NOTEINTERVALS_Dminor = [-12, -10, -9, -7, -5, -4, -1, 0, 2, 3];
const CADENCENOTES_Dminor = ['A1', 'CS1', 'E2'];
const CADENCEINTERVALS_Dminor = [-5, -1, 2];
const STARTNOTES_Dminor = ['D', 'D1'];
const STARTINTERVALS_Dminor = [-12, 0];

const NOTES_Gminor = ['D', 'G1', 'A1', 'Bb1', 'C1', 'D1', 'E2', 'F2', 'FS2', 'G2'];
const NOTEINTERVALS_Gminor = [-5, 0, 2, 3, 5, 7, 9, 10, 11, 12];
const CADENCENOTES_Gminor = ['D1', 'FS2'];
const CADENCEINTERVALS_Gminor = [7, 11];
const STARTNOTES_Gminor = ['G1'];
const STARTINTERVALS_Gminor = [0];


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

  beats--;
  if (isFirst) {
    beats++;
  }
  if (isFirst && beats === 4) {
    beats--; // Adjust to be one less for the first measure in 4-4 
  }

  while (remaining > 0) {
    let noteMax = Math.min(remaining, beats); 
    let duration = getRandom([...Array(noteMax).keys()].map(i => i + 1));
    let note = getRandomNote(NOTES, NOTEINTERVALS, previousNote);
    
    let folder = ``;
    if (duration === beatsConst) {
      folder = `images/${CURRENT_KEY}/${meter}/barline/${duration}/${note}.jpg`;
    }
    else {
      folder = `images/${CURRENT_KEY}/${meter}/internal/${duration}/${note}.jpg`;
    }
    measure.push(folder);
    previousNote = note;
    remaining -= duration;
  }
  measure[measure.length - 1] = measure[measure.length - 1].replace('/internal/', '/barline/');
  if (isFirst) {
    let startNote = getRandomNote(STARTNOTES, STARTINTERVALS, null);
    measure[0] = measure[0].replace('/internal/', '/start/');
    measure[0] = measure[0].replace('/barline/', '/start/');
    measure[0] = measure[0].replace(new RegExp(`\\/(${NOTES.join('|')})\\.jpg$`), `/${startNote}.jpg`);

  }
  if (isBreak) {
    measure[0] = measure[0].replace('/internal/', '/break/');
    measure[0] = measure[0].replace('/barline/', '/break/');
  }

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
    folder = `images/${CURRENT_KEY}/${meter}/internal/${firstDuration}/${firstNote}.jpg`;
    previousNote = firstNote;
    measure.push(folder);
  }
  let secondDuration = beats - firstDuration - 1;
  secondDuration = getRandom([...Array(secondDuration).keys()].map(i => i + 1));
  let secondNote = getRandomNote(CADENCENOTES, CADENCEINTERVALS, previousNote);
  folder = `images/${CURRENT_KEY}/${meter}/end/cadence/${secondDuration}/${secondNote}.jpg`;
  measure.push(folder);

  let lastDuration = beats - firstDuration - secondDuration;
  folder = `images/${CURRENT_KEY}/${meter}/end/final/${lastDuration}.jpg`;
  measure.push(folder);

  return measure;
}

function selectKey(key) {
  switch (key) {
    case 'C Major':
      NOTES = NOTES_CMajor;
      NOTEINTERVALS = NOTEINTERVALS_CMajor;
      CADENCENOTES = CADENCENOTES_CMajor;
      CADENCEINTERVALS = CADENCEINTERVALS_CMajor;
      STARTNOTES = STARTNOTES_CMajor;
      STARTINTERVALS = STARTINTERVALS_CMajor;
      CURRENT_KEY = 'C Major';
      break;
    case 'D Major':
      NOTES = NOTES_DMajor;
      NOTEINTERVALS = NOTEINTERVALS_DMajor;
      CADENCENOTES = CADENCENOTES_DMajor;
      CADENCEINTERVALS = CADENCEINTERVALS_DMajor;
      STARTNOTES = STARTNOTES_DMajor;
      STARTINTERVALS = STARTINTERVALS_DMajor;
      CURRENT_KEY = 'D Major';
      break;
    case 'F Major':
      NOTES = NOTES_FMajor;
      NOTEINTERVALS = NOTEINTERVALS_FMajor;
      CADENCENOTES = CADENCENOTES_FMajor;
      CADENCEINTERVALS = CADENCEINTERVALS_FMajor;
      STARTNOTES = STARTNOTES_FMajor;
      STARTINTERVALS = STARTINTERVALS_FMajor;
      CURRENT_KEY = 'F Major';
      break;
    case 'G Major':
      NOTES = NOTES_GMajor;
      NOTEINTERVALS = NOTEINTERVALS_GMajor;
      CADENCENOTES = CADENCENOTES_GMajor;
      CADENCEINTERVALS = CADENCEINTERVALS_GMajor;
      STARTNOTES = STARTNOTES_GMajor;
      STARTINTERVALS = STARTINTERVALS_GMajor;
      CURRENT_KEY = 'G Major';
      break;
    case 'A minor':
      NOTES = NOTES_Aminor;
      NOTEINTERVALS = NOTEINTERVALS_Aminor;
      CADENCENOTES = CADENCENOTES_Aminor;
      CADENCEINTERVALS = CADENCEINTERVALS_Aminor;
      STARTNOTES = STARTNOTES_Aminor;
      STARTINTERVALS = STARTINTERVALS_Aminor;
      CURRENT_KEY = 'A minor';
      break;
    case 'D minor':
      NOTES = NOTES_Dminor;
      NOTEINTERVALS = NOTEINTERVALS_Dminor;
      CADENCENOTES = CADENCENOTES_Dminor;
      CADENCEINTERVALS = CADENCEINTERVALS_Dminor;
      STARTNOTES = STARTNOTES_Dminor;
      STARTINTERVALS = STARTINTERVALS_Dminor;
      CURRENT_KEY = 'D minor';
      break;
    case 'G minor':
      NOTES = NOTES_Gminor;
      NOTEINTERVALS = NOTEINTERVALS_Gminor;
      CADENCENOTES = CADENCENOTES_Gminor;
      CADENCEINTERVALS = CADENCEINTERVALS_Gminor;
      STARTNOTES = STARTNOTES_Gminor;
      STARTINTERVALS = STARTINTERVALS_Gminor;
      CURRENT_KEY = 'G minor';
      break;
    default:
      break;
  }
}

function selectDifficulty(difficulty) {
  switch (difficulty) {
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

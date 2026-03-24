const NOTES = ['A', 'B', 'C', 'D', 'E1', 'F1', 'GS1', 'A1', 'B1', 'D1'];
const NOTEINTERVALS = [-12, -10, -9, -7, -5, -4, -1, 0, 2, 5];
const CADENCENOTES = ['E1', 'GS1', 'B1'];
const CADENCEINTERVALS = [-5, -1, 2];
const STARTNOTES = ['A', 'A1'];
const STARTINTERVALS = [-12, 0];
const EIGHTH_NOTES_EASY = ['A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-GS1', 'B1-A1', 'B1-C1', 'B1-D1', 'B1-G1', 'B1-GS1', 'C1-A1', 'C1-B1', 'C1-D1', 'C1-G1', 'D1-A1', 'D1-B1', 'D1-C1', 'D1-GS1', 'E1-B1', 'E1-F1', 'E1-GS1', 'F1-A1', 'F1-C1', 'F1-D', 'GS1-A1', 'GS1-B1', 'GS1-D1', 'GS1-E1'];
const EIGHTH_NOTEINTERVALS_EASY = [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 3, 3, 3, 3, 5, 5, 5, 5, -5, -5, -5, -4, -4, -4, -1, -1, -1, -1];
let CURRENT_KEY = 'A minor';
let previousNote = null;

const NOTES_Aminor = ['A', 'B', 'C', 'D', 'E1', 'F1', 'GS1', 'A1', 'B1', 'D1'];
const NOTEINTERVALS_Aminor = [-12, -10, -9, -7, -5, -4, -1, 0, 2, 5];
const CADENCENOTES_Aminor = ['E1', 'GS1', 'B1'];
const CADENCEINTERVALS_Aminor = [-5, -1, 2];
const STARTNOTES_Aminor = ['A', 'A1'];
const STARTINTERVALS_Aminor = [-12, 0];
const EIGHTH_NOTES_Aminor = ['A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-GS1', 'B1-A1', 'B1-C1', 'B1-D1', 'B1-G1', 'B1-GS1', 'C1-A1', 'C1-B1', 'C1-D1', 'C1-G1', 'D1-A1', 'D1-B1', 'D1-C1', 'D1-GS1', 'E1-B1', 'E1-F1', 'E1-GS1', 'F1-A1', 'F1-C1', 'F1-D', 'GS1-A1', 'GS1-B1', 'GS1-D1', 'GS1-E1'];
const EIGHTH_NOTEINTERVALS_Aminor = [0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 3, 3, 3, 3, 5, 5, 5, 5, -5, -5, -5, -4, -4, -4, -1, -1, -1, -1];

const NOTES_Eminor = ['D', 'E1', 'F1', 'G1', 'A1', 'Bb1', 'CS1', 'D1', 'E2', 'F2'];
const CADENCENOTES_Eminor = ['A1', 'CS1', 'E2'];
const CADENCEINTERVALS_Eminor = [-5, -1, 2];
const STARTNOTES_Eminor = ['D', 'D1'];
const STARTINTERVALS_Eminor = [-12, 0];
const EIGHTH_NOTES_EASY_Eminor = [];
const EIGHTH_NOTEINTERVALS_EASY_Eminor = [];
const EIGHTH_NOTES_HARD_Eminor = [];
const EIGHTH_NOTEINTERVALS_HARD_Eminor = [];


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
    let isEighth = false;
    let noteMax = Math.min(remaining, beats);
    let duration;
    do {
      duration = (getRandom([...Array(noteMax).keys()].map(i => i + 1)) / 2);
    } while (duration === 3); // Prevent duration of 3
    let note = getRandomNote(NOTES, NOTEINTERVALS, previousNote);
    if (remaining > 1 && isFirst == false && isBreak == false && duration === 1 && Math.random() < 0.5) {
      note = getRandomNote(EIGHTH_NOTES_EASY, EIGHTH_NOTEINTERVALS_EASY, previousNote);
      // isEighth = true;
    }

    
    let folder = ``;
    if (duration === beatsConst) {
      folder = `images/${CURRENT_KEY}/${meter}/barline/${duration}/${note}.jpg`;
    }
    else if (isEighth) {
      folder = `images/${CURRENT_KEY}/${meter}/internal/Eighths-${difficulty === 'easy' ? 'Easier' : 'Harder'}/${note}.jpg`;
    }
    else {
      folder = `images/${CURRENT_KEY}/${meter}/internal/${duration}/${note}.jpg`;
    }
    measure.push(folder);
    previousNote = note;
    if (previousNote.includes('-')) {
      previousNote = note.substring(note.indexOf('-') + 1);
    }
    remaining -= duration;
  }
  measure[measure.length - 1] = measure[measure.length - 1].replace('/internal/', '/barline/');
  if (isFirst) {
    let startNote = getRandomNote(STARTNOTES, STARTINTERVALS, null);
    measure[0] = measure[0].replace('/internal/', '/start/');
    measure[0] = measure[0].replace('/barline/', '/start/');
    measure[0] = measure[0].replace(new RegExp(`\\/(${NOTES.join('|')})\\.jpg$`), '.jpg');

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
      EIGHTH_NOTES_EASY = EIGHTH_NOTES_EASY_CMajor;
      EIGHTH_NOTES_HARD = EIGHTH_NOTES_HARD_CMajor;
      CURRENT_KEY = 'C Major';
      break;
    case 'D Major':
      NOTES = NOTES_DMajor;
      NOTEINTERVALS = NOTEINTERVALS_DMajor;
      CADENCENOTES = CADENCENOTES_DMajor;
      CADENCEINTERVALS = CADENCEINTERVALS_DMajor;
      STARTNOTES = STARTNOTES_DMajor;
      STARTINTERVALS = STARTINTERVALS_DMajor;
      EIGHTH_NOTES_EASY = EIGHTH_NOTES_EASY_DMajor;
      EIGHTH_NOTES_HARD = EIGHTH_NOTES_HARD_DMajor;
      CURRENT_KEY = 'D Major';
      break;
    case 'F Major':
      NOTES = NOTES_FMajor;
      NOTEINTERVALS = NOTEINTERVALS_FMajor;
      CADENCENOTES = CADENCENOTES_FMajor;
      CADENCEINTERVALS = CADENCEINTERVALS_FMajor;
      STARTNOTES = STARTNOTES_FMajor;
      STARTINTERVALS = STARTINTERVALS_FMajor;
      EIGHTH_NOTES_EASY = EIGHTH_NOTES_EASY_FMajor;
      EIGHTH_NOTES_HARD = EIGHTH_NOTES_HARD_FMajor;
      CURRENT_KEY = 'F Major';
      break;
    case 'G Major':
      NOTES = NOTES_GMajor;
      NOTEINTERVALS = NOTEINTERVALS_GMajor;
      CADENCENOTES = CADENCENOTES_GMajor;
      CADENCEINTERVALS = CADENCEINTERVALS_GMajor;
      STARTNOTES = STARTNOTES_GMajor;
      STARTINTERVALS = STARTINTERVALS_GMajor;
      EIGHTH_NOTES_EASY = EIGHTH_NOTES_EASY_GMajor;
      EIGHTH_NOTES_HARD = EIGHTH_NOTES_HARD_GMajor;
      CURRENT_KEY = 'G Major';
      break;
    case 'A minor':
      NOTES = NOTES_Aminor;
      NOTEINTERVALS = NOTEINTERVALS_Aminor;
      CADENCENOTES = CADENCENOTES_Aminor;
      CADENCEINTERVALS = CADENCEINTERVALS_Aminor;
      STARTNOTES = STARTNOTES_Aminor;
      STARTINTERVALS = STARTINTERVALS_Aminor;
      EIGHTH_NOTES_EASY = EIGHTH_NOTES_EASY_Aminor;
      EIGHTH_NOTES_HARD = EIGHTH_NOTES_HARD_Aminor;
      CURRENT_KEY = 'A minor';
      break;
    case 'D minor':
      NOTES = NOTES_Dminor;
      NOTEINTERVALS = NOTEINTERVALS_Dminor;
      CADENCENOTES = CADENCENOTES_Dminor;
      CADENCEINTERVALS = CADENCEINTERVALS_Dminor;
      STARTNOTES = STARTNOTES_Dminor;
      STARTINTERVALS = STARTINTERVALS_Dminor;
      EIGHTH_NOTES_EASY = EIGHTH_NOTES_EASY_Dminor;
      EIGHTH_NOTES_HARD = EIGHTH_NOTES_HARD_Dminor;
      CURRENT_KEY = 'D minor';
      break;
    case 'G minor':
      NOTES = NOTES_Gminor;
      NOTEINTERVALS = NOTEINTERVALS_Gminor;
      CADENCENOTES = CADENCENOTES_Gminor;
      CADENCEINTERVALS = CADENCEINTERVALS_Gminor;
      STARTNOTES = STARTNOTES_Gminor;
      STARTINTERVALS = STARTINTERVALS_Gminor;
      EIGHTH_NOTES_EASY = EIGHTH_NOTES_EASY_Gminor;
      EIGHTH_NOTES_HARD = EIGHTH_NOTES_HARD_Gminor;
      CURRENT_KEY = 'G minor';
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

let NOTES = ['A', 'B', 'C', 'D', 'E1', 'F1', 'GS1', 'A1', 'B1', 'D1'];
let NOTEINTERVALS = [-12, -10, -9, -7, -5, -4, -1, 0, 2, 5];
let CADENCENOTES = ['E1', 'GS1', 'B1'];
let CADENCEINTERVALS = [-5, -1, 2];
let STARTNOTES = ['A', 'A1'];
let STARTINTERVALS = [-12, 0];
let EIGHTH_NOTES = ['A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-GS1', 'B1-A1', 'B1-D1', 'B1-GS1', 'D1-A1', 'D1-B1', 'D1-GS1', 'E1-F1', 'E1-GS1', 'F1-A1', 'F1-D', 'GS1-A1', 'GS1-B1', 'GS1-D1', 'GS1-E1'];
let EIGHTH_NOTEINTERVALS = [0, 0, 0, 0, 0, 0, 2, 2, 2, 5, 5, 5, -5, -5, -4, -4, -1, -1, -1, -1];
let CURRENT_KEY = 'A minor';
let previousNote = null;
let accidentalFlag = false;

const NOTES_Aminor = ['A', 'B', 'C', 'D', 'E1', 'F1', 'GS1', 'A1', 'B1', 'D1'];
const NOTEINTERVALS_Aminor = [-12, -10, -9, -7, -5, -4, -1, 0, 2, 5];
const CADENCENOTES_Aminor = ['E1', 'GS1', 'B1'];
const CADENCEINTERVALS_Aminor = [-5, -1, 2];
const STARTNOTES_Aminor = ['A', 'A1'];
const STARTINTERVALS_Aminor = [-12, 0];
const EIGHTH_NOTES_Aminor = ['A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-GS1', 'B1-A1', 'B1-D1', 'B1-GS1', 'D1-A1', 'D1-B1', 'D1-GS1', 'E1-F1', 'E1-GS1', 'F1-A1', 'F1-D', 'GS1-A1', 'GS1-B1', 'GS1-D1', 'GS1-E1'];
const EIGHTH_NOTEINTERVALS_Aminor = [0, 0, 0, 0, 0, 0, 2, 2, 2, 5, 5, 5, -5, -5, -4, -4, -1, -1, -1, -1];

const NOTES_Eminor = ['E', 'FS', 'G', 'A', 'B', 'C', 'DS', 'E1', 'FS1', 'G1', 'A1', 'B1'];
const NOTEINTERVALS_Eminor = [-12, -10, -9, -7, -5, -4, -1, 0, 2, 3, 5, 7];
const CADENCENOTES_Eminor = ['DS', 'FS1'];
const CADENCEINTERVALS_Eminor = [-1, 2];
const STARTNOTES_Eminor = ['E', 'E1'];
const STARTINTERVALS_Eminor = [-12, 0];
const EIGHTH_NOTES_Eminor = ['A1-B1', 'A-B', 'A-C', 'A-G', 'B1-A1', 'B1-G1', 'B-A', 'DS-E1', 'E1-B1', 'E1-FS1', 'G1-FS1', 'G-A'];
const EIGHTH_NOTEINTERVALS_Eminor = [5, -7, -7, -7, 7, 7, -5, -1, 0, 0, 3, 9];

// Leading tone → resolution targets (tonic and 5th) for each key
const LEADING_TONE_RESOLUTIONS = {
  'A minor': { leadingTone: 'GS1', resolvesTo: ['A1', 'E1'] },
  'E minor': { leadingTone: 'DS',  resolvesTo: ['E1', 'B'] },
};

// Check if an eighth-note pair is valid (leading tone as first note must resolve)
function isValidEighthPair(pair) {
  const res = LEADING_TONE_RESOLUTIONS[CURRENT_KEY];
  if (!res) return true;
  const parts = pair.split('-');
  if (parts[0] === res.leadingTone && !res.resolvesTo.includes(parts[1])) return false;
  return true;
}


function getRandom(arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
}

function getRandomNote(notes, intervals, previousNote) {
  let note, interval;
  let attempts = 0;
  const maxAttempts = 1000; // Prevent infinite loop in edge cases
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

    let folder = ``;
    if (isFirst && measure.length === 0) {
      note = getRandomNote(STARTNOTES, STARTINTERVALS, null);
      folder = `images/${CURRENT_KEY}/${meter}/Start/${duration}/${note}.jpg`;
    } else {
      // Check if previous note was a leading tone requiring resolution
      const ltRes = LEADING_TONE_RESOLUTIONS[CURRENT_KEY];
      const mustResolve = ltRes && previousNote === ltRes.leadingTone;

      if (mustResolve) {
        // Leading tone must resolve to tonic or 5th
        note = getRandom(ltRes.resolvesTo);
      } else {
        do {
          note = getRandomNote(NOTES, NOTEINTERVALS, previousNote);
        }
        while (accidentalFlag && (note.includes('S') || note.includes('b')));

        if (remaining > 1 && !isFirst && !isBreak && duration === 1 && !accidentalFlag && Math.random() < 0.5) {
          const eighthPair = getRandomNote(EIGHTH_NOTES, EIGHTH_NOTEINTERVALS, previousNote);
          if (isValidEighthPair(eighthPair)) {
            note = eighthPair;
          }
        }
      }

      if (note.includes('S') || note.includes('b')) {
        accidentalFlag = true;
      }

      if (duration === beatsConst) {
        folder = `images/${CURRENT_KEY}/${meter}/Barlines/${duration}/${note}.jpg`;
      } else {
        folder = `images/${CURRENT_KEY}/${meter}/Internal/${duration}/${note}.jpg`;
      }
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
    const ltRes = LEADING_TONE_RESOLUTIONS[CURRENT_KEY];
    const mustResolve = ltRes && previousNote === ltRes.leadingTone;
    let firstNote = mustResolve ? getRandom(ltRes.resolvesTo) : getRandomNote(NOTES, NOTEINTERVALS, previousNote);
    if (firstNote.includes('S') || firstNote.includes('b')) {
      accidentalFlag = true;
    }
    folder = `images/${CURRENT_KEY}/${meter}/Internal/${firstDuration}/${firstNote}.jpg`;
    previousNote = firstNote;
    measure.push(folder);
  }
  let secondDuration = beats - firstDuration - 1;
  secondDuration = getRandom([...Array(secondDuration).keys()].map(i => i + 1));
  let secondNote;
  let cadenceAttempts = 0;
  do {
    secondNote = getRandomNote(CADENCENOTES, CADENCEINTERVALS, previousNote);
    cadenceAttempts++;
  } while (accidentalFlag && (secondNote.includes('S') || secondNote.includes('b')) && cadenceAttempts < 1000);
  folder = `images/${CURRENT_KEY}/${meter}/Final/Penultimate/${secondDuration}/${secondNote}.jpg`;
  measure.push(folder);

  let lastDuration = beats - firstDuration - secondDuration;
  folder = `images/${CURRENT_KEY}/${meter}/Final/Final/${lastDuration}.jpg`;
  measure.push(folder);

  accidentalFlag = false;
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
      EIGHTH_NOTEINTERVALS = EIGHTH_NOTEINTERVALS_Aminor;
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
      EIGHTH_NOTEINTERVALS = EIGHTH_NOTEINTERVALS_Eminor;
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

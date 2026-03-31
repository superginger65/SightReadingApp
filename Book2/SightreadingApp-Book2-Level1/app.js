let CURRENT_KEY = 'C Major';
// let difficulty = 'easy';

// ─── Image file lists per measure position ─────────────────────────────────
// Each measure is represented by 2 images: a Start image and an End w-Barline image.
// File lists below reflect the actual files present in the C Major / 2-4 folders.

// Measure 1 – Start folder
const M1_START = ['1.jpg', '2a.jpg', '2b.jpg', '3.jpg'];
// Measure 1 – End w-Barline folder (eighth-note pairs + 16th-note image)
const M1_END_EIGHTHS = ['D-E1.jpg', 'D-F1.jpg', 'E1-D.jpg', 'E1-F1.jpg', 'F1-D.jpg', 'F1-E1.jpg'];
const M1_END_16THS   = ['16s.jpg'];

// Measures 2 & 6 – Start / End w-Barline
const M26_START          = ['1a.jpg', '1b.jpg', '2.jpg'];
const M26_END_QUARTER    = ['F1.jpg'];
const M26_END_EIGHTHS    = ['D-E1.jpg', 'D-F1.jpg', 'E1-D.jpg', 'E1-F1.jpg', 'F1-D.jpg', 'F1-E1.jpg'];
const M26_END_16THS      = ['16ths.jpg'];

// Measure 3 – Start / End w-Barline
const M3_START        = ['1a.jpg', '1b.jpg', '2.jpg'];
const M3_END_EIGHTHS  = ['D-E1.jpg', 'D-F1.jpg', 'E1-D.jpg', 'E1-F1.jpg', 'F1-D.jpg', 'F1-E1.jpg'];
const M3_END_16THS    = ['16ths.jpg'];

// Measure 4 – Start / End w-Barline
const M4_START       = ['F-16th-1.jpg', 'F-16th-2.jpg', 'F-16th-3.jpg',
                         'G-16th-1.jpg', 'G-16th-2.jpg', 'G-16th-3.jpg', 'r-E1.jpg'];
const M4_END_EIGHTHS = ['D-E1.jpg', 'D-F1.jpg', 'E1-D.jpg', 'E1-F1.jpg', 'F1-D.jpg', 'F1-E1.jpg'];
const M4_END_16THS   = ['16-1a.jpg', '16-1b.jpg', '16-2.jpg'];

// Measure 5 (Break Point) – Start / End w-Barline
const M5_START        = ['1a.jpg', '1b.jpg', '2.jpg'];
const M5_END_EIGHTHS  = ['D-E1.jpg', 'D-F1.jpg', 'E1-D.jpg', 'E1-F1.jpg', 'F1-D.jpg', 'F1-E1.jpg'];
const M5_END_16THS    = ['16ths.jpg'];

// Measure 7 – Start / End w-Barline
const M7_START        = ['1a.jpg', '1b.jpg', '2.jpg'];
const M7_END_EIGHTHS  = ['M.2E--D-E1.jpg', 'M.2E--D-F1.jpg', 'M.2E--E1-D.jpg',
                          'M.2E--E1-F1.jpg', 'M.2E--F1-D.jpg', 'M.2E--F1-E1.jpg'];
const M7_END_16THS    = ['M.4E 16 -1.jpg', 'M.4E 16 -2.jpg', 'M.4E 16 -3.jpg'];

// Measure 8 (End) – Start / End
const M8_START = ['1a.jpg', '2.jpg', 'ib.jpg'];
const M8_END   = ['E1.jpg'];

// ─── Helpers ───────────────────────────────────────────────────────────────

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Returns 'Quarter', 'Eighth notes', or '16th notes' for End w-Barline subfolder.
// Measure 2 & 6 also have a Quarter option; others only Eighths / 16ths.
function pickEndType(hasSixteenth, hasQuarter) {
  // if (difficulty === 'easy') {
  //   // easy: quarter (if available) or eighth notes only
  //   if (hasQuarter && Math.random() < 0.4) return 'Quarter';
  //   return 'Eighth notes';
  // } else {
    // hard: can pick 16th notes
    if (hasQuarter && Math.random() < 0.25) return 'Quarter';
    if (hasSixteenth && Math.random() < 0.5) return '16th notes';
    return 'Eighth notes';
  // }
}

// ─── Measure image generators ──────────────────────────────────────────────

function generateMeasure1(meter) {
  const base = `images/${CURRENT_KEY}/${meter}`;
  const startFile = getRandom(M1_START);
  const endType = pickEndType(true, false);
  const endFolder = endType === '16th notes' ? M1_END_16THS : M1_END_EIGHTHS;
  const endFile = getRandom(endFolder);
  return [
    `${base}/Start/Start 1 beat/${startFile}`,
    `${base}/Start/End w-Barline/${endFile}`
  ];
}

function generateMeasure26(meter) {
  const base = `images/${CURRENT_KEY}/${meter}`;
  const startFile = getRandom(M26_START);
  const endType = pickEndType(true, true);
  let endFile;
  if (endType === 'Quarter')       endFile = getRandom(M26_END_QUARTER);
  else if (endType === '16th notes') endFile = getRandom(M26_END_16THS);
  else                              endFile = getRandom(M26_END_EIGHTHS);
  return [
    `${base}/Measure 2 and 6/Start/${startFile}`,
    `${base}/Measure 2 and 6/End w-Barline/${endType}/${endFile}`
  ];
}

function generateMeasure3(meter) {
  const base = `images/${CURRENT_KEY}/${meter}`;
  const startFile = getRandom(M3_START);
  const endType = pickEndType(true, false);
  const endFolder = endType === '16th notes' ? M3_END_16THS : M3_END_EIGHTHS;
  const endFile = getRandom(endFolder);
  return [
    `${base}/Measure 3/Start/${startFile}`,
    `${base}/Measure 3/End w-Barline/${endType}/${endFile}`
  ];
}

function generateMeasure4(meter) {
  const base = `images/${CURRENT_KEY}/${meter}`;
  const startFile = getRandom(M4_START);
  const endType = pickEndType(true, false);
  const endFolder = endType === '16th notes' ? M4_END_16THS : M4_END_EIGHTHS;
  const endFile = getRandom(endFolder);
  return [
    `${base}/Measure 4/Start/${startFile}`,
    `${base}/Measure 4/End w-Barline/${endType}/${endFile}`
  ];
}

function generateMeasure5(meter) {
  const base = `images/${CURRENT_KEY}/${meter}`;
  const startFile = getRandom(M5_START);
  const endType = pickEndType(true, false);
  const endFolder = endType === '16th notes' ? M5_END_16THS : M5_END_EIGHTHS;
  const endFile = getRandom(endFolder);
  return [
    `${base}/Measure 5 (Break Point)/Start/${startFile}`,
    `${base}/Measure 5 (Break Point)/End w-Barline/${endType}/${endFile}`
  ];
}

function generateMeasure7(meter) {
  const base = `images/${CURRENT_KEY}/${meter}`;
  const startFile = getRandom(M7_START);
  const endType = pickEndType(true, false);
  const endFolder = endType === '16th notes' ? M7_END_16THS : M7_END_EIGHTHS;
  const endFile = getRandom(endFolder);
  return [
    `${base}/Measure 7/Start/${startFile}`,
    `${base}/Measure 7/End w-Barline/${endType}/${endFile}`
  ];
}

function generateMeasure8(meter) {
  const base = `images/${CURRENT_KEY}/${meter}`;
  const startFile = getRandom(M8_START);
  const endFile = getRandom(M8_END);
  return [
    `${base}/End/Start/${startFile}`,
    `${base}/End/End/${endFile}`
  ];
}

// ─── Difficulty selector ────────────────────────────────────────────────────

function selectDifficulty(dif) {
  difficulty = (dif === 'hard') ? 'hard' : 'easy';
}

// ─── Main activity generator ───────────────────────────────────────────────
// 8 measures laid out in 2 rows of 4.
// Row 1: M1, M2, M3, M4
// Row 2: M5 (break), M6, M7, M8 (end)

function generateActivity(meter) {
  const row1 = document.getElementById('row1');
  const row2 = document.getElementById('row2');
  row1.innerHTML = '';
  row2.innerHTML = '';

  const measureGenerators = [
    () => generateMeasure1(meter),
    () => generateMeasure26(meter),
    () => generateMeasure3(meter),
    () => generateMeasure4(meter),
    () => generateMeasure5(meter),
    () => generateMeasure26(meter),
    () => generateMeasure7(meter),
    () => generateMeasure8(meter)
  ];

  const rows = [row1, row2];

  for (let m = 0; m < 8; m++) {
    const row = rows[Math.floor(m / 4)];
    const images = measureGenerators[m]();
    images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      row.appendChild(img);
    });
  }
}

let NOTES = ['D', 'E1', 'F1', 'G1', 'A1', 'B1', 'C1', 'D1'];
let NOTEINTERVALS = [-10, -8, -7, -5, -3, -1, 0, 2];
let CADENCENOTES = ['G1', 'B1', 'D1'];
let CADENCEINTERVALS = [-5, -1, 2];
let STARTNOTES = ['C1'];
let STARTINTERVALS = [0];
let EIGHTH_NOTES_EASY = ['A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'B1-A1', 'B1-C1', 'B1-D1', 'B1-G1', 'C1-A1', 'C1-B1', 'C1-D1', 'C1-G1', 'D1-A1', 'D1-B1', 'D1-C1', 'D1-G1', 'E1-B1', 'E1-F1', 'E1-G1', 'F1-A1', 'F1-C1', 'F1-D', 'F1-G1', 'G1-B1', 'G1-C1', 'G1-D', 'G1-D1', 'G1-F1'];
let EIGHTH_NOTEINTERVALS_EASY = [-3, -3, -3, -3, -3, -1, -1, -1, -1, 0, 0, 0, 0, 2, 2, 2, 2, -8, -8, -8, -7, -7, -7, -7, -5, -5, -5, -5, -5];
let EIGHTH_NOTES_HARD = ['A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'B1-A1', 'B1-C1', 'B1-D1', 'B1-G1', 'C1-A1', 'C1-B1', 'C1-D1', 'C1-G1', 'D1-A1', 'D1-B1', 'D1-C1', 'D1-G1', 'E1-B1', 'E1-F1', 'E1-G1', 'F1-A1', 'F1-C1', 'F1-D', 'F1-G1', 'G1-B1', 'G1-C1', 'G1-D', 'G1-D1', 'G1-F1', 'r-A1', 'r-B1', 'r-C1', 'r-D', 'r-D1', 'r-E1', 'r-F1', 'r-G1'];
let EIGHTH_NOTEINTERVALS_HARD = [-3, -3, -3, -3, -3, -1, -1, -1, -1, 0, 0, 0, 0, 2, 2, 2, 2, -8, -8, -8, -7, -7, -7, -7, -5, -5, -5, -5, -5, -3, -1, 0, -10, 2, -8, -7, -5];
let CURRENT_KEY = 'C major';
let previousNote = null;
let accidentalFlag = false;
let difficulty = 'easy';

const NOTES_CMajor = ['D', 'E1', 'F1', 'G1', 'A1', 'B1', 'C1', 'D1'];
const NOTEINTERVALS_CMajor = [-10, -8, -7, -5, -3, -1, 0, 2];
const CADENCENOTES_CMajor = ['G1', 'B1', 'D1'];
const CADENCEINTERVALS_CMajor = [-5, -1, 2];
const STARTNOTES_CMajor = ['C1'];
const STARTINTERVALS_CMajor = [0];
const EIGHTH_NOTES_EASY_CMajor = ['A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'B1-A1', 'B1-C1', 'B1-D1', 'B1-G1', 'C1-A1', 'C1-B1', 'C1-D1', 'C1-G1', 'D1-A1', 'D1-B1', 'D1-C1', 'D1-G1', 'E1-B1', 'E1-F1', 'E1-G1', 'F1-A1', 'F1-C1', 'F1-D', 'F1-G1', 'G1-B1', 'G1-C1', 'G1-D', 'G1-D1', 'G1-F1'];
const EIGHTH_NOTEINTERVALS_EASY_CMajor = [-3, -3, -3, -3, -3, -1, -1, -1, -1, 0, 0, 0, 0, 2, 2, 2, 2, -8, -8, -8, -7, -7, -7, -7, -5, -5, -5, -5, -5];
const EIGHTH_NOTES_HARD_CMajor = ['A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'B1-A1', 'B1-C1', 'B1-D1', 'B1-G1', 'C1-A1', 'C1-B1', 'C1-D1', 'C1-G1', 'D1-A1', 'D1-B1', 'D1-C1', 'D1-G1', 'E1-B1', 'E1-F1', 'E1-G1', 'F1-A1', 'F1-C1', 'F1-D', 'F1-G1', 'G1-B1', 'G1-C1', 'G1-D', 'G1-D1', 'G1-F1', 'r-A1', 'r-B1', 'r-C1', 'r-D', 'r-D1', 'r-E1', 'r-F1', 'r-G1'];
const EIGHTH_NOTEINTERVALS_HARD_CMajor = [-3, -3, -3, -3, -3, -1, -1, -1, -1, 0, 0, 0, 0, 2, 2, 2, 2, -8, -8, -8, -7, -7, -7, -7, -5, -5, -5, -5, -5, -3, -1, 0, -10, 2, -8, -7, -5];

const NOTES_DMajor = ['D', 'G1', 'A1', 'B1', 'CS1', 'D1', 'E2', 'FS2', 'G2'];
const NOTEINTERVALS_DMajor = [-12, -7, -5, -3, -1, 0, 2, 4, 5];
const CADENCENOTES_DMajor = ['A1', 'CS1', 'E2'];
const CADENCEINTERVALS_DMajor = [-5, -1, 2];
const STARTNOTES_DMajor = ['D1'];
const STARTINTERVALS_DMajor = [0];
const EIGHTH_NOTES_EASY_DMajor = ['A1-A1', 'A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-G1', 'B1-A1', 'B1-C1', 'B1-CS1', 'B1-D1', 'B1-E1', 'B1-FS2', 'B1-G1', 'B1-G2', 'CS1-D1', 'CS1-E2', 'CS1-G1', 'CS1-G2', 'D1-A1', 'D1-B1', 'D1-D', 'D1-D1', 'D1-E2', 'D1-FS2', 'D1-G1', 'E1-B1', 'E1-G1', 'E2-B1', 'E2-C1', 'E2-CS1', 'E2-D1', 'E2-FS2', 'E2-G2', 'G1-A1', 'G1-B1', 'G1-CS1', 'G1-D', 'G1-D1'];
const EIGHTH_NOTEINTERVALS_EASY_DMajor = [-5,-5,-5,-5,-5,-5, -3,-3,-3,-3,-3,-3,-3,-3, -1,-1,-1,-1, 0,0,0,0,0,0,0, -10,-10, 2,2,2,2,2,2, -7,-7,-7,-7,-7];
const EIGHTH_NOTES_HARD_DMajor = ['A1-A1', 'A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-G1', 'B1-A1', 'B1-C1', 'B1-CS1', 'B1-D1', 'B1-E1', 'B1-FS2', 'B1-G1', 'B1-G2', 'CS1-D1', 'CS1-E2', 'CS1-G1', 'CS1-G2', 'D1-A1', 'D1-B1', 'D1-D', 'D1-D1', 'D1-E2', 'D1-FS2', 'D1-G1', 'E1-B1', 'E1-G1', 'E2-B1', 'E2-C1', 'E2-CS1', 'E2-D1', 'E2-FS2', 'E2-G2', 'G1-A1', 'G1-B1', 'G1-CS1', 'G1-D', 'G1-D1', 'G1-F1', 'r-A1', 'r-B1', 'r-C1', 'r-D', 'r-D1', 'r-E1', 'r-G1'];
const EIGHTH_NOTEINTERVALS_HARD_DMajor = [-5,-5,-5,-5,-5,-5,-5, -3,-3,-3,-3,-3,-3,-3,-3, -1,-1,-1,-1, 0,0,0,0,0,0,0, -10,-10, 2,2,2,2,2,2, -7,-7,-7,-7,-7,-7, -5,-3,-2,-12,0,-10,-7];

const NOTES_FMajor = ['D', 'E1', 'F1', 'G1', 'A1', 'Bb1', 'C1', 'D1', 'E2', 'F2', 'G2'];
const NOTEINTERVALS_FMajor = [-3, -1, 0, 2, 4, 5, 7, 9, 11, 12, 14];
const CADENCENOTES_FMajor = ['E1', 'G1', 'C1'];
const CADENCEINTERVALS_FMajor = [-1, 2, 7];
const STARTNOTES_FMajor = ['F1'];
const STARTINTERVALS_FMajor = [0];
const EIGHTH_NOTES_EASY_FMajor = ['A1-Bb1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'Bb1-A1', 'Bb1-C1', 'Bb1-G1', 'C1-A1', 'C1-Bb1', 'C1-D1', 'C1-G1', 'D1-A1', 'D1-C1', 'D1-G1', 'E1-Bb1', 'E1-F1', 'E1-G1', 'F1-A1', 'F1-C1', 'F1-D', 'F1-G1', 'G1-Bb1', 'G1-C1', 'G1-D', 'G1-D1', 'G1-F1'];
const EIGHTH_NOTEINTERVALS_EASY_FMajor = [4,4,4,4,4, 5,5,5, 7,7,7,7, 9,9,9, -1,-1,-1, 0,0,0,0, 2,2,2,2,2];
const EIGHTH_NOTES_HARD_FMajor = ['A1-Bb1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'Bb1-A1', 'Bb1-C1', 'Bb1-G1', 'C1-A1', 'C1-Bb1', 'C1-D1', 'C1-G1', 'D1-A1', 'D1-C1', 'D1-G1', 'E1-Bb1', 'E1-F1', 'E1-G1', 'F1-A1', 'F1-C1', 'F1-D', 'F1-G1', 'G1-Bb1', 'G1-C1', 'G1-D', 'G1-D1', 'G1-F1', 'r-A1', 'r-Bb1', 'r-C1', 'r-D', 'r-D1', 'r-E1', 'r-F1', 'r-G1'];
const EIGHTH_NOTEINTERVALS_HARD_FMajor = [4,4,4,4,4, 5,5,5, 7,7,7,7, 9,9,9, -1,-1,-1, 0,0,0,0, 2,2,2,2,2, 4,5,7,-3,9,-1,0,2];

const NOTES_GMajor = ['D', 'G1', 'A1', 'B1', 'C1', 'D1', 'E2', 'FS2', 'G2'];
const NOTEINTERVALS_GMajor = [-5, 0, 2, 4, 5, 7, 9, 11, 12];
const CADENCENOTES_GMajor = ['D', 'A1'];
const CADENCEINTERVALS_GMajor = [-5, 2];
const STARTNOTES_GMajor = ['G1'];
const STARTINTERVALS_GMajor = [0];
const EIGHTH_NOTES_EASY_GMajor = ['A1-A1', 'A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-G1', 'B1-A1', 'B1-C1', 'B1-D1', 'B1-E1', 'B1-FS2', 'B1-G1', 'B1-G2', 'C1-A1', 'C1-B1', 'C1-C1', 'C1-D1', 'C1-E1', 'C1-G1', 'C1-G2', 'D1-A', 'D1-A1', 'D1-B1', 'D1-C1', 'D1-D', 'D1-D1', 'D1-E2', 'D1-FS2', 'D1-G1', 'E1-B1', 'E1-G1', 'E2-B1', 'E2-C1', 'E2-D1', 'E2-FS2', 'E2-G2', 'G1-A1', 'G1-B1', 'G1-C1', 'G1-D', 'G1-D1'];
const EIGHTH_NOTEINTERVALS_EASY_GMajor = [2,2,2,2,2,2, 4,4,4,4,4,4,4, 5,5,5,5,5,5,5, 7,7,7,7,7,7,7,7,7, -3,-3, 9,9,9,9,9, 0,0,0,0,0];
const EIGHTH_NOTES_HARD_GMajor = ['A1-A1', 'A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-G1', 'B1-A1', 'B1-C1', 'B1-D1', 'B1-E1', 'B1-FS2', 'B1-G1', 'B1-G2', 'C1-A1', 'C1-B1', 'C1-C1', 'C1-D1', 'C1-E1', 'C1-G1', 'C1-G2', 'D1-A', 'D1-A1', 'D1-B1', 'D1-C1', 'D1-D', 'D1-D1', 'D1-E2', 'D1-FS2', 'D1-G1', 'E1-B1', 'E1-G1', 'E2-B1', 'E2-C1', 'E2-D1', 'E2-FS2', 'E2-G2', 'G1-A1', 'G1-B1', 'G1-C1', 'G1-D', 'G1-D1', 'r-A1', 'r-B1', 'r-C1', 'r-D', 'r-D1', 'r-E1', 'r-G1'];
const EIGHTH_NOTEINTERVALS_HARD_GMajor = [2,2,2,2,2,2,2, 4,4,4,4,4,4,4, 5,5,5,5,5,5,5, 7,7,7,7,7,7,7,7,7, -3,-3, 9,9,9,9,9, 0,0,0,0,0, 2,4,5,-5,7,-3,0];

const NOTES_Aminor = ['A', 'D', 'E1', 'F1', 'GS1', 'A1', 'B1', 'C1', 'D1', 'E2', 'F2'];
const NOTEINTERVALS_Aminor = [-12, -7, -5, -4, -1, 0, 2, 3, 5, 7, 8];
const CADENCENOTES_Aminor = ['GS1', 'B1'];
const CADENCEINTERVALS_Aminor = [-1, 2];
const STARTNOTES_Aminor = ['A1'];
const STARTINTERVALS_Aminor = [0];
const EIGHTH_NOTES_EASY_Aminor = ['A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-GS1', 'B1-A1', 'B1-C1', 'B1-D1', 'B1-G1', 'B1-GS1', 'C1-A1', 'C1-B1', 'C1-D1', 'C1-G1', 'D1-A1', 'D1-B1', 'D1-C1', 'D1-GS1', 'E1-B1', 'E1-F1', 'E1-GS1', 'F1-A1', 'F1-C1', 'F1-D', 'GS1-A1', 'GS1-B1', 'GS1-D1', 'GS1-E1'];
const EIGHTH_NOTEINTERVALS_EASY_Aminor = [0,0,0,0,0,0, 2,2,2,2,2, 3,3,3,3, 5,5,5,5, -5,-5,-5, -4,-4,-4, -1,-1,-1,-1];
const EIGHTH_NOTES_HARD_Aminor = ['A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-GS1', 'B1-A1', 'B1-C1', 'B1-D1', 'B1-G1', 'B1-GS1', 'C1-A1', 'C1-B1', 'C1-D1', 'C1-G1', 'D1-A1', 'D1-B1', 'D1-C1', 'D1-GS1', 'E1-B1', 'E1-F1', 'E1-GS1', 'F1-A1', 'F1-C1', 'F1-D', 'GS1-A1', 'GS1-B1', 'GS1-D1', 'GS1-E1', 'r-A1', 'r-B1', 'r-C1', 'r-D', 'r-D1', 'r-E1', 'r-F1'];
const EIGHTH_NOTEINTERVALS_HARD_Aminor = [0,0,0,0,0,0, 2,2,2,2,2, 3,3,3,3, 5,5,5,5, -5,-5,-5, -4,-4,-4, -1,-1,-1,-1, 0,2,3,-7,5,-5,-4];

const NOTES_Dminor = ['D', 'E1', 'F1', 'G1', 'A1', 'Bb1', 'CS1', 'D1', 'E2', 'F2'];
const NOTEINTERVALS_Dminor = [-12, -10, -9, -7, -5, -4, -1, 0, 2, 3];
const CADENCENOTES_Dminor = ['A1', 'CS1', 'E2'];
const CADENCEINTERVALS_Dminor = [-5, -1, 2];
const STARTNOTES_Dminor = ['D', 'D1'];
const STARTINTERVALS_Dminor = [-12, 0];
const EIGHTH_NOTES_EASY_Dminor = ['A1-Bb1', 'A1-CS1', 'A1-D', 'A1-D1', 'A1-F1', 'Bb1-A1', 'Bb1-CS1', 'Bb1-G1', 'CS1-A1', 'CS1-Bb1', 'CS1-D', 'CS1-E2', 'D1-A1', 'D1-CS1', 'D1-G1', 'E1-Bb1', 'E1-F1', 'E1-G1', 'E2-CS1', 'F1-A1', 'F1-C1', 'F1-D', 'F1-G1', 'G1-Bb1', 'G1-C1', 'G1-D', 'G1-D1', 'G1-F1'];
const EIGHTH_NOTEINTERVALS_EASY_Dminor = [-5,-5,-5,-5,-5, -4,-4,-4, -1,-1,-1,-1, 0,0,0, -10,-10,-10, 2, -9,-9,-9,-9, -7,-7,-7,-7,-7];
const EIGHTH_NOTES_HARD_Dminor = ['A1-Bb1', 'A1-CS1', 'A1-D', 'A1-D1', 'A1-F1', 'Bb1-A1', 'Bb1-CS1', 'Bb1-G1', 'CS1-A1', 'CS1-Bb1', 'CS1-D', 'CS1-E2', 'D1-A1', 'D1-CS1', 'D1-G1', 'E1-Bb1', 'E1-F1', 'E1-G1', 'E2-CS1', 'F1-A1', 'F1-C1', 'F1-D', 'F1-G1', 'G1-Bb1', 'G1-C1', 'G1-D', 'G1-D1', 'G1-F1', 'r-A1', 'r-Bb1', 'r-CS1', 'r-D', 'r-D1', 'r-E1', 'r-F1', 'r-G1'];
const EIGHTH_NOTEINTERVALS_HARD_Dminor = [-5,-5,-5,-5,-5, -4,-4,-4, -1,-1,-1,-1, 0,0,0, -10,-10,-10, 2, -9,-9,-9,-9, -7,-7,-7,-7,-7, -5,-4,-1,-12,0,-10,-9,-7];

const NOTES_Gminor = ['D', 'G1', 'A1', 'Bb1', 'C1', 'D1', 'E2', 'F2', 'FS2', 'G2'];
const NOTEINTERVALS_Gminor = [-5, 0, 2, 3, 5, 7, 9, 10, 11, 12];
const CADENCENOTES_Gminor = ['D1', 'FS2'];
const CADENCEINTERVALS_Gminor = [7, 11];
const STARTNOTES_Gminor = ['G1'];
const STARTINTERVALS_Gminor = [0];
const EIGHTH_NOTES_EASY_Gminor = ['A1-A1', 'A1-Bb1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-G1', 'Bb1-A1', 'Bb1-C', 'Bb1-G1', 'C1-A1', 'C1-Bb1', 'C1-C1', 'C1-D1', 'C1-E1', 'C1-G1', 'C1-G2', 'D1-A', 'D1-A1', 'D1-C1', 'D1-D', 'D1-D1', 'D1-E2', 'D1-FS2', 'D1-G1', 'E2-C1', 'E2-D1', 'E2-FS2', 'G1-A1', 'G1-Bb1', 'G1-C1', 'G1-D', 'G1-D1'];
const EIGHTH_NOTEINTERVALS_EASY_Gminor = [2,2,2,2,2,2,2, 3,3,3, 5,5,5,5,5,5,5, 7,7,7,7,7,7,7,7, 9,9,9, 0,0,0,0,0];
const EIGHTH_NOTES_HARD_Gminor = ['A1-A1', 'A1-Bb1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-G1', 'Bb1-A1', 'Bb1-C', 'Bb1-G1', 'C1-A1', 'C1-Bb1', 'C1-C1', 'C1-D1', 'C1-E1', 'C1-G1', 'C1-G2', 'D1-A', 'D1-A1', 'D1-C1', 'D1-D', 'D1-D1', 'D1-E2', 'D1-FS2', 'D1-G1', 'E2-C1', 'E2-D1', 'E2-FS2', 'G1-A1', 'G1-Bb1', 'G1-C1', 'G1-D', 'G1-D1', 'r-A1', 'r-Bb1', 'r-C1', 'r-D', 'r-D1', 'r-G1'];
const EIGHTH_NOTEINTERVALS_HARD_Gminor = [2,2,2,2,2,2,2, 3,3,3, 5,5,5,5,5,5,5, 7,7,7,7,7,7,7,7, 9,9,9, 0,0,0,0,0, 2,3,5,-5,7,0];

// --- Per-key folder layout config ---
// Each key defines the folder paths used to build image URLs.
// Most keys follow the "standard" structure; G major 4-4 uses shorter names.
const KEY_FOLDERS = {
  'C major': {
    dir: 'C major',
    tonic: 'C1',
    '3-4': {
      internal:    'Internal Notes',
      int1:        'Internal 1 beat',
      int2:        'Internal 2 beats',
      eighthsEasy: 'Internal-Pair of Eighths -Easier',
      eighthsHard: 'Internal-Pair of Eighths-Harder',
      barlines:    'notes with barlines',
      breakPt:     'Break Point Measure',
      finalDir:    'Final Measure',
      finalNote:   'Final Note',
      penultimate: 'Penultimate Cadence note',
      start:       'Start measure notes',
    },
    '4-4': {
      internal:    'Internal Notes',
      int1:        'Internal 1 beat',
      int2:        'Internal 2 beats',
      eighthsEasy: 'Internal-Pair of Eighths -Easier',
      eighthsHard: 'Internal-Pair of Eighths-Harder',
      barlines:    'notes with barlines',
      breakPt:     'Break Point Measure',
      finalDir:    'Final Measure',
      finalNote:   'Final Note',
      penultimate: 'Penultimate Cadence note',
      start:       'Start measure notes',
    },
  },
  'D major': {
    dir: 'D major',
    tonic: 'D1',
    '3-4': {
      internal:    'Internal Notes',
      int1:        'Internal 1 beat',
      int2:        'Internal 2 beats',
      eighthsEasy: 'Internal Pair of Eighths - Easier',
      eighthsHard: 'Internal Pair of Eighths - Harder',
      barlines:    'notes with barlines',
      breakPt:     'Break Point Measure',
      finalDir:    'Final Measure',
      finalNote:   'Final Note',
      penultimate: 'Penultimate Cadence note',
      start:       'Start measure notes',
    },
    '4-4': {
      internal:    'Internal Notes',
      int1:        'Internal 1 beat',
      int2:        'Internal 2 beats',
      eighthsEasy: 'Internal Pair of Eighths - Easier',
      eighthsHard: 'Internal Pair of Eighths - Harder',
      barlines:    'notes with barlines',
      breakPt:     'Break Point Measure',
      finalDir:    'Final Measure',
      finalNote:   'Final Note',
      penultimate: 'Penultimate Cadence note',
      start:       'Start measure notes',
    },
  },
  'F major': {
    dir: 'F major',
    tonic: 'F1',
    '3-4': {
      internal:    'Internal Notes',
      int1:        'Internal 1 beat',
      int2:        'Internal 2 beats',
      eighthsEasy: 'Internal-Pair of Eighths-Easier',
      eighthsHard: 'Internal-Pair of Eighths-Harder',
      barlines:    'notes with barlines',
      breakPt:     'Break Point Measure',
      finalDir:    'Final Measure',
      finalNote:   'Final Notes',
      penultimate: 'Penultimate Cadence note',
      start:       'Start measure notes',
    },
    '4-4': {
      internal:    'Internal Notes',
      int1:        'Internal 1 beat',
      int2:        'Internal 2 beats',
      eighthsEasy: 'Internal-Pair of Eighths-Easier',
      eighthsHard: 'Internal-Pair of Eighths-Harder',
      barlines:    'notes with barlines',
      breakPt:     'Break Point Measure',
      finalDir:    'Final Measure',
      finalNote:   'Final Notes',
      penultimate: 'Penultimate Cadence note',
      start:       'Start measure notes',
    },
  },
  'G major': {
    dir: 'G major',
    tonic: 'G1',
    '3-4': {
      internal:    'Internal Notes',
      int1:        'Internal 1 beat',
      int2:        'Internal 2 beats',
      eighthsEasy: 'Internal Pair of Eighths - Easier',
      eighthsHard: 'Internal Pair of Eighths - Harder',
      barlines:    'notes with barlines',
      breakPt:     'Break Point Measure',
      finalDir:    'Final measure',
      finalNote:   'Final Note',
      penultimate: 'Penultimate Cadence note',
      start:       'Start measure notes',
    },
    '4-4': {
      // G major 4-4 uses shorter top-level folder names
      internal:    'Internal',
      int1:        'Internal 1 beat',
      int2:        'Internal 2 beats',
      eighthsEasy: 'Internal Pair of Eighths - Easier',
      eighthsHard: 'Internal Pair of Eighths - Harder',
      barlines:    'barlines',
      breakPt:     'Break',
      finalDir:    'Final',
      finalNote:   'Final Note',
      penultimate: 'Penultimate Cadence note',
      start:       'Start',
    },
  },
  'A minor': {
    dir: 'A minor',
    tonic: 'A1',
    '3-4': {
      internal:    'Internal Notes',
      int1:        'Internal 1 beat',
      int2:        'Internal 2 beats',
      eighthsEasy: 'Internal-Pair of Eighths-Easier',
      eighthsHard: 'Internal-Pair of Eighths-Harder',
      barlines:    'notes with barlines',
      breakPt:     'Break Point Measure',
      finalDir:    'Final Measure',
      finalNote:   'Final Note',
      penultimate: 'Penultimate Cadence note',
      start:       'Start measure notes',
    },
    '4-4': {
      internal:    'Internal Notes',
      int1:        'Internal 1 beat',
      int2:        'Internal 2 beats',
      eighthsEasy: 'Internal-Pair of Eighths-Easier',
      eighthsHard: 'Internal-Pair of Eighths-Harder',
      barlines:    'notes with barlines',
      breakPt:     'Break Point Measure',
      finalDir:    'Final Measure',
      finalNote:   'Final Note',
      penultimate: 'Penultimate Cadence note',
      start:       'Start measure notes',
    },
  },
  'D minor': {
    dir: 'D minor',
    tonic: 'D1',
    '3-4': {
      internal:    'Internal Notes',
      int1:        'Internal 1 beat',
      int2:        'Internal 2 beats',
      eighthsEasy: 'Internal-Pair of Eighths-Easier',
      eighthsHard: 'Internal-Pair of Eighths-Harder',
      barlines:    'notes with barlines',
      breakPt:     'Break Point Measure',
      finalDir:    'Final Measure',
      finalNote:   'Final Note',
      penultimate: 'Penultimate Cadence note',
      start:       'Start measure notes',
    },
    '4-4': {
      internal:    'Internal Notes',
      int1:        'Internal 1 beat',
      int2:        'Internal 2 beats',
      eighthsEasy: 'Internal-Pair of Eighths-Easier',
      eighthsHard: 'Internal-Pair of Eighths-Harder',
      barlines:    'notes with barlines',
      breakPt:     'Break Point Measure',
      finalDir:    'Final Measure',
      finalNote:   'Final Note',
      penultimate: 'Penultimate Cadence note',
      start:       'Start measure notes',
    },
  },
  'G minor': {
    dir: 'G minor',
    tonic: 'G2',
    '3-4': {
      internal:    'Internal Notes',
      int1:        'Internal 1 beat',
      int2:        'Internal 2 beats',
      eighthsEasy: 'Internal Pair of Eighths - Easier',
      eighthsHard: 'Internal Pair of Eighths - Harder',
      barlines:    'notes with barlines',
      breakPt:     'Break Point Measure',
      finalDir:    'Final measure',
      finalNote:   'Final Note',
      penultimate: 'Penultimate Cadence note',
      start:       'Start measure notes',
    },
    '4-4': {
      internal:    'Internal Notes',
      int1:        'Internal 1 beat',
      int2:        'Internal 2 beats',
      eighthsEasy: 'Internal Pair of Eighths - Easier',
      eighthsHard: 'Internal Pair of Eighths - Harder',
      barlines:    'notes with barlines',
      breakPt:     'Break Point Measure',
      finalDir:    'Final measure',
      finalNote:   'Final Note',
      penultimate: 'Penultimate Cadence note',
      start:       'Start measure notes',
    },
  },
};

// Leading tone → resolution targets (tonic and/or 5th) for each key
const LEADING_TONE_RESOLUTIONS = {
  'C major':  { leadingTone: 'B1',  resolvesTo: ['C1', 'G1'] },
  'D major':  { leadingTone: 'CS1', resolvesTo: ['D1', 'A1'] },
  'F major':  { leadingTone: 'E1',  resolvesTo: ['F1', 'C1'] },
  'G major':  { leadingTone: 'FS2', resolvesTo: ['G1', 'G2', 'D1'] },
  'A minor':  { leadingTone: 'GS1', resolvesTo: ['A1', 'E1', 'E2'] },
  'D minor':  { leadingTone: 'CS1', resolvesTo: ['D1', 'A1'] },
  'G minor':  { leadingTone: 'FS2', resolvesTo: ['G1', 'G2', 'D1'] },
};

// Check if an eighth-note pair is valid (leading tone as first note must resolve)
function isValidEighthPair(pair) {
  const res = LEADING_TONE_RESOLUTIONS[CURRENT_KEY];
  if (!res) return true;
  const parts = pair.split('-');
  if (parts[0] === res.leadingTone && !res.resolvesTo.includes(parts[1])) return false;
  return true;
}

// Returns the max available break-point duration for a given key/meter.
// Most keys only have 1- and 2-beat break folders; some have 3- or 4-beat variants.
function getMaxBreakDuration(keyFolders, meter, totalBeats) {
  const key = keyFolders.dir;
  if (meter === '4-4') {
    if (key === 'A minor' || key === 'G minor') return 4; // has "4 beats with barline"
    if (key === 'D minor') return 3;
    return 2;
  } else { // 3-4
    if (key === 'G major') return 3; // has "3 Beats with barline"
    return 2;
  }
}

// Build path for a break-point note (starts a new phrase after a phrase break)
function buildBreakPath(keyFolders, meter, note, duration) {
  const f = keyFolders[meter];
  const maxBreak = getMaxBreakDuration(keyFolders, meter, meter === '3-4' ? 3 : 4);
  const clampedDur = Math.min(duration, maxBreak);

  let beatFolder;
  if (clampedDur === 4) {
    beatFolder = '4 beats with barline';
  } else if (clampedDur === 3 && keyFolders.dir === 'G major' && meter === '3-4') {
    beatFolder = '3 Beats with barline';
  } else {
    beatFolder = clampedDur === 1 ? '1 beat' : `${clampedDur} beats`;
  }

  const fileName = clampedDur === 4
    ? `BP-${note}-4 -BL.jpg`
    : clampedDur === 3 && keyFolders.dir === 'G major' && meter === '3-4'
      ? `BP-${note}-3 BL.jpg`
      : `BP-${note}-${clampedDur}.jpg`;

  return `images/${keyFolders.dir}/${meter} meter/${f.breakPt}/${beatFolder}/${fileName}`;
}

// Build path for an internal (non-barline, non-break) note
function buildInternalPath(keyFolders, meter, note, duration) {
  const f = keyFolders[meter];
  const intFolder = duration === 1 ? f.int1 : f.int2;
  // G major 4-4 internal 1-beat files have no duration suffix (e.g. 'A1.jpg' not 'A1-1.jpg')
  if (keyFolders.dir === 'G major' && meter === '4-4' && duration === 1) {
    return `images/${keyFolders.dir}/${meter} meter/${f.internal}/${intFolder}/${note}.jpg`;
  }
  // Bb1 internal 1-beat files are stored without the octave suffix (e.g. 'Bb-1.jpg' not 'Bb1-1.jpg')
  const effectiveNote = (note === 'Bb1' && duration === 1) ? 'Bb' : note;
  return `images/${keyFolders.dir}/${meter} meter/${f.internal}/${intFolder}/${effectiveNote}-${duration}.jpg`;
}

// Build path for a note at a barline (end of a measure)
function buildBarlinePath(keyFolders, meter, note, duration) {
  const f = keyFolders[meter];
  const beatFolder = duration === 1 ? '1 beat' : duration === 2 ? '2 beats' : duration === 3 ? '3 beats' : '4 beats';
  return `images/${keyFolders.dir}/${meter} meter/${f.barlines}/${beatFolder}/BL-${note}-${duration}.jpg`;
}

// Build path for a pair-of-eighths note
function buildEighthsPath(keyFolders, meter, pair, isDifficultyHard) {
  const f = keyFolders[meter];
  const eighthsFolder = isDifficultyHard ? f.eighthsHard : f.eighthsEasy;
  return `images/${keyFolders.dir}/${meter} meter/${f.internal}/${eighthsFolder}/${pair}.jpg`;
}

// Build path for the start-measure note
function buildStartPath(keyFolders, meter, note, startDuration) {
  const f = keyFolders[meter];
  return `images/${keyFolders.dir}/${meter} meter/${f.start}/${startDuration}/${note}.jpg`;
}

// Build path for a penultimate cadence note
function buildPenultimatePath(keyFolders, meter, note, duration) {
  const f = keyFolders[meter];
  const beatFolder = duration === 1 ? '1 beat' : '2 beat';
  return `images/${keyFolders.dir}/${meter} meter/${f.finalDir}/${f.penultimate}/${beatFolder}/${note}-${duration}.jpg`;
}

// Build path for the final note image
function buildFinalNotePath(keyFolders, meter, duration) {
  const f = keyFolders[meter];
  const tonic = keyFolders.tonic;
  return `images/${keyFolders.dir}/${meter} meter/${f.finalDir}/${f.finalNote}/E-${tonic}-${duration}.jpg`;
}


function getRandom(arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
}

function getRandomNote(notes, intervals, previousNote, maxInterval = 5) {
  let note, interval;
  let attempts = 0;
  const maxAttempts = 1000;
  do {
    const index = Math.round(Math.random() * (notes.length - 1));
    note = notes[index];
    interval = intervals[index];
    attempts++;
    if (attempts >= maxAttempts) {
      break;
    }
  } while (
    previousNote !== null && (
      Math.abs(interval - NOTEINTERVALS[NOTES.indexOf(previousNote)]) > maxInterval ||
      (note === previousNote && Math.random() < 0.5) // 50% chance to reject the same note as previous, to encourage more variety
    )
  );
  return note;
}


function generateMeasureImages(isFirst, isBreak, beats, meter) {
  const measure = [];
  let remaining = beats;
  const keyFolders = KEY_FOLDERS[CURRENT_KEY];

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
      duration = getRandom([...Array(noteMax).keys()].map(i => i + 1));
    } while (duration === 3); // Prevent duration of 3

    // Check if previous note was a leading tone requiring resolution
    const ltRes = LEADING_TONE_RESOLUTIONS[CURRENT_KEY];
    const mustResolve = ltRes && previousNote === ltRes.leadingTone;

    let note;
    if (mustResolve) {
      // Leading tone must resolve to tonic or 5th
      note = getRandom(ltRes.resolvesTo);
    } else {
      do {
        note = getRandomNote(NOTES, NOTEINTERVALS, previousNote);
      } while (accidentalFlag && (note.includes('S') || note.includes('b') || (CURRENT_KEY === 'G minor' && note === 'F2')));

      if (remaining > 1 && !isFirst && !isBreak && duration === 1 && !accidentalFlag && difficulty === 'easy' && Math.random() < 0.5) {
        const eighthPair = getRandomNote(EIGHTH_NOTES_EASY, EIGHTH_NOTEINTERVALS_EASY, previousNote, 4);
        if (isValidEighthPair(eighthPair)) {
          note = eighthPair;
          isEighth = true;
        }
      } else if (remaining > 1 && !isFirst && !isBreak && duration === 1 && !accidentalFlag && difficulty === 'hard' && Math.random() < 0.5) {
        const eighthPair = getRandomNote(EIGHTH_NOTES_HARD, EIGHTH_NOTEINTERVALS_HARD, previousNote, 4);
        if (isValidEighthPair(eighthPair)) {
          note = eighthPair;
          isEighth = true;
        }
      }
    }

    if (note.includes('S') || note.includes('b') || (CURRENT_KEY === 'G minor' && note === 'F2')) {
      accidentalFlag = true;
    }

    let path;
    const isLastNote = remaining === duration;

    if (isFirst && measure.length === 0) {
      // First note of first measure: use start folder
      const startNote = getRandomNote(STARTNOTES, STARTINTERVALS, null);
      path = buildStartPath(keyFolders, meter, startNote, duration);
      note = startNote;
      isEighth = false;
    } else if (isBreak && measure.length === 0) {
      // First note of break measure
      path = buildBreakPath(keyFolders, meter, note, duration);
    } else if (isLastNote) {
      // Last note of any measure gets a barline
      if (isEighth) {
        // Eighth pair at barline — use barline path for the pair's leading note
        path = buildBarlinePath(keyFolders, meter, note, duration);
        isEighth = false; // treat as barline
      } else {
        path = buildBarlinePath(keyFolders, meter, note, duration);
      }
    } else if (isEighth) {
      path = buildEighthsPath(keyFolders, meter, note, difficulty === 'hard');
    } else {
      path = buildInternalPath(keyFolders, meter, note, duration);
    }

    measure.push(path);
    previousNote = note;
    if (previousNote.includes('-')) {
      previousNote = note.substring(note.indexOf('-') + 1);
    }
    remaining -= duration;
  }

  accidentalFlag = false; // Reset accidental flag after each measure
  return measure;
}


function generateLastMeasureImage(beats, meter) {
  const measure = [];
  const keyFolders = KEY_FOLDERS[CURRENT_KEY];

  let firstDuration = getRandom([0, 1]);
  if (beats === 4) {
    firstDuration = getRandom([1, 2]);
  }

  if (firstDuration > 0) {
    const ltRes = LEADING_TONE_RESOLUTIONS[CURRENT_KEY];
    const mustResolve = ltRes && previousNote === ltRes.leadingTone;
    const firstNote = mustResolve ? getRandom(ltRes.resolvesTo) : getRandomNote(NOTES, NOTEINTERVALS, previousNote);
    if (firstNote.includes('S') || firstNote.includes('b') || (CURRENT_KEY === 'G minor' && firstNote === 'F2')) {
      accidentalFlag = true;
    }
    const path = buildInternalPath(keyFolders, meter, firstNote, firstDuration);
    previousNote = firstNote;
    measure.push(path);
  }

  let secondDuration = beats - firstDuration - 1;
  secondDuration = getRandom([...Array(secondDuration).keys()].map(i => i + 1));
  let secondNote;
  do {
    secondNote = getRandomNote(CADENCENOTES, CADENCEINTERVALS, previousNote);
  } while (accidentalFlag && (secondNote.includes('S') || secondNote.includes('b') || (CURRENT_KEY === 'G minor' && secondNote === 'F2')));
  measure.push(buildPenultimatePath(keyFolders, meter, secondNote, secondDuration));

  const lastDuration = beats - firstDuration - secondDuration;
  measure.push(buildFinalNotePath(keyFolders, meter, lastDuration));

  accidentalFlag = false;
  return measure;
}

function selectKey(key) {
  switch (key) {
    case 'C major':
      NOTES = NOTES_CMajor;
      NOTEINTERVALS = NOTEINTERVALS_CMajor;
      CADENCENOTES = CADENCENOTES_CMajor;
      CADENCEINTERVALS = CADENCEINTERVALS_CMajor;
      STARTNOTES = STARTNOTES_CMajor;
      STARTINTERVALS = STARTINTERVALS_CMajor;
      EIGHTH_NOTES_EASY = EIGHTH_NOTES_EASY_CMajor;
      EIGHTH_NOTEINTERVALS_EASY = EIGHTH_NOTEINTERVALS_EASY_CMajor;
      EIGHTH_NOTES_HARD = EIGHTH_NOTES_HARD_CMajor;
      EIGHTH_NOTEINTERVALS_HARD = EIGHTH_NOTEINTERVALS_HARD_CMajor;
      CURRENT_KEY = 'C major';
      break;
    case 'D major':
      NOTES = NOTES_DMajor;
      NOTEINTERVALS = NOTEINTERVALS_DMajor;
      CADENCENOTES = CADENCENOTES_DMajor;
      CADENCEINTERVALS = CADENCEINTERVALS_DMajor;
      STARTNOTES = STARTNOTES_DMajor;
      STARTINTERVALS = STARTINTERVALS_DMajor;
      EIGHTH_NOTES_EASY = EIGHTH_NOTES_EASY_DMajor;
      EIGHTH_NOTEINTERVALS_EASY = EIGHTH_NOTEINTERVALS_EASY_DMajor;
      EIGHTH_NOTES_HARD = EIGHTH_NOTES_HARD_DMajor;
      EIGHTH_NOTEINTERVALS_HARD = EIGHTH_NOTEINTERVALS_HARD_DMajor;
      CURRENT_KEY = 'D major';
      break;
    case 'F major':
      NOTES = NOTES_FMajor;
      NOTEINTERVALS = NOTEINTERVALS_FMajor;
      CADENCENOTES = CADENCENOTES_FMajor;
      CADENCEINTERVALS = CADENCEINTERVALS_FMajor;
      STARTNOTES = STARTNOTES_FMajor;
      STARTINTERVALS = STARTINTERVALS_FMajor;
      EIGHTH_NOTES_EASY = EIGHTH_NOTES_EASY_FMajor;
      EIGHTH_NOTEINTERVALS_EASY = EIGHTH_NOTEINTERVALS_EASY_FMajor;
      EIGHTH_NOTES_HARD = EIGHTH_NOTES_HARD_FMajor;
      EIGHTH_NOTEINTERVALS_HARD = EIGHTH_NOTEINTERVALS_HARD_FMajor;
      CURRENT_KEY = 'F major';
      break;
    case 'G major':
      NOTES = NOTES_GMajor;
      NOTEINTERVALS = NOTEINTERVALS_GMajor;
      CADENCENOTES = CADENCENOTES_GMajor;
      CADENCEINTERVALS = CADENCEINTERVALS_GMajor;
      STARTNOTES = STARTNOTES_GMajor;
      STARTINTERVALS = STARTINTERVALS_GMajor;
      EIGHTH_NOTES_EASY = EIGHTH_NOTES_EASY_GMajor;
      EIGHTH_NOTEINTERVALS_EASY = EIGHTH_NOTEINTERVALS_EASY_GMajor;
      EIGHTH_NOTES_HARD = EIGHTH_NOTES_HARD_GMajor;
      EIGHTH_NOTEINTERVALS_HARD = EIGHTH_NOTEINTERVALS_HARD_GMajor;
      CURRENT_KEY = 'G major';
      break;
    case 'A minor':
      NOTES = NOTES_Aminor;
      NOTEINTERVALS = NOTEINTERVALS_Aminor;
      CADENCENOTES = CADENCENOTES_Aminor;
      CADENCEINTERVALS = CADENCEINTERVALS_Aminor;
      STARTNOTES = STARTNOTES_Aminor;
      STARTINTERVALS = STARTINTERVALS_Aminor;
      EIGHTH_NOTES_EASY = EIGHTH_NOTES_EASY_Aminor;
      EIGHTH_NOTEINTERVALS_EASY = EIGHTH_NOTEINTERVALS_EASY_Aminor;
      EIGHTH_NOTES_HARD = EIGHTH_NOTES_HARD_Aminor;
      EIGHTH_NOTEINTERVALS_HARD = EIGHTH_NOTEINTERVALS_HARD_Aminor;
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
      EIGHTH_NOTEINTERVALS_EASY = EIGHTH_NOTEINTERVALS_EASY_Dminor;
      EIGHTH_NOTES_HARD = EIGHTH_NOTES_HARD_Dminor;
      EIGHTH_NOTEINTERVALS_HARD = EIGHTH_NOTEINTERVALS_HARD_Dminor;
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
      EIGHTH_NOTEINTERVALS_EASY = EIGHTH_NOTEINTERVALS_EASY_Gminor;
      EIGHTH_NOTES_HARD = EIGHTH_NOTES_HARD_Gminor;
      EIGHTH_NOTEINTERVALS_HARD = EIGHTH_NOTEINTERVALS_HARD_Gminor;
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

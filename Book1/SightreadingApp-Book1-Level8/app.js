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
let CURRENT_KEY = 'C Major';
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
const EIGHTH_NOTES_EASY_DMajor = ['A1-A1', 'A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-G1', 'B1-A1', 'B1-C1', 'B1-CS1', 'B1-D1', 'B1-E1', 'B1-FS2', 'B1-G1', 'B1-G2', 'CS1-D1', 'CS1-E2', 'CS1-G1', 'CS1-G2', 'D1-A1', 'D1-B1', 'D1-D', 'D1-D1', 'D1-E2', 'D1-FS2', 'D1-G1', 'E1-B1', 'E1-G1', 'E2-B1', 'E2-C1', 'E2-CS1', 'E2-D1', 'E2-FS2', 'E2-G2', 'G1-A1', 'G1-B1', 'G1-CS1', 'G1-D', 'G1-D1', 'G1-F1'];
const EIGHTH_NOTEINTERVALS_EASY_DMajor = [-5, -5, -5, -5, -5, -5, -5, -3, -3, -3, -3, -3, -3, -3, -3, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -10, -10, 2, 2, 2, 2, 2, 2, -7, -7, -7, -7, -7, -7];
const EIGHTH_NOTES_HARD_DMajor = ['A1-A1', 'A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-G1', 'B1-A1', 'B1-C1', 'B1-CS1', 'B1-D1', 'B1-E1', 'B1-FS2', 'B1-G1', 'B1-G2', 'CS1-D1', 'CS1-E2', 'CS1-G1', 'CS1-G2', 'D1-A1', 'D1-B1', 'D1-D', 'D1-D1', 'D1-E2', 'D1-FS2', 'D1-G1', 'E1-B1', 'E1-G1', 'E2-B1', 'E2-C1', 'E2-CS1', 'E2-D1', 'E2-FS2', 'E2-G2', 'G1-A1', 'G1-B1', 'G1-CS1', 'G1-D', 'G1-D1', 'G1-F1', 'r-A1', 'r-B1', 'r-C1', 'r-D', 'r-D1', 'r-E1', 'r-G1'];
const EIGHTH_NOTEINTERVALS_HARD_DMajor = [-5, -5, -5, -5, -5, -5, -5, -3, -3, -3, -3, -3, -3, -3, -3, -1, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, -10, -10, 2, 2, 2, 2, 2, 2, -7, -7, -7, -7, -7, -7, -5, -3, -2, -12, 0, -10, -7];

const NOTES_FMajor = ['D', 'E1', 'F1', 'G1', 'A1', 'Bb1', 'C1', 'D1', 'E2', 'F2', 'G2'];
const NOTEINTERVALS_FMajor = [-3, -1, 0, 2, 4, 5, 7, 9, 11, 12, 14];
const CADENCENOTES_FMajor = ['E1', 'G1', 'C1'];
const CADENCEINTERVALS_FMajor = [-1, 2, 7];
const STARTNOTES_FMajor = ['F1'];
const STARTINTERVALS_FMajor = [0];
const EIGHTH_NOTES_EASY_FMajor = ['A1-Bb1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'Bb1-A1', 'Bb1-C1', 'Bb1-G1', 'C1-A1', 'C1-Bb1', 'C1-D1', 'C1-G1', 'D1-A1', 'D1-C1', 'D1-G1', 'E1-Bb1', 'E1-F1', 'E1-G1', 'F1-A1', 'F1-C1', 'F1-D', 'F1-G1', 'G1-Bb1', 'G1-C1', 'G1-D', 'G1-D1', 'G1-F1'];
const EIGHTH_NOTEINTERVALS_EASY_FMajor = [4, 4, 4, 4, 4, 5, 5, 5, 7, 7, 7, 7, 9, 9, 9, -1, -1, -1, 0, 0, 0, 0, 2, 2, 2, 2, 2];
const EIGHTH_NOTES_HARD_FMajor = ['A1-Bb1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'Bb1-A1', 'Bb1-C1', 'Bb1-G1', 'C1-A1', 'C1-Bb1', 'C1-D1', 'C1-G1', 'D1-A1', 'D1-C1', 'D1-G1', 'E1-Bb1', 'E1-F1', 'E1-G1', 'F1-A1', 'F1-C1', 'F1-D', 'F1-G1', 'G1-Bb1', 'G1-C1', 'G1-D', 'G1-D1', 'G1-F1', 'r-A1', 'r-Bb1', 'r-C1', 'r-D', 'r-D1', 'r-E1', 'r-F1', 'r-G1'];
const EIGHTH_NOTEINTERVALS_HARD_FMajor = [4, 4, 4, 4, 4, 5, 5, 5, 7, 7, 7, 7, 9, 9, 9, -1, -1, -1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 4, 5, 7, -3, 9, -1, 0, 2];

const NOTES_GMajor = ['D', 'G1', 'A1', 'B1', 'C1', 'D1', 'E2', 'FS2', 'G2'];
const NOTEINTERVALS_GMajor = [-5, 0, 2, 4, 5, 7, 9, 11, 12];
const CADENCENOTES_GMajor = ['D', 'A1'];
const CADENCEINTERVALS_GMajor = [-5, 2];
const STARTNOTES_GMajor = ['G1'];
const STARTINTERVALS_GMajor = [0];
const EIGHTH_NOTES_EASY_GMajor = ['A1-A1', 'A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-G1', 'B1-A1', 'B1-C1', 'B1-D1', 'B1-E1', 'B1-FS2', 'B1-G1', 'B1-G2', 'C1-A1', 'C1-B1', 'C1-C1', 'C1-D1', 'C1-E1', 'C1-G1', 'C1-G2', 'D1-A', 'D1-A1', 'D1-B1', 'D1-C1', 'D1-D', 'D1-D1', 'D1-E2', 'D1-FS2', 'D1-G1', 'E1-B1', 'E1-G1', 'E2-B1', 'E2-C1', 'E2-D1', 'E2-FS2', 'E2-G2', 'G1-A1', 'G1-B1', 'G1-C1', 'G1-D', 'G1-D1'];
const EIGHTH_NOTEINTERVALS_EASY_GMajor = [2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7, -2, -2, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0];
const EIGHTH_NOTES_HARD_GMajor = ['A1-A1', 'A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-G1', 'B1-A1', 'B1-C1', 'B1-D1', 'B1-E1', 'B1-FS2', 'B1-G1', 'B1-G2', 'C1-A1', 'C1-B1', 'C1-C1', 'C1-D1', 'C1-E1', 'C1-G1', 'C1-G2', 'D1-A', 'D1-A1', 'D1-B1', 'D1-C1', 'D1-D', 'D1-D1', 'D1-E2', 'D1-FS2', 'D1-G1', 'E1-B1', 'E1-G1', 'E2-B1', 'E2-C1', 'E2-D1', 'E2-FS2', 'E2-G2', 'G1-A1', 'G1-B1', 'G1-C1', 'G1-D', 'G1-D1', 'r-A1', 'r-B1', 'r-C1', 'r-D', 'r-D1', 'r-E1', 'r-G1'];
const EIGHTH_NOTEINTERVALS_HARD_GMajor = [2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 7, 7, 7, 7, 7, 7, 7, 7, 7, -2, -2, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 2, 4, 5, -5, 7, -3, 0];

const NOTES_Aminor = ['A', 'D', 'GS1', 'A1', 'B1', 'C1', 'D1', 'E2', 'F2'];
const NOTEINTERVALS_Aminor = [-12, -7, -1, 0, 2, 3, 5, 7, 8];
const CADENCENOTES_Aminor = ['GS1', 'B1'];
const CADENCEINTERVALS_Aminor = [-1, 2];
const STARTNOTES_Aminor = ['A1'];
const STARTINTERVALS_Aminor = [0];
const EIGHTH_NOTES_EASY_Aminor = ['A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-GS1', 'B1-A1', 'B1-C1', 'B1-D1', 'B1-G1', 'B1-GS1', 'C1-A1', 'C1-B1', 'C1-D1', 'C1-G1', 'D1-A1', 'D1-B1', 'D1-C1', 'D1-GS1', 'E1-B1', 'E1-F1', 'E1-GS1', 'F1-A1', 'F1-C1', 'F1-D', 'GS1-A1', 'GS1-B1', 'GS1-D1', 'GS1-E1'];
const EIGHTH_NOTEINTERVALS_EASY_Aminor = ['0;2', '0;3', '0;-7', '0;5', '0;-4', '0;-1', '2;0', '2;3', '2;5', '2;-2', '2;-1', '3;0', '3;2', '3;5', '3;-2', '5;0', '5;2', '5;3', '5;-1', '-5;2', '-5;-4', '-5;-1', '-4;0', '-4;3', '-4;-7', '-1;0', '-1;2', '-1;5', '-1;7'];
const EIGHTH_NOTES_HARD_Aminor = ['A1-B1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-GS1', 'B1-A1', 'B1-C1', 'B1-D1', 'B1-G1', 'B1-GS1', 'C1-A1', 'C1-B1', 'C1-D1', 'C1-G1', 'D1-A1', 'D1-B1', 'D1-C1', 'D1-GS1', 'E1-B1', 'E1-F1', 'E1-GS1', 'F1-A1', 'F1-C1', 'F1-D', 'GS1-A1', 'GS1-B1', 'GS1-D1', 'GS1-E1', 'r-A1', 'r-B1', 'r-C1', 'r-D', 'r-D1', 'r-E1', 'r-F1'];
const EIGHTH_NOTEINTERVALS_HARD_Aminor = ['0;2', '0;3', '0;-7', '0;5', '0;-4', '0;-1', '2;0', '2;3', '2;5', '2;-2', '2;-1', '3;0', '3;2', '3;5', '3;-2', '5;0', '5;2', '5;3', '5;-1', '-5;2', '-5;-4', '-5;-1', '-4;0', '-4;3', '-4;-7', '-1;0', '-1;2', '-1;5', '-1;7', '0;0', '2;2', '3;3', '-7;-7', '5;5', '-4;-4', '-1;-1'];

const NOTES_Dminor = ['D', 'E1', 'F1', 'G1', 'A1', 'Bb1', 'CS1', 'D1', 'E2', 'F2'];
const NOTEINTERVALS_Dminor = [-12, -10, -9, -7, -5, -4, -1, 0, 2, 3];
const CADENCENOTES_Dminor = ['A1', 'CS1', 'E2'];
const CADENCEINTERVALS_Dminor = [-5, -1, 2];
const STARTNOTES_Dminor = ['D', 'D1'];
const STARTINTERVALS_Dminor = [-12, 0];
const EIGHTH_NOTES_EASY_Dminor = ['A1-Bb1', 'A1-CS1', 'A1-D', 'A1-D1', 'A1-F1', 'Bb1-A1', 'Bb1-CS1', 'Bb1-G1', 'CS1-A1', 'CS1-Bb1', 'CS1-D', 'CS1-E2', 'D1-A1', 'D1-CS1', 'D1-G1', 'E1-Bb1', 'E1-F1', 'E1-G1', 'E2-CS1', 'F1-A1', 'F1-C1', 'F1-D', 'F1-G1', 'G1-Bb1', 'G1-C1', 'G1-D', 'G1-D1', 'G1-F1'];
const EIGHTH_NOTEINTERVALS_EASY_Dminor = [-5, -5, -5, -5, -5, -4, -4, -4, -1, -1, -1, -1, 0, 0, 0, -10, -10, -10, 2, -9, -9, -9, -9, -7, -7, -7, -7, -7];
const EIGHTH_NOTES_HARD_Dminor = ['A1-Bb1', 'A1-CS1', 'A1-D', 'A1-D1', 'A1-F1', 'Bb1-A1', 'Bb1-CS1', 'Bb1-G1', 'CS1-A1', 'CS1-Bb1', 'CS1-D', 'CS1-E2', 'D1-A1', 'D1-CS1', 'D1-G1', 'E1-Bb1', 'E1-F1', 'E1-G1', 'E2-CS1', 'F1-A1', 'F1-C1', 'F1-D', 'F1-G1', 'G1-Bb1', 'G1-C1', 'G1-D', 'G1-D1', 'G1-F1', 'r-A1', 'r-Bb1', 'r-CS1', 'r-D', 'r-D1', 'r-E1', 'r-F1', 'r-G1'];
const EIGHTH_NOTEINTERVALS_HARD_Dminor = [-5, -5, -5, -5, -5, -4, -4, -4, -1, -1, -1, -1, 0, 0, 0, -10, -10, -10, 2, -9, -9, -9, -9, -7, -7, -7, -7, -7, -5, -4, -1, -12, 0, -10, -9, -7];

const NOTES_Gminor = ['D', 'G1', 'A1', 'Bb1', 'C1', 'D1', 'E2', 'F2', 'FS2', 'G2'];
const NOTEINTERVALS_Gminor = [-5, 0, 2, 3, 5, 7, 9, 10, 11, 12];
const CADENCENOTES_Gminor = ['D1', 'FS2'];
const CADENCEINTERVALS_Gminor = [7, 11];
const STARTNOTES_Gminor = ['G1'];
const STARTINTERVALS_Gminor = [0];
const EIGHTH_NOTES_EASY_Gminor = ['A1-A1', 'A1-Bb1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-G1', 'Bb1-A1', 'Bb1-C', 'Bb1-G1', 'C1-A1', 'C1-Bb1', 'C1-C1', 'C1-D1', 'C1-E1', 'C1-G1', 'C1-G2', 'D1-A', 'D1-A1', 'D1-C1', 'D1-D', 'D1-D1', 'D1-E2', 'D1-FS2', 'D1-G1', 'E2-C1', 'E2-D1', 'E2-FS2', 'G1-A1', 'G1-Bb1', 'G1-C1', 'G1-D', 'G1-D1'];
const EIGHTH_NOTEINTERVALS_EASY_Gminor = [2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 7, 7, 7, 7, 7, 7, 7, 7, 9, 9, 9, 0, 0, 0, 0, 0];
const EIGHTH_NOTES_HARD_Gminor = ['A1-A1', 'A1-Bb1', 'A1-C1', 'A1-D', 'A1-D1', 'A1-F1', 'A1-G1', 'Bb1-A1', 'Bb1-C', 'Bb1-G1', 'C1-A1', 'C1-Bb1', 'C1-C1', 'C1-D1', 'C1-E1', 'C1-G1', 'C1-G2', 'D1-A', 'D1-A1', 'D1-C1', 'D1-D', 'D1-D1', 'D1-E2', 'D1-FS2', 'D1-G1', 'E2-C1', 'E2-D1', 'E2-FS2', 'G1-A1', 'G1-Bb1', 'G1-C1', 'G1-D', 'G1-D1', 'r-A1', 'r-Bb1', 'r-C1', 'r-D', 'r-D1', 'r-G1'];
const EIGHTH_NOTEINTERVALS_HARD_Gminor = [2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 7, 7, 7, 7, 7, 7, 7, 7, 9, 9, 9, 0, 0, 0, 0, 0, 2, 3, 5, -5, 7, 0];


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
      duration = getRandom([...Array(noteMax).keys()].map(i => i + 1));
    } while (duration === 3); // Prevent duration of 3
    let note = getRandomNote(NOTES, NOTEINTERVALS, previousNote);
    if (remaining > 1 && isFirst == false && isBreak == false && duration === 1 && difficulty === 'easy' && Math.random() < 0.5) {
      note = getRandom(EIGHTH_NOTES_EASY, EIGHTH_NOTEINTERVALS_EASY, previousNote);
      isEighth = true;
    }
    else if (remaining > 1 && isFirst == false && isBreak == false && duration === 1 && difficulty === 'hard' && Math.random() < 0.5) {
      note = getRandom(EIGHTH_NOTES_HARD, EIGHTH_NOTEINTERVALS_HARD, previousNote);
      isEighth = true;
    }
    if (note.includes('S') || note.includes('b')) {
      accidentalFlag = true;
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
    measure[0] = measure[0].replace(new RegExp(`\\/(${NOTES.join('|')})\\.jpg$`), `/${startNote}.jpg`);

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
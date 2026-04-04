// ============================================================
// Sight Reading Generator for Classical Guitar
// Uses ABCjs for notation rendering
// Generates single-voice melodies with proper voice leading
// ============================================================

(function () {
  "use strict";

  // ----------------------------------------------------------
  // 1. MUSIC THEORY DATA
  // ----------------------------------------------------------

  // Classical guitar practical range: E3 (low open 6th) to B5 (high fret 19, string 1)
  // In ABC notation: E, to b' — we'll keep things in a comfortable reading range.
  // MIDI numbers are used internally for interval math.
  // E3=52, F3=53 ... B5=83

  const NOTE_NAMES = ["C", "^C", "D", "^D", "E", "F", "^F", "G", "^G", "A", "^A", "B"];
  const FLAT_NAMES = ["C", "_D", "D", "_E", "E", "F", "_G", "G", "_A", "A", "_B", "B"];

  // Key signature definitions — scale degrees as semitone offsets from the tonic
  const KEY_DEFS = {
    // Major keys
    "C":  { tonic: 60, mode: "major", abcKey: "C",   usesFlats: false },
    "G":  { tonic: 55, mode: "major", abcKey: "G",   usesFlats: false },
    "D":  { tonic: 62, mode: "major", abcKey: "D",   usesFlats: false },
    "A":  { tonic: 57, mode: "major", abcKey: "A",   usesFlats: false },
    "F":  { tonic: 53, mode: "major", abcKey: "F",   usesFlats: true  },
    "Bb": { tonic: 58, mode: "major", abcKey: "Bb",  usesFlats: true  },
    // Minor keys (natural minor base, with raised 7th available)
    "Am": { tonic: 57, mode: "minor", abcKey: "Am",  usesFlats: false },
    "Em": { tonic: 52, mode: "minor", abcKey: "Em",  usesFlats: false },
    "Dm": { tonic: 62, mode: "minor", abcKey: "Dm",  usesFlats: true  },
  };

  const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11];
  const MINOR_SCALE = [0, 2, 3, 5, 7, 8, 10]; // natural minor

  // Guitar-friendly range limits (MIDI)
  const RANGE_LOW  = 52;  // E3
  const RANGE_HIGH = 77;  // F5 (keeps sight-reading approachable)

  // ----------------------------------------------------------
  // 2. SCALE & PITCH UTILITIES
  // ----------------------------------------------------------

  function getScalePitches(keyDef) {
    const pattern = keyDef.mode === "major" ? MAJOR_SCALE : MINOR_SCALE;
    const pitches = [];
    for (let oct = -2; oct <= 2; oct++) {
      for (const offset of pattern) {
        const p = keyDef.tonic + oct * 12 + offset;
        if (p >= RANGE_LOW && p <= RANGE_HIGH) pitches.push(p);
      }
    }
    // For minor keys, include the raised 7th (leading tone)
    if (keyDef.mode === "minor") {
      for (let oct = -2; oct <= 2; oct++) {
        const raised7 = keyDef.tonic + oct * 12 + 11;
        if (raised7 >= RANGE_LOW && raised7 <= RANGE_HIGH && !pitches.includes(raised7)) {
          pitches.push(raised7);
        }
      }
    }
    pitches.sort((a, b) => a - b);
    return [...new Set(pitches)];
  }

  // Returns the scale degree (0-6) of a pitch relative to the key, or -1 if chromatic
  function scaleDegree(midi, keyDef) {
    const pattern = keyDef.mode === "major" ? MAJOR_SCALE : MINOR_SCALE;
    const interval = ((midi - keyDef.tonic) % 12 + 12) % 12;
    return pattern.indexOf(interval);
  }

  // Check if pitch is the raised 7th in a minor key
  function isRaised7th(midi, keyDef) {
    if (keyDef.mode !== "minor") return false;
    return ((midi - keyDef.tonic) % 12 + 12) % 12 === 11;
  }

  // ----------------------------------------------------------
  // 3. VOICE LEADING ENGINE
  // ----------------------------------------------------------

  // Difficulty profiles control interval restrictions and rhythm complexity
  const DIFFICULTY = {
    easy: {
      maxInterval: 4,       // max jump in scale steps
      stepBias: 0.75,       // probability of stepwise motion
      rhythms34: ["2", "1", "1 1"],         // half, quarter, two quarters
      rhythms44: ["2", "1", "1 1", "1 1 1"],
      restChance: 0.05,
      allowSyncopation: false,
    },
    medium: {
      maxInterval: 5,
      stepBias: 0.55,
      rhythms34: ["2", "1", "1 1", "3", "1/2 1/2 1", "1 1/2 1/2"],
      rhythms44: ["2", "1", "1 1", "1 1 1", "4", "1/2 1/2 1 1", "2 1 1"],
      restChance: 0.08,
      allowSyncopation: false,
    },
    hard: {
      maxInterval: 7,
      stepBias: 0.40,
      rhythms34: ["2", "1", "1 1", "3", "1/2 1/2 1", "1 1/2 1/2", "1/2 1/2 1/2 1/2 1/2 1/2"],
      rhythms44: ["2", "1", "1 1", "1 1 1", "4", "1/2 1/2 1 1", "2 1 1", "1/2 1/2 1/2 1/2 1 1", "3 1"],
      restChance: 0.10,
      allowSyncopation: true,
    }
  };

  /**
   * Pick the next pitch respecting voice-leading rules:
   * - Strong tendency toward stepwise motion
   * - After a leap, prefer contrary stepwise motion (recovery)
   * - Avoid augmented intervals
   * - In minor keys, raised 7th resolves UP to tonic
   * - Keep within the comfortable range
   * - Tendency toward the tonic on strong beats
   */
  function pickNextPitch(prevPitch, prevInterval, scalePitches, keyDef, diff, beatStrength) {
    const profile = DIFFICULTY[diff];
    const idx = scalePitches.indexOf(prevPitch);
    if (idx === -1) {
      // Fallback: pick the nearest scale pitch
      return scalePitches.reduce((a, b) =>
        Math.abs(b - prevPitch) < Math.abs(a - prevPitch) ? b : a
      );
    }

    // Build candidate list with weights
    const candidates = [];

    for (let i = 0; i < scalePitches.length; i++) {
      const pitch = scalePitches[i];
      const stepsAway = Math.abs(i - idx);
      const semitonesAway = Math.abs(pitch - prevPitch);

      if (stepsAway === 0) continue; // no repeated notes back-to-back
      if (stepsAway > profile.maxInterval) continue;

      let weight = 1.0;

      // Stepwise bias
      if (stepsAway <= 2) {
        weight *= (profile.stepBias / 0.3);
      } else {
        weight *= ((1 - profile.stepBias) / 0.7);
      }

      // Leap recovery: if the previous motion was a leap, prefer contrary motion
      if (prevInterval !== 0) {
        const prevDir = prevInterval > 0 ? 1 : -1;
        const curDir = pitch > prevPitch ? 1 : -1;
        if (Math.abs(prevInterval) > 2 && curDir !== prevDir) {
          weight *= 2.0; // reward contrary motion after a leap
        }
        if (Math.abs(prevInterval) > 2 && curDir === prevDir && stepsAway > 2) {
          weight *= 0.2; // penalize continued leaping in same direction
        }
      }

      // Avoid tritone leaps (6 semitones)
      if (semitonesAway === 6) {
        weight *= 0.1;
      }

      // Strong beat tonic/dominant gravitation
      if (beatStrength === "strong") {
        const deg = scaleDegree(pitch, keyDef);
        if (deg === 0) weight *= 1.8;       // tonic
        else if (deg === 4) weight *= 1.4;   // dominant
        else if (deg === 2) weight *= 1.2;   // mediant
      }

      // Range preference: gently bias toward the middle of the range
      const mid = (RANGE_LOW + RANGE_HIGH) / 2;
      const distFromMid = Math.abs(pitch - mid);
      weight *= Math.max(0.3, 1 - distFromMid / 20);

      // Minor key raised 7th handling — only allow it when ascending toward tonic
      if (isRaised7th(pitch, keyDef)) {
        // Only allow if we're approaching from below
        if (pitch < prevPitch) weight *= 0.05;
        else weight *= 1.5; // encourage leading tone resolution
      }

      // If current note IS the raised 7th, next note should be tonic
      if (isRaised7th(prevPitch, keyDef)) {
        const tonicPitch = prevPitch + 1;
        if (pitch === tonicPitch) weight *= 5.0;
        else weight *= 0.1;
      }

      candidates.push({ pitch, weight });
    }

    if (candidates.length === 0) {
      // Emergency fallback
      return scalePitches[Math.floor(Math.random() * scalePitches.length)];
    }

    return weightedPick(candidates);
  }

  function weightedPick(candidates) {
    const total = candidates.reduce((s, c) => s + c.weight, 0);
    let r = Math.random() * total;
    for (const c of candidates) {
      r -= c.weight;
      if (r <= 0) return c.pitch;
    }
    return candidates[candidates.length - 1].pitch;
  }

  // ----------------------------------------------------------
  // 4. RHYTHM GENERATION
  // ----------------------------------------------------------

  /**
   * Parse a rhythm pattern string like "1 1/2 1/2" into an array of beat durations.
   * Each number is in quarter-note units: 1 = quarter, 2 = half, 1/2 = eighth, etc.
   */
  function parseRhythm(pattern) {
    return pattern.split(" ").map(s => {
      if (s.includes("/")) {
        const [n, d] = s.split("/").map(Number);
        return n / d;
      }
      return Number(s);
    });
  }

  /**
   * Generate rhythms for one measure. Returns array of beat durations (in quarter-note units).
   */
  function generateMeasureRhythm(beatsPerMeasure, diff) {
    const profile = DIFFICULTY[diff];
    const rhythmPool = beatsPerMeasure === 3 ? profile.rhythms34 : profile.rhythms44;

    // Try to fill the measure from the rhythm pool
    const target = beatsPerMeasure;
    let attempts = 0;

    while (attempts < 50) {
      const pattern = rhythmPool[Math.floor(Math.random() * rhythmPool.length)];
      const durations = parseRhythm(pattern);
      const total = durations.reduce((a, b) => a + b, 0);

      if (total === target) return durations;
      if (total < target) {
        // Fill the rest with quarter notes
        const remaining = target - total;
        const fill = Array(Math.round(remaining)).fill(1);
        const result = [...durations, ...fill];
        const resultTotal = result.reduce((a, b) => a + b, 0);
        if (Math.abs(resultTotal - target) < 0.01) return result;
      }
      attempts++;
    }

    // Fallback: all quarter notes
    return Array(beatsPerMeasure).fill(1);
  }

  // ----------------------------------------------------------
  // 5. MELODY GENERATION (putting it all together)
  // ----------------------------------------------------------

  function generateMelody(keyName, meter, difficulty, numMeasures) {
    const keyDef = KEY_DEFS[keyName];
    const scalePitches = getScalePitches(keyDef);
    const beatsPerMeasure = meter === "3/4" ? 3 : 4;
    const profile = DIFFICULTY[difficulty];

    // Start on a tonic pitch near the middle of the range
    const mid = (RANGE_LOW + RANGE_HIGH) / 2;
    const tonicPitches = scalePitches.filter(p => scaleDegree(p, keyDef) === 0);
    let currentPitch = tonicPitches.reduce((a, b) =>
      Math.abs(b - mid) < Math.abs(a - mid) ? b : a
    );

    let prevInterval = 0;
    const measures = [];

    for (let m = 0; m < numMeasures; m++) {
      const isLastMeasure = m === numMeasures - 1;
      const rhythm = isLastMeasure
        ? [beatsPerMeasure] // whole/dotted-half on last measure (final note)
        : generateMeasureRhythm(beatsPerMeasure, difficulty);

      const notes = [];
      let beatPos = 0;

      for (let n = 0; n < rhythm.length; n++) {
        const dur = rhythm[n];
        const isStrongBeat = beatPos === 0 || (beatsPerMeasure === 4 && beatPos === 2);
        const beatStrength = isStrongBeat ? "strong" : "weak";

        // On the last measure, resolve to tonic
        if (isLastMeasure) {
          const tonicNear = tonicPitches.reduce((a, b) =>
            Math.abs(b - currentPitch) < Math.abs(a - currentPitch) ? b : a
          );
          notes.push({ pitch: tonicNear, duration: dur, isRest: false });
          currentPitch = tonicNear;
        } else {
          // Occasional rest
          if (Math.random() < profile.restChance && beatPos > 0) {
            notes.push({ pitch: null, duration: dur, isRest: true });
          } else {
            const nextPitch = pickNextPitch(currentPitch, prevInterval, scalePitches, keyDef, difficulty, beatStrength);
            const intervalSteps = scalePitches.indexOf(nextPitch) - scalePitches.indexOf(currentPitch);
            prevInterval = intervalSteps;
            currentPitch = nextPitch;
            notes.push({ pitch: nextPitch, duration: dur, isRest: false });
          }
        }
        beatPos += dur;
      }
      measures.push(notes);
    }

    return measures;
  }

  // ----------------------------------------------------------
  // 6. MIDI-TO-ABC CONVERSION
  // ----------------------------------------------------------

  function midiToAbc(midi, keyDef) {
    const noteIndex = ((midi % 12) + 12) % 12;
    const octave = Math.floor(midi / 12) - 1; // MIDI octave convention
    const names = keyDef.usesFlats ? FLAT_NAMES : NOTE_NAMES;
    let name = names[noteIndex];

    // ABC octave notation:
    // C4 = C  (middle C)
    // C5 = c
    // C3 = C,
    // C6 = c'

    let baseLetter = name.replace(/[\^_=]/g, "");
    let accidental = name.replace(baseLetter, "");

    if (octave >= 5) {
      baseLetter = baseLetter.toLowerCase();
      const primes = octave - 5;
      return accidental + baseLetter + "'".repeat(primes);
    } else {
      baseLetter = baseLetter.toUpperCase();
      const commas = 4 - octave;
      if (commas > 0) return accidental + baseLetter + ",".repeat(commas);
      return accidental + baseLetter;
    }
  }

  /**
   * Convert a duration (in quarter-note units) to ABC duration notation.
   * Default note length in our ABC is 1/8, so:
   *   quarter = "2", half = "4", whole = "8", eighth = "", dotted quarter = "3"
   */
  function durationToAbc(dur) {
    // dur is in quarter-note units. With L:1/8, one quarter = 2 eighth-units.
    const eighths = dur * 2;
    if (eighths === 1) return "";      // eighth note
    if (eighths === 2) return "2";     // quarter
    if (eighths === 3) return "3";     // dotted quarter
    if (eighths === 4) return "4";     // half
    if (eighths === 6) return "6";     // dotted half
    if (eighths === 8) return "8";     // whole
    // Fractional: try to express as fraction
    if (eighths < 1) return "/" + Math.round(1 / eighths);
    return String(Math.round(eighths));
  }

  // ----------------------------------------------------------
  // 7. ABC STRING ASSEMBLY
  // ----------------------------------------------------------

  function melodyToAbc(measures, keyDef, meter) {
    const beatsPerMeasure = meter === "3/4" ? 3 : 4;
    let abc = "";
    abc += "X:1\n";
    // abc += "T:Sight Reading Exercise\n";
    abc += "M:" + meter + "\n";
    abc += "L:1/8\n";
    abc += "%%stretchlast true\n";
    abc += "K:C\n";

    for (let i = 0; i < measures.length; i++) {
      const measure = measures[i];
      // Track accidentals in effect for each note name this measure.
      // In K:C, default state is "" (natural) for every note.
      const accState = {}; // e.g. "C," -> "^"
      let beatPos = 0; // position in quarter-note units within the measure
      for (let j = 0; j < measure.length; j++) {
        const note = measure[j];
        if (note.isRest) {
          abc += "z" + durationToAbc(note.duration);
        } else {
          let noteAbc = midiToAbc(note.pitch, keyDef);

          // Parse accidental prefix and base (letter + octave markers)
          let acc = "";
          let base = noteAbc;
          if (noteAbc[0] === "^" || noteAbc[0] === "_" || noteAbc[0] === "=") {
            acc = noteAbc[0];
            base = noteAbc.slice(1);
          }

          const cur = accState[base] || ""; // "" = natural (K:C default)

          if (acc === cur) {
            // Same accidental already in effect — omit it
            noteAbc = base;
          } else if (acc === "" && cur !== "") {
            // Need an explicit natural to cancel the previous accidental
            noteAbc = "=" + base;
            accState[base] = "";
          } else {
            // New accidental — emit it and update state
            accState[base] = acc;
          }

          abc += noteAbc + durationToAbc(note.duration);
        }

        // Beam eighth notes together only within the same beat.
        // A "beat" is each quarter-note unit (pos 0, 1, 2, 3...).
        // Two consecutive eighths beam if they share the same beat.
        const nextNote = measure[j + 1];
        const isEighth = note.duration === 0.5;
        const nextIsEighth = nextNote && nextNote.duration === 0.5;
        const curBeat = Math.floor(beatPos);
        const nextBeatPos = beatPos + note.duration;
        const nextBeat = Math.floor(nextBeatPos);
        const sameBeat = curBeat === nextBeat || (nextBeatPos % 1 === 0 && false);

        if (isEighth && nextIsEighth && sameBeat) {
          // No space — beam together
        } else {
          abc += " ";
        }

        beatPos = nextBeatPos;
      }

      if (i === measures.length - 1) {
        abc += "|]"; // final barline
      } else {
        abc += "| ";
      }
    }

    return abc;
  }

  // ----------------------------------------------------------
  // 8. RENDERING
  // ----------------------------------------------------------

  function render(abcString) {
    const el = document.getElementById("notation");
    el.innerHTML = "";
    ABCJS.renderAbc(el, abcString, {
      responsive: "resize",
      staffwidth: 900,
      wrap: {
        minSpacing: 1.5,
        maxSpacing: 2.8,
        preferredMeasuresPerLine: 4,
      },
      paddingtop: 10,
      paddingbottom: 20,
      paddingleft: 20,
      paddingright: 20,
      scale: 1.3,
    });
  }

  // ----------------------------------------------------------
  // 9. MAIN CONTROLLER
  // ----------------------------------------------------------

  function generate() {
    const keyName    = document.getElementById("keySelect").value;
    const meter      = document.getElementById("meterSelect").value;
    const difficulty = document.getElementById("difficultySelect").value;
    const numMeasures = parseInt(document.getElementById("measuresSelect").value, 10);
    const keyDef     = KEY_DEFS[keyName];

    const measures = generateMelody(keyName, meter, difficulty, numMeasures);
    const abc = melodyToAbc(measures, keyDef, meter);

    render(abc);
  }

  // Wire up
  document.getElementById("generateBtn").addEventListener("click", generate);

  // Generate on load
  generate();
})();

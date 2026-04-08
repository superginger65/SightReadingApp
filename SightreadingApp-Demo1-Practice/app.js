// ============================================================
// Sight Reading Generator for Classical Guitar — Practice Mode
// Uses ABCjs for notation, Web Audio API for playback
// ============================================================

(function () {
  "use strict";

  // ==========================================================
  // 1. MUSIC THEORY DATA
  // ==========================================================

  const NOTE_NAMES = ["C", "^C", "D", "^D", "E", "F", "^F", "G", "^G", "A", "^A", "B"];
  const FLAT_NAMES = ["C", "_D", "D", "_E", "E", "F", "_G", "G", "_A", "A", "_B", "B"];

  const KEY_DEFS = {
    "C":  { tonic: 60, mode: "major", abcKey: "C",  usesFlats: false },
    "G":  { tonic: 55, mode: "major", abcKey: "G",  usesFlats: false },
    "D":  { tonic: 62, mode: "major", abcKey: "D",  usesFlats: false },
    "A":  { tonic: 57, mode: "major", abcKey: "A",  usesFlats: false },
    "F":  { tonic: 53, mode: "major", abcKey: "F",  usesFlats: true  },
    "Bb": { tonic: 58, mode: "major", abcKey: "Bb", usesFlats: true  },
    "Am": { tonic: 57, mode: "minor", abcKey: "Am", usesFlats: false },
    "Em": { tonic: 52, mode: "minor", abcKey: "Em", usesFlats: false },
    "Dm": { tonic: 62, mode: "minor", abcKey: "Dm", usesFlats: true  },
  };

  const MAJOR_SCALE = [0, 2, 4, 5, 7, 9, 11];
  const MINOR_SCALE = [0, 2, 3, 5, 7, 8, 10];

  const RANGE_LOW  = 52;  // E3
  const RANGE_HIGH = 77;  // F5

  // --- DEMO MODE ---
  // Restrict to only D, G, A, B within one octave
  const DEMO_PITCHES = [62, 67, 69, 71]; // D4, G4, A4, B4

  // ==========================================================
  // 2. SCALE & PITCH UTILITIES
  // ==========================================================

  function getScalePitches(keyDef) {
    // Demo mode: return only the allowed demo pitches
    return DEMO_PITCHES.slice();
  }

  function scaleDegree(midi, keyDef) {
    const pattern = keyDef.mode === "major" ? MAJOR_SCALE : MINOR_SCALE;
    const interval = ((midi - keyDef.tonic) % 12 + 12) % 12;
    return pattern.indexOf(interval);
  }

  function isRaised7th(midi, keyDef) {
    if (keyDef.mode !== "minor") return false;
    return ((midi - keyDef.tonic) % 12 + 12) % 12 === 11;
  }

  function hzToMidi(hz) {
    return 12 * Math.log2(hz / 440) + 69;
  }

  function midiToNoteName(midi) {
    const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const note = names[Math.round(midi) % 12];
    const oct = Math.floor(Math.round(midi) / 12) - 1;
    return note + oct;
  }

  // ==========================================================
  // 3. VOICE LEADING ENGINE
  // ==========================================================

  const DIFFICULTY = {
    easy: {
      maxInterval: 4, stepBias: 0.75,
      rhythms34: ["2", "1", "1 1"],
      rhythms44: ["2", "1", "1 1", "1 1 1"],
      restChance: 0.05, allowSyncopation: false,
    },
    medium: {
      maxInterval: 5, stepBias: 0.55,
      rhythms34: ["2", "1", "1 1", "3", "1/2 1/2 1", "1 1/2 1/2"],
      rhythms44: ["2", "1", "1 1", "1 1 1", "4", "1/2 1/2 1 1", "2 1 1"],
      restChance: 0.08, allowSyncopation: false,
    },
    hard: {
      maxInterval: 7, stepBias: 0.40,
      rhythms34: ["2", "1", "1 1", "3", "1/2 1/2 1", "1 1/2 1/2", "1/2 1/2 1/2 1/2 1/2 1/2"],
      rhythms44: ["2", "1", "1 1", "1 1 1", "4", "1/2 1/2 1 1", "2 1 1", "1/2 1/2 1/2 1/2 1 1", "3 1"],
      restChance: 0.10, allowSyncopation: true,
    }
  };

  function pickNextPitch(prevPitch, prevInterval, scalePitches, keyDef, diff, beatStrength) {
    const profile = DIFFICULTY[diff];
    const idx = scalePitches.indexOf(prevPitch);
    if (idx === -1) {
      return scalePitches.reduce((a, b) =>
        Math.abs(b - prevPitch) < Math.abs(a - prevPitch) ? b : a
      );
    }

    const candidates = [];
    for (let i = 0; i < scalePitches.length; i++) {
      const pitch = scalePitches[i];
      const stepsAway = Math.abs(i - idx);
      const semitonesAway = Math.abs(pitch - prevPitch);
      if (stepsAway === 0 || stepsAway > profile.maxInterval) continue;

      let weight = 1.0;
      if (stepsAway <= 2) weight *= (profile.stepBias / 0.3);
      else weight *= ((1 - profile.stepBias) / 0.7);

      if (prevInterval !== 0) {
        const prevDir = prevInterval > 0 ? 1 : -1;
        const curDir = pitch > prevPitch ? 1 : -1;
        if (Math.abs(prevInterval) > 2 && curDir !== prevDir) weight *= 2.0;
        if (Math.abs(prevInterval) > 2 && curDir === prevDir && stepsAway > 2) weight *= 0.2;
      }

      if (semitonesAway === 6) weight *= 0.1;

      if (beatStrength === "strong") {
        const deg = scaleDegree(pitch, keyDef);
        if (deg === 0) weight *= 1.8;
        else if (deg === 4) weight *= 1.4;
        else if (deg === 2) weight *= 1.2;
      }

      const mid = (RANGE_LOW + RANGE_HIGH) / 2;
      weight *= Math.max(0.3, 1 - Math.abs(pitch - mid) / 20);

      if (isRaised7th(pitch, keyDef)) {
        weight *= (pitch < prevPitch) ? 0.05 : 1.5;
      }
      if (isRaised7th(prevPitch, keyDef)) {
        weight *= (pitch === prevPitch + 1) ? 5.0 : 0.1;
      }

      candidates.push({ pitch, weight });
    }

    if (candidates.length === 0) {
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

  // ==========================================================
  // 4. RHYTHM GENERATION
  // ==========================================================

  function parseRhythm(pattern) {
    return pattern.split(" ").map(s => {
      if (s.includes("/")) { const [n, d] = s.split("/").map(Number); return n / d; }
      return Number(s);
    });
  }

  function generateMeasureRhythm(beatsPerMeasure, diff) {
    const profile = DIFFICULTY[diff];
    const rhythmPool = beatsPerMeasure === 3 ? profile.rhythms34 : profile.rhythms44;
    const target = beatsPerMeasure;
    let attempts = 0;
    while (attempts < 50) {
      const pattern = rhythmPool[Math.floor(Math.random() * rhythmPool.length)];
      const durations = parseRhythm(pattern);
      const total = durations.reduce((a, b) => a + b, 0);
      if (total === target) return durations;
      if (total < target) {
        const fill = Array(Math.round(target - total)).fill(1);
        const result = [...durations, ...fill];
        if (Math.abs(result.reduce((a, b) => a + b, 0) - target) < 0.01) return result;
      }
      attempts++;
    }
    return Array(beatsPerMeasure).fill(1);
  }

  // ==========================================================
  // 5. MELODY GENERATION
  // ==========================================================

  function generateMelody(keyName, meter, difficulty, numMeasures) {
    const keyDef = KEY_DEFS[keyName];
    const scalePitches = getScalePitches(keyDef);
    const beatsPerMeasure = meter === "3/4" ? 3 : 4;
    const profile = DIFFICULTY[difficulty];

    const mid = (RANGE_LOW + RANGE_HIGH) / 2;
    const tonicPitches = scalePitches.filter(p => scaleDegree(p, keyDef) === 0);
    let currentPitch = tonicPitches.reduce((a, b) =>
      Math.abs(b - mid) < Math.abs(a - mid) ? b : a
    );

    let prevInterval = 0;
    const measures = [];

    for (let m = 0; m < numMeasures; m++) {
      const isLast = m === numMeasures - 1;
      const rhythm = isLast
        ? [beatsPerMeasure]
        : generateMeasureRhythm(beatsPerMeasure, difficulty);

      const notes = [];
      let beatPos = 0;

      for (let n = 0; n < rhythm.length; n++) {
        const dur = rhythm[n];
        const isStrongBeat = beatPos === 0 || (beatsPerMeasure === 4 && beatPos === 2);
        const beatStrength = isStrongBeat ? "strong" : "weak";

        if (isLast) {
          const tonicNear = tonicPitches.reduce((a, b) =>
            Math.abs(b - currentPitch) < Math.abs(a - currentPitch) ? b : a
          );
          notes.push({ pitch: tonicNear, duration: dur, isRest: false });
          currentPitch = tonicNear;
        } else {
          if (Math.random() < profile.restChance && beatPos > 0) {
            notes.push({ pitch: null, duration: dur, isRest: true });
          } else {
            const nextPitch = pickNextPitch(currentPitch, prevInterval, scalePitches, keyDef, difficulty, beatStrength);
            prevInterval = scalePitches.indexOf(nextPitch) - scalePitches.indexOf(currentPitch);
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

  // ==========================================================
  // 6. ABC CONVERSION & RENDERING
  // ==========================================================

  function midiToAbc(midi, keyDef) {
    const noteIndex = ((midi % 12) + 12) % 12;
    const octave = Math.floor(midi / 12) - 1;
    const names = keyDef.usesFlats ? FLAT_NAMES : NOTE_NAMES;
    let name = names[noteIndex];
    let baseLetter = name.replace(/[\^_=]/g, "");
    let accidental = name.replace(baseLetter, "");
    if (octave >= 5) {
      baseLetter = baseLetter.toLowerCase();
      return accidental + baseLetter + "'".repeat(octave - 5);
    } else {
      baseLetter = baseLetter.toUpperCase();
      const commas = 4 - octave;
      return commas > 0 ? accidental + baseLetter + ",".repeat(commas) : accidental + baseLetter;
    }
  }

  function durationToAbc(dur) {
    const eighths = dur * 2;
    if (eighths === 1) return "";
    if (eighths === 2) return "2";
    if (eighths === 3) return "3";
    if (eighths === 4) return "4";
    if (eighths === 6) return "6";
    if (eighths === 8) return "8";
    if (eighths < 1) return "/" + Math.round(1 / eighths);
    return String(Math.round(eighths));
  }

  function melodyToAbc(measures, keyDef, meter) {
    let abc = "X:1\nM:" + meter + "\nL:1/8\n%%stretchlast true\nK:C\n";

    for (let i = 0; i < measures.length; i++) {
      const measure = measures[i];
      const accState = {};
      let beatPos = 0;

      for (let j = 0; j < measure.length; j++) {
        const note = measure[j];
        if (note.isRest) {
          abc += "z" + durationToAbc(note.duration);
        } else {
          let noteAbc = midiToAbc(note.pitch, keyDef);
          let acc = "";
          let base = noteAbc;
          if (/^[\^_=]/.test(noteAbc)) { acc = noteAbc[0]; base = noteAbc.slice(1); }
          const cur = accState[base] || "";
          if (acc === cur) noteAbc = base;
          else if (acc === "" && cur !== "") { noteAbc = "=" + base; accState[base] = ""; }
          else accState[base] = acc;
          abc += noteAbc + durationToAbc(note.duration);
        }

        const nextNote = measure[j + 1];
        const isEighth = note.duration === 0.5;
        const nextIsEighth = nextNote && nextNote.duration === 0.5;
        const curBeat = Math.floor(beatPos);
        const nextBeatPos = beatPos + note.duration;
        const sameBeat = curBeat === Math.floor(nextBeatPos) || (nextBeatPos % 1 === 0 && false);
        if (!(isEighth && nextIsEighth && sameBeat)) abc += " ";
        beatPos = nextBeatPos;
      }

      abc += (i === measures.length - 1) ? "|]" : "| ";
    }
    return abc;
  }

  // Build a flat list of expected MIDI note numbers (skipping rests) with timing info
  function buildExpectedNotes(measures, bpm, meter) {
    const beatsPerMeasure = meter === "3/4" ? 3 : 4;
    const secPerBeat = 60 / bpm;
    const notes = [];
    let time = 0;

    for (const measure of measures) {
      for (const note of measure) {
        if (note.isRest) {
          notes.push({
            isRest: true,
            midi: null,
            name: "rest",
            startTime: time,
            duration: note.duration * secPerBeat,
            quarterBeats: note.duration,
          });
        } else if (note.pitch != null) {
          notes.push({
            midi: note.pitch,
            name: midiToNoteName(note.pitch),
            startTime: time,
            duration: note.duration * secPerBeat,
            quarterBeats: note.duration,
          });
        }
        time += note.duration * secPerBeat;
      }
    }
    return notes;
  }

  // Global index counter so ABCjs note classes line up with our expectedNotes
  function buildNoteIndexMap(measures) {
    // Returns a flat array index for each non-rest note, and -1 for rests
    const map = [];
    let idx = 0;
    for (const measure of measures) {
      for (const note of measure) {
        if (!note.isRest && note.pitch != null) {
          map.push(idx++);
        } else {
          map.push(-1);
        }
      }
    }
    return map;
  }

  let lastRenderedTune = null;

  function render(abcString) {
    const el = document.getElementById("notation");
    el.innerHTML = "";
    const tuneArr = ABCJS.renderAbc(el, abcString, {
      responsive: "resize",
      staffwidth: 900,
      wrap: { minSpacing: 1.5, maxSpacing: 2.8, preferredMeasuresPerLine: 4 },
      paddingtop: 10, paddingbottom: 20, paddingleft: 20, paddingright: 20,
      scale: 1.3,
      add_classes: true,
    });
    lastRenderedTune = tuneArr && tuneArr[0];
  }

  // ==========================================================
  // 7. METRONOME
  // ==========================================================

  function playClick(audioCtx, time, isAccent, dest) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(dest || audioCtx.destination);
    osc.frequency.value = isAccent ? 1000 : 800;
    gain.gain.setValueAtTime(isAccent ? 0.3 : 0.15, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
    osc.start(time);
    osc.stop(time + 0.05);
  }

  // ==========================================================
  // 8. STATUS DISPLAY
  // ==========================================================

  function setStatus(msg) {
    document.getElementById("statusDisplay").textContent = msg;
  }

  function clearStatus() {
    document.getElementById("statusDisplay").textContent = "";
  }

  // ==========================================================
  // 9. MAIN CONTROLLER
  // ==========================================================

  let currentMeasures = null;
  let currentExpectedNotes = null;
  let currentKeyDef = null;
  let currentMeter = null;
  let currentBpm = 80;
  let currentNumMeasures = 8;

  function generate() {
    const keyName    = "G";
    currentMeter     = document.getElementById("meterSelect").value;
    const difficulty = "easy";
    currentNumMeasures = parseInt(document.getElementById("measuresSelect").value, 10);
    currentBpm       = parseInt(document.getElementById("bpmSelect").value, 10);
    currentKeyDef    = KEY_DEFS[keyName];

    currentMeasures = generateMelody(keyName, currentMeter, difficulty, currentNumMeasures);
    currentExpectedNotes = buildExpectedNotes(currentMeasures, currentBpm, currentMeter);

    const abc = melodyToAbc(currentMeasures, currentKeyDef, currentMeter);
    render(abc);
    clearStatus();
    stopPlayback();

    document.getElementById("playBtn").disabled = false;
  }

  // ==========================================================
  // 10. MELODY PLAYBACK
  // ==========================================================

  let playbackCtx = null;
  let playbackTimeouts = [];
  let isPlaying = false;
  let highlightedEl = null;
  let metronomeGainNode = null;
  let metronomeMuted = false;
  const HIGHLIGHT_COLOR = "#3a6ea5";

  function midiToHz(midi) {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  /** Play a single note with a plucked-guitar-like envelope */
  function playNote(ctx, midi, startTime, duration) {
    const hz = midiToHz(midi);

    const noteEnd = startTime + duration * 0.95;

    // Fundamental
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = hz;

    // Slight harmonic for body
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.value = hz * 2;

    const gain = ctx.createGain();
    const gain2 = ctx.createGain();

    // Pluck envelope: quick attack, initial decay, sustain, then fade out
    const attackEnd = startTime + 0.008;
    const bodyEnd = startTime + Math.min(0.06, duration * 0.1);
    const fadeStart = noteEnd - Math.min(0.15, duration * 0.15);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.25, attackEnd);
    gain.gain.exponentialRampToValueAtTime(0.10, bodyEnd);
    // Hold sustain level until fade-out
    gain.gain.setValueAtTime(0.10, fadeStart);
    gain.gain.exponentialRampToValueAtTime(0.001, noteEnd);

    gain2.gain.setValueAtTime(0.001, startTime);
    gain2.gain.linearRampToValueAtTime(0.06, startTime + 0.005);
    gain2.gain.exponentialRampToValueAtTime(0.001, startTime + Math.min(0.5, duration * 0.4));

    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(ctx.destination);
    gain2.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(noteEnd + 0.05);
    osc2.start(startTime);
    osc2.stop(noteEnd + 0.05);
  }

  function getAllNoteRestEls() {
    const svgContainer = document.getElementById("notation");
    return svgContainer ? svgContainer.querySelectorAll(".abcjs-note, .abcjs-rest") : [];
  }

  function highlightElement(el) {
    clearHighlight();
    if (!el) return;
    highlightedEl = el;
    const paths = el.querySelectorAll("path");
    for (const p of paths) {
      p.dataset.origFill = p.getAttribute("fill") || "";
      p.dataset.origStroke = p.getAttribute("stroke") || "";
      p.setAttribute("fill", HIGHLIGHT_COLOR);
      p.setAttribute("stroke", HIGHLIGHT_COLOR);
    }
    const lines = el.querySelectorAll("line");
    for (const l of lines) {
      l.dataset.origStroke = l.getAttribute("stroke") || "";
      l.setAttribute("stroke", HIGHLIGHT_COLOR);
    }
  }

  function clearHighlight() {
    if (!highlightedEl) return;
    const paths = highlightedEl.querySelectorAll("path");
    for (const p of paths) {
      if (p.dataset.origFill !== undefined) p.setAttribute("fill", p.dataset.origFill);
      if (p.dataset.origStroke !== undefined) p.setAttribute("stroke", p.dataset.origStroke);
    }
    const lines = highlightedEl.querySelectorAll("line");
    for (const l of lines) {
      if (l.dataset.origStroke !== undefined) l.setAttribute("stroke", l.dataset.origStroke);
    }
    highlightedEl = null;
  }

  function startPlayback() {
    if (!currentExpectedNotes || currentExpectedNotes.length === 0) return;

    if (!playbackCtx) {
      playbackCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (playbackCtx.state === "suspended") playbackCtx.resume();

    isPlaying = true;
    const playBtn = document.getElementById("playBtn");
    playBtn.textContent = "\u25A0 Stop";

    // Disable other buttons during playback
    document.getElementById("generateBtn").disabled = true;

    const beatsPerMeasure = currentMeter === "3/4" ? 3 : 4;
    const secPerBeat = 60 / currentBpm;

    // --- Count-in (1 bar) ---
    const countInBars = 1;
    const countInBeats = countInBars * beatsPerMeasure;
    const countInDuration = countInBeats * secPerBeat;

    // Schedule count-in clicks
    const baseTime = playbackCtx.currentTime + 0.1;

    metronomeGainNode = playbackCtx.createGain();
    metronomeGainNode.gain.value = metronomeMuted ? 0 : 1;
    metronomeGainNode.connect(playbackCtx.destination);

    for (let beat = 0; beat < countInBeats; beat++) {
      const time = baseTime + beat * secPerBeat;
      const isAccent = beat === 0;
      playClick(playbackCtx, time, isAccent, metronomeGainNode);
    }

    // Count-in display (counts up: 1, 2, 3, 4...)
    let countUpBeat = 1;
    setStatus("Count in: " + countUpBeat);
    const countInInterval = setInterval(() => {
      countUpBeat++;
      if (countUpBeat <= countInBeats) {
        setStatus("Count in: " + countUpBeat);
      } else {
        setStatus("");
        clearInterval(countInInterval);
      }
    }, secPerBeat * 1000);
    playbackTimeouts.push(countInInterval); // so stopPlayback clears it

    // --- After count-in: schedule melody + metronome ---
    const melodyBaseTime = baseTime + countInDuration;
    const countInMs = countInDuration * 1000;

    // Schedule melody metronome clicks
    const totalBeats = currentNumMeasures * beatsPerMeasure;
    for (let beat = 0; beat < totalBeats; beat++) {
      const time = melodyBaseTime + beat * secPerBeat;
      const isAccent = (beat % beatsPerMeasure) === 0;
      playClick(playbackCtx, time, isAccent, metronomeGainNode);
    }

    const allEls = getAllNoteRestEls();

    for (let i = 0; i < currentExpectedNotes.length; i++) {
      const note = currentExpectedNotes[i];
      const noteStart = melodyBaseTime + note.startTime;

      // Schedule audio for pitched notes
      if (!note.isRest && note.midi != null) {
        playNote(playbackCtx, note.midi, noteStart, note.duration * 0.9);
      }

      // Schedule visual highlight
      if (i < allEls.length) {
        const highlightDelay = countInMs + note.startTime * 1000;
        const tid = setTimeout(() => {
          if (!isPlaying) return;
          highlightElement(allEls[i]);
        }, highlightDelay + 100); // +100ms to match audioCtx offset
        playbackTimeouts.push(tid);
      }
    }

    // Schedule end — clear highlight and restore button
    const lastNote = currentExpectedNotes[currentExpectedNotes.length - 1];
    const totalDuration = countInMs + (lastNote.startTime + lastNote.duration) * 1000 + 200;
    const endTid = setTimeout(() => {
      stopPlayback();
    }, totalDuration);
    playbackTimeouts.push(endTid);
  }

  function stopPlayback() {
    isPlaying = false;
    for (const tid of playbackTimeouts) clearTimeout(tid);
    playbackTimeouts = [];
    clearHighlight();
    clearStatus();

    // Close the audio context to kill all scheduled oscillators
    if (playbackCtx) {
      playbackCtx.close().catch(() => {});
      playbackCtx = null;
    }

    const playBtn = document.getElementById("playBtn");
    playBtn.textContent = "\u25B6 Play";

    // Re-enable buttons if we have a melody
    if (currentMeasures) {
      document.getElementById("generateBtn").disabled = false;
    }
  }

  function togglePlayback() {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  }

  // Wire up
  document.getElementById("generateBtn").addEventListener("click", generate);
  document.getElementById("playBtn").addEventListener("click", togglePlayback);
  document.getElementById("metronomeMuteBtn").addEventListener("click", function () {
    metronomeMuted = !metronomeMuted;
    this.classList.toggle("muted", metronomeMuted);
    this.innerHTML = metronomeMuted ? "\uD83D\uDD07 Metronome" : "\uD83D\uDD0A Metronome";
    if (metronomeGainNode) {
      metronomeGainNode.gain.value = metronomeMuted ? 0 : 1;
    }
  });
  document.getElementById("bpmSelect").addEventListener("change", function () {
    currentBpm = parseInt(this.value, 10);
    if (currentMeasures && currentMeter) {
      currentExpectedNotes = buildExpectedNotes(currentMeasures, currentBpm, currentMeter);
    }
  });

  // Generate on load
  generate();
})();

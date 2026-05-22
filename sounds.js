// Riddle Jeopardy - Synthesized Sound Effects Utility
// Powered entirely by the Web Audio API - no audio assets needed!

const SoundEffects = (() => {
  let audioCtx = null;
  let isMuted = false;

  // Initialize or resume the Audio Context
  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Helper to create a custom gain node with exponential decay
  function createGainNode(startVal, endVal, duration, startTime) {
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(startVal, startTime);
    gainNode.gain.exponentialRampToValueAtTime(endVal, startTime + duration);
    return gainNode;
  }

  return {
    toggleMute: () => {
      isMuted = !isMuted;
      localStorage.setItem('jeopardy_muted', isMuted ? 'true' : 'false');
      return isMuted;
    },
    setMuted: (muted) => {
      isMuted = muted;
      localStorage.setItem('jeopardy_muted', isMuted ? 'true' : 'false');
    },
    getMuted: () => {
      // Load saved preference
      const saved = localStorage.getItem('jeopardy_muted');
      if (saved !== null) {
        isMuted = saved === 'true';
      }
      return isMuted;
    },

    playClick: () => {
      if (isMuted) return;
      initAudio();
      const now = audioCtx.currentTime;

      const osc = audioCtx.createOscillator();
      const gain = createGainNode(0.1, 0.001, 0.08, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    },

    playTick: () => {
      if (isMuted) return;
      initAudio();
      const now = audioCtx.currentTime;

      const osc = audioCtx.createOscillator();
      const gain = createGainNode(0.05, 0.001, 0.04, now);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1000, now);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    },

    playCorrect: () => {
      if (isMuted) return;
      initAudio();
      const now = audioCtx.currentTime;

      // Play a happy major chord arpeggio
      const notes = [
        { freq: 523.25, time: 0.00 }, // C5
        { freq: 659.25, time: 0.08 }, // E5
        { freq: 784.00, time: 0.16 }, // G5
        { freq: 1046.50, time: 0.24 } // C6
      ];

      notes.forEach(note => {
        const osc = audioCtx.createOscillator();
        const gain = createGainNode(0.15, 0.001, 0.25, now + note.time);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.freq, now + note.time);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + note.time);
        osc.stop(now + note.time + 0.25);
      });
    },

    playIncorrect: () => {
      if (isMuted) return;
      initAudio();
      const now = audioCtx.currentTime;

      // Sad detuned downward buzz
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = createGainNode(0.2, 0.001, 0.45, now);

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(120, now);
      osc1.frequency.linearRampToValueAtTime(75, now + 0.45);

      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(124, now);
      osc2.frequency.linearRampToValueAtTime(77, now + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.45);
      osc2.stop(now + 0.45);
    },

    playDrumroll: (durationSeconds = 2.5) => {
      if (isMuted) return;
      initAudio();
      const now = audioCtx.currentTime;

      // Create white noise buffer for drumroll brush effect
      const bufferSize = audioCtx.sampleRate * durationSeconds;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);

      // Populate buffer with noise that fluctuates in amplitude (drumroll roll)
      for (let i = 0; i < bufferSize; i++) {
        const time = i / audioCtx.sampleRate;
        const amplitudeMod = 0.5 + 0.4 * Math.sin(2 * Math.PI * 45 * time) * Math.cos(2 * Math.PI * 5 * time);
        data[i] = (Math.random() * 2 - 1) * amplitudeMod;
      }

      const noiseNode = audioCtx.createBufferSource();
      noiseNode.buffer = buffer;

      // Bandpass filter to make it sound like a snare drum
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(250, now);
      filter.Q.setValueAtTime(1.5, now);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + durationSeconds - 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + durationSeconds);

      noiseNode.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noiseNode.start(now);
      noiseNode.stop(now + durationSeconds);

      // Low frequency tom-tom beat rapid pattern
      const drumInterval = 0.07;
      const numBeats = Math.floor((durationSeconds - 0.2) / drumInterval);

      for (let i = 0; i < numBeats; i++) {
        const beatTime = now + (i * drumInterval);
        const osc = audioCtx.createOscillator();
        const drumGain = createGainNode(0.08, 0.001, 0.06, beatTime);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(90 + (Math.sin(i) * 5), beatTime); // slight pitch variation

        osc.connect(drumGain);
        drumGain.connect(audioCtx.destination);

        osc.start(beatTime);
        osc.stop(beatTime + 0.06);
      }

      // Add a huge final crash hit!
      const crashTime = now + durationSeconds - 0.2;

      // Sub-bass hit
      const subOsc = audioCtx.createOscillator();
      const subGain = createGainNode(0.25, 0.001, 0.4, crashTime);
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(150, crashTime);
      subOsc.frequency.exponentialRampToValueAtTime(45, crashTime + 0.4);
      subOsc.connect(subGain);
      subGain.connect(audioCtx.destination);
      subOsc.start(crashTime);
      subOsc.stop(crashTime + 0.4);

      // High cymbal crash noise
      const crashSize = audioCtx.sampleRate * 1.5;
      const crashBuffer = audioCtx.createBuffer(1, crashSize, audioCtx.sampleRate);
      const crashData = crashBuffer.getChannelData(0);
      for (let i = 0; i < crashSize; i++) {
        crashData[i] = Math.random() * 2 - 1;
      }
      const crashSource = audioCtx.createBufferSource();
      crashSource.buffer = crashBuffer;

      const crashFilter = audioCtx.createBiquadFilter();
      crashFilter.type = 'highpass';
      crashFilter.frequency.setValueAtTime(6000, crashTime);

      const crashGain = createGainNode(0.18, 0.001, 1.2, crashTime);

      crashSource.connect(crashFilter);
      crashFilter.connect(crashGain);
      crashGain.connect(audioCtx.destination);

      crashSource.start(crashTime);
      crashSource.stop(crashTime + 1.5);
    },

    playVictory: () => {
      if (isMuted) return;
      initAudio();
      const now = audioCtx.currentTime;

      // Celebratory melody arpeggio sequence
      const melody = [
        { freq: 261.63, duration: 0.12, delay: 0.0 },  // C4
        { freq: 329.63, duration: 0.12, delay: 0.12 }, // E4
        { freq: 392.00, duration: 0.12, delay: 0.24 }, // G4
        { freq: 523.25, duration: 0.18, delay: 0.36 }, // C5
        { freq: 392.00, duration: 0.12, delay: 0.54 }, // G4
        { freq: 523.25, duration: 0.18, delay: 0.66 }, // C5
        { freq: 659.25, duration: 0.18, delay: 0.84 }, // E5
        { freq: 784.00, duration: 0.18, delay: 1.02 }, // G5
        { freq: 1046.50, duration: 0.40, delay: 1.20 } // C6 (triumphant)
      ];

      melody.forEach(note => {
        const osc = audioCtx.createOscillator();
        const gain = createGainNode(0.12, 0.001, note.duration, now + note.delay);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.freq, now + note.delay);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + note.delay);
        osc.stop(now + note.delay + note.duration);
      });

      // Underpinning brass chord to make it richer
      const chords = [
        { freqs: [130.81, 164.81, 196.00], time: 0.0 }, // C3 chord
        { freqs: [261.63, 329.63, 392.00], time: 0.66 }, // C4 chord
        { freqs: [261.63, 392.00, 523.25], time: 1.20 }  // Triumphant double C chord
      ];

      chords.forEach(c => {
        c.freqs.forEach(f => {
          const osc = audioCtx.createOscillator();
          const gain = createGainNode(0.06, 0.001, 0.5, now + c.time);
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(f, now + c.time);
          // High cut filter to sound like warm horns
          const lp = audioCtx.createBiquadFilter();
          lp.type = 'lowpass';
          lp.frequency.setValueAtTime(600, now + c.time);

          osc.connect(lp);
          lp.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start(now + c.time);
          osc.stop(now + c.time + 0.5);
        });
      });
    }
  };
})();

let muted = true;
let audioContext = null;

const TONES = {
  click: { frequency: 440, duration: 0.035, gain: 0.025 },
  success: { frequency: 740, duration: 0.09, gain: 0.035 },
  wrong: { frequency: 180, duration: 0.08, gain: 0.03 },
};

export function setSoundMuted(nextMuted) {
  muted = nextMuted;
}

export function isSoundMuted() {
  return muted;
}

export function playTone(kind = 'click') {
  if (muted || typeof window === 'undefined') return;

  const tone = TONES[kind] ?? TONES.click;
  const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
  if (!AudioContextClass) return;

  audioContext = audioContext ?? new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(tone.frequency, now);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(tone.gain, now + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + tone.duration);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + tone.duration);
}

// Web Audio API Sound Synthesizer (100% Offline, Zero External Dependencies)

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  } catch {
    return null;
  }
}

// Sound state persistence
let soundMuted = false;
try {
  soundMuted = localStorage.getItem('lucera_sound_muted') === 'true';
} catch {}

export function isSoundMuted(): boolean {
  return soundMuted;
}

export function toggleSoundMute(): boolean {
  soundMuted = !soundMuted;
  try {
    localStorage.setItem('lucera_sound_muted', soundMuted ? 'true' : 'false');
  } catch {}
  return soundMuted;
}

/**
 * 1. "TING TING!" Sound Effect
 * Cheerful, bright crystal chime for correct answers and victories
 */
export function playCorrectTingTing(): void {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // First Ting (High C6 ~ 1046.5 Hz)
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();
  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(1046.5, now);
  osc1.frequency.exponentialRampToValueAtTime(1318.5, now + 0.12); // slides up to E6

  gain1.gain.setValueAtTime(0.001, now);
  gain1.gain.linearRampToValueAtTime(0.28, now + 0.02);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  osc1.connect(gain1);
  gain1.connect(ctx.destination);
  osc1.start(now);
  osc1.stop(now + 0.36);

  // Second Ting (Higher G6 ~ 1567.98 Hz -> C7 2093 Hz)
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(1567.98, now + 0.14);
  osc2.frequency.exponentialRampToValueAtTime(2093.0, now + 0.26);

  gain2.gain.setValueAtTime(0.001, now + 0.14);
  gain2.gain.linearRampToValueAtTime(0.32, now + 0.16);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

  // Add subtle shimmer overtone
  const shimmer = ctx.createOscillator();
  const shimmerGain = ctx.createGain();
  shimmer.type = 'triangle';
  shimmer.frequency.setValueAtTime(3135.96, now + 0.14);
  shimmerGain.gain.setValueAtTime(0.001, now + 0.14);
  shimmerGain.gain.linearRampToValueAtTime(0.08, now + 0.16);
  shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

  shimmer.connect(shimmerGain);
  shimmerGain.connect(ctx.destination);
  shimmer.start(now + 0.14);
  shimmer.stop(now + 0.46);

  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start(now + 0.14);
  osc2.stop(now + 0.56);
}

/**
 * 2. "EEEE / BZZT!" Sound Effect
 * Playful, retro game show buzzer for wrong answers
 */
export function playErrorBuzzer(): void {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Dissonant dual oscillator for the "eeee / uh-oh" buzz
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'sawtooth';
  osc2.type = 'sawtooth';

  // Slightly detuned frequencies around 155Hz & 142Hz for classic error buzz
  osc1.frequency.setValueAtTime(165, now);
  osc1.frequency.exponentialRampToValueAtTime(110, now + 0.28);

  osc2.frequency.setValueAtTime(155, now);
  osc2.frequency.exponentialRampToValueAtTime(102, now + 0.28);

  // Soft lowpass filter to prevent harsh piercing sound
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(650, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.24, now + 0.02);
  gain.gain.setValueAtTime(0.2, now + 0.15);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.33);
  osc2.stop(now + 0.33);
}

/**
 * 3. Tab Switch Navigation Blip
 * Soft futuristic cyber transition click
 */
export function playTabSwitch(): void {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(587.33, now); // D5
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.06); // A5

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.09, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.09);
}

/**
 * 4. Coin Reward Chime
 */
export function playCoinReward(): void {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(987.77, now); // B5
  osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.31);
}

/**
 * 5. Retro Terminal Glitch / Beep
 */
export function playGlitchSound(): void {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(440, now);
  osc.frequency.setValueAtTime(220, now + 0.03);
  osc.frequency.setValueAtTime(880, now + 0.06);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.08, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.13);
}

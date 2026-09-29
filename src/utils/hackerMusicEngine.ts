// Động cơ âm thanh nhạc nền cục bộ 100% cho "Music with hacker"
// Tự tổng hợp bằng Web Audio API, không phụ thuộc mạng ngoài, không giật lag.
// Danh sách phong phú đa dạng: Nhạc Mạnh, Nhạc Anime, Nhạc Thư Giãn Study With Me, Nhạc Trinh Thám

export type MusicIntensity = 'intense' | 'anime' | 'study_chill' | 'detective';

export interface HackerTrack {
  id: string;
  titleVi: string;
  titleEn: string;
  genreVi: string;
  genreEn: string;
  category: MusicIntensity;
  categoryLabelVi: string;
  categoryLabelEn: string;
  categoryColor: string;
  bpm: number;
  emoji: string;
  descriptionVi: string;
  descriptionEn: string;
}

export const HACKER_PLAYLIST: HackerTrack[] = [
  // ================= 1. NHÓM THƯ GIÃN STUDY WITH ME =================
  {
    id: 'study-rain-lofi',
    titleVi: 'Study With Me • Quán Cafe Mưa Rơi & Lofi Jazz',
    titleEn: 'Study With Me • Rainy Cafe & Lofi Jazz',
    genreVi: 'Study With Me • Mưa & Đĩa Than Vinyl',
    genreEn: 'Study With Me • Rain & Vinyl Crackle',
    category: 'study_chill',
    categoryLabelVi: 'STUDY WITH ME',
    categoryLabelEn: 'STUDY WITH ME',
    categoryColor: 'bg-emerald-600 text-white',
    bpm: 70,
    emoji: '☕',
    descriptionVi: 'Âm thanh mưa rơi êm dịu, đĩa than vinyl ấm áp kết hợp hợp âm jazz Rhodes thư giãn tuyệt đối cho học tập.',
    descriptionEn: 'Gentle raindrops, warm vinyl crackle, and soothing Rhodes jazz chords crafted for peaceful study.'
  },
  {
    id: 'study-cozy-guitar',
    titleVi: 'Study With Me • Guitar Dây Mộc & Nắng Sáng',
    titleEn: 'Study With Me • Acoustic Nylon Guitar',
    genreVi: 'Study With Me • Guitar Mộc Mạc',
    genreEn: 'Study With Me • Fingerstyle Acoustic',
    category: 'study_chill',
    categoryLabelVi: 'STUDY WITH ME',
    categoryLabelEn: 'STUDY WITH ME',
    categoryColor: 'bg-amber-600 text-white',
    bpm: 74,
    emoji: '🎸',
    descriptionVi: 'Mô phỏng vật lý dây đàn guitar nylon gảy mộc mạc, tạo cảm giác thư thái như buổi sáng ngồi đọc sách bên cửa sổ.',
    descriptionEn: 'Physical modeling acoustic nylon guitar fingerpicking with gentle morning warmth for reading and focus.'
  },
  {
    id: 'study-deep-focus',
    titleVi: 'Study With Me • 432Hz Thiền Định & Sóng Não Tập Trung',
    titleEn: 'Study With Me • 432Hz Deep Focus Ambient',
    genreVi: 'Study With Me • Sóng Não Tĩnh Lặng Không Trống',
    genreEn: 'Study With Me • Harmonic Ambient Drone (No Drums)',
    category: 'study_chill',
    categoryLabelVi: 'STUDY WITH ME',
    categoryLabelEn: 'STUDY WITH ME',
    categoryColor: 'bg-teal-600 text-white',
    bpm: 60,
    emoji: '🧘',
    descriptionVi: 'Dải hòa âm sóng 432Hz êm ả cùng chuông pha lê dịu nhẹ, không có nhịp trống gắt, tối ưu cho nghiên cứu tài liệu bảo mật.',
    descriptionEn: '432Hz lush harmonic drones and singing bowl chimes with zero percussive distraction for deep concentration.'
  },
  {
    id: 'study-ghibli-piano',
    titleVi: 'Study With Me • Piano Mộc Hoạt Hình Ghibli',
    titleEn: 'Study With Me • Nostalgic Ghibli Felt Piano',
    genreVi: 'Study With Me • Điệu Waltz Piano Êm Dịu',
    genreEn: 'Study With Me • Gentle Piano Waltz',
    category: 'study_chill',
    categoryLabelVi: 'STUDY WITH ME',
    categoryLabelEn: 'STUDY WITH ME',
    categoryColor: 'bg-sky-600 text-white',
    bpm: 76,
    emoji: '🍃',
    descriptionVi: 'Giai điệu piano búa nỉ mộc mạc hoài niệm lấy cảm hứng từ phim hoạt hình Ghibli, nhẹ nhàng xoa dịu tâm trí.',
    descriptionEn: 'Warm felt piano waltz with nostalgic Ghibli-inspired melodies that calm the mind during detective missions.'
  },
  {
    id: 'study-tokyo-night',
    titleVi: 'Study With Me • Tokyo Đêm Muộn & Trà Ấm',
    titleEn: 'Study With Me • Tokyo Midnight Chillhop',
    genreVi: 'Study With Me • Chillhop Đêm Tĩnh Lặng',
    genreEn: 'Study With Me • Late-Night Chillhop',
    category: 'study_chill',
    categoryLabelVi: 'STUDY WITH ME',
    categoryLabelEn: 'STUDY WITH ME',
    categoryColor: 'bg-indigo-600 text-white',
    bpm: 78,
    emoji: '🍵',
    descriptionVi: 'Hợp âm City Pop lofi đêm muộn, nhịp bass êm đềm như đang ngồi quán trà tĩnh lặng ngắm ánh đèn thành phố.',
    descriptionEn: 'City Pop lofi chord progressions with relaxed basslines like studying in a cozy Tokyo midnight cafe.'
  },

  // ================= 2. NHÓM NHẠC ANIME =================
  {
    id: 'shonen-awakening',
    titleVi: 'Nhạc Anime • Đại Chiến Shonen Hào Hùng',
    titleEn: 'Anime • Shonen Battle Opening',
    genreVi: 'Nhạc Anime • Khúc Mở Đầu Hào Khí',
    genreEn: 'Anime • Epic Rock Opening',
    category: 'anime',
    categoryLabelVi: 'NHẠC ANIME',
    categoryLabelEn: 'ANIME',
    categoryColor: 'bg-fuchsia-600 text-white',
    bpm: 128,
    emoji: '⚔️',
    descriptionVi: 'Vòng hợp âm hoàng gia J-Rock sôi sục tinh thần chiến đấu, tràn đầy nhiệt huyết giải cứu không gian mạng.',
    descriptionEn: 'Epic J-Rock royal chord progression with high-energy lead synth and driving rock drums.'
  },
  {
    id: 'kawaii-hacker',
    titleVi: 'Nhạc Anime • Kawaii Pop Chibi Idol :3',
    titleEn: 'Anime • Kawaii Chibi Idol Pop :3',
    genreVi: 'Nhạc Anime • Chibi Dễ Thương',
    genreEn: 'Anime • Cute Chibi Electronic',
    category: 'anime',
    categoryLabelVi: 'NHẠC ANIME',
    categoryLabelEn: 'ANIME',
    categoryColor: 'bg-pink-500 text-white',
    bpm: 120,
    emoji: '🌸',
    descriptionVi: 'Chuông thủy tinh celesta và đàn marimba nhảy múa vui tươi, cực kỳ đáng yêu đúng chuẩn phong cách anime.',
    descriptionEn: 'Bubbly celesta bells and marimba bouncing with cheerful pentatonic melody in kawaii anime style.'
  },
  {
    id: 'anime-peaceful-koto',
    titleVi: 'Nhạc Anime • Vườn Hoa Anh Đào & Đàn Koto',
    titleEn: 'Anime • Peaceful Koto Blossom Garden',
    genreVi: 'Nhạc Anime • Cổ Phong Yên Bình',
    genreEn: 'Anime • Traditional Asian Harp & Flute',
    category: 'anime',
    categoryLabelVi: 'NHẠC ANIME',
    categoryLabelEn: 'ANIME',
    categoryColor: 'bg-rose-500 text-white',
    bpm: 72,
    emoji: '🎋',
    descriptionVi: 'Tiếng đàn tranh Koto mộc mạc và sáo trúc êm đềm, đưa thám tử vào không gian thanh tịnh của vườn hoa anh đào.',
    descriptionEn: 'Traditional Koto harp string plucking and soothing bamboo flute creating a tranquil garden atmosphere.'
  },

  // ================= 3. NHÓM NHẠC MẠNH =================
  {
    id: 'cyber-overdrive',
    titleVi: 'Nhạc Mạnh • Hard Techno Acid 303',
    titleEn: 'Intense • Hard Techno Acid 303',
    genreVi: 'Nhạc Mạnh • Techno Năng Lượng Cao',
    genreEn: 'Intense • High Energy Acid Techno',
    category: 'intense',
    categoryLabelVi: 'MẠNH',
    categoryLabelEn: 'INTENSE',
    categoryColor: 'bg-rose-600 text-white',
    bpm: 144,
    emoji: '🔥',
    descriptionVi: 'Âm bass Acid 303 dồn dập, nhịp trống dứt khoát 144 BPM tiếp thêm 100% năng lượng chiến đấu trong mini-game.',
    descriptionEn: 'Screaming 303 acid bassline with 144 BPM 4-on-the-floor kick for intense mini-game action.'
  },
  {
    id: 'hacker-chase',
    titleVi: 'Nhạc Mạnh • Breakbeat Rượt Đuổi Kịch Tính',
    titleEn: 'Intense • Cyber Chase Breakbeat',
    genreVi: 'Nhạc Mạnh • Trống Breakbeat Tốc Độ',
    genreEn: 'Intense • Fast Syncopated Breakbeat',
    category: 'intense',
    categoryLabelVi: 'MẠNH',
    categoryLabelEn: 'INTENSE',
    categoryColor: 'bg-orange-600 text-white',
    bpm: 134,
    emoji: '⚡',
    descriptionVi: 'Nhịp trống đứt gãy kịch tính, âm synth cưa giật gân tái hiện cuộc rượt đuổi kẻ lừa đảo nghẹt thở.',
    descriptionEn: 'High-octane jungle/breakbeat syncopation with dark reese bass and tension glitch alarms.'
  },
  {
    id: 'cyber-phonk',
    titleVi: 'Nhạc Mạnh • Cyber Drift Phonk',
    titleEn: 'Intense • Cyber Drift Phonk',
    genreVi: 'Nhạc Mạnh • Chuông Bò 808 & Bass Trầm',
    genreEn: 'Intense • 808 Cowbell Melody & Glide Bass',
    category: 'intense',
    categoryLabelVi: 'MẠNH',
    categoryLabelEn: 'INTENSE',
    categoryColor: 'bg-purple-600 text-white',
    bpm: 130,
    emoji: '🏎️',
    descriptionVi: 'Giai điệu chuông bò 808 điện tử đặc trưng của dòng nhạc Drift Phonk, bass dội uy lực cuốn hút.',
    descriptionEn: 'Iconic tuned 808 cowbell melodies and heavy sliding 808 sub bass for gaming hype.'
  },

  // ================= 4. NHÓM NHẠC TRINH THÁM =================
  {
    id: 'neon-detective',
    titleVi: 'Nhạc Trinh Thám • Phá Án Đêm Synthwave 80s',
    titleEn: 'Detective • Neon Synthwave 80s',
    genreVi: 'Nhạc Trinh Thám • Huyền Bí Retro',
    genreEn: 'Detective • Mysterious Cyber Noir',
    category: 'detective',
    categoryLabelVi: 'TRINH THÁM',
    categoryLabelEn: 'DETECTIVE',
    categoryColor: 'bg-cyan-600 text-white',
    bpm: 104,
    emoji: '🕵️',
    descriptionVi: 'Tiếng bassline analog thập niên 80 huyền bí, tạo bầu không khí điều tra chuyên nghiệp trong trụ sở 3D.',
    descriptionEn: 'Retro 80s analog bass arpeggios with mysterious cyber noir investigation vibes.'
  }
];

class ProceduralMusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private ambientNoiseNode: AudioNode | null = null;
  private ambientGain: GainNode | null = null;
  private isPlaying: boolean = false;
  private currentTrackId: string = 'study-rain-lofi';
  private timerId: number | null = null;
  private step: number = 0;
  private volume: number = 0.55;
  private listeners: Set<(isPlaying: boolean, trackId: string) => void> = new Set();

  constructor() {
    try {
      const savedVol = localStorage.getItem('lucera_music_vol');
      if (savedVol) {
        this.volume = Math.max(0, Math.min(1, parseFloat(savedVol)));
      }
      const savedTrack = localStorage.getItem('lucera_current_track');
      if (savedTrack && HACKER_PLAYLIST.some(t => t.id === savedTrack)) {
        this.currentTrackId = savedTrack;
      }
    } catch {}
  }

  private initContext() {
    if (this.ctx) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    } catch (e) {
      console.warn('AudioContext không khả dụng:', e);
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    try {
      localStorage.setItem('lucera_music_vol', this.volume.toString());
    } catch {}
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getCurrentTrack(): HackerTrack {
    return HACKER_PLAYLIST.find(t => t.id === this.currentTrackId) || HACKER_PLAYLIST[0];
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public subscribe(cb: (isPlaying: boolean, trackId: string) => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach(cb => cb(this.isPlaying, this.currentTrackId));
  }

  public start(trackId?: string) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (trackId && trackId !== this.currentTrackId) {
      this.currentTrackId = trackId;
      try {
        localStorage.setItem('lucera_current_track', trackId);
      } catch {}
    }

    if (this.isPlaying) {
      this.stopSequencer();
    }

    this.isPlaying = true;
    this.step = 0;
    this.handleAmbientLayer(this.currentTrackId);
    this.runSequencer();
    this.notify();
  }

  public stop() {
    this.isPlaying = false;
    this.stopSequencer();
    this.stopAmbientLayer();
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  public nextTrack() {
    const idx = HACKER_PLAYLIST.findIndex(t => t.id === this.currentTrackId);
    const nextIdx = (idx + 1) % HACKER_PLAYLIST.length;
    this.selectTrack(HACKER_PLAYLIST[nextIdx].id);
  }

  public prevTrack() {
    const idx = HACKER_PLAYLIST.findIndex(t => t.id === this.currentTrackId);
    const prevIdx = (idx - 1 + HACKER_PLAYLIST.length) % HACKER_PLAYLIST.length;
    this.selectTrack(HACKER_PLAYLIST[prevIdx].id);
  }

  public selectTrack(trackId: string) {
    this.currentTrackId = trackId;
    try {
      localStorage.setItem('lucera_current_track', trackId);
    } catch {}
    if (this.isPlaying) {
      this.start(trackId);
    } else {
      this.notify();
    }
  }

  private stopSequencer() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private handleAmbientLayer(trackId: string) {
    this.stopAmbientLayer();
    if (!this.ctx || !this.masterGain) return;

    // Kích hoạt tiếng mưa tự nhiên và tiếng đĩa than vinyl cho track study-rain-lofi
    if (trackId === 'study-rain-lofi') {
      try {
        const bufferSize = this.ctx.sampleRate * 2;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          // Pink/Brown noise giả lập mưa rơi
          lastOut = (lastOut + 0.02 * white) / 1.02;
          output[i] = lastOut * 3.2;

          // Tiếng tí tách của đĩa than (vinyl crackle)
          if (Math.random() < 0.0007) {
            output[i] += (Math.random() - 0.5) * 0.8;
          }
        }

        const source = this.ctx.createBufferSource();
        source.buffer = noiseBuffer;
        source.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, this.ctx.currentTime);

        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(0.042, this.ctx.currentTime);

        source.connect(filter);
        filter.connect(this.ambientGain);
        this.ambientGain.connect(this.masterGain);

        source.start();
        this.ambientNoiseNode = source;
      } catch {}
    }
  }

  private stopAmbientLayer() {
    if (this.ambientNoiseNode) {
      try {
        (this.ambientNoiseNode as AudioScheduledSourceNode).stop();
        this.ambientNoiseNode.disconnect();
      } catch {}
      this.ambientNoiseNode = null;
    }
    if (this.ambientGain) {
      try {
        this.ambientGain.disconnect();
      } catch {}
      this.ambientGain = null;
    }
  }

  private runSequencer() {
    const track = this.getCurrentTrack();
    // 16th-note interval in milliseconds
    const intervalMs = Math.round((60000 / track.bpm) / 4);

    this.timerId = window.setInterval(() => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      this.tickStep(this.step % 32, track.id);
      this.step++;
    }, intervalMs);
  }

  private tickStep(step: number, trackId: string) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    switch (trackId) {
      // 1. Study With Me
      case 'study-rain-lofi':
        this.playStudyRainLofiStep(step, now);
        break;
      case 'study-cozy-guitar':
        this.playStudyGuitarStep(step, now);
        break;
      case 'study-deep-focus':
        this.playStudyDeepFocusStep(step, now);
        break;
      case 'study-ghibli-piano':
        this.playStudyGhibliPianoStep(step, now);
        break;
      case 'study-tokyo-night':
        this.playStudyTokyoNightStep(step, now);
        break;

      // 2. Nhạc Anime
      case 'shonen-awakening':
        this.playShonenAwakeningStep(step, now);
        break;
      case 'kawaii-hacker':
        this.playKawaiiHackerStep(step, now);
        break;
      case 'anime-peaceful-koto':
        this.playAnimeKotoStep(step, now);
        break;

      // 3. Nhạc Mạnh
      case 'cyber-overdrive':
        this.playCyberOverdriveStep(step, now);
        break;
      case 'hacker-chase':
        this.playHackerChaseStep(step, now);
        break;
      case 'cyber-phonk':
        this.playCyberPhonkStep(step, now);
        break;

      // 4. Nhạc Trinh Thám
      case 'neon-detective':
        this.playNeonDetectiveStep(step, now);
        break;

      default:
        this.playStudyRainLofiStep(step, now);
    }
  }

  // Tần số nốt nhạc chính xác (Hz)
  private note(name: string): number {
    const table: Record<string, number> = {
      'C2': 65.41, 'D2': 73.42, 'Eb2': 77.78, 'E2': 82.41, 'F2': 87.31, 'G2': 98.00, 'Ab2': 103.83, 'A2': 110.00, 'Bb2': 116.54, 'B2': 123.47,
      'C3': 130.81, 'D3': 146.83, 'Eb3': 155.56, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'Ab3': 207.65, 'A3': 220.00, 'Bb3': 233.08, 'B3': 246.94,
      'C4': 261.63, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'Ab4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88,
      'C5': 523.25, 'D5': 587.33, 'Eb5': 622.25, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'Ab5': 830.61, 'A5': 880.00, 'Bb5': 987.77, 'B5': 987.77,
      'C6': 1046.50, 'D6': 1174.66, 'E6': 1318.51, 'G6': 1567.98, 'A6': 1760.00
    };
    return table[name] || 440;
  }

  // ================= 1. STUDY WITH ME: QUÁN CAFE MƯA RƠI & LOFI JAZZ =================
  private playStudyRainLofiStep(step: number, now: number) {
    // Trống boom-bap lofi ấm áp
    if (step % 16 === 0 || step % 16 === 10) {
      this.playLofiSoftKick(now, 92, 38, 0.22);
    }
    // Rimshot / snap lofi ở phách 8
    if (step % 16 === 8) {
      this.playLofiSnareSnap(now, 0.16);
    }
    // Hi-hat lofi nhẹ nhàng
    if (step % 4 === 2) {
      this.playHiHat(now, 0.024, false);
    }

    // Hợp âm điện Fender Rhodes jazz ấm áp (Dm9 -> G13 -> Cmaj9 -> Am7)
    if (step % 8 === 0) {
      const chords = [
        ['D3', 'F3', 'A3', 'C4', 'E4'], // Dm9
        ['G2', 'F3', 'B3', 'E4'],       // G13
        ['C3', 'E3', 'G3', 'B3', 'D4'], // Cmaj9
        ['A2', 'G3', 'C4', 'E4']        // Am7
      ];
      const chord = chords[Math.floor(step / 8)];
      chord.forEach((n, i) => {
        this.playRhodesKey(this.note(n), now + (i * 0.025), 0.55, 0.12);
      });
    }

    // Sub-bass ấm áp dìu dặt
    if (step % 8 === 0 || step % 8 === 4) {
      const subNotes = ['D2', 'G2', 'C2', 'A2'][Math.floor(step / 8)];
      this.playTone(this.note(subNotes), now, 0.42, 'sine', 0.2, 160);
    }
  }

  // ================= 2. STUDY WITH ME: GUITAR DÂY MỘC & NẮNG SÁNG =================
  private playStudyGuitarStep(step: number, now: number) {
    // Shaker gỗ nhẹ nhàng
    if (step % 2 === 0) {
      this.playShaker(now, 0.018);
    }

    // Rải arpeggio guitar nylon ấm áp (G -> Em -> C -> D)
    const guitarProg = [
      ['G2', 'D3', 'G3', 'B3', 'D4', 'B3', 'G3', 'D3'],
      ['E2', 'B2', 'E3', 'G3', 'B3', 'G3', 'E3', 'B2'],
      ['C3', 'G3', 'C4', 'E4', 'G4', 'E4', 'C4', 'G3'],
      ['D3', 'A3', 'D4', 'F#4' in this ? 'D4' : 'A3', 'D4', 'A3', 'F4', 'D3']
    ];
    const bar = Math.floor(step / 8);
    const subIdx = step % 8;
    const noteName = guitarProg[bar][subIdx];

    // Mô phỏng Karplus-Strong string pluck
    this.playPluckedString(this.note(noteName), now, 0.65, 0.22);

    // Nốt bass ngón cái ở đầu ô nhịp
    if (step % 8 === 0) {
      const bassNotes = ['G2', 'E2', 'C2', 'D2'];
      this.playPluckedString(this.note(bassNotes[bar]), now, 0.9, 0.28);
    }
  }

  // ================= 3. STUDY WITH ME: 432Hz THIỀN ĐỊNH & SÓNG NÃO TẬP TRUNG =================
  private playStudyDeepFocusStep(step: number, now: number) {
    // Hoàn toàn không có trống. Chỉ có dải hòa âm pad 432Hz sâu lắng
    if (step % 16 === 0) {
      const padChords = [
        ['C3', 'G3', 'C4', 'E4'], // C Maj
        ['F3', 'C4', 'F4', 'A4'], // F Maj
        ['A2', 'E3', 'A3', 'C4'], // A Min
        ['G2', 'D3', 'G3', 'B3']  // G Maj
      ];
      const ch = padChords[Math.floor(step / 16) % padChords.length];
      ch.forEach((n) => {
        this.playWarmPad(this.note(n), now, 2.8, 0.09);
      });
    }

    // Tiếng chuông pha lê tĩnh lặng (Singing bowl chime)
    if (step === 0 || step === 16) {
      this.playSingingBowl(this.note('C5'), now, 2.5, 0.08);
    }
  }

  // ================= 4. STUDY WITH ME: PIANO GHIBLI HOÀI NIỆM =================
  private playStudyGhibliPianoStep(step: number, now: number) {
    // Chuỗi hợp âm điệu waltz 3/4 mộc mạc Ghibli
    const ghibliArp = [
      'C4', 'E4', 'G4', 'C5', 'E5', 'C5',
      'B3', 'D4', 'G4', 'B4', 'D5', 'B4',
      'A3', 'C4', 'E4', 'A4', 'C5', 'A4',
      'G3', 'B3', 'E4', 'G4', 'B4', 'G4',
      'F3', 'A3', 'C4', 'F4', 'A4', 'F4',
      'C4', 'E4', 'G4', 'C5', 'E5', 'C5'
    ];
    const n = ghibliArp[step % ghibliArp.length];
    this.playFeltPiano(this.note(n), now, 0.45, 0.22);

    // Bass piano sâu lắng
    if (step % 6 === 0) {
      const rootNotes = ['C2', 'B2', 'A2', 'G2', 'F2', 'C2'];
      const r = rootNotes[Math.floor(step / 6) % rootNotes.length];
      this.playTone(this.note(r), now, 0.7, 'sine', 0.18, 180);
    }
  }

  // ================= 5. STUDY WITH ME: TOKYO ĐÊM MUỘN & TRÀ ẤM =================
  private playStudyTokyoNightStep(step: number, now: number) {
    if (step % 16 === 0 || step % 16 === 11) {
      this.playLofiSoftKick(now, 100, 40, 0.2);
    }
    if (step % 16 === 8) {
      this.playLofiSnareSnap(now, 0.15);
    }
    if (step % 2 === 1) {
      this.playHiHat(now, 0.02, false);
    }

    // City Pop chords
    if (step % 8 === 0) {
      const chordList = [
        ['F3', 'A3', 'C4', 'E4'],
        ['E3', 'G3', 'B3', 'D4'],
        ['D3', 'F3', 'A3', 'C4'],
        ['C3', 'E3', 'G3', 'B3']
      ];
      const ch = chordList[Math.floor(step / 8)];
      ch.forEach((n, idx) => {
        this.playRhodesKey(this.note(n), now + (idx * 0.025), 0.5, 0.11);
      });
    }

    // Solo guitar ấm áp
    if (step % 4 === 3) {
      const solo = ['A4', 'C5', 'D5', 'E5', 'G5', 'A5'];
      const sn = solo[Math.floor(step / 3) % solo.length];
      this.playTone(this.note(sn), now, 0.28, 'sine', 0.13, 1400);
    }
  }

  // ================= 6. NHẠC ANIME: ĐẠI CHIẾN SHONEN HÀO HÙNG =================
  private playShonenAwakeningStep(step: number, now: number) {
    if (step % 4 === 0) this.playHeavyKick(now, 145, 50, 0.26);
    if (step === 4 || step === 12 || step === 20 || step === 28) this.playHardSnare(now, 0.24);
    this.playHiHat(now, 0.04, step % 2 === 0);

    // Vòng hợp âm J-Rock F -> G -> Em -> Am
    let chordRoot = 'F2';
    let leadNote = 'A4';
    if (step < 8) {
      chordRoot = 'F2';
      leadNote = ['A4', 'C5', 'F5', 'A5'][step % 4];
    } else if (step < 16) {
      chordRoot = 'G2';
      leadNote = ['B4', 'D5', 'G5', 'B5'][step % 4];
    } else if (step < 24) {
      chordRoot = 'E2';
      leadNote = ['G4', 'B4', 'E5', 'G5'][step % 4];
    } else {
      chordRoot = 'A2';
      leadNote = ['E5', 'A5', 'C6', 'E6'][step % 4];
    }

    if (step % 2 === 0) {
      this.playTone(this.note(chordRoot), now, 0.12, 'sawtooth', 0.2, 550);
    }
    if (step % 2 === 1) {
      this.playTone(this.note(leadNote), now, 0.15, 'square', 0.12, 2800);
    }
  }

  // ================= 7. NHẠC ANIME: KAWAII POP CHIBI IDOL :3 =================
  private playKawaiiHackerStep(step: number, now: number) {
    if (step % 8 === 0 || step % 8 === 6) {
      this.playHeavyKick(now, 130, 65, 0.18);
    }
    if (step % 8 === 4) {
      this.playHardSnare(now, 0.15);
    }
    this.playHiHat(now, 0.03, step % 2 === 1);

    const kawaiiMelody = [
      'C5', 'E5', 'G5', 'A5', 'G5', 'E5', 'D5', 'E5',
      'C5', 'D5', 'E5', 'G5', 'A5', 'C6', 'A5', 'G5',
      'E5', 'G5', 'A5', 'C6', 'D6', 'C6', 'A5', 'G5',
      'E5', 'D5', 'C5', 'D5', 'E5', 'G5', 'C6', 'C6'
    ];
    const noteName = kawaiiMelody[step % 32];
    this.playTone(this.note(noteName), now, 0.15, 'sine', 0.24, 4200);
    this.playTone(this.note(noteName) * 2, now, 0.08, 'triangle', 0.06, 5000);

    const bass = ['C3', 'G2', 'A2', 'F2'][Math.floor(step / 8)];
    if (step % 4 === 0 || step % 4 === 2) {
      this.playTone(this.note(bass), now, 0.11, 'triangle', 0.2, 400);
    }
  }

  // ================= 8. NHẠC ANIME: VƯỜN HOA ANH ĐÀO & ĐÀN KOTO =================
  private playAnimeKotoStep(step: number, now: number) {
    // Chuông gió tự nhiên
    if (step % 16 === 0) {
      this.playWindChimes(now, 0.035);
    }

    // Thang âm truyền thống Nhật Bản In-sen (D, Eb, G, A, C)
    const kotoScale = ['D4', 'Eb4', 'G4', 'A4', 'C5', 'D5', 'Eb5', 'D5'];
    if (step % 2 === 0) {
      const kn = kotoScale[Math.floor(step / 2) % kotoScale.length];
      this.playPluckedString(this.note(kn), now, 0.7, 0.25, 1800);
    }

    // Sáo trúc du dương
    if (step % 8 === 4) {
      const fluteNotes = ['A4', 'G4', 'D5', 'C5'];
      const fn = fluteNotes[Math.floor(step / 8)];
      this.playTone(this.note(fn), now, 0.35, 'triangle', 0.12, 1100);
    }
  }

  // ================= 9. NHẠC MẠNH: HARD TECHNO ACID 303 =================
  private playCyberOverdriveStep(step: number, now: number) {
    if (step % 4 === 0) {
      this.playHeavyKick(now, 175, 42, 0.32);
    }
    if (step % 4 === 2) {
      this.playHiHat(now, 0.08, true);
    } else if (step % 2 === 0) {
      this.playHiHat(now, 0.025, false);
    }
    if (step === 4 || step === 12 || step === 20 || step === 28) {
      this.playHardSnare(now, 0.22);
    }

    // Acid 303 Rolling bass
    const acidNotes = ['A2', 'A2', 'C3', 'A2', 'D3', 'A2', 'Eb3', 'D3'];
    const b = acidNotes[step % 8];
    this.playAcidBass(this.note(b), now, 0.09, 0.22, 1100 + (step % 4) * 350);

    if (step % 2 === 1) {
      const arp = ['E5', 'A5', 'C6', 'A5', 'E5', 'G5', 'D6', 'G5'][Math.floor(step / 2) % 8];
      this.playTone(this.note(arp), now, 0.07, 'sawtooth', 0.08, 2200);
    }
  }

  // ================= 10. NHẠC MẠNH: BREAKBEAT RƯỢT ĐUỔI =================
  private playHackerChaseStep(step: number, now: number) {
    if ([0, 3, 6, 10, 16, 19, 22, 26].includes(step)) {
      this.playHeavyKick(now, 150, 48, 0.26);
    }
    if ([4, 12, 14, 20, 28, 30].includes(step)) {
      this.playHardSnare(now, 0.24);
    }
    this.playHiHat(now, 0.035, step % 2 === 1);

    const bassProg = ['E2', 'G2', 'A2', 'Bb2', 'A2', 'G2', 'E2', 'D2'];
    if (step % 4 === 0 || step % 4 === 3) {
      const bn = bassProg[Math.floor(step / 4)];
      this.playTone(this.note(bn), now, 0.16, 'sawtooth', 0.24, 750);
    }
  }

  // ================= 11. NHẠC MẠNH: CYBER DRIFT PHONK =================
  private playCyberPhonkStep(step: number, now: number) {
    // Trống 808 Trap dứt khoát
    if (step % 8 === 0) {
      this.playHeavyKick(now, 160, 40, 0.3);
    }
    if (step % 8 === 4) {
      this.playHardSnare(now, 0.24);
    }
    // Trap hi-hat nhặt
    this.playHiHat(now, 0.03, step % 2 === 1);

    // Giai điệu chuông bò 808 Cowbell đặc trưng phong cách Phonk
    const cowbellMelody = [
      'E5', 'E5', 'G5', 'E5', 'A5', 'G5', 'E5', 'D5',
      'E5', 'E5', 'G5', 'E5', 'D5', 'C5', 'A4', 'C5'
    ];
    const cb = cowbellMelody[step % 16];
    this.play808Cowbell(this.note(cb), now, 0.18, 0.22);

    // 808 Slide Sub Bass
    if (step % 8 === 0) {
      const bassRoots = ['E2', 'G2', 'A2', 'C2'][Math.floor(step / 8)];
      this.playTone(this.note(bassRoots), now, 0.45, 'triangle', 0.32, 220);
    }
  }

  // ================= 12. NHẠC TRINH THÁM: SYNTHWAVE 80s =================
  private playNeonDetectiveStep(step: number, now: number) {
    if (step % 8 === 0) this.playHeavyKick(now, 120, 38, 0.28);
    if (step % 8 === 4) this.playHardSnare(now, 0.2);
    this.playHiHat(now, 0.035, step % 2 === 0);

    const bassNote = step % 2 === 0 ? 'D2' : 'D3';
    this.playTone(this.note(bassNote), now, 0.09, 'sawtooth', 0.19, 580);

    const detectiveArp = ['F4', 'A4', 'D5', 'F5', 'A5', 'F5', 'D5', 'A4'][step % 8];
    this.playTone(this.note(detectiveArp), now, 0.16, 'sawtooth', 0.08, 1300);
  }

  // ================= CÁC BỘ TỔNG HỢP ÂM THANH MÔ PHỎNG VẬT LÝ =================

  // Mô phỏng dây đàn gảy Karplus-Strong string pluck (Guitar / Koto)
  private playPluckedString(freq: number, startTime: number, duration: number, gainLevel: number, filterCutoff = 2200) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const oscOver = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      oscOver.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      oscOver.frequency.setValueAtTime(freq * 2, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(filterCutoff, startTime);
      filter.frequency.exponentialRampToValueAtTime(300, startTime + duration);

      // Attack tức thì như tiếng gảy móng tay
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      oscOver.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      oscOver.start(startTime);
      osc.stop(startTime + duration + 0.02);
      oscOver.stop(startTime + duration + 0.02);
    } catch {}
  }

  // Mô phỏng chuông bò 808 Cowbell
  private play808Cowbell(freq: number, startTime: number, duration: number, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Hai sóng vuông detune đặc trưng của mạch 808
      osc1.type = 'square';
      osc2.type = 'square';
      osc1.frequency.setValueAtTime(freq, startTime);
      osc2.frequency.setValueAtTime(freq * 1.48, startTime);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq * 1.2, startTime);
      filter.Q.setValueAtTime(3.5, startTime);

      gain.gain.setValueAtTime(gainLevel, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration + 0.02);
      osc2.stop(startTime + duration + 0.02);
    } catch {}
  }

  // Dải hòa âm pad 432Hz sâu lắng
  private playWarmPad(freq: number, startTime: number, duration: number, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const oscSub = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      oscSub.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);
      oscSub.frequency.setValueAtTime(freq * 0.5, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.6);
      gain.gain.linearRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      oscSub.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      oscSub.start(startTime);
      osc.stop(startTime + duration + 0.1);
      oscSub.stop(startTime + duration + 0.1);
    } catch {}
  }

  // Chuông pha lê Singing Bowl
  private playSingingBowl(freq: number, startTime: number, duration: number, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch {}
  }

  // Shaker gỗ
  private playShaker(startTime: number, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.04;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const source = this.ctx.createBufferSource();
      source.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(4500, startTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(gainLevel, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      source.start(startTime);
      source.stop(startTime + 0.05);
    } catch {}
  }

  // Chuông gió
  private playWindChimes(startTime: number, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;
    const chimeFreqs = [1567.98, 1760.00, 2093.00, 2349.32];
    chimeFreqs.forEach((freq, i) => {
      try {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime + i * 0.08);

        gain.gain.setValueAtTime(gainLevel, startTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + i * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(startTime + i * 0.08);
        osc.stop(startTime + i * 0.08 + 0.65);
      } catch {}
    });
  }

  // Piano mộc búa nỉ (Felt Piano)
  private playFeltPiano(freq: number, startTime: number, duration: number, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, startTime);
      osc2.frequency.setValueAtTime(freq * 2, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, startTime);
      filter.frequency.exponentialRampToValueAtTime(450, startTime + duration);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + duration + 0.05);
      osc2.stop(startTime + duration + 0.05);
    } catch {}
  }

  // Phím điện Rhodes ấm áp
  private playRhodesKey(freq: number, startTime: number, duration: number, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1100, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch {}
  }

  // Acid 303 Bass
  private playAcidBass(freq: number, startTime: number, duration: number, gainLevel: number, cutoff: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = 'lowpass';
      filter.Q.setValueAtTime(8, startTime);
      filter.frequency.setValueAtTime(cutoff, startTime);
      filter.frequency.exponentialRampToValueAtTime(200, startTime + duration);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch {}
  }

  // Tone cơ bản
  private playTone(freq: number, startTime: number, duration: number, type: OscillatorType, gainLevel: number, cutoff = 1500) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(cutoff, startTime);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch {}
  }

  // Trống Heavy Kick
  private playHeavyKick(startTime: number, startFreq: number, endFreq: number, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, startTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + 0.08);

      gain.gain.setValueAtTime(gainLevel, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 0.23);
    } catch {}
  }

  // Trống Lofi Soft Kick
  private playLofiSoftKick(startTime: number, startFreq: number, endFreq: number, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(startFreq, startTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + 0.1);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, startTime);

      gain.gain.setValueAtTime(gainLevel, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 0.22);
    } catch {}
  }

  // Trống Hard Snare
  private playHardSnare(startTime: number, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1000, startTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(gainLevel, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      whiteNoise.start(startTime);
      whiteNoise.stop(startTime + 0.16);

      const osc = this.ctx.createOscillator();
      const toneGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, startTime);
      osc.frequency.exponentialRampToValueAtTime(80, startTime + 0.08);

      toneGain.gain.setValueAtTime(gainLevel * 0.6, startTime);
      toneGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.09);

      osc.connect(toneGain);
      toneGain.connect(this.masterGain);
      osc.start(startTime);
      osc.stop(startTime + 0.1);
    } catch {}
  }

  // Lofi Snare Snap
  private playLofiSnareSnap(startTime: number, gainLevel: number) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, startTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(gainLevel, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(startTime);
      noise.stop(startTime + 0.09);
    } catch {}
  }

  // Hi-Hat
  private playHiHat(startTime: number, gainLevel: number, isOpen: boolean) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const bufferSize = this.ctx.sampleRate * (isOpen ? 0.09 : 0.035);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(7000, startTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(gainLevel, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + (isOpen ? 0.08 : 0.03));

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(startTime);
      noise.stop(startTime + (isOpen ? 0.09 : 0.04));
    } catch {}
  }
}

// Thể hiện duy nhất trên toàn hệ thống
export const hackerMusic = new ProceduralMusicEngine();

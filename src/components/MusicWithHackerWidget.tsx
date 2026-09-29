import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import {
  hackerMusic,
  HACKER_PLAYLIST,
  HackerTrack
} from '../utils/hackerMusicEngine';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { playTabSwitch } from '../utils/soundEffects';

interface MusicWithHackerWidgetProps {
  externalOpen?: boolean;
  onExternalClose?: () => void;
}

export const MusicWithHackerWidget: React.FC<MusicWithHackerWidgetProps> = ({
  externalOpen,
  onExternalClose
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(() => hackerMusic.getIsPlaying());
  const [currentTrack, setCurrentTrack] = useState<HackerTrack>(() => hackerMusic.getCurrentTrack());
  const [volume, setVolume] = useState<number>(() => hackerMusic.getVolume());
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [vizBars, setVizBars] = useState<number[]>([40, 65, 30, 85, 55, 90, 45, 70, 35, 60]);
  const animationFrameRef = useRef<number | null>(null);
  const { isPastel } = useTheme();
  const { isVi } = useLanguage();

  // Đồng bộ trạng thái mở từ bên ngoài (navbar, footer, protocol)
  useEffect(() => {
    if (externalOpen !== undefined) {
      setIsExpanded(externalOpen);
    }
  }, [externalOpen]);

  const handleClose = () => {
    setIsExpanded(false);
    if (onExternalClose) {
      onExternalClose();
    }
  };

  // Đăng ký theo dõi sự thay đổi trạng thái bài hát
  useEffect(() => {
    const unsubscribe = hackerMusic.subscribe((playing) => {
      setIsPlaying(playing);
      setCurrentTrack(hackerMusic.getCurrentTrack());
    });
    return () => {
      unsubscribe();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Vòng lặp cập nhật sóng nhạc equalizer theo thời gian thực
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      setVizBars([20, 20, 20, 20, 20, 20, 20, 20, 20, 20]);
      return;
    }

    const analyser = hackerMusic.getAnalyser();
    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

    const updateViz = () => {
      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        const sampleCount = 10;
        const step = Math.floor(dataArray.length / sampleCount) || 1;
        const nextBars: number[] = [];
        for (let i = 0; i < sampleCount; i++) {
          const val = dataArray[i * step] || 0;
          const pct = Math.max(15, Math.min(100, Math.round((val / 255) * 100)));
          nextBars.push(pct);
        }
        setVizBars(nextBars);
      } else {
        setVizBars(prev => prev.map(() => Math.floor(Math.random() * 75) + 25));
      }
      animationFrameRef.current = requestAnimationFrame(updateViz);
    };

    animationFrameRef.current = requestAnimationFrame(updateViz);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    playTabSwitch();
    hackerMusic.togglePlay();
  };

  const handleNext = () => {
    playTabSwitch();
    hackerMusic.nextTrack();
  };

  const handlePrev = () => {
    playTabSwitch();
    hackerMusic.prevTrack();
  };

  const handleSelectTrack = (trackId: string) => {
    playTabSwitch();
    hackerMusic.selectTrack(trackId);
    if (!isPlaying) {
      hackerMusic.start(trackId);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    hackerMusic.setVolume(val);
  };

  const filteredPlaylist = filterCategory === 'all'
    ? HACKER_PLAYLIST
    : HACKER_PLAYLIST.filter(t => t.category === filterCategory);

  const filterTabs = isVi
    ? [
        { id: 'all', label: 'Tất Cả 🌟' },
        { id: 'study_chill', label: 'Study With Me ☕' },
        { id: 'anime', label: 'Nhạc Anime 🌸' },
        { id: 'intense', label: 'Nhạc Mạnh 🔥' },
        { id: 'detective', label: 'Trinh Thám 🕵️' }
      ]
    : [
        { id: 'all', label: 'All Tracks 🌟' },
        { id: 'study_chill', label: 'Study With Me ☕' },
        { id: 'anime', label: 'Anime Music 🌸' },
        { id: 'intense', label: 'Intense 🔥' },
        { id: 'detective', label: 'Detective 🕵️' }
      ];

  const currentTitle = isVi ? currentTrack.titleVi : currentTrack.titleEn;
  const currentGenre = isVi ? currentTrack.genreVi : currentTrack.genreEn;
  const currentDesc = isVi ? currentTrack.descriptionVi : currentTrack.descriptionEn;
  const currentCategoryLabel = isVi ? currentTrack.categoryLabelVi : currentTrack.categoryLabelEn;

  return (
    <>
      {/* 1. NÚT NỔI Ở GÓC MÀN HÌNH - GHI RÕ RÀNG CHÍNH XÁC: "Music with hacker :3" */}
      <div className="fixed bottom-4 right-4 z-40 select-none">
        {!isExpanded && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playTabSwitch();
              setIsExpanded(true);
            }}
            className={`p-2.5 sm:px-4 sm:py-2.5 rounded-full border-2 shadow-2xl backdrop-blur-md flex items-center gap-2.5 cursor-pointer transition-all ${
              isPastel
                ? 'bg-white/95 border-purple-300 text-purple-950 shadow-purple-500/25 ring-2 ring-pink-200'
                : 'bg-[#15102D]/95 border-pink-500/70 text-white shadow-pink-500/30 ring-2 ring-pink-500/20'
            }`}
            title={isVi ? 'Mở góc chọn nhạc: Music with hacker :3' : 'Open music corner: Music with hacker :3'}
          >
            {/* ICON TAI NGHE */}
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-lg relative ${
              isPlaying
                ? isPastel
                  ? 'bg-gradient-to-tr from-pink-500 to-purple-600 text-white animate-pulse'
                  : 'bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 text-white animate-pulse'
                : 'bg-slate-700/60 text-slate-300'
            }`}>
              <span>🎧</span>
              {isPlaying && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#15102D] animate-ping" />
              )}
            </div>

            {/* HIỂN THỊ ĐẦY ĐỦ TÊN RÕ RÀNG */}
            <div className="hidden sm:block text-left pr-1">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-[11px] font-black uppercase tracking-wider text-pink-500 dark:text-pink-400">
                  Music with hacker :3
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-purple-500/20 text-purple-400 font-bold">
                  {isPlaying ? (isVi ? 'ĐANG PHÁT' : 'PLAYING') : (isVi ? 'TẠM DỪNG' : 'PAUSED')}
                </span>
              </div>
              <div className="text-xs font-black truncate max-w-[170px] mt-0.5 flex items-center gap-1">
                <span>{currentTrack.emoji}</span>
                <span>{currentTitle}</span>
              </div>
            </div>

            {/* SÓNG NHẠC EQUALIZER */}
            <div className="flex items-end gap-0.5 h-4 px-1">
              {vizBars.slice(0, 5).map((val, idx) => (
                <div
                  key={idx}
                  className={`w-1 rounded-full transition-all duration-75 ${
                    isPlaying
                      ? isPastel
                        ? 'bg-purple-600'
                        : 'bg-pink-400'
                      : 'bg-slate-500 h-1'
                  }`}
                  style={{ height: isPlaying ? `${Math.max(15, val * 0.16)}px` : '4px' }}
                />
              ))}
            </div>

            {/* NÚT BẬT / TẮT NHANH */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleTogglePlay();
              }}
              className={`p-1.5 rounded-full transition-transform active:scale-90 cursor-pointer ${
                isPastel ? 'bg-purple-100 text-purple-900 hover:bg-purple-200' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title={isPlaying ? (isVi ? 'Tạm dừng nhạc' : 'Pause music') : (isVi ? 'Phát nhạc ngay' : 'Play music')}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
          </motion.div>
        )}
      </div>

      {/* 2. BẢNG CHỌN NHẠC CHI TIẾT (EXPANDED CONSOLE) */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className={`w-full max-w-xl rounded-3xl border-2 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
                isPastel
                  ? 'bg-white border-purple-300 text-slate-800'
                  : 'bg-[#140F2D] border-pink-500/50 text-white'
              }`}
            >
              
              {/* THANH TIÊU ĐỀ BẢNG NHẠC */}
              <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
                isPastel
                  ? 'bg-gradient-to-r from-purple-100 via-pink-100 to-amber-100 border-purple-200'
                  : 'bg-gradient-to-r from-purple-950/80 via-[#1F1746] to-pink-950/80 border-white/10'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-md ${
                    isPastel ? 'bg-gradient-to-tr from-purple-600 to-pink-500 text-white' : 'bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 text-white'
                  }`}>
                    🎧
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-black tracking-tight flex items-center gap-1.5">
                        <span>Music with hacker :3</span>
                        <span className="text-pink-500">🌸</span>
                      </h2>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {isVi ? '12 BÀI HÁT' : '12 TRACKS'}
                      </span>
                    </div>
                    <p className={`text-[11px] font-medium ${isPastel ? 'text-purple-700' : 'text-pink-200/80'}`}>
                      {isVi
                        ? 'Nhạc Study With Me êm dịu, Anime sôi động đến Nhạc Mạnh phá án!'
                        : 'Calm Study With Me, vibrant Anime, and intense gaming tracks!'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    isPastel ? 'hover:bg-purple-200/70 text-slate-600' : 'hover:bg-white/10 text-gray-300'
                  }`}
                  title={isVi ? 'Thu nhỏ bảng nhạc' : 'Close music panel'}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* BẢNG ĐIỀU KHIỂN & BÀI ĐANG PHÁT */}
              <div className={`p-4 sm:p-6 border-b space-y-4 ${
                isPastel ? 'bg-purple-50/50 border-purple-100' : 'bg-black/40 border-white/10'
              }`}>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 text-center sm:text-left">
                    <span className="text-4xl p-2.5 rounded-2xl bg-black/20 border border-white/10 inline-block shadow-inner">
                      {currentTrack.emoji}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 mb-1">
                        <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-md ${currentTrack.categoryColor}`}>
                          {currentCategoryLabel}
                        </span>
                        <span className="text-[11px] font-bold text-gray-400">
                          {currentGenre} • {currentTrack.bpm} BPM
                        </span>
                      </div>
                      <h3 className="text-xl font-black tracking-tight">
                        {currentTitle}
                      </h3>
                      <p className={`text-xs mt-0.5 max-w-sm line-clamp-1 ${isPastel ? 'text-slate-600' : 'text-gray-300'}`}>
                        {currentDesc}
                      </p>
                    </div>
                  </div>

                  {/* NÚT ĐIỀU KHIỂN: BÀI TRƯỚC, PHÁT/TẠM DỪNG, BÀI TIẾP */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className={`p-2.5 rounded-2xl border transition-all active:scale-95 cursor-pointer ${
                        isPastel ? 'bg-white border-purple-200 hover:bg-purple-100' : 'bg-white/5 border-white/10 hover:bg-white/15'
                      }`}
                      title={isVi ? 'Bài trước' : 'Previous track'}
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleTogglePlay}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer ${
                        isPastel
                          ? 'bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-purple-500/30'
                          : 'bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 text-white shadow-pink-500/30'
                      }`}
                      title={isPlaying ? (isVi ? 'Tạm dừng' : 'Pause') : (isVi ? 'Phát nhạc' : 'Play')}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>

                    <button
                      onClick={handleNext}
                      className={`p-2.5 rounded-2xl border transition-all active:scale-95 cursor-pointer ${
                        isPastel ? 'bg-white border-purple-200 hover:bg-purple-100' : 'bg-white/5 border-white/10 hover:bg-white/15'
                      }`}
                      title={isVi ? 'Bài tiếp theo' : 'Next track'}
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* SÓNG TẦN SỐ ÂM THANH SỐNG ĐỘNG */}
                <div className="flex items-end justify-between gap-1.5 h-12 px-3 py-1 rounded-2xl bg-black/40 border border-white/10 shadow-inner">
                  {vizBars.map((val, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 rounded-full transition-all duration-75 ${
                        isPlaying
                          ? idx % 3 === 0
                            ? 'bg-pink-500'
                            : idx % 3 === 1
                            ? 'bg-amber-400'
                            : 'bg-emerald-400'
                          : 'bg-slate-600/40 h-1'
                      }`}
                      style={{
                        height: isPlaying ? `${Math.max(10, val * 0.42)}px` : '4px'
                      }}
                    />
                  ))}
                </div>

                {/* THANH ĐIỀU CHỈNH ÂM LƯỢNG */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={() => {
                      const next = volume > 0 ? 0 : 0.55;
                      setVolume(next);
                      hackerMusic.setVolume(next);
                    }}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title={volume === 0 ? (isVi ? 'Bật âm lượng' : 'Unmute') : (isVi ? 'Tắt tiếng' : 'Mute')}
                  >
                    {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.02"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 accent-pink-500 cursor-pointer h-1.5 rounded-lg bg-black/40"
                  />
                  <span className="text-[11px] font-bold w-12 text-right opacity-80">
                    {Math.round(volume * 100)}%
                  </span>
                </div>

              </div>

              {/* TABS LỌC THỂ LOẠI */}
              <div className="p-3 border-b flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setFilterCategory(tab.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                      filterCategory === tab.id
                        ? isPastel
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-pink-600 text-white shadow-xs'
                        : isPastel
                          ? 'bg-purple-100/60 text-purple-900 hover:bg-purple-200'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* DANH SÁCH BÀI HÁT */}
              <div className="p-3 sm:p-4 space-y-2 overflow-y-auto flex-1 max-h-[320px]">
                {filteredPlaylist.map((track) => {
                  const isCurrent = track.id === currentTrack.id;
                  const itemTitle = isVi ? track.titleVi : track.titleEn;
                  const itemGenre = isVi ? track.genreVi : track.genreEn;
                  const itemCategoryLabel = isVi ? track.categoryLabelVi : track.categoryLabelEn;
                  return (
                    <div
                      key={track.id}
                      onClick={() => handleSelectTrack(track.id)}
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer group ${
                        isCurrent
                          ? isPastel
                            ? 'bg-purple-100/90 border-purple-400 shadow-sm'
                            : 'bg-pink-500/20 border-pink-500 shadow-md ring-1 ring-pink-400/40'
                          : isPastel
                            ? 'bg-white border-slate-200 hover:bg-purple-50 hover:border-purple-200'
                            : 'bg-black/30 border-white/5 hover:bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl p-1.5 rounded-xl bg-black/20 border border-white/5">
                          {track.emoji}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-xs sm:text-sm">
                              {itemTitle}
                            </span>
                            <span className={`text-[9px] uppercase font-black px-1.5 py-0.2 rounded-md ${track.categoryColor}`}>
                              {itemCategoryLabel}
                            </span>
                          </div>
                          <div className={`text-[11px] font-medium ${isPastel ? 'text-slate-600' : 'text-gray-400'}`}>
                            {itemGenre} • {track.bpm} BPM
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isCurrent && isPlaying ? (
                          <div className="flex items-end gap-0.5 h-3 px-1">
                            <div className="w-1 bg-emerald-400 rounded-full animate-bounce h-3" />
                            <div className="w-1 bg-amber-400 rounded-full animate-bounce h-2" style={{ animationDelay: '0.15s' }} />
                            <div className="w-1 bg-rose-400 rounded-full animate-bounce h-3" style={{ animationDelay: '0.3s' }} />
                          </div>
                        ) : (
                          <button className={`p-2 rounded-xl transition-colors ${
                            isPastel ? 'bg-purple-100 text-purple-900 group-hover:bg-purple-200' : 'bg-white/5 text-gray-300 group-hover:text-white group-hover:bg-white/10'
                          }`}>
                            <Play className="w-3.5 h-3.5 fill-current" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CHÂN BẢNG NHẠC HACKER */}
              <div className={`p-3 text-center text-xs border-t flex items-center justify-center gap-2 ${
                isPastel ? 'bg-purple-50 text-purple-800 border-purple-200' : 'bg-black/50 text-pink-300 border-white/10'
              }`}>
                <span>{isVi ? 'Music with hacker :3 đang đồng hành cùng bạn' : 'Music with hacker :3 is playing for you'}</span>
                <span>•</span>
                <span className="text-emerald-400">{isVi ? 'Động cơ âm thanh 100% Cục Bộ' : '100% Offline Audio Engine'}</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

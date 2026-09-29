import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Gamepad2,
  Sparkles,
  ArrowRight,
  Palette,
  Moon,
  Volume2,
  Headphones
} from 'lucide-react';
import { ScamDetectiveGame } from './games/ScamDetectiveGame';
import { FakeOrRealGame } from './games/FakeOrRealGame';
import { ScamRadarGame } from './games/ScamRadarGame';
import { LinkPuzzleGame } from './games/LinkPuzzleGame';
import { WhatWouldYouDoGame } from './games/WhatWouldYouDoGame';
import { ScamEscapeRoomGame } from './games/ScamEscapeRoomGame';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { playTabSwitch, playCorrectTingTing } from '../utils/soundEffects';
import { hackerMusic } from '../utils/hackerMusicEngine';

interface GamesHubProps {
  onEarnReward: (xp: number, coins: number, mapTitle?: string) => void;
}

export const GamesHub: React.FC<GamesHubProps> = ({ onEarnReward }) => {
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const { toggleTheme, isPastel } = useTheme();
  const { isVi } = useLanguage();

  const games = isVi
    ? [
        {
          id: 'scam-detective',
          title: 'TRÒ CHƠI 1: ĐIỆP VIÊN PHÁ ÁN',
          subtitle: 'Trò chơi chính • Bấm chi tiết đáng ngờ (+10đ, -5s)',
          icon: '🔎',
          darkColor: 'from-[#3b0764] via-[#581c87] to-[#1e1b4b] border-purple-500/50 shadow-purple-900/30',
          pastelColor: 'from-[#f5f3ff] via-[#ede9fe] to-[#fae8ff] border-purple-300 shadow-purple-200/50',
          tag: 'CHÍNH',
          tagDark: 'bg-amber-400 text-amber-950',
          tagPastel: 'bg-purple-200 text-purple-900',
          accentDot: 'bg-purple-500',
          description: 'Một tin nhắn/email xuất hiện! Bạn phải nhanh tay bấm vào các chi tiết trúng thưởng, link lạ, thúc ép thời gian hoặc đòi OTP.'
        },
        {
          id: 'fake-or-real',
          title: 'TRÒ CHƠI 2: THẬT HAY GIẢ?',
          subtitle: 'So sánh 2 website và tìm 5 điểm khác biệt',
          icon: '🕵🏻',
          darkColor: 'from-[#082f49] via-[#0c4a6e] to-[#0f172a] border-cyan-500/50 shadow-cyan-900/30',
          pastelColor: 'from-[#f0f9ff] via-[#e0f2fe] to-[#e0f7fa] border-sky-300 shadow-sky-200/50',
          tag: 'TÌM ĐIỂM KHÁC',
          tagDark: 'bg-cyan-400 text-cyan-950',
          tagPastel: 'bg-sky-200 text-sky-900',
          accentDot: 'bg-cyan-500',
          description: 'Hai website cạnh nhau: Soi xét thanh địa chỉ, chứng chỉ bảo mật, lỗi chính tả thương hiệu và các nút đăng nhập giả mạo.'
        },
        {
          id: 'scam-radar',
          title: 'TRÒ CHƠI 3: RADAR PHẢN XẠ',
          subtitle: 'Phản xạ AN TOÀN hay NGUY HIỂM trước các đường link',
          icon: '🚨',
          darkColor: 'from-[#064e3b] via-[#047857] to-[#022c22] border-emerald-500/50 shadow-emerald-900/30',
          pastelColor: 'from-[#f0fdf4] via-[#dcfce7] to-[#e6fffa] border-emerald-300 shadow-emerald-200/50',
          tag: 'TỐC ĐỘ',
          tagDark: 'bg-emerald-400 text-emerald-950',
          tagPastel: 'bg-emerald-200 text-emerald-900',
          accentDot: 'bg-emerald-500',
          description: 'Hàng loạt đường dẫn xuất hiện liên tục. Quyết định chớp nhoáng trong 5 giây: AN TOÀN hay NGUY HIỂM!'
        },
        {
          id: 'link-puzzle',
          title: 'TRÒ CHƠI 4: MẢNH GHÉP ĐƯỜNG DẪN',
          subtitle: 'Kéo thả bóc tách các thành phần của URL an toàn',
          icon: '🧩',
          darkColor: 'from-[#7c2d12] via-[#9a3412] to-[#431407] border-amber-500/50 shadow-orange-900/30',
          pastelColor: 'from-[#fffbeb] via-[#fef3c7] to-[#fff7ed] border-amber-300 shadow-amber-200/50',
          tag: 'LOGIC',
          tagDark: 'bg-amber-400 text-amber-950',
          tagPastel: 'bg-amber-200 text-amber-900',
          accentDot: 'bg-amber-500',
          description: 'Một đường link bị phân rã thành từng khối ghép. Đặt vào đúng nhóm Tên miền, Giao thức, Đường dẫn hay Bẫy lừa!'
        },
        {
          id: 'what-would-you-do',
          title: 'TRÒ CHƠI 5: BẠN SẼ LÀM GÌ?',
          subtitle: 'Xử lý các tình huống lừa đảo công nghệ cao thực tế',
          icon: '🎭',
          darkColor: 'from-[#881337] via-[#9f1239] to-[#4c0519] border-rose-500/50 shadow-rose-900/30',
          pastelColor: 'from-[#fff1f2] via-[#ffe4e6] to-[#fdf2f8] border-rose-300 shadow-rose-200/50',
          tag: 'TÌNH HUỐNG',
          tagDark: 'bg-rose-400 text-rose-950',
          tagPastel: 'bg-rose-200 text-rose-900',
          accentDot: 'bg-rose-500',
          description: 'Nhận tin nhắn tài khoản ngân hàng bị khóa hoặc bạn bè mượn tiền gấp? Chọn giải pháp và nhận giải thích chuyên sâu.'
        },
        {
          id: 'scam-escape-room',
          title: 'TRÒ CHƠI 6: PHÒNG THOÁT HIỂM ĐIỆP VIÊN',
          subtitle: 'Thử thách đặc biệt • Vượt qua 5 căn phòng bị khóa',
          icon: '🧠',
          darkColor: 'from-[#311042] via-[#4a154b] to-[#1a0526] border-fuchsia-500/50 shadow-fuchsia-900/30',
          pastelColor: 'from-[#faf5ff] via-[#f3e8ff] to-[#fce7f3] border-purple-300 shadow-purple-200/50',
          tag: 'ĐẶC BIỆT',
          tagDark: 'bg-purple-300 text-purple-950',
          tagPastel: 'bg-fuchsia-200 text-fuchsia-900',
          accentDot: 'bg-fuchsia-500',
          description: 'Vào vai điệp viên an toàn mạng: Giải mã Mật khẩu → Email mạo danh → Link bẫy → Trang web giả → Mã OTP để thoát hiểm!'
        }
      ]
    : [
        {
          id: 'scam-detective',
          title: 'GAME 1: SCAM DETECTIVE',
          subtitle: 'Flag suspicious clues in fraudulent messages (+10pts, -5s)',
          icon: '🔎',
          darkColor: 'from-[#3b0764] via-[#581c87] to-[#1e1b4b] border-purple-500/50 shadow-purple-900/30',
          pastelColor: 'from-[#f5f3ff] via-[#ede9fe] to-[#fae8ff] border-purple-300 shadow-purple-200/50',
          tag: 'MAIN',
          tagDark: 'bg-amber-400 text-amber-950',
          tagPastel: 'bg-purple-200 text-purple-900',
          accentDot: 'bg-purple-500',
          description: 'A message appears! Tap on fake prize announcements, strange links, artificial urgency, and OTP traps.'
        },
        {
          id: 'fake-or-real',
          title: 'GAME 2: REAL OR FAKE?',
          subtitle: 'Compare 2 websites and spot 5 subtle counterfeits',
          icon: '🕵🏻',
          darkColor: 'from-[#082f49] via-[#0c4a6e] to-[#0f172a] border-cyan-500/50 shadow-cyan-900/30',
          pastelColor: 'from-[#f0f9ff] via-[#e0f2fe] to-[#e0f7fa] border-sky-300 shadow-sky-200/50',
          tag: 'DIFFERENCES',
          tagDark: 'bg-cyan-400 text-cyan-950',
          tagPastel: 'bg-sky-200 text-sky-900',
          accentDot: 'bg-cyan-500',
          description: 'Two websites side by side: Inspect the address bar, SSL padlocks, spelling errors, and login traps.'
        },
        {
          id: 'scam-radar',
          title: 'GAME 3: SPEED RADAR',
          subtitle: 'Fast reflexes: Decide SAFE or SCAM against rapid URLs',
          icon: '🚨',
          darkColor: 'from-[#064e3b] via-[#047857] to-[#022c22] border-emerald-500/50 shadow-emerald-900/30',
          pastelColor: 'from-[#f0fdf4] via-[#dcfce7] to-[#e6fffa] border-emerald-300 shadow-emerald-200/50',
          tag: 'SPEED',
          tagDark: 'bg-emerald-400 text-emerald-950',
          tagPastel: 'bg-emerald-200 text-emerald-900',
          accentDot: 'bg-emerald-500',
          description: 'Fast-paced URLs fly in. Make split-second decisions within 5 seconds: SAFE or DANGEROUS!'
        },
        {
          id: 'link-puzzle',
          title: 'GAME 4: LINK PUZZLE',
          subtitle: 'Drag and assemble URL puzzle pieces correctly',
          icon: '🧩',
          darkColor: 'from-[#7c2d12] via-[#9a3412] to-[#431407] border-amber-500/50 shadow-orange-900/30',
          pastelColor: 'from-[#fffbeb] via-[#fef3c7] to-[#fff7ed] border-amber-300 shadow-amber-200/50',
          tag: 'LOGIC',
          tagDark: 'bg-amber-400 text-amber-950',
          tagPastel: 'bg-amber-200 text-amber-900',
          accentDot: 'bg-amber-500',
          description: 'A URL is dismantled into fragments. Drag each part into Domain, Protocol, Path, or Deceptive Trap!'
        },
        {
          id: 'what-would-you-do',
          title: 'GAME 5: WHAT WOULD YOU DO?',
          subtitle: 'Navigate realistic cyber extortion dilemmas A, B, C',
          icon: '🎭',
          darkColor: 'from-[#881337] via-[#9f1239] to-[#4c0519] border-rose-500/50 shadow-rose-900/30',
          pastelColor: 'from-[#fff1f2] via-[#ffe4e6] to-[#fdf2f8] border-rose-300 shadow-rose-200/50',
          tag: 'DILEMMA',
          tagDark: 'bg-rose-400 text-rose-950',
          tagPastel: 'bg-rose-200 text-rose-900',
          accentDot: 'bg-rose-500',
          description: 'Account lock threat or emergency money loan? Choose the safest resolution and understand why.'
        },
        {
          id: 'scam-escape-room',
          title: 'GAME 6: SCAM ESCAPE ROOM',
          subtitle: 'Ultimate challenge • Break free from 5 locked chambers',
          icon: '🧠',
          darkColor: 'from-[#311042] via-[#4a154b] to-[#1a0526] border-fuchsia-500/50 shadow-fuchsia-900/30',
          pastelColor: 'from-[#faf5ff] via-[#f3e8ff] to-[#fce7f3] border-purple-300 shadow-purple-200/50',
          tag: 'SPECIAL',
          tagDark: 'bg-purple-300 text-purple-950',
          tagPastel: 'bg-fuchsia-200 text-fuchsia-900',
          accentDot: 'bg-fuchsia-500',
          description: 'Crack Passwords → Phishing Emails → Poisoned Links → Clone Sites → OTP Evidence to escape!'
        }
      ];

  const handleLaunchGame = (id: string) => {
    playTabSwitch();
    setActiveGameId(id);
  };

  const handleComplete = (xp: number, coins: number, mapName?: string) => {
    playCorrectTingTing();
    const gameObj = games.find((g) => g.id === activeGameId);
    const fallbackTitle = gameObj ? gameObj.title : (isVi ? 'Trò Chơi An Ninh Mạng' : 'Cyber Game Map');
    onEarnReward(xp, coins, mapName || fallbackTitle);
  };

  // NẾU ĐANG CHƠI 1 TRÒ CỤ THỂ
  if (activeGameId === 'scam-detective') {
    return <ScamDetectiveGame onCompleteGame={handleComplete} onBackToHub={() => setActiveGameId(null)} />;
  }
  if (activeGameId === 'fake-or-real') {
    return <FakeOrRealGame onCompleteGame={handleComplete} onBackToHub={() => setActiveGameId(null)} />;
  }
  if (activeGameId === 'scam-radar') {
    return <ScamRadarGame onCompleteGame={handleComplete} onBackToHub={() => setActiveGameId(null)} />;
  }
  if (activeGameId === 'link-puzzle') {
    return <LinkPuzzleGame onCompleteGame={handleComplete} onBackToHub={() => setActiveGameId(null)} />;
  }
  if (activeGameId === 'what-would-you-do') {
    return <WhatWouldYouDoGame onCompleteGame={handleComplete} onBackToHub={() => setActiveGameId(null)} />;
  }
  if (activeGameId === 'scam-escape-room') {
    return <ScamEscapeRoomGame onCompleteGame={handleComplete} onBackToHub={() => setActiveGameId(null)} />;
  }

  return (
    <div className={`w-full max-w-5xl mx-auto space-y-8 transition-colors ${
      isPastel ? 'text-slate-800' : 'text-white'
    }`}>
      
      {/* THANH ĐIỀU KHIỂN & BẬT TẮT NHẠC */}
      <div className={`p-4 sm:p-5 rounded-3xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md transition-all ${
        isPastel
          ? 'bg-white/90 border-purple-200 shadow-md text-slate-800'
          : 'bg-[#181335]/90 border-orange-500/30 shadow-xl text-white'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-md ${
            isPastel ? 'bg-purple-100 text-purple-700' : 'bg-gradient-to-tr from-orange-500 to-rose-500 text-white'
          }`}>
            🎮
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-orange-400">
              {isVi ? 'ĐẤU TRƯỜNG HUẤN LUYỆN' : 'TRAINING CONTROLS'}
            </div>
            <div className="text-sm font-bold">
              {isVi ? 'Giao diện:' : 'Theme:'} {isPastel ? (isVi ? 'Sáng Pastel 🌸' : 'Pastel Glow 🌸') : (isVi ? 'Tối Cyber 🌌' : 'Cyber Dark 🌌')}
            </div>
          </div>
        </div>

        {/* NÚT MUSIC WITH HACKER :3 VÀ THEME */}
        <div className="flex flex-wrap items-center gap-2">
          {/* NÚT MUSIC WITH HACKER :3 (GHI RÕ RÀNG KHÔNG ĐỂ HACKER ĐƠN ĐỘC) */}
          <button
            onClick={() => {
              playTabSwitch();
              hackerMusic.togglePlay();
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl font-black text-xs transition-all cursor-pointer shadow-md active:scale-95 ${
              hackerMusic.getIsPlaying()
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/30 ring-2 ring-emerald-400/40 animate-pulse'
                : isPastel
                  ? 'bg-pink-100 border border-pink-300 text-purple-950 hover:bg-pink-200'
                  : 'bg-purple-950/80 border border-pink-500/50 text-pink-200 hover:bg-purple-900'
            }`}
            title={isVi ? 'Bật/Tắt nhạc: Music with hacker :3' : 'Toggle: Music with hacker :3'}
          >
            <Headphones className="w-4 h-4 text-pink-400" />
            <span>
              {hackerMusic.getIsPlaying()
                ? (isVi ? 'Đang phát: Music with hacker :3' : 'Playing: Music with hacker :3')
                : (isVi ? 'Phát: Music with hacker :3' : 'Play: Music with hacker :3')}
            </span>
          </button>

          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={() => {
              playTabSwitch();
              toggleTheme();
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95 ${
              isPastel
                ? 'bg-purple-100 border-purple-300 text-purple-900 hover:bg-purple-200'
                : 'bg-indigo-950 border-indigo-500/60 text-indigo-200 hover:border-indigo-400'
            }`}
          >
            {isPastel ? <Palette className="w-3.5 h-3.5 text-pink-500" /> : <Moon className="w-3.5 h-3.5 text-indigo-300" />}
            <span>{isPastel ? (isVi ? 'SÁNG PASTEL' : 'PASTEL') : (isVi ? 'TỐI CYBER' : 'DARK')}</span>
          </button>
        </div>
      </div>

      {/* HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black shadow-xs border ${
          isPastel
            ? 'bg-pink-100 text-pink-900 border-pink-300'
            : 'bg-rose-500/20 text-rose-300 border-rose-500/50'
        }`}>
          <Gamepad2 className="w-4 h-4" />
          <span>{isVi ? 'GLITCH ZONE • 6 TRÒ CHƠI LUYỆN PHẢN XẠ' : 'GLITCH ZONE • 6 TRAINING GAMES'}</span>
        </div>
        <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${
          isPastel ? 'text-purple-950' : 'text-white'
        }`}>
          {isVi ? 'Glitch Zone • Đấu Trường Trò Chơi An Toàn' : 'Glitch Zone • Cyber Training Arenas'}
        </h1>
        <p className={`text-xs sm:text-sm font-medium ${
          isPastel ? 'text-slate-600' : 'text-gray-300'
        }`}>
          {isVi
            ? 'Rèn luyện phản xạ phát hiện bẫy lừa đảo thông qua các trò chơi tương tác. Trả lời đúng nhận tiếng chuông Ting-Ting! 🔔, trả lời sai nhận cảnh báo Eeee! 🚨'
            : 'Sharpen your instincts against deception. Correct answers trigger Ting-Ting! 🔔, while mistakes sound an Eeee! 🚨 alarm.'}
        </p>
      </div>

      {/* DANH SÁCH 6 TRÒ CHƠI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <motion.div
            key={game.id}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLaunchGame(game.id)}
            className={`p-6 rounded-3xl border-2 shadow-xl transition-all cursor-pointer flex flex-col justify-between group bg-gradient-to-br ${
              isPastel ? game.pastelColor : game.darkColor
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl p-2 rounded-2xl bg-black/20 border border-white/10 group-hover:scale-110 transition-transform inline-block">
                  {game.icon}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase ${
                  isPastel ? game.tagPastel : game.tagDark
                }`}>
                  {game.tag}
                </span>
              </div>

              <div>
                <h3 className={`text-base sm:text-lg font-black tracking-tight ${
                  isPastel ? 'text-slate-900 group-hover:text-purple-700' : 'text-white group-hover:text-amber-300'
                }`}>
                  {game.title}
                </h3>
                <p className={`text-xs font-bold mt-1 ${isPastel ? 'text-purple-700' : 'text-orange-300'}`}>
                  {game.subtitle}
                </p>
              </div>

              <p className={`text-xs leading-relaxed line-clamp-3 ${isPastel ? 'text-slate-600 font-medium' : 'text-gray-300'}`}>
                {game.description}
              </p>
            </div>

            <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-black transition-colors ${
              isPastel ? 'border-purple-200 text-purple-700' : 'border-white/10 text-white'
            }`}>
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${game.accentDot} animate-ping`} />
                <span>{isVi ? 'Bắt đầu chơi' : 'Start playing'}</span>
              </span>
              <div className={`p-2 rounded-xl transition-transform group-hover:translate-x-1 ${
                isPastel ? 'bg-purple-200 text-purple-900' : 'bg-white/10 text-white'
              }`}>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  ArrowRight,
  Shield,
  Sparkles,
  Flame,
  CheckCircle2,
  Building2,
  Terminal,
  Radio,
  Gamepad2,
  BookOpen,
  ShoppingBag,
  User,
  ExternalLink,
  Zap,
  Globe,
  Palette,
  Moon,
  Volume2
} from 'lucide-react';
import { NavTab, UserProfile } from '../types';
import { RobloxAvatar } from './RobloxAvatar';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { playTabSwitch, playCorrectTingTing } from '../utils/soundEffects';

interface HomeViewProps {
  onNavigate: (tab: NavTab) => void;
  onQuickScan: (query: string) => void;
  profile: UserProfile;
  onOpenGuide: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onQuickScan,
  profile,
  onOpenGuide
}) => {
  const [quickInput, setQuickInput] = useState('');
  const [guideDismissed, setGuideDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('lucera_guide_rec_dismissed') === 'true';
    } catch {
      return false;
    }
  });
  const { toggleTheme, isPastel } = useTheme();
  const { isVi, toggleLanguage } = useLanguage();

  const handleDismissGuide = () => {
    setGuideDismissed(true);
    try {
      localStorage.setItem('lucera_guide_rec_dismissed', 'true');
    } catch {}
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    playTabSwitch();
    onQuickScan(quickInput.trim());
  };

  const sampleLinks = [
    'vietcombank-ebank-secure.top',
    'shopee-nhanqua-tri-an.xyz',
    '02499996868',
    'bocongan-gov-app.cfd'
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* NEW PLAYER ORIENTATION RECOMMENDATION BANNER */}
      {!guideDismissed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 sm:p-5 rounded-3xl border-2 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${
            isPastel
              ? 'bg-gradient-to-r from-amber-50 via-purple-50 to-pink-50 border-amber-300 text-slate-800'
              : 'bg-gradient-to-r from-[#1f1638] via-[#2c1a4d] to-[#17122b] border-amber-400/80 text-white shadow-amber-950/40'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-2xl shadow-lg shrink-0 text-white">
              🔰
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-black">
                  {isVi ? 'KHUYÊN DÙNG CHO NGƯỜI MỚI' : 'RECOMMENDED FOR NEW RECRUITS'}
                </span>
                <span className="text-xs font-bold text-amber-400">
                  {isVi ? 'Sổ Tay Điệp Viên Tân Thủ' : 'Rookie Field Guide'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black leading-tight">
                {isVi ? 'Khuyên Bạn: Hãy Xem Hướng Dẫn Trước Khi Bắt Đầu Phá Án!' : 'Recommended: Take The Agent Guide Before Exploring Headquarters & Games!'}
              </h3>
              <p className="text-xs leading-relaxed opacity-90 max-w-2xl font-medium">
                {isVi
                  ? 'Để phá án bách phát bách trúng, học cách bóc tách link độc hại, né cạm bẫy OTP và tích lũy Hacker’s Money trong Glitch Zone, bạn hãy tham khảo cuốn cẩm nang hướng dẫn nhanh này nhé!'
                  : 'To identify deception accurately, decode phishing links, protect private OTPs, and earn Hacker’s Money across all zones, please review our quick New Agent Guide first!'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
            <button
              onClick={() => {
                playTabSwitch();
                onOpenGuide();
              }}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-black font-black text-xs shadow-lg shadow-orange-500/30 cursor-pointer active:scale-95 transition-all"
            >
              <BookOpen className="w-4 h-4 text-black" />
              <span>{isVi ? 'Xem Hướng Dẫn Ngay 📖' : 'Open Rookie Guide 📖'}</span>
            </button>

            <button
              onClick={handleDismissGuide}
              className="px-3 py-2.5 rounded-2xl border border-white/20 hover:bg-white/10 text-xs font-bold opacity-80 hover:opacity-100 cursor-pointer transition-all"
              title={isVi ? 'Tôi đã biết chơi / Bỏ qua' : 'I know the ropes / Dismiss'}
            >
              {isVi ? 'Bỏ Qua' : 'Dismiss'}
            </button>
          </div>
        </motion.div>
      )}

      {/* HERO BANNER */}
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-10 border-2 transition-all duration-300 ${
        isPastel
          ? 'bg-gradient-to-br from-[#FAF5FF] via-[#F3E8FF] to-[#FCE7F3] border-purple-200/80 text-slate-800 shadow-xl'
          : 'bg-gradient-to-b from-[#1C1838] via-[#241F48] to-[#14102B] border-orange-500/50 shadow-2xl'
      }`}>
        {/* Ambient glow orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* LEFT: BRAND & TAGLINE */}
          <div className="text-center md:text-left space-y-3 max-w-xl">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black shadow-xs border ${
              isPastel
                ? 'bg-purple-100 text-purple-900 border-purple-200'
                : 'bg-orange-500/20 text-orange-300 border-orange-400/50'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {isVi ? 'SAFE LAB • TRẠM PHÂN TÍCH AN TOÀN SỐ 🧪' : 'SAFE LAB • CYBER DEFENSE CENTER 🧪'}
              </span>
            </div>

            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none ${
              isPastel ? 'text-purple-950' : 'text-white'
            }`}>
              LUCERA • SAFE LAB
            </h1>

            <p className={`text-base sm:text-lg font-bold ${
              isPastel ? 'text-purple-700' : 'text-orange-200'
            }`}>
              {isVi
                ? 'Bóc trần sự thật đằng sau mọi đường link & cuộc gọi lừa đảo'
                : 'Unmask the truth behind deceptive links and fraudulent calls'}
            </p>

            <p className={`text-xs sm:text-sm leading-relaxed max-w-md pt-1 font-medium ${
              isPastel ? 'text-slate-600' : 'text-gray-300'
            }`}>
              {isVi
                ? 'Cổng bảo vệ an toàn mạng thế hệ mới. Đặt chân vào Trụ sở 3D, tra cứu link & số điện thoại mạo danh, rèn luyện kỹ năng qua đấu trường Glitch Zone 6 trò chơi và mở khóa trang bị trong Arcon Bunker.'
                : 'Next-generation cyber defense portal. Explore the 3D Headquarters, analyze suspicious URLs and phone numbers, sharpen reflexes in Glitch Zone 6 mini-games, and unlock outfits in Arcon Bunker.'}
            </p>

            {/* COLORFUL STAT BADGES */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-3">
              <button
                onClick={() => {
                  playTabSwitch();
                  onNavigate('hq');
                }}
                className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 active:scale-95 cursor-pointer text-white ${
                  isPastel
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 shadow-purple-400/30'
                    : 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-600 hover:to-amber-600 shadow-orange-500/30'
                }`}
              >
                <Building2 className="w-4 h-4 text-white" />
                <span>3D HEADQUARTERS</span>
                <span className="px-1.5 py-0.2 rounded-full bg-white text-purple-700 text-[9px] font-black">
                  HOT
                </span>
              </button>

              <button
                onClick={() => {
                  playTabSwitch();
                  onNavigate('protocol');
                }}
                className="px-4 py-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>USER PROTOCOL</span>
              </button>

              <span className="text-xs px-3 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-500" />
                {profile.streakDays} {isVi ? 'Ngày Chuỗi' : 'Day Streak'}
              </span>
            </div>
          </div>

          {/* RIGHT: ROBLOX DETECTIVE AVATAR */}
          <div className="flex flex-col items-center">
            <div className={`relative p-4 rounded-3xl border-2 shadow-xl w-48 h-56 flex items-center justify-center ${
              isPastel
                ? 'bg-white border-purple-200'
                : 'bg-[#0F0D24]/80 border-orange-500/40'
            }`}>
              <RobloxAvatar
                size="lg"
                equipped={profile.equipped}
                showCompanion={true}
              />
            </div>
            <div className="mt-3 text-center">
              <span className={`text-sm font-black block ${
                isPastel ? 'text-slate-800' : 'text-white'
              }`}>
                {profile.noobName}
              </span>
              <span
                onClick={() => {
                  playTabSwitch();
                  onNavigate('wardrobe');
                }}
                className={`text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                  isPastel ? 'text-purple-600 hover:text-purple-800' : 'text-gray-400 hover:text-orange-400'
                }`}
              >
                <span>{isVi ? '✨ Bấm để đổi trang phục trong Arcon Bunker' : '✨ Click to change outfit in Arcon Bunker'}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER: CHECK A URL OR PHONE NUMBER */}
      <div className={`rounded-3xl p-6 sm:p-10 border-2 shadow-xl text-center max-w-3xl mx-auto space-y-6 ${
        isPastel
          ? 'bg-white border-purple-200'
          : 'bg-[#171430] border-white/10'
      }`}>
        <div className="space-y-1.5">
          <div className={`inline-flex items-center gap-1.5 text-sm font-black uppercase tracking-wider ${
            isPastel ? 'text-purple-700' : 'text-cyan-300'
          }`}>
            <span>{isVi ? '🔍 RADAR - SCANNER • TRA CỨU NHANH LINK & SĐT' : '🔍 RADAR - SCANNER • QUICK LINK & PHONE CHECK'}</span>
          </div>
          <p className={`text-xs sm:text-sm font-medium ${
            isPastel ? 'text-slate-600' : 'text-gray-400'
          }`}>
            {isVi
              ? 'Dán đường link đáng ngờ hoặc số điện thoại lạ để phân tích các thủ đoạn mạo danh tinh vi.'
              : 'Paste any suspicious link or unknown phone number to inspect sophisticated fraud vectors.'}
          </p>
        </div>

        {/* INPUT BAR */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder={isVi ? '🔗 Dán link trang web hoặc số điện thoại (+84)...' : '🔗 Paste website link or phone number (+84)...'}
              className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 font-semibold text-sm sm:text-base transition-all shadow-inner focus:outline-none ${
                isPastel
                  ? 'bg-slate-50 border-purple-200 text-slate-800 placeholder:text-slate-400 focus:border-purple-500'
                  : 'bg-[#0C0A1E] border-white/10 text-white placeholder:text-gray-500 focus:border-cyan-400'
              }`}
            />
          </div>
          <button
            type="submit"
            disabled={!quickInput.trim()}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-black text-sm sm:text-base tracking-wider shadow-lg shadow-cyan-500/20 transition-all active:scale-98 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>{isVi ? 'QUÉT NGAY' : 'SCAN NOW'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Sample clickables */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-gray-400">
          <span className={isPastel ? 'text-slate-500' : 'text-gray-400'}>
            {isVi ? 'Mẫu thử nghiệm nhanh:' : 'Quick sample tests:'}
          </span>
          {sampleLinks.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onQuickScan(sample)}
              className={`px-3 py-1 rounded-full font-mono text-[11px] transition-all border cursor-pointer ${
                isPastel
                  ? 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
                  : 'bg-white/5 border-white/10 text-orange-300 hover:bg-white/15'
              }`}
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* 4 SHORTCUT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* SHORTCUT 1: GLITCH ZONE */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => {
            playTabSwitch();
            onNavigate('games');
          }}
          className={`p-6 rounded-3xl border shadow-xl transition-all cursor-pointer flex flex-col justify-between group ${
            isPastel
              ? 'bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200 hover:border-pink-400'
              : 'bg-gradient-to-br from-[#2a0e2d] to-[#170a24] border-rose-500/40 hover:border-rose-400 shadow-rose-950/20'
          }`}
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🎮
            </div>
            <h3 className={`text-lg font-black transition-colors ${
              isPastel ? 'text-slate-900 group-hover:text-pink-600' : 'text-white group-hover:text-rose-400'
            }`}>
              Glitch Zone
            </h3>
            <p className="text-xs text-rose-400 font-bold mt-1 mb-2">
              {isVi ? '6 Trò Chơi Luyện Phản Xạ' : '6 Training Arenas'}
            </p>
            <p className={`text-xs leading-relaxed ${isPastel ? 'text-slate-600' : 'text-gray-400'}`}>
              {isVi
                ? 'Luyện phản xạ với Phá án, Radar, Phòng thoát hiểm kèm âm thanh Ting-Ting!'
                : 'Train fast reflexes with Clue Hunter, Radar, and Escape Room!'}
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-rose-500/20 flex items-center justify-between text-xs font-bold text-rose-400">
            <span>{isVi ? 'Chơi Ngay' : 'Play Now'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        {/* SHORTCUT 2: RADAR - SCANNER */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => {
            playTabSwitch();
            onNavigate('scanner');
          }}
          className={`p-6 rounded-3xl border shadow-xl transition-all cursor-pointer flex flex-col justify-between group ${
            isPastel
              ? 'bg-gradient-to-br from-sky-50 to-cyan-50 border-sky-200 hover:border-sky-400'
              : 'bg-gradient-to-br from-[#09223b] to-[#0c182c] border-cyan-500/40 hover:border-cyan-400 shadow-cyan-950/20'
          }`}
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              📡
            </div>
            <h3 className={`text-lg font-black transition-colors ${
              isPastel ? 'text-slate-900 group-hover:text-cyan-600' : 'text-white group-hover:text-cyan-400'
            }`}>
              Radar - Scanner
            </h3>
            <p className="text-xs text-cyan-400 font-bold mt-1 mb-2">
              {isVi ? 'Quét Link & SĐT Chi Tiết' : 'Deep Threat Inspection'}
            </p>
            <p className={`text-xs leading-relaxed ${isPastel ? 'text-slate-600' : 'text-gray-400'}`}>
              {isVi
                ? 'Bóc tách tên miền, cờ đỏ SSL, số điện thoại mạo danh ngân hàng.'
                : 'Decompose domain structures, SSL warnings, and impersonation numbers.'}
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-cyan-500/20 flex items-center justify-between text-xs font-bold text-cyan-400">
            <span>{isVi ? 'Tra Cứu' : 'Inspect'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        {/* SHORTCUT 3: KNOWLEDGE HUB */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => {
            playTabSwitch();
            onNavigate('learn');
          }}
          className={`p-6 rounded-3xl border shadow-xl transition-all cursor-pointer flex flex-col justify-between group ${
            isPastel
              ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 hover:border-purple-400'
              : 'bg-gradient-to-br from-[#1e1338] to-[#110a24] border-purple-500/40 hover:border-purple-400 shadow-purple-950/20'
          }`}
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              📚
            </div>
            <h3 className={`text-lg font-black transition-colors ${
              isPastel ? 'text-slate-900 group-hover:text-purple-600' : 'text-white group-hover:text-purple-400'
            }`}>
              Knowledge Hub
            </h3>
            <p className="text-xs text-purple-400 font-bold mt-1 mb-2">
              {isVi ? 'Cẩm Nang An Toàn & Mini-Quiz' : 'Handbook & Reflex Quizzes'}
            </p>
            <p className={`text-xs leading-relaxed ${isPastel ? 'text-slate-600' : 'text-gray-400'}`}>
              {isVi
                ? '10+ kịch bản lừa đảo mới nhất: AI Deepfake, mã độc chiếm quyền, bẫy OTP.'
                : '10+ practical case studies: AI Deepfakes, Accessibility Trojans, and OTP traps.'}
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-purple-500/20 flex items-center justify-between text-xs font-bold text-purple-400">
            <span>{isVi ? 'Khám Phá' : 'Explore'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        {/* SHORTCUT 4: ARCON BUNKER */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => {
            playTabSwitch();
            onNavigate('wardrobe');
          }}
          className={`p-6 rounded-3xl border shadow-xl transition-all cursor-pointer flex flex-col justify-between group ${
            isPastel
              ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 hover:border-amber-400'
              : 'bg-gradient-to-br from-[#2f1c0e] to-[#190f07] border-amber-500/40 hover:border-amber-400 shadow-amber-950/20'
          }`}
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
              🎒
            </div>
            <h3 className={`text-lg font-black transition-colors ${
              isPastel ? 'text-slate-900 group-hover:text-amber-600' : 'text-white group-hover:text-amber-400'
            }`}>
              Arcon Bunker
            </h3>
            <p className="text-xs text-amber-400 font-bold mt-1 mb-2">
              {isVi ? 'Tủ Đồ & Trang Bị Điệp Viên' : 'Agent Wardrobe & Outfits'}
            </p>
            <p className={`text-xs leading-relaxed ${isPastel ? 'text-slate-600' : 'text-gray-400'}`}>
              {isVi
                ? 'Dùng Xu thưởng mở khóa Mũ thám tử, Kính phát sáng, Áo khoác đặc vụ.'
                : 'Spend earned Coins to unlock agent fedoras, glowing visors, and tactical coats.'}
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-amber-500/20 flex items-center justify-between text-xs font-bold text-amber-400">
            <span>{isVi ? 'Mở Tủ Đồ' : 'Open Wardrobe'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

      </div>

      {/* BOTTOM CONTROLS & LANGUAGE TOGGLE BAR (ĐẶT Ở DƯỚI TRANG CHỦ THEO YÊU CẦU) */}
      <div className={`p-6 rounded-3xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
        isPastel
          ? 'bg-white border-purple-200 text-slate-800 shadow-md'
          : 'bg-[#15112E] border-white/10 text-white shadow-xl'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg ${
            isPastel ? 'bg-purple-100 text-purple-700' : 'bg-white/10 text-orange-400'
          }`}>
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-orange-400">
              {isVi ? 'TÙY CHỈNH NGÔN NGỮ & GIAO DIỆN' : 'LANGUAGE & DISPLAY CONTROLS'}
            </div>
            <div className="text-xs text-gray-400">
              {isVi
                ? 'Bật EN để chuyển toàn bộ game & nội dung sang 100% TIẾNG ANH'
                : 'Switch to English 100% or Tiếng Việt 100%'}
            </div>
          </div>
        </div>

        {/* DUY NHẤT 1 NÚT NHẤN ĐỔI TOÀN BỘ NGÔN NGỮ (1-CLICK SWITCH) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playTabSwitch();
              toggleLanguage();
            }}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 ${
              isVi
                ? 'bg-gradient-to-r from-red-600 via-rose-600 to-orange-500 text-white shadow-rose-600/30 border border-rose-300'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-indigo-600/30 border border-indigo-300'
            }`}
            title={isVi ? 'Bấm để đổi TOÀN BỘ ứng dụng sang TIẾNG ANH (1-Click)' : 'Click to switch ENTIRE app to VIETNAMESE (1-Click)'}
          >
            <span className="text-base">{isVi ? '🇻🇳 ➔ 🇬🇧' : '🇬🇧 ➔ 🇻🇳'}</span>
            <span>
              {isVi ? 'BẤM ĐỔI TOÀN BỘ SANG TIẾNG ANH (1-CLICK)' : 'SWITCH ENTIRE APP TO VIETNAMESE (1-CLICK)'}
            </span>
            <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">
              {isVi ? '1 Nút Đổi Hết' : '1 Click All'}
            </span>
          </button>

          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={() => {
              playTabSwitch();
              toggleTheme();
            }}
            className={`p-2 rounded-2xl border text-xs font-black transition-all cursor-pointer ${
              isPastel
                ? 'bg-purple-100 border-purple-300 text-purple-900 hover:bg-purple-200'
                : 'bg-indigo-950 border-indigo-500/60 text-indigo-200 hover:border-indigo-400'
            }`}
            title={isPastel ? (isVi ? 'Chuyển sang chế độ Tối' : 'Switch to Dark Mode') : (isVi ? 'Chuyển sang chế độ Sáng Pastel' : 'Switch to Pastel Mode')}
          >
            {isPastel ? <Palette className="w-4 h-4 text-pink-500" /> : <Moon className="w-4 h-4 text-indigo-300" />}
          </button>
        </div>
      </div>
    </div>
  );
};

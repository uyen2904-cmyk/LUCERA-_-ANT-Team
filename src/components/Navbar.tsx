import React, { useState } from 'react';
import {
  Shield,
  Gamepad2,
  BookOpen,
  User,
  ShoppingBag,
  Flame,
  Plus,
  Building2,
  KeyRound,
  Terminal,
  Radio,
  Moon,
  Volume2,
  VolumeX,
  Palette,
  Headphones,
  Globe,
  BarChart3
} from 'lucide-react';
import { UserProfile, NavTab, HackerRewardInfo } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { playTabSwitch, toggleSoundMute, isSoundMuted } from '../utils/soundEffects';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  profile: UserProfile;
  lastHackerReward?: HackerRewardInfo | null;
  onClaimDailyStreak?: () => void;
  onOpenGuide: () => void;
  onOpenLogin?: () => void;
  onOpenMusic?: () => void;
}

interface NavItem {
  id: NavTab;
  label: string;
  emoji: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  profile,
  lastHackerReward,
  onClaimDailyStreak,
  onOpenGuide,
  onOpenLogin,
  onOpenMusic
}) => {
  const { toggleTheme, isPastel } = useTheme();
  const { isVi, toggleLanguage } = useLanguage();
  const [muted, setMuted] = useState<boolean>(() => isSoundMuted());

  // TÊN CÁC MỤC CHUẨN XÁC THEO YÊU CẦU:
  // Trang chủ -> Safe Lab, Check in & SĐT -> Radar - Scanner, Khu game -> Glitch Zone (icon 🎮),
  // Góc học -> Knowledge Hub (icon 📚), Tủ đồ Arcon -> Arcon Bunker, Hồ sơ -> Encrypted Info, User Protocol
  const navItems: NavItem[] = isVi
    ? [
        { id: 'hq', label: '3D Headquarters', emoji: '🏛️', icon: Building2, badge: 'HOT', badgeColor: 'bg-orange-500' },
        { id: 'home', label: 'Safe Lab', emoji: '🧪', icon: Shield },
        { id: 'scanner', label: 'Radar - Scanner', emoji: '📡', icon: Radio },
        { id: 'games', label: 'Glitch Zone', emoji: '🎮', icon: Gamepad2, badge: '6 TRÒ CHƠI', badgeColor: 'bg-rose-500' },
        { id: 'learn', label: 'Knowledge Hub', emoji: '📚', icon: BookOpen },
        { id: 'wardrobe', label: 'Arcon Bunker', emoji: '🎒', icon: ShoppingBag },
        { id: 'profile', label: 'Encrypted Info', emoji: '🗂️', icon: User },
        { id: 'protocol', label: 'User Protocol', emoji: '📟', icon: Terminal, badge: 'HƯỚNG DẪN', badgeColor: 'bg-emerald-500' },
        { id: 'stats', label: 'All the things!', emoji: '📊', icon: BarChart3, badge: 'STATS', badgeColor: 'bg-cyan-500' }
      ]
    : [
        { id: 'hq', label: '3D Headquarters', emoji: '🏛️', icon: Building2, badge: 'HOT', badgeColor: 'bg-orange-500' },
        { id: 'home', label: 'Safe Lab', emoji: '🧪', icon: Shield },
        { id: 'scanner', label: 'Radar - Scanner', emoji: '📡', icon: Radio },
        { id: 'games', label: 'Glitch Zone', emoji: '🎮', icon: Gamepad2, badge: '6 GAMES', badgeColor: 'bg-rose-500' },
        { id: 'learn', label: 'Knowledge Hub', emoji: '📚', icon: BookOpen },
        { id: 'wardrobe', label: 'Arcon Bunker', emoji: '🎒', icon: ShoppingBag },
        { id: 'profile', label: 'Encrypted Info', emoji: '🗂️', icon: User },
        { id: 'protocol', label: 'User Protocol', emoji: '📟', icon: Terminal, badge: 'MANUAL', badgeColor: 'bg-emerald-500' },
        { id: 'stats', label: 'All the things!', emoji: '📊', icon: BarChart3, badge: 'STATS', badgeColor: 'bg-cyan-500' }
      ];

  const handleTabClick = (tab: NavTab) => {
    playTabSwitch();
    onSelectTab(tab);
  };

  const handleToggleSound = () => {
    const next = toggleSoundMute();
    setMuted(next);
    if (!next) {
      playTabSwitch();
    }
  };

  const handleToggleTheme = () => {
    playTabSwitch();
    toggleTheme();
  };

  const handleToggleLang = () => {
    playTabSwitch();
    toggleLanguage();
  };

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-300 shadow-xl border-b-2 ${
      isPastel
        ? 'bg-[#FDF4FF]/95 border-purple-200/80 text-slate-800'
        : 'bg-[#120F29]/95 border-orange-500/40 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2">
          
          {/* BRAND LOGO */}
          <div
            onClick={() => handleTabClick('hq')}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
            title={isVi ? 'Quay về Trụ Sở 3D Điệp Viên' : 'Return to 3D Headquarters'}
          >
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 border ${
              isPastel
                ? 'bg-gradient-to-tr from-purple-500 via-pink-500 to-amber-400 text-white shadow-purple-500/20 border-white/80'
                : 'bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-600 text-white shadow-orange-500/30 border-orange-300/40'
            }`}>
              <span className="text-xl font-black">L</span>
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-xl sm:text-2xl font-black tracking-tight ${
                  isPastel ? 'text-purple-950' : 'text-white'
                }`}>
                  LUCERA
                </span>
                <span className={`hidden sm:inline text-[9px] uppercase font-black tracking-wider px-2 py-0.5 rounded-md ${
                  isPastel ? 'bg-purple-600 text-white' : 'bg-orange-500 text-white'
                }`}>
                  {isVi ? 'TRỤ SỞ 3D' : '3D HQ'}
                </span>
              </div>
              <p className={`text-[10px] sm:text-[11px] font-semibold leading-tight ${
                isPastel ? 'text-purple-700' : 'text-orange-200/90'
              }`}>
                {isVi ? 'Biệt Đội Điệp Viên An Ninh Mạng • 100% Cục Bộ' : 'Cyber Detective Bureau • 100% Offline'}
              </p>
            </div>
          </div>

          {/* DESKTOP NAVIGATION TABS (8 TABS VỚI ICON & EMOJI RÕ RÀNG) */}
          <nav className={`hidden xl:flex items-center gap-1 p-1.5 rounded-full border shadow-inner ${
            isPastel
              ? 'bg-white/80 border-purple-200 shadow-purple-100'
              : 'bg-[#1C1838] border-white/10 shadow-black/40'
          }`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer select-none active:scale-95 ${
                    isActive
                      ? isPastel
                        ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 text-white shadow-md shadow-purple-500/30'
                        : 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow-md shadow-orange-500/30 ring-2 ring-orange-400/30'
                      : isPastel
                        ? 'text-slate-600 hover:text-purple-900 hover:bg-purple-100/60'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="text-sm">{item.emoji}</span>
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : isPastel ? 'text-purple-600' : 'text-orange-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[8px] font-black text-white ${item.badgeColor || 'bg-rose-500'} ${isActive ? 'ring-1 ring-white/50' : 'animate-pulse'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* CÁC NÚT ĐIỀU KHIỂN BÊN PHẢI */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* DUY NHẤT 1 NÚT NHẤN ĐỔI TOÀN BỘ NGÔN NGỮ (1-CLICK SWITCH) */}
            <button
              onClick={handleToggleLang}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95 ${
                isPastel
                  ? isVi
                    ? 'bg-rose-50 border-rose-300 text-rose-700 hover:bg-rose-100'
                    : 'bg-indigo-50 border-indigo-300 text-indigo-700 hover:bg-indigo-100'
                  : isVi
                    ? 'bg-gradient-to-r from-rose-900/80 to-red-900/80 border-rose-500/80 text-rose-200 hover:border-rose-400'
                    : 'bg-gradient-to-r from-blue-900/80 to-indigo-900/80 border-cyan-400/80 text-cyan-200 hover:border-cyan-300'
              }`}
              title={isVi ? 'Bấm nút này để đổi TOÀN BỘ sang TIẾNG ANH (1-click)' : 'Click this single button to switch ENTIRE app to VIETNAMESE (1-click)'}
            >
              <span>{isVi ? '🇻🇳' : '🇬🇧'}</span>
              <span className="font-extrabold">{isVi ? 'VI ➔ EN' : 'EN ➔ VI'}</span>
              <span className={`hidden sm:inline text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase ${
                isVi ? 'bg-rose-500 text-white' : 'bg-cyan-500 text-black'
              }`}>
                {isVi ? '1 Nút Đổi' : '1-Click'}
              </span>
            </button>

            {/* THEME TOGGLE BUTTON: TỐI vs SÁNG PASTEL */}
            <button
              onClick={handleToggleTheme}
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-2xl border text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95 ${
                isPastel
                  ? 'bg-purple-100 border-purple-300 text-purple-900 hover:bg-purple-200'
                  : 'bg-indigo-950/80 border-indigo-500/60 text-indigo-200 hover:border-indigo-400 hover:bg-indigo-900/60'
              }`}
              title={isPastel ? (isVi ? 'Chuyển sang chế độ Tối Cyber' : 'Switch to Cyber Dark') : (isVi ? 'Chuyển sang chế độ Sáng Pastel' : 'Switch to Pastel Glow')}
            >
              {isPastel ? (
                <>
                  <Palette className="w-3.5 h-3.5 text-pink-500" />
                  <span className="hidden md:inline text-[11px]">{isVi ? 'PASTEL' : 'LIGHT'}</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-300" />
                  <span className="hidden md:inline text-[11px]">{isVi ? 'TỐI' : 'DARK'}</span>
                </>
              )}
            </button>

            {/* SOUND EFFECT TOGGLE (TING TING / EEEE SOUNDS) */}
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-2xl border transition-all cursor-pointer ${
                muted
                  ? isPastel
                    ? 'bg-rose-100 border-rose-300 text-rose-600'
                    : 'bg-rose-950/60 border-rose-500/50 text-rose-400'
                  : isPastel
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                    : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
              }`}
              title={muted ? (isVi ? 'Bật âm thanh (Ting Ting khi đúng, Eeee khi sai)' : 'Unmute sound effects') : (isVi ? 'Tắt âm thanh hiệu ứng' : 'Mute sound effects')}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* NÚT MỞ RÕ RÀNG: Music with hacker :3 */}
            {onOpenMusic && (
              <button
                onClick={onOpenMusic}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-black shadow-md transition-all cursor-pointer active:scale-95 ${
                  isPastel
                    ? 'bg-gradient-to-r from-pink-100 to-purple-100 border-pink-300 text-purple-950 hover:bg-pink-200 shadow-pink-200/50'
                    : 'bg-gradient-to-r from-pink-950/80 via-purple-950/80 to-indigo-950/80 border-pink-500/50 text-pink-200 hover:border-pink-400 shadow-pink-950/50'
                }`}
                title={isVi ? 'Mở góc chọn nhạc: Music with hacker :3' : 'Open: Music with hacker :3'}
              >
                <Headphones className="w-3.5 h-3.5 text-pink-400" />
                <span className="text-xs font-black tracking-tight whitespace-nowrap">
                  Music with hacker :3
                </span>
              </button>
            )}

            {/* STREAK BADGE */}
            <div
              onClick={onClaimDailyStreak}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-black shadow-xs transition-all cursor-pointer select-none group ${
                isPastel
                  ? 'bg-orange-100 border-orange-300 text-orange-900 hover:border-orange-400'
                  : 'bg-orange-950/70 border-orange-500/60 text-orange-200 hover:border-orange-400'
              }`}
              title={isVi ? 'Chuỗi ngày điểm danh an toàn' : 'Daily check-in streak'}
            >
              <Flame className="w-4 h-4 text-orange-400 fill-orange-500 animate-bounce" />
              <span>{profile.streakDays} {isVi ? 'NGÀY' : 'DAYS'}</span>
              <span className="hidden lg:inline text-[10px] bg-orange-500/30 px-1.5 py-0.5 rounded-full text-orange-300 font-bold group-hover:bg-orange-500/50">
                <Plus className="w-2.5 h-2.5 inline" />1
              </span>
            </div>

            {/* THANH HACKER’S MONEY TRÊN THANH TRÊN CÙNG */}
            <div
              onClick={() => handleTabClick('wardrobe')}
              className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-2xl border-2 text-xs font-black cursor-pointer transition-all shadow-md select-none group active:scale-95 ${
                lastHackerReward
                  ? isPastel
                    ? 'bg-gradient-to-r from-emerald-100 via-teal-50 to-green-100 border-emerald-400 text-emerald-950 shadow-emerald-200/60 ring-2 ring-emerald-300/40'
                    : 'bg-gradient-to-r from-emerald-950/90 via-teal-950/90 to-black/95 border-emerald-400 text-emerald-300 shadow-emerald-900/60 ring-2 ring-emerald-500/50'
                  : isPastel
                    ? 'bg-amber-100 border-amber-300 text-amber-900 hover:border-amber-400'
                    : 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200 hover:border-emerald-400'
              }`}
              title={
                lastHackerReward
                  ? isVi
                    ? `hacker’s money: ${profile.coins} 🪙 (Vừa thưởng +${lastHackerReward.amount} 🪙 từ map ${lastHackerReward.gameName})`
                    : `hacker’s money: ${profile.coins} 🪙 (Just rewarded +${lastHackerReward.amount} 🪙 from map ${lastHackerReward.gameName})`
                  : isVi ? 'hacker’s money: Số tiền sau khi thắng map game' : 'hacker’s money: Hacker balance rewarded from game maps'
              }
            >
              <span className="text-sm">🪙</span>
              <div className="flex flex-col text-left leading-none">
                <div className="flex items-center gap-1">
                  <span className={`text-[9px] font-black uppercase tracking-wider ${
                    lastHackerReward
                      ? (isPastel ? 'text-emerald-800' : 'text-emerald-400 font-extrabold')
                      : (isPastel ? 'text-amber-800' : 'text-emerald-400')
                  }`}>
                    hacker’s money
                  </span>
                  {lastHackerReward && (
                    <span className="px-1.5 py-0.2 rounded-full text-[8px] font-black bg-emerald-500 text-black animate-pulse">
                      +{lastHackerReward.amount}
                    </span>
                  )}
                </div>
                <span className={`text-xs font-black ${isPastel ? 'text-slate-900' : 'text-white'} group-hover:text-emerald-300 transition-colors`}>
                  {profile.coins} 🪙
                </span>
              </div>
            </div>

            {/* QUICK ROBLOX AVATAR PEEK */}
            <button
              onClick={() => handleTabClick('profile')}
              className={`relative p-1 rounded-2xl border transition-all flex items-center gap-2 pl-2 pr-2.5 shadow-sm cursor-pointer ${
                isPastel
                  ? 'bg-white border-purple-300 hover:border-purple-400'
                  : 'bg-[#1C1838] border-orange-400/60 hover:border-orange-400'
              }`}
              title={isVi ? 'Xem hồ sơ điệp viên' : 'View agent dossier'}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 border border-orange-300 flex items-center justify-center text-xs font-black overflow-hidden shadow-inner text-white">
                <span>🤖</span>
              </div>
              <div className="hidden lg:block text-left">
                <div className={`text-[11px] font-black leading-tight truncate max-w-[80px] ${
                  isPastel ? 'text-slate-800' : 'text-white'
                }`}>
                  {profile.noobName}
                </div>
                <div className={`text-[10px] font-bold leading-none ${
                  isPastel ? 'text-purple-600' : 'text-orange-300'
                }`}>
                  {isVi ? 'CẤP' : 'LV'}.{profile.level}
                </div>
              </div>
            </button>

            {/* Switch User / Re-login Button */}
            {onOpenLogin && (
              <button
                onClick={onOpenLogin}
                className={`p-2 rounded-2xl border transition-all cursor-pointer ${
                  isPastel
                    ? 'bg-purple-100 border-purple-200 text-slate-600 hover:text-slate-900'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
                }`}
                title={isVi ? 'Khóa phiên / Đổi mật danh' : 'Lock session / Change key'}
              >
                <KeyRound className="w-4 h-4 text-orange-400" />
              </button>
            )}
          </div>

        </div>

        {/* MOBILE & TABLET HORIZONTAL NAVIGATION SCROLLBAR */}
        <div className="xl:hidden flex items-center gap-1.5 pb-2.5 overflow-x-auto no-scrollbar pt-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                  isActive
                    ? isPastel
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md shadow-purple-500/20'
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30'
                    : isPastel
                      ? 'bg-white text-slate-700 border border-purple-200 shadow-xs'
                      : 'bg-[#1C1838] text-gray-300 border border-white/10'
                }`}
              >
                <span className="text-xs">{item.emoji}</span>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : isPastel ? 'text-purple-600' : 'text-orange-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`px-1 rounded-full text-[8px] font-black text-white ${item.badgeColor || 'bg-rose-500'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};

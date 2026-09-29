import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, Flame, Target, Shield, Edit2, Sparkles, 
  RotateCcw, Check, X, UserPlus, Info, CalendarCheck
} from 'lucide-react';
import { UserProfile, BadgeInfo } from '../types';
import { BADGES_LIST, calculateLevel } from '../data/wardrobeItems';
import { RobloxAvatar } from './RobloxAvatar';
import { playCorrectTingTing } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';

interface ProfileViewProps {
  profile: UserProfile;
  onUpdateProfile?: (updated: Partial<UserProfile>) => void;
  onCreateNewProfile?: (name: string, noobName: string, bio: string) => void;
  onStreakCheckIn?: () => void;
  onUpdateNames?: (name: string, noobName: string) => void;
  onNavigateWardrobe?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  onUpdateProfile,
  onCreateNewProfile,
  onStreakCheckIn,
  onUpdateNames,
  onNavigateWardrobe
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [noobName, setNoobName] = useState(profile.noobName);
  const [bio, setBio] = useState(profile.bio || 'Think twice. Click once.');
  
  // New profile modal state
  const [showNewProfileModal, setShowNewProfileModal] = useState(false);
  const [newAgentName, setNewAgentName] = useState('Agent Rookie');
  const [newRobloxAlias, setNewRobloxAlias] = useState('Detective Rookie');
  const [newBio, setNewBio] = useState('Think twice. Click once.');
  
  // Feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { isVi } = useLanguage();

  const levelInfo = calculateLevel(profile.xp);
  const isAntUnlocked = profile.streakDays >= 10;
  const streakPercent = Math.min(Math.round((profile.streakDays / 10) * 100), 100);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveEdit = () => {
    const trimmedName = name.trim() || profile.name;
    const trimmedAlias = noobName.trim() || profile.noobName;
    const trimmedBio = bio.trim() || 'Think twice. Click once.';

    if (onUpdateProfile) {
      onUpdateProfile({
        name: trimmedName,
        noobName: trimmedAlias,
        bio: trimmedBio
      });
    } else if (onUpdateNames) {
      onUpdateNames(trimmedName, trimmedAlias);
    }

    setIsEditing(false);
    showToast('Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setName(profile.name);
    setNoobName(profile.noobName);
    setBio(profile.bio || 'Think twice. Click once.');
    setIsEditing(false);
  };

  const handleConfirmNewProfile = () => {
    if (onCreateNewProfile) {
      onCreateNewProfile(
        newAgentName.trim() || 'Agent Rookie',
        newRobloxAlias.trim() || 'Detective Rookie',
        newBio.trim() || 'Think twice. Click once.'
      );
    }
    setShowNewProfileModal(false);
    showToast('New profile created! All stats reset to 0.');
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const handleTriggerCheckIn = () => {
    if (onStreakCheckIn) {
      onStreakCheckIn();
      const nextStreak = profile.streakDays + 1;
      if (nextStreak === 10) {
        showToast('🎉 AMAZING! You reached a 10-day streak! FPT Orange Ant mascot is now UNLOCKED!');
      } else if (nextStreak < 10) {
        showToast(`🔥 Checked in! Current streak: ${nextStreak}/10 days (${10 - nextStreak} more days to unlock FPT Orange Ant)`);
      } else {
        showToast(`🔥 Checked in! Current streak: ${nextStreak} days! Defense bonus granted!`);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 text-white">
      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-2xl border border-white/20 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP ACTIONS BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#171432] p-4 rounded-3xl border border-white/10 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white">
              {isVi ? 'Hồ Sơ Mật Vụ & Căn Cước Điệp Viên' : 'Cyber Detective Dossier & ID'}
            </h2>
            <p className="text-[11px] text-gray-400">
              {isVi ? 'Quản lý thông tin mật vụ, điểm danh chuỗi ngày & danh hiệu' : 'Manage credentials, daily streak defense & customize character'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
              isEditing 
                ? 'bg-white/20 text-white border border-white/30' 
                : 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-400/40'
            }`}
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>
              {isEditing 
                ? (isVi ? 'Hủy Chỉnh Sửa' : 'Cancel Editing') 
                : (isVi ? 'Chỉnh Sửa Hồ Sơ' : 'Edit Profile')}
            </span>
          </button>

          <button
            onClick={() => setShowNewProfileModal(true)}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-500/30 to-amber-500/20 hover:from-rose-500/40 hover:to-amber-500/30 text-rose-200 hover:text-white font-bold text-xs border border-rose-400/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            title={isVi ? 'Tạo hồ sơ mới (khởi tạo lại từ đầu)' : 'Create a fresh profile resetting all stats to 0'}
          >
            <UserPlus className="w-3.5 h-3.5 text-rose-300" />
            <span>{isVi ? 'Tạo Hồ Sơ Mới' : 'New Profile'}</span>
          </button>
        </div>
      </div>

      {/* DETECTIVE ID LICENSE CARD */}
      <div className="relative bg-gradient-to-br from-[#241F48] via-[#1D183B] to-[#120F28] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-orange-500/40 overflow-hidden">
        {/* Decorative watermarks */}
        <div className="absolute top-0 right-0 p-8 opacity-5 font-black text-8xl pointer-events-none select-none">
          LUCERA
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          {/* AVATAR BADGE */}
          <div className="p-4 bg-black/40 backdrop-blur-md rounded-3xl border border-orange-500/30 shadow-inner flex flex-col items-center">
            <RobloxAvatar
              size="md"
              equipped={profile.equipped}
              showCompanion={isAntUnlocked}
              interactive={true}
            />
            <span className="mt-2 text-[11px] font-mono tracking-widest text-orange-300 uppercase">
              DOSSIER #{profile.level}0924
            </span>
          </div>

          {/* DETECTIVE DETAILS */}
          <div className="flex-1 text-center md:text-left space-y-3 w-full">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black uppercase tracking-wider shadow-sm">
                OFFICIAL CYBER CREDENTIAL
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-orange-200 text-xs font-bold">
                LV.{levelInfo.level} • {levelInfo.title}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
                🪙 {profile.coins} Coins
              </span>
            </div>

            {!isEditing ? (
              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-wide text-white">
                    {profile.name}
                  </h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1.5 hover:bg-white/10 rounded-lg text-orange-300 hover:text-white transition-all cursor-pointer"
                    title="Edit Profile"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-xs text-gray-300">
                  Roblox Callsign: <strong className="text-orange-300">{profile.noobName}</strong> • Companion: <strong className={isAntUnlocked ? "text-emerald-300" : "text-gray-400"}>{isAntUnlocked ? "FPT Orange Ant 🐜 (Active)" : "Locked (0/10 Days)"}</strong>
                </p>

                {profile.bio && (
                  <p className="text-xs text-orange-200/90 italic mt-1 bg-black/20 px-3 py-1.5 rounded-xl border border-white/5 inline-block">
                    "{profile.bio}"
                  </p>
                )}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-black/40 border border-orange-500/40 space-y-3 max-w-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-orange-300 uppercase tracking-wider">
                    Edit Investigator Credentials
                  </span>
                  <button onClick={handleCancelEdit} className="text-gray-400 hover:text-white text-xs">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                      Agent Name:
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-black/60 text-white placeholder-gray-500 text-xs font-bold border border-white/20 focus:border-orange-400 focus:outline-none"
                      placeholder="e.g. Agent Phoenix"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                      Roblox Callsign:
                    </label>
                    <input
                      type="text"
                      value={noobName}
                      onChange={(e) => setNoobName(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-black/60 text-white placeholder-gray-500 text-xs font-bold border border-white/20 focus:border-orange-400 focus:outline-none"
                      placeholder="e.g. Roblox Sleuth"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">
                    Security Motto / Bio:
                  </label>
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-black/60 text-white placeholder-gray-500 text-xs font-bold border border-white/20 focus:border-orange-400 focus:outline-none"
                    placeholder="e.g. Think twice. Click once."
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 font-bold text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs cursor-pointer shadow-md flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Credentials</span>
                  </button>
                </div>
              </div>
            )}

            {/* CYBER XP PROGRESS BAR */}
            <div className="pt-2">
              <div className="flex justify-between text-xs text-orange-200 font-bold mb-1">
                <span>Cyber XP: {profile.xp} XP</span>
                <span>{levelInfo.nextXp} XP required for next rank</span>
              </div>
              <div className="w-full h-3 rounded-full bg-black/60 overflow-hidden p-0.5 border border-orange-500/30">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-500"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FPT KIEN SANG COMPANION STATUS & 10-DAY STREAK CARD */}
      <div className={`p-6 rounded-3xl border-2 transition-all shadow-2xl relative overflow-hidden ${
        isAntUnlocked 
          ? 'bg-gradient-to-r from-orange-500/20 via-amber-500/15 to-[#171432] border-orange-500/60'
          : 'bg-[#171432] border-orange-500/30'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl text-3xl border shadow-md ${
              isAntUnlocked
                ? 'bg-orange-500/30 border-orange-400 text-orange-300 animate-bounce'
                : 'bg-black/40 border-white/10 grayscale opacity-70'
            }`} style={{ animationDuration: '3s' }}>
              🐜
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  Mascot Đồng Hành: FPT Kiến Sáng
                </h3>
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                  isAntUnlocked
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-orange-500/20 text-orange-300 border border-orange-400/40'
                }`}>
                  {isAntUnlocked ? 'ĐÃ MỞ KHÓA ✓' : 'YÊU CẦU 10 NGÀY STREAK'}
                </span>
              </div>
              <p className="text-xs text-gray-300 mt-0.5">
                Linh vật đặc biệt với cặp ăng-ten phát sáng trí tuệ soi chiếu bẫy lừa đảo mạng
              </p>
            </div>
          </div>

          <button
            onClick={handleTriggerCheckIn}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs shadow-lg transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            title="Điểm danh hôm nay để tăng streak và tiến gần đến mốc 10 ngày mở khóa Kiến Sáng"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Điểm Danh Hôm Nay (+1 Streak)</span>
          </button>
        </div>

        {/* PROGRESS BAR TO 10 DAYS */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-orange-200 flex items-center gap-1">
              <Flame className="w-4 h-4 text-orange-400" />
              Tiến trình chuỗi bảo vệ: <strong className="text-white ml-1">{profile.streakDays} / 10 Ngày</strong>
            </span>
            <span className={isAntUnlocked ? "text-emerald-400 font-black" : "text-amber-300"}>
              {streakPercent}% {isAntUnlocked ? '(Hoàn thành!)' : `(Cần thêm ${Math.max(0, 10 - profile.streakDays)} ngày)`}
            </span>
          </div>

          <div className="w-full h-3.5 rounded-full bg-black/60 p-0.5 border border-orange-500/30 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 transition-all duration-500 shadow-sm"
              style={{ width: `${streakPercent}%` }}
            />
          </div>

          <p className="text-[11px] text-gray-300 leading-relaxed font-medium">
            {isAntUnlocked ? (
              <span className="text-emerald-300 font-semibold">
                ✨ Xuất sắc! Bạn đã duy trì chuỗi bảo vệ mạng từ 10 ngày trở lên. Kiến Sáng FPT hiện đã mở khóa toàn diện trong Tủ đồ Roblox & Phòng Chỉ huy 3D!
              </span>
            ) : (
              <span>
                🔒 <strong>Lưu ý:</strong> Khi bắt đầu một profile mới, tất cả chỉ số bắt đầu từ con số 0. Linh vật <strong>Kiến Sáng FPT</strong> yêu cầu bắt buộc duy trì chuỗi điểm danh <strong>10 ngày liên tục</strong> mới được mở khóa và đồng hành!
              </span>
            )}
          </p>
        </div>
      </div>

      {/* 4 CORE STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-[#171432] border border-white/10 shadow-xl text-center">
          <Flame className="w-6 h-6 text-orange-400 mx-auto mb-1.5" />
          <span className="text-2xl font-black text-white block">{profile.streakDays} Days</span>
          <span className="text-xs font-bold text-gray-400">Defense Streak</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#171432] border border-white/10 shadow-xl text-center">
          <Target className="w-6 h-6 text-emerald-400 mx-auto mb-1.5" />
          <span className="text-2xl font-black text-white block">{profile.accuracyRate}%</span>
          <span className="text-xs font-bold text-gray-400">Scan Accuracy</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#171432] border border-white/10 shadow-xl text-center">
          <Shield className="w-6 h-6 text-cyan-400 mx-auto mb-1.5" />
          <span className="text-2xl font-black text-white block">{profile.scamsIdentified}</span>
          <span className="text-xs font-bold text-gray-400">Cases Solved</span>
        </div>

        <div className="p-5 rounded-3xl bg-[#171432] border border-white/10 shadow-xl text-center">
          <Award className="w-6 h-6 text-amber-400 mx-auto mb-1.5" />
          <span className="text-2xl font-black text-white block">{profile.badges.length}</span>
          <span className="text-xs font-bold text-gray-400">Badges Unlocked</span>
        </div>
      </div>

      {/* BADGES COLLECTION */}
      <div className="bg-[#171432] rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-lg font-black text-white">Detective Badges & Honors</h3>
            <p className="text-xs text-gray-400">Recognitions awarded for outstanding scam detection vigilance</p>
          </div>
          <span className="text-xs font-bold text-orange-300 bg-orange-500/20 border border-orange-500/40 px-3 py-1 rounded-full">
            {profile.badges.length}/{BADGES_LIST.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {BADGES_LIST.map((badge: BadgeInfo) => {
            const isUnlocked = profile.badges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3 ${
                  isUnlocked
                    ? 'border-orange-500/40 bg-white/5 shadow-xs'
                    : 'border-white/5 bg-black/20 opacity-40 grayscale'
                }`}
              >
                <span className="text-3xl p-2 rounded-2xl bg-white/10 border border-white/10 shadow-xs flex-shrink-0">
                  {badge.icon}
                </span>
                <div>
                  <h4 className="text-xs font-black text-white flex items-center gap-1">
                    {badge.name}
                    {isUnlocked && <span className="text-emerald-400 text-xs">✓</span>}
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{badge.description}</p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-orange-300 bg-orange-500/20 border border-orange-500/30 px-2 py-0.5 rounded">
                    {badge.requirement}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CREATE NEW PROFILE CONFIRMATION MODAL */}
      <AnimatePresence>
        {showNewProfileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0D1E]/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-gradient-to-b from-[#1F1A3D] via-[#241E4A] to-[#15122E] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-orange-500/70 text-white my-4"
            >
              <button
                onClick={() => setShowNewProfileModal(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-300">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">
                    Tạo Profile Mới (Bắt Đầu Từ Con Số 0)
                  </h3>
                  <p className="text-xs text-gray-400">
                    Khởi tạo sự nghiệp thám tử an toàn mạng hoàn toàn mới
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 mb-4 text-xs text-gray-300">
                <span className="font-black text-rose-300 uppercase tracking-wider block">
                  ⚠️ Tất cả thông số sẽ trở về 0:
                </span>
                <ul className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold text-gray-300">
                  <li className="flex items-center gap-1.5">🔄 Cấp độ: <strong>Cấp 1 (Rookie)</strong></li>
                  <li className="flex items-center gap-1.5">⚡ Cyber XP: <strong>0 XP</strong></li>
                  <li className="flex items-center gap-1.5">🪙 Tiền Coins: <strong>0 Coins</strong></li>
                  <li className="flex items-center gap-1.5">🔥 Chuỗi Streak: <strong>0 Ngày</strong></li>
                  <li className="flex items-center gap-1.5">🐜 Kiến Sáng: <strong>Khóa (Cần 10 ngày)</strong></li>
                  <li className="flex items-center gap-1.5">🏆 Huy hiệu: <strong>0 Huy hiệu</strong></li>
                </ul>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-black text-orange-300 uppercase block mb-1">
                    Tên Điều Tra Viên (Agent Name):
                  </label>
                  <input
                    type="text"
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 text-white placeholder-gray-500 text-xs font-bold border border-white/20 focus:border-orange-400 focus:outline-none"
                    placeholder="VD: Agent Rookie"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-orange-300 uppercase block mb-1">
                    Biệt Danh Roblox (Roblox Callsign):
                  </label>
                  <input
                    type="text"
                    value={newRobloxAlias}
                    onChange={(e) => setNewRobloxAlias(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 text-white placeholder-gray-500 text-xs font-bold border border-white/20 focus:border-orange-400 focus:outline-none"
                    placeholder="VD: Detective Rookie"
                  />
                </div>

                <div>
                  <label className="text-xs font-black text-orange-300 uppercase block mb-1">
                    Châm Ngôn Phòng Thủ (Bio / Motto):
                  </label>
                  <input
                    type="text"
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 text-white placeholder-gray-500 text-xs font-bold border border-white/20 focus:border-orange-400 focus:outline-none"
                    placeholder="VD: Think twice. Click once."
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowNewProfileModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 font-bold text-xs cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  onClick={handleConfirmNewProfile}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-black text-xs cursor-pointer shadow-lg active:scale-95"
                >
                  Xác Nhận Tạo Profile Mới (Về 0)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

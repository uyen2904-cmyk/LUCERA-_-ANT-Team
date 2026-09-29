import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BarChart3,
  Calendar,
  Clock,
  Coins,
  Flame,
  ShieldCheck,
  Award,
  Target,
  Gamepad2,
  Radio,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Zap,
  TrendingUp,
  HelpCircle,
  FileSearch
} from 'lucide-react';
import { UserProfile, StatsTimeframe } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { getStoredStats } from '../utils/statsTracker';
import { playTabSwitch } from '../utils/soundEffects';

interface AllTheThingsViewProps {
  profile: UserProfile;
  onNavigateTab: (tab: any) => void;
}

export const AllTheThingsView: React.FC<AllTheThingsViewProps> = ({
  profile,
  onNavigateTab
}) => {
  const { isVi } = useLanguage();
  const { isPastel } = useTheme();

  // Active timeframe selector: daily | weekly | allTime
  const [timeframe, setTimeframe] = useState<StatsTimeframe>('daily');
  const [stats, setStats] = useState(() => getStoredStats(profile));

  useEffect(() => {
    setStats(getStoredStats(profile));
  }, [profile]);

  const handleSelectTimeframe = (tf: StatsTimeframe) => {
    playTabSwitch();
    setTimeframe(tf);
  };

  const current = stats[timeframe];

  const formatPlayTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} ${isVi ? 'phút' : 'mins'}`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMins = minutes % 60;
    return `${hours}h ${remainingMins}m`;
  };

  const timeframeLabels = {
    daily: {
      title: isVi ? 'Hôm Nay (Daily)' : 'Today (Daily)',
      subtitle: isVi ? 'Thống kê hoạt động phòng thủ an ninh mạng trong ngày' : 'Cyber defense operations recorded today'
    },
    weekly: {
      title: isVi ? 'Tuần Này (Weekly)' : 'This Week (Weekly)',
      subtitle: isVi ? 'Tiến độ phá án và tích lũy tiền thưởng trong 7 ngày qua' : 'Investigation progress and bounty accumulated past 7 days'
    },
    allTime: {
      title: isVi ? 'Toàn Thời Gian (All Time)' : 'All Time (Lifetime)',
      subtitle: isVi ? 'Tổng hợp toàn bộ thành tựu, vụ án và tiền hacker tích lũy' : 'Complete career dossier, solved cases, and cumulative hacker bounty'
    }
  };

  return (
    <div className={`w-full max-w-5xl mx-auto space-y-8 transition-colors select-none ${
      isPastel ? 'text-slate-800' : 'text-white'
    }`}>
      {/* ========================================================================= */}
      {/* TOP HEADER & TIMEFRAME SELECTOR BUTTONS (Ở TRÊN MÉP CỦA MỤC) */}
      {/* ========================================================================= */}
      <div className={`p-5 sm:p-7 rounded-3xl border-2 shadow-2xl backdrop-blur-md transition-all ${
        isPastel
          ? 'bg-gradient-to-br from-white via-purple-50/80 to-pink-50/80 border-purple-200'
          : 'bg-gradient-to-br from-[#1C1838] via-[#211B45] to-[#120F29] border-indigo-500/40'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* LEFT: SECTION IDENTITY */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-md ${
                isPastel ? 'bg-purple-600 text-white' : 'bg-gradient-to-tr from-indigo-500 to-cyan-400 text-white'
              }`}>
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${
                  isPastel ? 'text-purple-950' : 'text-white'
                }`}>
                  All the things!
                </h1>
                <p className={`text-xs font-bold ${
                  isPastel ? 'text-purple-700' : 'text-indigo-300'
                }`}>
                  {isVi ? 'Báo cáo thống kê toàn diện về điệp viên' : 'Comprehensive Agent Intelligence & Performance Metrics'}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT / TOP EDGE: TIMEFRAME BUTTONS (NGÀY / TUẦN / CẢ THỜI GIAN CHƠI) */}
          <div className={`p-1.5 rounded-2xl border flex items-center gap-1.5 shadow-inner ${
            isPastel
              ? 'bg-purple-100/80 border-purple-200'
              : 'bg-black/50 border-white/10'
          }`}>
            <button
              onClick={() => handleSelectTimeframe('daily')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                timeframe === 'daily'
                  ? isPastel
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-400 text-black shadow-lg shadow-emerald-500/30'
                  : isPastel
                    ? 'text-purple-900 hover:bg-white/60'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              title={isVi ? 'Xem thống kê hôm nay' : 'View daily statistics'}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{isVi ? 'Hằng Ngày' : 'Daily'}</span>
            </button>

            <button
              onClick={() => handleSelectTimeframe('weekly')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                timeframe === 'weekly'
                  ? isPastel
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30'
                  : isPastel
                    ? 'text-purple-900 hover:bg-white/60'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              title={isVi ? 'Xem thống kê tuần này' : 'View weekly statistics'}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{isVi ? 'Hằng Tuần' : 'Weekly'}</span>
            </button>

            <button
              onClick={() => handleSelectTimeframe('allTime')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                timeframe === 'allTime'
                  ? isPastel
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white shadow-lg shadow-orange-500/30'
                  : isPastel
                    ? 'text-purple-900 hover:bg-white/60'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
              title={isVi ? 'Xem toàn bộ thời gian chơi' : 'View all time statistics'}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{isVi ? 'Cả Thời Gian' : 'All Time'}</span>
            </button>
          </div>
        </div>

        {/* ACTIVE TIMEFRAME BANNER BADGE */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-md font-black uppercase text-[10px] ${
              timeframe === 'daily'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : timeframe === 'weekly'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
            }`}>
              {timeframeLabels[timeframe].title}
            </span>
            <span className={isPastel ? 'text-slate-600' : 'text-gray-300'}>
              {timeframeLabels[timeframe].subtitle}
            </span>
          </div>

          <span className="text-[11px] font-bold opacity-70">
            {profile.noobName} • Lv.{profile.level}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 PRIMARY STATS HIGHLIGHT CARDS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* CARD 1: CASES SOLVED & QUESTIONS ANSWERED */}
        <motion.div
          key={`cases-${timeframe}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-5 rounded-3xl border-2 shadow-lg transition-all ${
            isPastel
              ? 'bg-white border-purple-200'
              : 'bg-[#181436] border-purple-500/40 shadow-purple-950/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-wider ${
              isPastel ? 'text-purple-700' : 'text-purple-300'
            }`}>
              {isVi ? 'Vụ Án & Câu Hỏi' : 'Cases & Questions'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <FileSearch className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black">
              {current.casesSolved}
            </span>
            <span className="text-xs font-bold opacity-75">
              {isVi ? 'vụ án phá thành công' : 'cases solved'}
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
            <span className="opacity-75">{isVi ? 'Câu hỏi trả lời:' : 'Questions answered:'}</span>
            <span className="font-black text-purple-400">{current.questionsAnswered}</span>
          </div>
        </motion.div>

        {/* CARD 2: STREAK DAYS */}
        <motion.div
          key={`streak-${timeframe}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className={`p-5 rounded-3xl border-2 shadow-lg transition-all ${
            isPastel
              ? 'bg-white border-orange-200'
              : 'bg-[#181436] border-orange-500/40 shadow-orange-950/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-wider ${
              isPastel ? 'text-orange-700' : 'text-orange-300'
            }`}>
              {isVi ? 'Chuỗi Điểm Danh' : 'Defense Streak'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-orange-400">
              {profile.streakDays}
            </span>
            <span className="text-xs font-bold opacity-75">
              {isVi ? 'ngày liên tục' : 'consecutive days'}
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
            <span className="opacity-75">{isVi ? 'Kỷ lục cao nhất:' : 'Best record:'}</span>
            <span className="font-black text-orange-400">{Math.max(profile.streakDays, 7)} {isVi ? 'ngày' : 'days'}</span>
          </div>
        </motion.div>

        {/* CARD 3: HACKER'S MONEY EARNED */}
        <motion.div
          key={`money-${timeframe}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-5 rounded-3xl border-2 shadow-lg transition-all ${
            isPastel
              ? 'bg-white border-emerald-300'
              : 'bg-[#181436] border-emerald-500/40 shadow-emerald-950/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-wider ${
              isPastel ? 'text-emerald-700' : 'text-emerald-400'
            }`}>
              hacker’s money
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-black text-emerald-400">
              +{current.hackerMoneyEarned}
            </span>
            <span className="text-lg">🪙</span>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
            <span className="opacity-75">{isVi ? 'Số dư ví hiện tại:' : 'Current vault balance:'}</span>
            <span className="font-black text-emerald-300">{profile.coins} 🪙</span>
          </div>
        </motion.div>

        {/* CARD 4: PLAYTIME & DEFENSE DURATION */}
        <motion.div
          key={`time-${timeframe}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className={`p-5 rounded-3xl border-2 shadow-lg transition-all ${
            isPastel
              ? 'bg-white border-cyan-200'
              : 'bg-[#181436] border-cyan-500/40 shadow-cyan-950/40'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-wider ${
              isPastel ? 'text-cyan-700' : 'text-cyan-300'
            }`}>
              {isVi ? 'Thời Gian Chơi' : 'Playtime'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-cyan-400">
              {formatPlayTime(current.playTimeMinutes)}
            </span>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
            <span className="opacity-75">{isVi ? 'Trạng thái mạng:' : 'Network status:'}</span>
            <span className="font-black text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {isVi ? 'Trực tuyến 100%' : 'Active 100%'}
            </span>
          </div>
        </motion.div>

      </div>

      {/* ========================================================================= */}
      {/* DETAILED STATISTICAL BREAKDOWN MATRIX */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* RADAR & PHISHING THREATS METRICS */}
        <div className={`p-6 rounded-3xl border-2 shadow-xl space-y-4 ${
          isPastel
            ? 'bg-white border-purple-200'
            : 'bg-[#181436] border-white/10'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wide">
                {isVi ? 'Quét Radar & Cạm Bẫy' : 'Radar & Threat Scans'}
              </h3>
              <p className="text-xs opacity-75">
                {isVi ? 'Phân tích đường link & đầu số giả mạo' : 'Link analysis & malicious phone numbers'}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-xs font-bold">{isVi ? 'Tổng lượt quét radar:' : 'Total radar scans:'}</span>
              <span className="font-black text-sm text-teal-400">{current.radarScans}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-xs font-bold">{isVi ? 'Cạm bẫy đã lột trần:' : 'Scams unmasked:'}</span>
              <span className="font-black text-sm text-rose-400">{current.scamsIdentified}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-xs font-bold">{isVi ? 'Tỷ lệ chính xác phản xạ:' : 'Reflex accuracy rate:'}</span>
              <span className="font-black text-sm text-emerald-400">{current.accuracyRate}%</span>
            </div>
          </div>
        </div>

        {/* GLITCH ZONE & MINIGAME PERFORMANCE */}
        <div className={`p-6 rounded-3xl border-2 shadow-xl space-y-4 ${
          isPastel
            ? 'bg-white border-purple-200'
            : 'bg-[#181436] border-white/10'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wide">
                {isVi ? 'Thành Tích Glitch Zone' : 'Glitch Zone Performance'}
              </h3>
              <p className="text-xs opacity-75">
                {isVi ? '6 minigame phá án an ninh mạng' : '6 cyber defense challenge games'}
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-xs font-bold">{isVi ? 'Màn game đã thắng:' : 'Games / Maps won:'}</span>
              <span className="font-black text-sm text-rose-400">{current.gamesWon}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-xs font-bold">{isVi ? 'XP kinh nghiệm tích lũy:' : 'XP accumulated:'}</span>
              <span className="font-black text-sm text-amber-400">+{current.xpEarned} XP</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-xs font-bold">{isVi ? 'Phòng thoát hiểm Hacker:' : 'Scam escape rooms:'}</span>
              <span className="font-black text-sm text-purple-400">5 / 5 Chambers</span>
            </div>
          </div>
        </div>

        {/* AGENT READINESS & RATING */}
        <div className={`p-6 rounded-3xl border-2 shadow-xl space-y-4 ${
          isPastel
            ? 'bg-white border-purple-200'
            : 'bg-[#181436] border-white/10'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wide">
                {isVi ? 'Đánh Giá Năng Lực' : 'Agent Defense Rating'}
              </h3>
              <p className="text-xs opacity-75">
                {isVi ? 'Xếp hạng phản xạ & bảo vệ dữ liệu' : 'Cyber reflex tier & network resilience'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-tr from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-center space-y-1.5">
            <span className="text-xs font-black tracking-widest uppercase text-amber-400">
              {isVi ? 'XẾP HẠNG PHÒNG THỦ' : 'DEFENSE EFFICIENCY TIER'}
            </span>
            <div className="text-4xl font-black text-amber-300">
              RANK S+
            </div>
            <p className="text-[11px] font-semibold opacity-85">
              {isVi
                ? 'Đạt chuẩn phản xạ cao cấp trước các chiêu thức lừa đảo tinh vi.'
                : 'Top-tier reflex readiness against phishing, OTP traps, and deceptive hosts.'}
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('games')}
            className={`w-full py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md ${
              isPastel
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 text-white font-extrabold'
            }`}
          >
            {isVi ? 'Chơi Tiếp Glitch Zone 🎮' : 'Play More In Glitch Zone 🎮'}
          </button>
        </div>

      </div>
    </div>
  );
};

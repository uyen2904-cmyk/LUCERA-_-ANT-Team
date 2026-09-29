import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, X, ArrowRight, Coins } from 'lucide-react';
import { HackerRewardInfo } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface HackerMoneyTopBarProps {
  reward: HackerRewardInfo | null;
  onDismiss: () => void;
  onNavigateWardrobe?: () => void;
}

export const HackerMoneyTopBar: React.FC<HackerMoneyTopBarProps> = ({
  reward,
  onDismiss,
  onNavigateWardrobe
}) => {
  const { isVi } = useLanguage();
  const { isPastel } = useTheme();

  // Auto-dismiss after 12 seconds if not interacted
  useEffect(() => {
    if (!reward) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 12000);
    return () => clearTimeout(timer);
  }, [reward, onDismiss]);

  return (
    <AnimatePresence>
      {reward && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className={`w-full z-50 sticky top-0 shadow-2xl border-b-2 backdrop-blur-xl ${
            isPastel
              ? 'bg-gradient-to-r from-emerald-100 via-teal-100 to-amber-100 border-emerald-300 text-emerald-950'
              : 'bg-gradient-to-r from-[#031c12]/95 via-[#082d20]/95 to-[#02180e]/95 border-emerald-400/90 text-emerald-300 shadow-emerald-900/60'
          }`}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 flex-wrap">
            {/* LEFT: TITLE & MAP VICTORY BADGE */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black shadow-md ${
                isPastel
                  ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                  : 'bg-emerald-500 text-black shadow-emerald-400/30'
              }`}>
                <Terminal className="w-4 h-4" />
              </div>

              {/* BAR NAME: HACKER'S MONEY */}
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider shadow-inner ${
                  isPastel
                    ? 'bg-emerald-200/80 text-emerald-900 border border-emerald-300'
                    : 'bg-emerald-950 border border-emerald-400/60 text-emerald-300'
                }`}>
                  💻 hacker’s money
                </span>
                
                {/* REWARD AMOUNT HIGHLIGHT */}
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs sm:text-sm font-black shadow-md animate-bounce ${
                  isPastel
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-emerald-400 to-teal-300 text-black font-extrabold'
                }`}>
                  <Coins className="w-3.5 h-3.5 inline" />
                  +{reward.amount} 🪙
                </span>
              </div>

              {/* GAME / MAP SOURCE */}
              <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                <span className={isPastel ? 'text-emerald-800' : 'text-emerald-200'}>
                  {isVi ? '🏆 Thắng map:' : '🏆 Map Victory:'}
                </span>
                <span className={`px-2 py-0.5 rounded-lg text-xs font-black ${
                  isPastel ? 'bg-white/80 text-emerald-900' : 'bg-black/50 text-white border border-emerald-500/30'
                }`}>
                  {reward.gameName}
                </span>
              </div>
            </div>

            {/* RIGHT: TOTAL COINS & QUICK WARDROBE ACTION */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              <div className="text-right hidden sm:block">
                <span className={`text-[10px] uppercase font-bold tracking-wider block ${
                  isPastel ? 'text-emerald-700' : 'text-emerald-400/80'
                }`}>
                  {isVi ? 'Tổng tiền hiện có' : 'Current Hacker Balance'}
                </span>
                <span className={`text-sm sm:text-base font-black ${
                  isPastel ? 'text-emerald-950' : 'text-white'
                }`}>
                  {reward.totalCoins} 🪙
                </span>
              </div>

              {onNavigateWardrobe && (
                <button
                  onClick={() => {
                    onNavigateWardrobe();
                    onDismiss();
                  }}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm active:scale-95 ${
                    isPastel
                      ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-black font-black'
                  }`}
                  title={isVi ? 'Đến Tủ Đồ Arcon mua trang bị' : 'Visit Arcon Bunker shop'}
                >
                  <span>{isVi ? 'Dùng Tiền 🛍️' : 'Spend Money 🛍️'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}

              {/* DISMISS BUTTON */}
              <button
                onClick={onDismiss}
                className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                  isPastel
                    ? 'hover:bg-emerald-200 text-emerald-800'
                    : 'hover:bg-emerald-900/60 text-emerald-400 hover:text-white'
                }`}
                title={isVi ? 'Đóng thanh hacker’s money' : 'Dismiss hacker’s money bar'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

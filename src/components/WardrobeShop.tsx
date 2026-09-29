import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Sparkles, Check, Flame, Shield, Award, AlertCircle } from 'lucide-react';
import { WARDROBE_ITEMS } from '../data/wardrobeItems';
import { DetectiveItem, UserProfile } from '../types';
import { RobloxAvatar } from './RobloxAvatar';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { playErrorBuzzer, playCorrectTingTing } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface WardrobeShopProps {
  profile: UserProfile;
  onEquipItem: (category: 'hat' | 'glasses' | 'outfit' | 'hand' | 'skin', itemId: string) => void;
  onBuyItem: (item: DetectiveItem) => void;
  onToggleCompanion: () => void;
  showCompanion: boolean;
}

export const WardrobeShop: React.FC<WardrobeShopProps> = ({
  profile,
  onEquipItem,
  onBuyItem,
  onToggleCompanion,
  showCompanion
}) => {
  const [activeCategory, setActiveCategory] = useState<DetectiveItem['category']>('hat');
  const [coinWarning, setCoinWarning] = useState<string | null>(null);
  const { isPastel } = useTheme();
  const { isVi } = useLanguage();

  const categories = isVi
    ? [
        { id: 'hat', label: 'Mũ & Nón Điệp Viên', icon: '✨' },
        { id: 'outfit', label: 'Trang Phục & Áo Khoác', icon: '🧥' },
        { id: 'glasses', label: 'Kính Râm & Kính Radar', icon: '🕶️' },
        { id: 'hand', label: 'Vật Phẩm Cầm Tay', icon: '🔍' },
        { id: 'skin', label: 'Màu Sắc & Phong Cách', icon: '🎨' }
      ] as const
    : [
        { id: 'hat', label: 'Hats & Headgear', icon: '✨' },
        { id: 'outfit', label: 'Outfits & Suits', icon: '🧥' },
        { id: 'glasses', label: 'Glasses & AR Visors', icon: '🕶️' },
        { id: 'hand', label: 'Handheld Gear', icon: '🔍' },
        { id: 'skin', label: 'Hair & Auras', icon: '🎨' }
      ] as const;

  const currentItems = WARDROBE_ITEMS.filter((item: DetectiveItem) => item.category === activeCategory);

  const handleAction = (item: DetectiveItem) => {
    const isUnlocked = profile.unlockedItems.includes(item.id) || item.price === 0;

    if (isUnlocked) {
      playCorrectTingTing();
      onEquipItem(item.category, item.id);
    } else {
      if (profile.coins >= item.price) {
        onBuyItem(item);
        playCorrectTingTing();
        try {
          confetti({ particleCount: 50, spread: 60 });
        } catch {}
      } else {
        playErrorBuzzer();
        setCoinWarning(
          isVi
            ? `Bạn cần thêm ${item.price - profile.coins} Xu nữa! Hãy phá án trong 3D HQ hoặc Glitch Zone để tích lũy Xu nhé!`
            : `You need ${item.price - profile.coins} more Coins! Solve cases in 3D HQ or Glitch Zone to earn more Coins!`
        );
        setTimeout(() => setCoinWarning(null), 4000);
      }
    }
  };

  const isCompanionUnlocked = profile.streakDays >= 10;

  return (
    <div className={`w-full max-w-6xl mx-auto space-y-8 transition-colors ${
      isPastel ? 'text-slate-800' : 'text-white'
    }`}>
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black border ${
          isPastel
            ? 'bg-amber-100 text-amber-900 border-amber-200'
            : 'bg-amber-500/20 text-amber-300 border-amber-400/40 shadow-xs'
        }`}>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{isVi ? 'KHO TRANG BỊ & THỜI TRANG ĐIỆP VIÊN 🎒' : 'AGENT WARDROBE & GEAR 🎒'}</span>
        </div>
        <h1 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${
          isPastel ? 'text-slate-900' : 'text-white'
        }`}>
          {isVi ? 'Tủ Đồ Điệp Viên' : 'Agent Wardrobe'}
        </h1>
        <p className={`text-sm sm:text-base font-medium leading-relaxed ${
          isPastel ? 'text-slate-600' : 'text-gray-300'
        }`}>
          {isVi
            ? 'Biến hóa phong cách cho Điệp Viên Acron với áo khoác đặc vụ, mũ điệp viên, kính râm radar và linh thú đồng hành!'
            : 'Customize Detective Acron with tactical cyber jackets, fedoras, radar glasses, and companion pets!'}
        </p>

        {/* INLINE COIN WARNING BANNER (NO WINDOW.ALERT) */}
        <AnimatePresence>
          {coinWarning && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/60 text-rose-200 text-xs sm:text-sm font-bold flex items-center justify-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{coinWarning}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: LIVE ROBLOX AVATAR PREVIEW */}
        <div className="lg:col-span-5 bg-[#15122D] rounded-3xl p-6 sm:p-8 border-2 border-orange-500/30 shadow-2xl text-center space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-orange-400 block">
                Investigator Identity
              </span>
              <span className="text-base font-black text-white">
                {profile.noobName}
              </span>
            </div>
            <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black shadow-md shadow-orange-500/20">
              🪙 {profile.coins} Coins
            </span>
          </div>

          {/* AVATAR STAGE */}
          <div className="py-8 bg-gradient-to-b from-[#1C183B] via-[#221D46] to-[#120F28] rounded-3xl border-2 border-orange-400/30 flex flex-col items-center justify-center shadow-inner relative overflow-hidden group">
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-xs text-[10px] font-bold text-orange-300 border border-orange-400/30">
              Roblox 3D Model
            </div>

            <RobloxAvatar
              size="lg"
              equipped={profile.equipped}
              showCompanion={showCompanion && isCompanionUnlocked}
              interactive={true}
            />

            <p className="text-[11px] text-gray-400 font-medium mt-4">
              ✨ Click on your avatar anytime to view full detective dossier!
            </p>
          </div>

          {/* COMPANION KIEN SANG FPT UNLOCK STATUS */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent border-2 border-orange-500/40 text-left space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐜</span>
                <div>
                  <h4 className="text-xs font-black text-orange-200">
                    Sidekick Mascot: FPT Orange Ant
                  </h4>
                  <span className="text-[10px] text-orange-300/80 font-medium">
                    Signature FPT Orange & Illuminated Wisdom Antennae
                  </span>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  isCompanionUnlocked
                    ? 'bg-emerald-500 text-white shadow-xs'
                    : 'bg-orange-500/30 text-orange-300 border border-orange-400/40'
                }`}
              >
                {isCompanionUnlocked ? 'UNLOCKED ✓' : '10-DAY STREAK'}
              </span>
            </div>

            <p className="text-[11px] text-gray-300 leading-relaxed font-medium">
              The iconic FPT Orange Ant hovers by your side, illuminating deceptive traps and phishing signals across every cyber investigation!
            </p>

            {isCompanionUnlocked ? (
              <button
                onClick={onToggleCompanion}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-md transition-all active:scale-98 cursor-pointer"
              >
                {showCompanion ? 'Rest Ant in Pocket' : 'Deploy Ant Companion'}
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-black/50 border border-orange-500/30 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-orange-200">
                  <span className="flex items-center gap-1">
                    🔒 Progress: <strong>{profile.streakDays} / 10 Days</strong>
                  </span>
                  <span className="text-orange-400 font-extrabold">{Math.min(Math.round((profile.streakDays / 10) * 100), 100)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/60 p-0.5 border border-orange-500/20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
                    style={{ width: `${Math.min(Math.round((profile.streakDays / 10) * 100), 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 leading-tight font-medium">
                  {isVi
                    ? 'Kiến Sáng FPT yêu cầu chuỗi điểm danh bảo vệ mạng 10 ngày để mở khóa.'
                    : 'Kien Sang requires a 10-day cyber defense streak to unlock.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: WARDROBE SHOP CATALOG */}
        <div className="lg:col-span-7 bg-[#15122D] rounded-3xl p-6 sm:p-8 border-2 border-orange-500/30 shadow-2xl space-y-6">
          {/* CATEGORY TABS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* ITEM CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentItems.map((item: DetectiveItem) => {
              const isUnlocked = profile.unlockedItems.includes(item.id) || item.price === 0;
              const isEquipped = profile.equipped[item.category] === item.id;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                    isEquipped
                      ? 'border-orange-500 bg-orange-500/15 shadow-md shadow-orange-500/10 ring-2 ring-orange-500/30'
                      : 'border-white/10 bg-white/5 hover:border-orange-400/50 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl p-2.5 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex-shrink-0 border border-orange-400/30">
                      {item.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-black text-white">{item.name}</h4>
                        {item.id.includes('fpt') && (
                          <span className="px-1.5 py-0.2 rounded bg-orange-500 text-white text-[9px] font-black">
                            FPT
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400 mt-1 leading-snug">{item.description}</p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-amber-300">
                      {item.price === 0 ? 'Free Starter' : `🪙 ${item.price} Coins`}
                    </span>

                    <button
                      onClick={() => handleAction(item)}
                      disabled={isEquipped}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer ${
                        isEquipped
                          ? 'bg-orange-500/30 text-orange-200 border border-orange-400/40 cursor-default'
                          : isUnlocked
                          ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-xs'
                          : profile.coins >= item.price
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xs'
                          : 'bg-white/10 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isEquipped ? 'Equipped ✓' : isUnlocked ? 'Equip' : 'Unlock Now'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

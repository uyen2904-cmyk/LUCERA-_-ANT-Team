import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Shield, User, Award, ArrowRight } from 'lucide-react';
import { RobloxAvatar } from './RobloxAvatar';
import confetti from 'canvas-confetti';

interface WelcomeModalProps {
  isOpen: boolean;
  onComplete?: (profileName: string, noobName: string) => void;
  onClose?: (profileName: string, noobName: string) => void;
  defaultName?: string;
  defaultNoobName?: string;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onComplete,
  onClose,
  defaultName = 'Cyber Rookie',
  defaultNoobName = 'Detective Roblox'
}) => {
  const [name, setName] = useState(defaultName);
  const [noobName, setNoobName] = useState(defaultNoobName);
  const [step, setStep] = useState<1 | 2>(1);

  if (!isOpen) return null;

  const handleStart = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
    const finish = onComplete || onClose;
    if (finish) {
      finish(name.trim() || 'Cyber Defender', noobName.trim() || 'Detective Roblox');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A081D]/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-xl bg-gradient-to-b from-[#1C183B] via-[#161330] to-[#0F0D24] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-orange-500/40 text-white overflow-hidden"
        >
          {/* Decorative aura background circles */}
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-orange-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

          {step === 1 ? (
            <div className="text-center">
              {/* Animated Roblox Character Greeting */}
              <div className="flex justify-center mb-4">
                <RobloxAvatar
                  size="lg"
                  showCompanion={true}
                  companionSpeech={null}
                  interactive={true}
                />
              </div>

              {/* Title & Tagline */}
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-xs font-bold text-orange-300 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Roblox Detective Hub & FPT Orange Ant
                </div>
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans','Be_Vietnam_Pro',sans-serif]">
                  LUCERA
                </h1>
                <p className="text-sm sm:text-base font-bold text-orange-200 mt-1">
                  Reveal what lies behind the link
                </p>
                <p className="text-xs text-gray-400 font-semibold italic mt-0.5">
                  "Think twice. Click once."
                </p>
              </div>

              {/* Dialogue Box */}
              <div className="bg-black/40 border-2 border-orange-500/30 rounded-2xl p-4 mb-6 shadow-inner text-left">
                <p className="text-sm font-semibold text-gray-200 leading-relaxed">
                  ✨ <strong>"Welcome Investigator!"</strong> Step inside our 3D Command Headquarters. Together with the <strong className="text-orange-400">FPT Orange Ant</strong> and his glowing wisdom antennae, we decode suspicious citizen cases, expose phishing traps, and test your cyber reflexes across 6 exciting arenas!
                </p>
                <p className="text-xs text-orange-300 mt-2 font-medium">
                  Earn coins to customize your Roblox detective with stylish blazers, cat-ear headsets, and Bloxy Cola!
                </p>
              </div>

              {/* Next Step Button */}
              <button
                onClick={() => setStep(2)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base shadow-lg shadow-orange-500/30 transition-all active:scale-98 cursor-pointer"
              >
                <span>Customize Your Detective Profile</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-orange-500/20 text-orange-400 rounded-2xl border border-orange-500/30">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">Detective Clearance Dossier</h2>
                  <p className="text-xs text-gray-400">Personalize your investigator credentials in Lucera</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-orange-200 mb-1.5 uppercase tracking-wider">
                    👤 Primary Agent Name:
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Agent Cyber, ShadowHunter..."
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl focus:outline-none focus:border-orange-400 text-sm text-white font-semibold shadow-inner"
                    maxLength={24}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-orange-200 mb-1.5 uppercase tracking-wider">
                    ✨ Roblox Detective Alias:
                  </label>
                  <input
                    type="text"
                    value={noobName}
                    onChange={(e) => setNoobName(e.target.value)}
                    placeholder="e.g. Detective Roblox, BloxSleuth..."
                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl focus:outline-none focus:border-orange-400 text-sm text-white font-semibold shadow-inner"
                    maxLength={24}
                  />
                </div>
              </div>

              {/* Feature Highlights */}
              <div className="grid grid-cols-3 gap-2.5 mb-6 text-center text-xs">
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 shadow-xs">
                  <Shield className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <span className="font-bold text-white block">URL & Phone Forensics</span>
                  <span className="text-[10px] text-gray-400">100% Offline Engine</span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 shadow-xs">
                  <Award className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  <span className="font-bold text-white block">6 Minigames</span>
                  <span className="text-[10px] text-gray-400">Earn Coins & Outfits</span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 shadow-xs">
                  <span className="text-xl block mb-0.5">🐜</span>
                  <span className="font-bold text-orange-300 block">FPT Orange Ant</span>
                  <span className="text-[10px] text-orange-400">Loyal Sidekick</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="py-3 px-4 rounded-xl border border-white/20 text-xs font-bold text-gray-300 hover:bg-white/10 transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleStart}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-lg shadow-orange-500/20 transition-all active:scale-98 cursor-pointer"
                >
                  <span>Enter Lucera Headquarters</span>
                  <Sparkles className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

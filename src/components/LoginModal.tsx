import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, KeyRound, Sparkles, User, Eye, EyeOff, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RobloxAvatar } from './RobloxAvatar';
import confetti from 'canvas-confetti';

interface LoginModalProps {
  isOpen: boolean;
  onLoginSuccess: (username: string, clearanceKey: string) => void;
  defaultUsername?: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onLoginSuccess,
  defaultUsername = 'Roblox Detective'
}) => {
  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState('LUCERA2026');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedBadgeColor, setSelectedBadgeColor] = useState<'orange' | 'cyan' | 'purple' | 'emerald'>('orange');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg('Please enter your detective callsign / username!');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your security clearance password!');
      return;
    }

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}

    onLoginSuccess(username.trim(), password.trim());
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0D1E]/90 backdrop-blur-lg overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          className="relative w-full max-w-lg bg-gradient-to-b from-[#1E193B] via-[#251E4E] to-[#15122E] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-orange-500/80 text-white overflow-hidden my-4"
        >
          {/* Vibrant Glowing Auras in background */}
          <div className="absolute -top-16 -right-16 w-52 h-52 bg-orange-500/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* TOP BADGE & AVATAR PEEK */}
          <div className="relative z-10 flex flex-col items-center text-center mb-6">
            <div className="w-28 h-36 mb-2">
              <RobloxAvatar
                size="md"
                showCompanion={true}
                companionSpeech={null}
                interactive={false}
              />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-400/50 text-orange-300 text-xs font-black tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>SECURITY CLEARANCE GATE • DEFCON-2</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black font-['Plus_Jakarta_Sans','Be_Vietnam_Pro',sans-serif] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-white">
              LUCERA CYBER HQ LOGIN
            </h2>
            <p className="text-xs text-gray-300 max-w-sm mt-1 leading-relaxed">
              Authenticate your identity to enter the 3D Cyber Detective Headquarters & unlock live scam decoding cases.
            </p>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="relative z-10 space-y-4 text-left text-xs">
            {errorMsg && (
              <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/60 text-rose-200 text-xs font-bold text-center">
                ⚠️ {errorMsg}
              </div>
            )}

            {/* Field 1: Detective Username */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-orange-300 mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Agent Callsign / Detective Name:</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder="e.g. Agent Roblox, Cyber Hunter..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-[#0F0D24] border-2 border-orange-500/40 focus:border-orange-400 focus:outline-none text-white text-sm font-bold placeholder:text-gray-500 transition-all shadow-inner"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-orange-400 font-extrabold">
                  CHIEF
                </span>
              </div>
            </div>

            {/* Field 2: Password with Reveal toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>HQ Clearance Password:</span>
                </label>
                <button
                  type="button"
                  onClick={() => setPassword('LUCERA2026')}
                  className="text-[10px] text-amber-300 hover:text-white underline font-semibold cursor-pointer"
                >
                  Fill Default (LUCERA2026)
                </button>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg(null);
                  }}
                  placeholder="Enter headquarters security key..."
                  className="w-full pl-4 pr-11 py-3.5 rounded-2xl bg-[#0F0D24] border-2 border-cyan-500/40 focus:border-cyan-400 focus:outline-none text-white text-sm font-bold placeholder:text-gray-500 transition-all font-mono shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Field 3: Clearance Badge Color */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-purple-300 mb-1.5 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                <span>Select Clearance Badge Neon Glow:</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'orange', label: 'FPT Amber', color: 'bg-orange-500 border-orange-300' },
                  { id: 'cyan', label: 'Cyan Grid', color: 'bg-cyan-500 border-cyan-300' },
                  { id: 'purple', label: 'Cyber Violet', color: 'bg-purple-600 border-purple-300' },
                  { id: 'emerald', label: 'Safe Emerald', color: 'bg-emerald-500 border-emerald-300' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedBadgeColor(item.id as any)}
                    className={`py-2 px-1 rounded-xl text-center border font-bold text-[10px] transition-all flex items-center justify-center gap-1.5 ${
                      selectedBadgeColor === item.id
                        ? `${item.color} text-white shadow-md scale-102 ring-2 ring-white/50`
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm tracking-wider shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>AUTHENTICATE & ENTER 3D HQ</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 pt-1 text-center">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>100% Offline Authentication • No External Cloud Server Request</span>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

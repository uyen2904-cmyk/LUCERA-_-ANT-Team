import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ShieldAlert, Zap, Clock, RotateCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getScamRadarLinks } from '../../data/gameScenarios';
import { RadarLink } from '../../types';
import { playCorrectTingTing, playErrorBuzzer } from '../../utils/soundEffects';
import { useLanguage } from '../../context/LanguageContext';

interface ScamRadarGameProps {
  onCompleteGame: (xp: number, coins: number, mapName?: string) => void;
  onBackToHub: () => void;
}

export const ScamRadarGame: React.FC<ScamRadarGameProps> = ({
  onCompleteGame,
  onBackToHub
}) => {
  const { isVi } = useLanguage();
  const links = getScamRadarLinks(isVi);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; reason: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentLink: RadarLink = links[currentIndex] || links[0];

  const handleChoice = (choseScam: boolean) => {
    if (isFinished) return;

    const isCorrect = choseScam === currentLink.isScam;
    if (isCorrect) {
      playCorrectTingTing();
      const newCombo = combo + 1;
      setCombo(newCombo);
      const points = 10 * Math.min(newCombo, 3);
      setScore((prev) => prev + points);
      setLastFeedback({
        isCorrect: true,
        reason: isVi ? `Chính xác! ${currentLink.reason}` : `Correct! ${currentLink.reason}`
      });
    } else {
      playErrorBuzzer();
      setCombo(0);
      setLastFeedback({
        isCorrect: false,
        reason: isVi ? `Chưa đúng! ${currentLink.reason}` : `Incorrect! ${currentLink.reason}`
      });
    }

    if (currentIndex < links.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      try {
        confetti({ particleCount: 70, spread: 60 });
      } catch {}
      onCompleteGame(60 + score, 40, isVi ? 'Phản Xạ Radar Quét Link' : 'Scam Radar Reflex Map');
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setCombo(0);
    setLastFeedback(null);
    setIsFinished(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* STATUS BAR */}
      <div className="flex items-center justify-between bg-white rounded-3xl p-5 border border-purple-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center font-black">
            🚨
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#7D7699]">
              {isVi ? 'Game #03 • Phản Xạ Nhanh' : 'Game #03 • Speed Reflex'}
            </span>
            <h2 className="text-xl font-black text-[#29243D]">SCAM RADAR</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 text-xs font-black">
            <span>🪙 {score} {isVi ? 'Điểm' : 'Pts'}</span>
          </div>
          {combo > 1 && (
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-100 text-[#40356B] text-xs font-black animate-pulse">
              <Zap className="w-3.5 h-3.5 fill-purple-600" />
              <span>x{combo} COMBO</span>
            </div>
          )}
        </div>
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-100 shadow-xl space-y-6 text-center">
          <div className="text-xs text-[#7D7699] font-bold uppercase tracking-widest">
            {isVi ? 'Đường Dẫn' : 'Target URL'} {currentIndex + 1}/{links.length}
          </div>

          {/* RADAR TARGET SCREEN */}
          <motion.div
            key={currentLink.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 rounded-2xl bg-[#29243D] text-white shadow-inner border border-purple-500/30 space-y-3"
          >
            <div className="text-xs text-purple-300 font-mono">
              {isVi ? '📡 Radar đang rà quét URL:' : '📡 Radar scanning target URL:'}
            </div>
            <div className="text-lg sm:text-2xl font-mono font-bold text-amber-300 break-all">
              {currentLink.url}
            </div>
            {currentLink.difficulty && (
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-purple-200">
                {isVi ? 'Độ khó:' : 'Difficulty:'} {currentLink.difficulty}
              </span>
            )}
          </motion.div>

          {/* DECISION BUTTONS */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleChoice(false)}
              className="py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 active:scale-95 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5" />
              🟢 {isVi ? 'SAFE (An Toàn)' : 'SAFE (Authentic)'}
            </button>
            <button
              onClick={() => handleChoice(true)}
              className="py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-rose-700/20 active:scale-95 transition-all cursor-pointer"
            >
              <ShieldAlert className="w-5 h-5" />
              🔴 {isVi ? 'SCAM (Lừa Đảo)' : 'SCAM (Deceptive)'}
            </button>
          </div>

          {/* LAST FEEDBACK */}
          {lastFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-xl text-xs font-medium text-left ${
                lastFeedback.isCorrect ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'
              }`}
            >
              {lastFeedback.reason}
            </motion.div>
          )}
        </div>
      ) : (
        /* FINISHED SCREEN */
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl p-8 border border-purple-100 shadow-xl text-center space-y-4">
          <span className="text-4xl">🏆</span>
          <h3 className="text-2xl font-black text-[#29243D]">
            {isVi ? 'HOÀN THÀNH SCAM RADAR!' : 'SCAM RADAR COMPLETED!'}
          </h3>
          <p className="text-xs text-[#7D7699]">
            {isVi
              ? `Bạn đạt tổng cộng ${score} điểm phản xạ an ninh mạng.`
              : `You achieved a total of ${score} cyber reflex points.`}
          </p>
          <div className="flex justify-center gap-3 pt-4">
            <button onClick={resetGame} className="px-5 py-2.5 rounded-xl border border-purple-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer">
              <RotateCcw className="w-3.5 h-3.5" /> {isVi ? 'Chơi lại' : 'Replay'}
            </button>
            <button onClick={onBackToHub} className="px-6 py-2.5 rounded-xl bg-[#40356B] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer">
              {isVi ? 'Về Glitch Zone' : 'Back to Glitch Zone'} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

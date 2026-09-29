import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Mail, Link2, Globe, FileCheck, CheckCircle2, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getEscapeRoomStages } from '../../data/gameScenarios';
import { EscapeRoomStage } from '../../types';
import { playCorrectTingTing, playErrorBuzzer } from '../../utils/soundEffects';
import { useLanguage } from '../../context/LanguageContext';

interface ScamEscapeRoomGameProps {
  onCompleteGame: (xp: number, coins: number, mapName?: string) => void;
  onBackToHub: () => void;
}

export const ScamEscapeRoomGame: React.FC<ScamEscapeRoomGameProps> = ({
  onCompleteGame,
  onBackToHub
}) => {
  const { isVi } = useLanguage();
  const stages = getEscapeRoomStages(isVi);

  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes (600s)
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [hasEscaped, setHasEscaped] = useState(false);

  const stage: EscapeRoomStage = stages[currentStageIdx] || stages[0];
  const stageIcons = [Lock, Mail, Link2, Globe, FileCheck];

  useEffect(() => {
    if (hasEscaped) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [hasEscaped]);

  const handleSelectOption = (idx: number) => {
    if (selectedOptionIdx !== null) return;
    setSelectedOptionIdx(idx);
    const chosen = stage.options[idx];
    setFeedback(chosen.feedback);

    if (chosen.isCorrect) {
      playCorrectTingTing();
      if (currentStageIdx === stages.length - 1) {
        setHasEscaped(true);
        try {
          confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
        } catch {}
        onCompleteGame(150, 100, isVi ? 'Thoát Hiểm 5 Tầng Hacker' : '5-Chamber Scam Escape Room');
      }
    } else {
      playErrorBuzzer();
    }
  };

  const handleNextStage = () => {
    setSelectedOptionIdx(null);
    setFeedback(null);
    if (currentStageIdx < stages.length - 1) {
      setCurrentStageIdx(currentStageIdx + 1);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-3xl p-5 border border-purple-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-950 text-indigo-200 flex items-center justify-center font-black text-xl">
            🧠
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#7D7699]">
              {isVi ? 'Special Game #06 • Cốt Truyện Trinh Thám' : 'Special Game #06 • Escape Room Mystery'}
            </span>
            <h2 className="text-xl font-black text-[#29243D]">SCAM ESCAPE ROOM</h2>
          </div>
        </div>

        {/* 10 MINUTE COUNTDOWN */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-black">
          <span>⏱️ {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
        </div>
      </div>

      {/* STORYLINE ESCAPE PROGRESS TRAIL */}
      <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-purple-100 overflow-x-auto gap-2">
        {stages.map((st, i) => {
          const Icon = stageIcons[i] || Lock;
          const isPassed = i < currentStageIdx;
          const isCurrent = i === currentStageIdx;

          return (
            <div
              key={st.stageNumber}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isCurrent
                  ? 'bg-[#40356B] text-white shadow-xs'
                  : isPassed
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{isVi ? 'Phòng' : 'Chamber'} {st.stageNumber}</span>
              {isPassed && <span>✓</span>}
            </div>
          );
        })}
      </div>

      {!hasEscaped ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-100 shadow-xl space-y-6">
          <div className="border-b pb-4">
            <span className="text-xs text-purple-700 font-bold uppercase tracking-wider block">
              {isVi ? `Thử thách phòng #${stage.stageNumber}` : `Chamber #${stage.stageNumber} Challenge`}
            </span>
            <h3 className="text-xl font-black text-[#29243D] mt-1">{stage.name}</h3>
          </div>

          <div className="p-4 rounded-2xl bg-[#29243D] text-white text-xs sm:text-sm font-medium leading-relaxed">
            <span className="text-amber-300 font-bold block mb-1">
              {isVi ? '📜 Manh mối hiện trường:' : '📜 Crime Scene Evidence:'}
            </span>
            <p>{stage.question}</p>
          </div>

          {/* CLUE BULLETS */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2">
            <span className="text-xs font-bold text-[#40356B] block">
              {isVi ? 'Ghi chép trinh thám:' : 'Detective Notebook:'}
            </span>
            <ul className="space-y-1 text-xs text-gray-700">
              {stage.clues.map((c, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* OPTIONS */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#7D7699] uppercase tracking-wider block">
              {isVi ? 'Chọn phương án giải mã cánh cửa:' : 'Select deduction to unlock door:'}
            </span>
            {stage.options.map((opt, i) => {
              const isSelected = selectedOptionIdx === i;
              return (
                <button
                  key={i}
                  onClick={() => handleSelectOption(i)}
                  disabled={selectedOptionIdx !== null}
                  className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all border-2 cursor-pointer ${
                    selectedOptionIdx === null
                      ? 'bg-white hover:bg-purple-50/60 border-purple-100 text-gray-800'
                      : isSelected
                      ? opt.isCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                        : 'bg-rose-50 border-rose-500 text-rose-950 font-bold'
                      : 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'
                  }`}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>

          {/* FEEDBACK & PROCEED */}
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-2xl border text-xs sm:text-sm font-semibold flex items-center justify-between gap-4 ${
                stage.options[selectedOptionIdx!].isCorrect
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div>{feedback}</div>
              {stage.options[selectedOptionIdx!].isCorrect && (
                <button
                  onClick={handleNextStage}
                  className="px-5 py-2.5 rounded-xl bg-[#40356B] text-white font-bold text-xs flex-shrink-0 flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  {isVi ? 'Tiến vào phòng sau' : 'Enter Next Chamber'} <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          )}
        </div>
      ) : (
        /* ESCAPED SCREEN */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 sm:p-12 bg-gradient-to-br from-[#40356B] to-[#1E1B4B] text-white rounded-3xl shadow-2xl text-center space-y-6"
        >
          <span className="text-6xl inline-block animate-bounce">🏆</span>
          <h3 className="text-3xl font-black font-['Plus_Jakarta_Sans','Be_Vietnam_Pro',sans-serif]">
            YOU ESCAPED THE SCAM ROOM!
          </h3>
          <p className="text-sm text-purple-200 max-w-lg mx-auto leading-relaxed">
            {isVi
              ? 'Bạn đã vượt qua chuỗi 5 bẫy ma trận của hacker: Từ mật khẩu yếu, email giả mạo, bẫy subdomain đến chiếm đoạt mã OTP. Bạn chính là bậc thầy Cyber Guardian!'
              : 'You conquered all 5 scam matrix chambers: from weak passwords and phishing emails to subdomain traps and OTP intercepts. You are a Master Cyber Guardian!'}
          </p>
          <div className="p-4 bg-white/10 rounded-2xl max-w-md mx-auto border border-white/20 text-amber-300 font-black text-sm">
            {isVi
              ? '🎉 Thưởng lớn: +150 Cyber XP & +100 Xu Tủ Đồ!'
              : '🎉 Grand Prize: +150 Cyber XP & +100 Bunker Coins!'}
          </div>
          <div className="pt-4">
            <button
              onClick={onBackToHub}
              className="px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm shadow-lg transition-all cursor-pointer"
            >
              {isVi ? 'Về Glitch Zone' : 'Back to Glitch Zone'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

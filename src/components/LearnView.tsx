import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Sparkles, ChevronLeft, ChevronRight, HelpCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { getCyberTips } from '../data/gameScenarios';
import { playCorrectTingTing, playErrorBuzzer, playTabSwitch } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';

interface LearnViewProps {
  onEarnReward: (xp: number, coins: number, mapName?: string) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({ onEarnReward }) => {
  const [currentTipIdx, setCurrentTipIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const { isPastel } = useTheme();
  const { isVi } = useLanguage();

  const tips = getCyberTips(isVi);
  const tip = tips[currentTipIdx] || tips[0];

  const handleNext = () => {
    if (currentTipIdx < tips.length - 1) {
      playTabSwitch();
      setCurrentTipIdx(currentTipIdx + 1);
      resetQuizState();
    }
  };

  const handlePrev = () => {
    if (currentTipIdx > 0) {
      playTabSwitch();
      setCurrentTipIdx(currentTipIdx - 1);
      resetQuizState();
    }
  };

  const resetQuizState = () => {
    setShowQuiz(false);
    setSelectedAnswerIdx(null);
    setQuizAnswered(false);
  };

  const handleAnswerQuiz = (idx: number) => {
    if (quizAnswered) return;
    setSelectedAnswerIdx(idx);
    setQuizAnswered(true);

    if (idx === tip.miniQuiz.correctIndex) {
      playCorrectTingTing();
      try {
        confetti({ particleCount: 50, spread: 50 });
      } catch {}
      onEarnReward(30, 20, isVi ? `Thẻ Kiến Thức: ${tip.title}` : `Knowledge Card: ${tip.title}`);
    } else {
      playErrorBuzzer();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border ${
          isPastel
            ? 'bg-purple-100 text-purple-900 border-purple-200'
            : 'bg-purple-950/70 text-purple-300 border-purple-500/40'
        }`}>
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isVi ? 'CẨM NANG AN TOÀN • BÍ KÍP 30 GIÂY 📚' : 'KNOWLEDGE HUB • 30-SECOND ESSENTIALS 📚'}</span>
        </div>
        <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${
          isPastel ? 'text-purple-950' : 'text-white'
        }`}>
          {isVi ? 'Cẩm Nang An Toàn & Phòng Vệ Số' : 'Cyber Defense Handbook & Quizzes'}
        </h1>
        <p className={`text-xs sm:text-sm font-medium ${
          isPastel ? 'text-slate-600' : 'text-slate-300'
        }`}>
          {isVi
            ? 'Không lý thuyết dài dòng — Chỉ các thẻ bài ngắn gọn, trực diện và câu hỏi trắc nghiệm phản xạ kèm chuông 🔔 Ting-Ting!'
            : 'Concise, practical cards with instant reflex quizzes and 🔔 Ting-Ting chime feedback!'}
        </p>
      </div>

      {/* CARD VIEWER CONTAINER */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={tip.id + (showQuiz ? '-quiz' : '-tip')}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className={`rounded-3xl p-6 sm:p-10 border-2 shadow-xl space-y-6 min-h-[380px] flex flex-col justify-between transition-colors ${
              isPastel
                ? 'bg-white border-purple-200 text-slate-800'
                : 'bg-[#181335] border-purple-500/40 text-white shadow-purple-950/30'
            }`}
          >
            {!showQuiz ? (
              /* FRONT: CYBER CARD CONTENT */
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className={`px-3.5 py-1 rounded-full font-mono text-xs font-black tracking-widest shadow-xs ${
                    isPastel ? 'bg-purple-700 text-white' : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                  }`}>
                    {tip.code}
                  </span>
                  <span className={`text-xs font-bold ${isPastel ? 'text-slate-500' : 'text-slate-400'}`}>
                    {isVi ? 'Thẻ' : 'Card'} {currentTipIdx + 1}/{tips.length}
                  </span>
                </div>

                <h3 className={`text-xl sm:text-2xl font-black leading-snug ${
                  isPastel ? 'text-slate-900' : 'text-white'
                }`}>
                  {tip.title}
                </h3>

                <div className={`p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed font-medium ${
                  isPastel
                    ? 'bg-purple-50/70 border-purple-100 text-slate-700'
                    : 'bg-black/30 border-white/10 text-slate-200'
                }`}>
                  {tip.content}
                </div>
              </div>
            ) : (
              /* BACK: MINI QUIZ */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-emerald-600 text-white font-mono text-xs font-black tracking-widest">
                    MINI QUIZ
                  </span>
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="text-xs font-bold text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {isVi ? 'Quay lại bài học' : 'Back to Lesson'}
                  </button>
                </div>

                <h3 className={`text-lg sm:text-xl font-black leading-snug ${
                  isPastel ? 'text-slate-900' : 'text-white'
                }`}>
                  {tip.miniQuiz.question}
                </h3>

                <div className="space-y-2.5 pt-2">
                  {tip.miniQuiz.options.map((option, idx) => {
                    const isSelected = selectedAnswerIdx === idx;
                    const isCorrect = idx === tip.miniQuiz.correctIndex;
                    let btnStyle = isPastel
                      ? 'bg-slate-50 hover:bg-purple-50 text-slate-800 border-slate-200'
                      : 'bg-white/5 hover:bg-white/10 text-white border-white/10';

                    if (quizAnswered) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-400 font-bold';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={quizAnswered}
                        onClick={() => handleAnswerQuiz(idx)}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {quizAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>

                {quizAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                      selectedAnswerIdx === tip.miniQuiz.correctIndex
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                    }`}
                  >
                    <div className="font-bold mb-1">
                      {selectedAnswerIdx === tip.miniQuiz.correctIndex
                        ? (isVi ? '🎉 CHÍNH XÁC (+30 XP, +20 XU)!' : '🎉 CORRECT (+30 XP, +20 COINS)!')
                        : (isVi ? '❌ CHƯA CHÍNH XÁC!' : '❌ INCORRECT!')}
                    </div>
                    {tip.miniQuiz.explanation}
                  </motion.div>
                )}
              </div>
            )}

            {/* BOTTOM NAV BAR */}
            <div className={`pt-4 border-t flex items-center justify-between gap-3 ${
              isPastel ? 'border-slate-200' : 'border-white/10'
            }`}>
              <button
                disabled={currentTipIdx === 0}
                onClick={handlePrev}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{isVi ? 'Trước' : 'Prev'}</span>
              </button>

              {!showQuiz ? (
                <button
                  onClick={() => {
                    playTabSwitch();
                    setShowQuiz(true);
                  }}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black shadow-md cursor-pointer transition-transform active:scale-95 ${
                    isPastel ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/30'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Làm Mini Quiz' : 'Take Mini Quiz'}</span>
                </button>
              ) : (
                <button
                  onClick={resetQuizState}
                  className="px-3 py-1.5 rounded-xl border border-white/20 text-xs font-bold hover:bg-white/10 cursor-pointer"
                >
                  {isVi ? 'Xem Lại Thẻ' : 'Review Card'}
                </button>
              )}

              <button
                disabled={currentTipIdx === tips.length - 1}
                onClick={handleNext}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold cursor-pointer"
              >
                <span>{isVi ? 'Tiếp' : 'Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, AlertCircle, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getWhatWouldYouDoScenarios } from '../../data/gameScenarios';
import { DilemmaScenario, DilemmaChoice } from '../../types';
import { playCorrectTingTing, playErrorBuzzer } from '../../utils/soundEffects';
import { useLanguage } from '../../context/LanguageContext';

interface WhatWouldYouDoGameProps {
  onCompleteGame: (xp: number, coins: number, mapName?: string) => void;
  onBackToHub: () => void;
}

export const WhatWouldYouDoGame: React.FC<WhatWouldYouDoGameProps> = ({
  onCompleteGame,
  onBackToHub
}) => {
  const { isVi } = useLanguage();
  const scenarios = getWhatWouldYouDoScenarios(isVi);

  const [index, setIndex] = useState(0);
  const scenario: DilemmaScenario = scenarios[index] || scenarios[0];
  const [selectedChoice, setSelectedChoice] = useState<DilemmaChoice | null>(null);

  const handleSelectOption = (choice: DilemmaChoice) => {
    if (selectedChoice) return;
    setSelectedChoice(choice);
    if (choice.isCorrect) {
      playCorrectTingTing();
      try {
        confetti({ particleCount: 60, spread: 60 });
      } catch {}
      onCompleteGame(50, 30, isVi ? `Tình Huống: ${scenario.title}` : `Dilemma Map: ${scenario.title}`);
    } else {
      playErrorBuzzer();
    }
  };

  const handleNext = () => {
    if (index < scenarios.length - 1) {
      setIndex(index + 1);
      setSelectedChoice(null);
    } else {
      onBackToHub();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* STATUS BAR */}
      <div className="flex items-center justify-between bg-white rounded-3xl p-5 border border-purple-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-black">
            🎭
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#7D7699]">
              {isVi ? 'Game #05 • Tình Huống Phản Xạ Thực Tế' : 'Game #05 • Real-World Dilemmas'}
            </span>
            <h2 className="text-xl font-black text-[#29243D]">WHAT WOULD YOU DO?</h2>
          </div>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-full bg-purple-100 text-[#40356B] font-bold">
          {isVi ? 'Tình huống' : 'Dilemma'} {index + 1}/{scenarios.length}
        </span>
      </div>

      {/* SCENARIO CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-100 shadow-xl space-y-6">
        <h3 className="text-lg font-black text-[#29243D]">{scenario.title}</h3>
        <div className="p-5 rounded-2xl bg-[#FAF8FE] border border-purple-100 text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
          {scenario.context}
        </div>

        {/* 3 OPTIONS */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#7D7699] uppercase tracking-wider block">
            {isVi ? 'Bạn sẽ xử lý như thế nào?' : 'How would you handle this situation?'}
          </span>
          {scenario.options.map((opt) => {
            const isPicked = selectedChoice?.id === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                disabled={!!selectedChoice}
                className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all border-2 flex items-start gap-3 cursor-pointer ${
                  !selectedChoice
                    ? 'bg-white hover:bg-purple-50/80 border-purple-100 text-gray-800 hover:border-purple-300 active:scale-99'
                    : isPicked
                    ? opt.isCorrect
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                      : 'bg-rose-50 border-rose-500 text-rose-950 font-bold'
                    : 'bg-gray-50 border-gray-200 text-gray-400 opacity-60'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-black flex-shrink-0 text-xs ${
                    isPicked
                      ? opt.isCorrect
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-600 text-white'
                      : 'bg-purple-100 text-[#40356B]'
                  }`}
                >
                  {opt.label}
                </span>
                <span className="mt-0.5">{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* CONSEQUENCE EXPLANATION */}
        {selectedChoice && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl text-xs sm:text-sm leading-relaxed border space-y-2 ${
              selectedChoice.isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            <div className="font-black text-sm uppercase tracking-wider">
              {selectedChoice.isCorrect
                ? (isVi ? '✅ Lựa chọn cực kỳ chính xác!' : '✅ Highly Vigilant & Correct Choice!')
                : (isVi ? '⚠️ Nguy cơ thực tế xảy ra:' : '⚠️ Real-World Hazard Exploit:')}
            </div>
            <p>{selectedChoice.explanation}</p>
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-xl bg-[#40356B] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                {index < scenarios.length - 1
                  ? (isVi ? 'Tình huống tiếp' : 'Next Dilemma')
                  : (isVi ? 'Về Glitch Zone' : 'Back to Glitch Zone')}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

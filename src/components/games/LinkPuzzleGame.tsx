import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Puzzle, CheckCircle2, RotateCcw, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { getLinkPuzzleScenarios } from '../../data/gameScenarios';
import { LinkPuzzlePiece } from '../../types';
import { playCorrectTingTing, playErrorBuzzer } from '../../utils/soundEffects';
import { useLanguage } from '../../context/LanguageContext';

interface LinkPuzzleGameProps {
  onCompleteGame: (xp: number, coins: number, mapName?: string) => void;
  onBackToHub: () => void;
}

export const LinkPuzzleGame: React.FC<LinkPuzzleGameProps> = ({
  onCompleteGame,
  onBackToHub
}) => {
  const { isVi } = useLanguage();
  const scenarios = getLinkPuzzleScenarios(isVi);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const scenario = scenarios[scenarioIndex] || scenarios[0];

  // Placements state: maps piece.id -> chosen category
  const [placements, setPlacements] = useState<{ [pieceId: string]: string }>({});
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const categories = [
    { id: 'protocol', label: isVi ? '🔒 Giao thức (Protocol)' : '🔒 Protocol' },
    { id: 'domain', label: isVi ? '🏷️ Tên miền (Domain / TLD)' : '🏷️ Domain / TLD' },
    { id: 'path', label: isVi ? '📂 Đường dẫn (Path)' : '📂 Path' },
    { id: 'redflag', label: isVi ? '⚠️ Dấu hiệu đáng ngờ (Red Flags)' : '⚠️ Red Flags / Traps' }
  ];

  const handleSelectPiece = (pieceId: string) => {
    if (isCompleted) return;
    setSelectedPieceId(pieceId);
  };

  const handlePlaceInCategory = (catId: string) => {
    if (!selectedPieceId || isCompleted) return;

    const newPlacements = { ...placements, [selectedPieceId]: catId };
    setPlacements(newPlacements);
    setSelectedPieceId(null);

    // Check if all pieces placed
    if (Object.keys(newPlacements).length === scenario.pieces.length) {
      // Validate
      const allRight = scenario.pieces.every((p) => newPlacements[p.id] === p.category);
      setIsCompleted(true);
      setIsCorrect(allRight);
      if (allRight) {
        playCorrectTingTing();
        try {
          confetti({ particleCount: 70, spread: 60 });
        } catch {}
        onCompleteGame(65, 40, isVi ? `Map Link Puzzle: ${scenario.brand}` : `Link Puzzle Map: ${scenario.brand}`);
      } else {
        playErrorBuzzer();
      }
    }
  };

  const resetGame = () => {
    setPlacements({});
    setSelectedPieceId(null);
    setIsCompleted(false);
    setIsCorrect(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* STATUS HEADER */}
      <div className="flex items-center justify-between bg-white rounded-3xl p-5 border border-purple-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
            🧩
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#7D7699]">
              {isVi ? 'Game #04 • Giải Mã Cấu Trúc Link' : 'Game #04 • URL Structure Anatomy'}
            </span>
            <h2 className="text-xl font-black text-[#29243D]">LINK PUZZLE</h2>
          </div>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-full bg-purple-100 text-[#40356B] font-bold">
          {isVi ? 'Chủ đề:' : 'Target:'} {scenario.brand}
        </span>
      </div>

      {/* FULL URL PREVIEW */}
      <div className="p-4 rounded-2xl bg-[#29243D] text-white text-center font-mono text-sm sm:text-base border border-purple-200">
        <span className="text-xs text-purple-300 block mb-1">
          {isVi ? '🔗 Đường dẫn cần bóc tách:' : '🔗 URL to decompose:'}
        </span>
        <span className="text-amber-300 font-bold">{scenario.fullUrl}</span>
      </div>

      {/* AVAILABLE PIECES (Select to place) */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm space-y-3">
        <span className="text-xs font-bold text-[#7D7699] uppercase tracking-wider block">
          {isVi ? '1. Bấm chọn một mảnh ghép:' : '1. Click to select a puzzle segment:'}
        </span>
        <div className="flex flex-wrap gap-2.5">
          {scenario.pieces.map((piece) => {
            const isPlaced = !!placements[piece.id];
            const isSelected = selectedPieceId === piece.id;

            return (
              <button
                key={piece.id}
                onClick={() => handleSelectPiece(piece.id)}
                className={`px-4 py-2.5 rounded-xl font-mono text-sm font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-amber-950 ring-2 ring-amber-600 scale-105 shadow-md'
                    : isPlaced
                    ? 'bg-purple-100 text-purple-800 opacity-60'
                    : 'bg-purple-50 hover:bg-purple-100 text-[#40356B] border border-purple-200'
                }`}
              >
                {piece.text}
                {isPlaced && <span className="ml-1 text-xs">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* TARGET CATEGORY BOXES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((cat) => {
          const piecesInCat = scenario.pieces.filter((p) => placements[p.id] === cat.id);

          return (
            <div
              key={cat.id}
              onClick={() => handlePlaceInCategory(cat.id)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer min-h-[110px] flex flex-col justify-between ${
                selectedPieceId
                  ? 'border-dashed border-[#8B5CF6] bg-purple-50/60 hover:bg-purple-100/60'
                  : 'border-purple-100 bg-white'
              }`}
            >
              <div className="text-xs font-bold text-[#40356B]">{cat.label}</div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {piecesInCat.map((p) => (
                  <span
                    key={p.id}
                    className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-mono text-xs font-bold"
                  >
                    {p.text}
                  </span>
                ))}
                {piecesInCat.length === 0 && (
                  <span className="text-[11px] text-gray-400 italic">
                    {selectedPieceId
                      ? (isVi ? 'Bấm vào đây để thả mảnh ghép' : 'Click here to place piece')
                      : (isVi ? 'Chưa có mảnh nào' : 'Empty slot')}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* RESULT & EXPLANATION */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-3xl text-white shadow-xl space-y-3 ${
            isCorrect ? 'bg-emerald-600' : 'bg-rose-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <h4 className="font-black text-base">
              {isCorrect
                ? (isVi ? 'PHÂN TÍCH CHÍNH XÁC!' : 'PERFECT URL DECOMPOSITION!')
                : (isVi ? 'CÓ MẢNH GHÉP ĐẶT CHƯA ĐÚNG' : 'SOME PIECES WERE MISPLACED')}
            </h4>
          </div>
          <p className="text-xs sm:text-sm bg-white/10 p-3 rounded-xl leading-relaxed">
            {scenario.educationalInsight}
          </p>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold cursor-pointer"
            >
              {isVi ? 'Thử lại' : 'Try Again'}
            </button>
            <button
              onClick={onBackToHub}
              className="px-5 py-2 bg-white text-gray-900 rounded-xl text-xs font-bold cursor-pointer"
            >
              {isVi ? 'Về Glitch Zone' : 'Back to Glitch Zone'}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

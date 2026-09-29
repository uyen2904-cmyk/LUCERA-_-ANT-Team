import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  Clock,
  Sparkles,
  Award,
  AlertCircle,
  CheckCircle2,
  RotateCcw,
  Lightbulb,
  ArrowRight,
  Gift,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getScamDetectiveScenarios } from '../../data/gameScenarios';
import { ScamDetectiveScenario } from '../../types';
import { KienSangMascot } from '../KienSangMascot';
import { playCorrectTingTing, playErrorBuzzer } from '../../utils/soundEffects';
import { useLanguage } from '../../context/LanguageContext';

interface ScamDetectiveGameProps {
  onCompleteGame: (xp: number, coins: number, mapName?: string) => void;
  onBackToHub: () => void;
}

export const ScamDetectiveGame: React.FC<ScamDetectiveGameProps> = ({
  onCompleteGame,
  onBackToHub
}) => {
  const { isVi } = useLanguage();
  const scenarios = getScamDetectiveScenarios(isVi);

  const [scenarioIndex, setScenarioIndex] = useState(0);
  const scenario: ScamDetectiveScenario = scenarios[scenarioIndex] || scenarios[0];

  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [clickedTokenIds, setClickedTokenIds] = useState<string[]>([]);
  const [wrongShake, setWrongShake] = useState<string | null>(null);
  const [penaltyMessage, setPenaltyMessage] = useState<string | null>(null);
  const [currentClueFeedback, setCurrentClueFeedback] = useState<{ category: string; explanation: string } | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showKienSangHint, setShowKienSangHint] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (gameWon || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameWon, gameOver]);

  // Handle click on token
  const handleTokenClick = (token: ScamDetectiveScenario['tokens'][0]) => {
    if (gameWon || gameOver) return;
    if (clickedTokenIds.includes(token.id)) return;

    if (token.isClue) {
      // Correct clue: +10 points!
      playCorrectTingTing();
      const newClicked = [...clickedTokenIds, token.id];
      setClickedTokenIds(newClicked);
      setScore((prev) => prev + 10);
      setCurrentClueFeedback({
        category: token.category || (isVi ? 'Chi tiết đáng ngờ' : 'Red Flag Indicator'),
        explanation: token.explanation || (isVi ? 'Dấu hiệu lừa đảo đã bị bạn vạch trần!' : 'Deceptive trap exposed!')
      });

      // Check if all clues found
      const totalCluesFound = scenario.tokens.filter((t) => t.isClue && newClicked.includes(t.id)).length;
      if (totalCluesFound >= scenario.totalClues) {
        setGameWon(true);
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch {}
        onCompleteGame(80, 50, isVi ? `Phá Án: ${scenario.title}` : `Detective Case: ${scenario.title}`);
      }
    } else {
      // Wrong click: -5 seconds penalty!
      playErrorBuzzer();
      setWrongShake(token.id);
      setTimeLeft((prev) => Math.max(0, prev - 5));
      setPenaltyMessage(isVi ? '-5 GIÂY! (Từ này không chứa dấu hiệu lừa đảo)' : '-5s PENALTY! (Not a red flag)');
      setTimeout(() => {
        setWrongShake(null);
        setPenaltyMessage(null);
      }, 1400);
    }
  };

  const handleNextScenario = () => {
    if (scenarioIndex < scenarios.length - 1) {
      setScenarioIndex(scenarioIndex + 1);
      resetCurrentRound();
    } else {
      onBackToHub();
    }
  };

  const resetCurrentRound = () => {
    setTimeLeft(60);
    setClickedTokenIds([]);
    setWrongShake(null);
    setPenaltyMessage(null);
    setCurrentClueFeedback(null);
    setGameWon(false);
    setGameOver(false);
    setShowKienSangHint(false);
  };

  const cluesFoundCount = scenario.tokens.filter((t) => t.isClue && clickedTokenIds.includes(t.id)).length;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* TOP STATUS BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-3xl p-5 border border-purple-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-black">
            🕵️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#7D7699]">
                {isVi ? 'Game Chính #01' : 'Main Mission #01'}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-100 text-[#40356B] font-bold">
                {isVi ? `Màn ${scenarioIndex + 1}/${scenarios.length}` : `Case ${scenarioIndex + 1}/${scenarios.length}`}
              </span>
            </div>
            <h2 className="text-xl font-black text-[#29243D]">SCAM DETECTIVE</h2>
          </div>
        </div>

        {/* TIMER, SCORE, CLUES COUNTERS */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Time with penalty visual */}
          <div className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-black">
            <Clock className="w-4 h-4 text-rose-600 animate-spin-slow" />
            <span>{timeLeft}s</span>
            {penaltyMessage && (
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-6 left-0 right-0 text-center text-[10px] font-black text-rose-600 bg-rose-100 px-1 py-0.5 rounded shadow-sm whitespace-nowrap"
              >
                {penaltyMessage}
              </motion.span>
            )}
          </div>

          {/* Score Counter */}
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-black">
            <span>💰</span>
            <span>+{score} {isVi ? 'ĐIỂM' : 'PTS'}</span>
          </div>

          {/* Clues Counter */}
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-purple-50 border border-purple-200 text-[#40356B] text-xs sm:text-sm font-black">
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
            <span>
              {cluesFoundCount}/{scenario.totalClues} {isVi ? 'Dấu hiệu' : 'Clues'}
            </span>
          </div>
        </div>
      </div>

      {/* MISSION INSTRUCTION CARD */}
      <div className="bg-gradient-to-r from-purple-50 via-white to-amber-50 rounded-2xl p-4 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 text-[#29243D]">
          <span className="text-xl">🎯</span>
          <p>
            <strong>{isVi ? 'Nhiệm vụ:' : 'Mission:'}</strong>{' '}
            {isVi
              ? 'Bấm vào những chi tiết đáng ngờ trong tin nhắn dưới đây.'
              : 'Click on suspicious details within the message below.'}{' '}
            <span className="text-emerald-700 font-bold">
              💰 {isVi ? 'Đúng: +10 điểm' : 'Correct: +10 pts'}
            </span>{' '}
            |{' '}
            <span className="text-rose-600 font-bold">
              ❌ {isVi ? 'Bấm sai: mất 5 giây!' : 'Wrong: -5s penalty!'}
            </span>
          </p>
        </div>
        <button
          onClick={() => setShowKienSangHint(!showKienSangHint)}
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-xs hover:opacity-90 transition-all cursor-pointer"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          {isVi ? 'Hỏi Kiến Sáng FPT' : 'Detective Clue Hint'}
        </button>
      </div>

      {/* COMPANION KIEN SANG HINT MODAL/BUBBLE */}
      {showKienSangHint && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-orange-50/90 rounded-2xl border border-orange-200 shadow-sm"
        >
          <KienSangMascot
            size="sm"
            speechText={scenario.kienSangHint}
          />
        </motion.div>
      )}

      {/* THE INTERACTIVE MESSAGE / EMAIL SCREEN */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#E9E4F5] shadow-xl overflow-hidden">
        {/* Fake Smartphone / Mail Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 text-[#40356B] flex items-center justify-center font-black text-sm shadow-inner">
              {scenario.avatarIcon === 'gift' ? '🎁' : scenario.avatarIcon === 'shield-alert' ? '🏦' : '👮'}
            </div>
            <div>
              <span className="font-black text-[#29243D] text-sm block">
                {scenario.sender}
              </span>
              <span className="text-[11px] text-[#7D7699]">
                {scenario.time} • {isVi ? 'Tin nhắn SMS' : 'SMS Message'}
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600">
            {isVi ? 'Kênh nhận tin' : 'Inbox Channel'}
          </span>
        </div>

        {/* CLICKABLE TOKENS STREAM */}
        <div className="p-5 sm:p-7 rounded-2xl bg-[#FAF8FE] border border-purple-100 leading-loose text-base sm:text-lg font-medium text-[#29243D] flex flex-wrap gap-2 items-center">
          {scenario.tokens.map((token) => {
            const isClicked = clickedTokenIds.includes(token.id);
            const isShaking = wrongShake === token.id;

            return (
              <motion.button
                key={token.id}
                onClick={() => handleTokenClick(token)}
                animate={isShaking ? { x: [-6, 6, -6, 6, 0] } : {}}
                transition={{ duration: 0.3 }}
                className={`relative inline-block px-2.5 py-1 rounded-xl text-left transition-all select-none cursor-pointer ${
                  isClicked
                    ? 'bg-amber-300 text-amber-950 font-black border-2 border-amber-500 shadow-md scale-105'
                    : 'hover:bg-purple-200/80 hover:text-[#40356B] border border-transparent hover:border-purple-300 active:scale-95'
                }`}
              >
                {token.text}
                {isClicked && (
                  <span className="ml-1.5 inline-block text-xs bg-amber-500 text-white rounded-full px-1.5 py-0.2 font-black">
                    ✓ +10
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* FEEDBACK POPUP ON DISCOVERY */}
        <AnimatePresence>
          {currentClueFeedback && !gameWon && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-2.5 text-xs text-amber-950"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="uppercase tracking-wider text-amber-900 block font-black">
                  🔍 {isVi ? 'Phát hiện:' : 'Discovered:'} {currentClueFeedback.category}
                </strong>
                <p className="mt-0.5">{currentClueFeedback.explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* VICTORY OVERLAY */}
        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-700 text-white shadow-xl space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎉</span>
                <div>
                  <h3 className="text-xl font-black">
                    {isVi ? 'PHÁ ÁN THÀNH CÔNG!' : 'CASE SOLVED SUCCESSFULLY!'}
                  </h3>
                  <p className="text-xs text-emerald-100">
                    {isVi
                      ? `Bạn đã tìm thấy đủ ${scenario.totalClues}/${scenario.totalClues} chiêu trò lừa đảo tinh vi.`
                      : `You identified all ${scenario.totalClues}/${scenario.totalClues} deceptive scam markers.`}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm bg-white/10 p-3.5 rounded-2xl border border-white/20 leading-relaxed font-medium">
                {scenario.postExplanation}
              </p>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs font-bold text-emerald-100">
                  {isVi ? 'Phần thưởng:' : 'Rewards:'}{' '}
                  <span className="text-amber-300 font-black">
                    {isVi ? '+80 Cyber XP & +50 Xu' : '+80 Cyber XP & +50 Coins'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={resetCurrentRound}
                    className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {isVi ? 'Chơi lại' : 'Replay'}
                  </button>
                  <button
                    onClick={handleNextScenario}
                    className="px-5 py-2 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {scenarioIndex < scenarios.length - 1
                      ? (isVi ? 'Vụ án tiếp theo' : 'Next Case')
                      : (isVi ? 'Về Glitch Zone' : 'Back to Glitch Zone')}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GAME OVER (TIME OUT) OVERLAY */}
        <AnimatePresence>
          {gameOver && !gameWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-6 rounded-3xl bg-rose-600 text-white shadow-xl space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">⏰</span>
                <div>
                  <h3 className="text-xl font-black">
                    {isVi ? 'HẾT GIỜ RỒI!' : 'TIME HAS RUN OUT!'}
                  </h3>
                  <p className="text-xs text-rose-100">
                    {isVi
                      ? 'Kẻ gian đã tẩu tán thông tin trước khi bạn tìm đủ các manh mối.'
                      : 'The attacker fled before you collected all critical red flags.'}
                  </p>
                </div>
              </div>
              <p className="text-xs bg-white/10 p-3 rounded-xl">
                {isVi
                  ? 'Đừng nản lòng! Hãy nhớ quan sát kỹ các yếu tố: Tên miền lạ, quà tặng bất ngờ, thúc ép thời gian và đòi hỏi mật mã/OTP.'
                  : 'Stay vigilant! Look for: Strange domain extensions, unexpected prizes, artificial urgency, and demands for OTP or credentials.'}
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={onBackToHub}
                  className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs cursor-pointer"
                >
                  {isVi ? 'Về Glitch Zone' : 'Back to Glitch Zone'}
                </button>
                <button
                  onClick={resetCurrentRound}
                  className="px-5 py-2 rounded-xl bg-white text-rose-900 hover:bg-rose-50 font-black text-xs shadow-md flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {isVi ? 'Thử lại ngay' : 'Try Again'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER NAV BUTTON */}
      <div className="flex justify-between items-center text-xs text-[#7D7699]">
        <button
          onClick={onBackToHub}
          className="font-bold text-[#40356B] hover:underline cursor-pointer"
        >
          {isVi ? '← Quay lại Glitch Zone' : '← Return to Glitch Zone'}
        </button>
        <span>
          {isVi
            ? 'Mẹo: Bạn có thể click vào bất kỳ cụm từ nào bạn nghi ngờ'
            : 'Tip: You can click on any suspicious phrase you identify'}
        </span>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  ArrowRight,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getFakeOrRealScenarios } from '../../data/gameScenarios';
import { KienSangMascot } from '../KienSangMascot';
import { playCorrectTingTing, playErrorBuzzer } from '../../utils/soundEffects';
import { useLanguage } from '../../context/LanguageContext';

interface FakeOrRealGameProps {
  onCompleteGame: (xp: number, coins: number, mapName?: string) => void;
  onBackToHub: () => void;
}

export const FakeOrRealGame: React.FC<FakeOrRealGameProps> = ({
  onCompleteGame,
  onBackToHub
}) => {
  const { isVi } = useLanguage();
  const scenarios = getFakeOrRealScenarios(isVi);
  const scenario = scenarios[0];

  const [timeLeft, setTimeLeft] = useState(75);
  const [foundDiffIds, setFoundDiffIds] = useState<string[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);

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

  const handleSpotDifference = (diffId: string) => {
    if (foundDiffIds.includes(diffId) || gameWon || gameOver) return;

    playCorrectTingTing();
    const updated = [...foundDiffIds, diffId];
    setFoundDiffIds(updated);

    if (updated.length >= scenario.differences.length) {
      setGameWon(true);
      try {
        confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
      } catch {}
      const timeBonus = timeLeft * 2;
      onCompleteGame(70 + timeBonus, 45, isVi ? `So Kèo Web: ${scenario.brand}` : `Spot Web Phishing: ${scenario.brand}`);
    }
  };

  const resetGame = () => {
    setTimeLeft(75);
    setFoundDiffIds([]);
    setGameWon(false);
    setGameOver(false);
    setShowHint(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-3xl p-5 border border-purple-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-black">
            🕵🏻
          </div>
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#7D7699]">
              {isVi ? 'Game #02 • Tìm 5 Điểm Khác Biệt' : 'Game #02 • Spot 5 Differences'}
            </span>
            <h2 className="text-xl font-black text-[#29243D]">FAKE OR REAL?</h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-black">
            <Clock className="w-4 h-4 text-rose-600 animate-spin-slow" />
            <span>{timeLeft}s {isVi ? 'còn lại' : 'left'}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-purple-50 border border-purple-200 text-[#40356B] text-xs sm:text-sm font-black">
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
            <span>
              {foundDiffIds.length}/5 {isVi ? 'Điểm Khác Biệt' : 'Differences Found'}
            </span>
          </div>
        </div>
      </div>

      {/* HINT BAR */}
      <div className="bg-gradient-to-r from-purple-50 via-white to-amber-50 rounded-2xl p-4 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        <p className="text-gray-700">
          🔍 {isVi
            ? 'So sánh 2 website dưới đây và'
            : 'Compare the two websites below and'}{' '}
          <strong>
            {isVi
              ? 'bấm vào các vị trí nghi vấn ở trang giả bên phải'
              : 'click on suspicious hotspots on the counterfeit site to the right'}
          </strong>{' '}
          {isVi ? '(URL, logo, nút bấm, chứng nhận)!' : '(URL, typo logo, button, certificate)!'}
        </p>
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs cursor-pointer"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          {isVi ? 'Gợi ý từ Kiến Sáng' : 'Detective Clue Hint'}
        </button>
      </div>

      {showHint && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <KienSangMascot size="sm" speechText={scenario.kienSangHint} />
        </motion.div>
      )}

      {/* 2 COMPARATIVE BROWSER MOCKUPS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* REAL SITE */}
        <div className="bg-white rounded-3xl border-2 border-emerald-300 shadow-md overflow-hidden flex flex-col">
          <div className="p-3 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between">
            <span className="text-xs font-black text-emerald-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              🟢 {isVi ? 'WEBSITE THẬT (Chính Thức)' : 'GENUINE WEBSITE (Official)'}
            </span>
            <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
              {isVi ? 'Được bảo vệ' : 'Verified Secure'}
            </span>
          </div>

          {/* Browser bar */}
          <div className="p-2.5 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            </div>
            <div className="flex-1 bg-white px-2.5 py-1 rounded-lg border text-[11px] font-mono text-emerald-700 flex items-center gap-1">
              <span>🔒</span>
              <span className="truncate">{scenario.realSite.url}</span>
            </div>
          </div>

          {/* Real web body */}
          <div className="p-6 space-y-6 flex-1 bg-gradient-to-b from-white to-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-black text-emerald-800 tracking-tight">
                {scenario.realSite.logoText}
              </div>
              <div className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md font-semibold">
                {scenario.realSite.badge}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-3 shadow-inner">
              <div className="h-4 bg-gray-100 rounded w-1/3" />
              <div className="h-8 bg-gray-50 border border-gray-200 rounded-lg px-3 flex items-center text-xs text-gray-400">
                {isVi ? 'Tên đăng nhập' : 'Username / Phone'}
              </div>
              <div className="h-8 bg-gray-50 border border-gray-200 rounded-lg px-3 flex items-center text-xs text-gray-400">
                {isVi ? 'Mật khẩu••••••••' : 'Password••••••••'}
              </div>
              <button className="w-full py-2.5 bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm">
                {scenario.realSite.buttonText}
              </button>
            </div>
          </div>
        </div>

        {/* FAKE SITE (INTERACTIVE HOTSPOTS) */}
        <div className="bg-white rounded-3xl border-2 border-rose-300 shadow-md overflow-hidden flex flex-col">
          <div className="p-3 bg-rose-50 border-b border-rose-200 flex items-center justify-between">
            <span className="text-xs font-black text-rose-800 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              🔴 {isVi ? 'WEBSITE GIẢ MẠO (Bấm tìm 5 bẫy)' : 'COUNTERFEIT WEBSITE (Find 5 traps)'}
            </span>
            <span className="text-[10px] bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full font-bold">
              {isVi ? 'Nguy hiểm' : 'Danger Flagged'}
            </span>
          </div>

          {/* Browser bar with clickable hotspots for diff 1 & 2 */}
          <div className="p-2.5 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
            </div>
            <div className="flex-1 bg-white px-2.5 py-1 rounded-lg border text-[11px] font-mono flex items-center gap-1">
              {/* Diff 1: Missing HTTPS */}
              <button
                onClick={() => handleSpotDifference('d1')}
                className={`cursor-pointer px-1 rounded transition-all ${
                  foundDiffIds.includes('d1')
                    ? 'bg-rose-500 text-white font-bold'
                    : 'text-rose-600 hover:bg-rose-100'
                }`}
                title={isVi ? 'Bấm nếu thấy nghi vấn giao thức http không bảo mật' : 'Click to flag unencrypted HTTP protocol'}
              >
                http://
              </button>
              {/* Diff 2: Fake domain */}
              <button
                onClick={() => handleSpotDifference('d2')}
                className={`cursor-pointer px-1 rounded transition-all truncate ${
                  foundDiffIds.includes('d2')
                    ? 'bg-rose-500 text-white font-bold'
                    : 'text-rose-600 hover:bg-rose-100'
                }`}
                title={isVi ? 'Bấm nếu thấy tên miền lạ đuôi .xyz' : 'Click to flag spoofed .xyz domain'}
              >
                vcb-digibank-ebanking.xyz
              </button>
            </div>
          </div>

          {/* Body with clickable hotspots for diff 3, 4, 5 */}
          <div className="p-6 space-y-6 flex-1 bg-gradient-to-b from-white to-rose-50/30">
            <div className="flex items-center justify-between">
              {/* Diff 3: Typosquatting Logo */}
              <button
                onClick={() => handleSpotDifference('d3')}
                className={`text-2xl font-black tracking-tight px-2 py-0.5 rounded-lg cursor-pointer transition-all ${
                  foundDiffIds.includes('d3')
                    ? 'bg-rose-500 text-white'
                    : 'text-rose-800 hover:bg-rose-100'
                }`}
                title={isVi ? 'Soi chữ logo: Có sai chính tả không?' : 'Inspect logo: Is there typosquatting?'}
              >
                {scenario.fakeSite.logoText}
              </button>

              {/* Diff 5: Missing badge */}
              <button
                onClick={() => handleSpotDifference('d5')}
                className={`text-[10px] px-2 py-1 rounded-md font-semibold cursor-pointer transition-all ${
                  foundDiffIds.includes('d5')
                    ? 'bg-rose-500 text-white font-bold'
                    : 'text-rose-700 bg-rose-100 hover:bg-rose-200'
                }`}
                title={isVi ? 'Kiểm tra chứng chỉ SSL' : 'Check SSL certificate'}
              >
                {scenario.fakeSite.badge}
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-3 shadow-inner">
              <div className="h-4 bg-gray-100 rounded w-1/3" />
              <div className="h-8 bg-gray-50 border border-gray-200 rounded-lg px-3 flex items-center text-xs text-gray-400">
                {isVi ? 'Tên đăng nhập' : 'Username / Phone'}
              </div>
              <div className="h-8 bg-gray-50 border border-gray-200 rounded-lg px-3 flex items-center text-xs text-gray-400">
                {isVi ? 'Mật khẩu••••••••' : 'Password••••••••'}
              </div>

              {/* Diff 4: Fake button */}
              <button
                onClick={() => handleSpotDifference('d4')}
                className={`w-full py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  foundDiffIds.includes('d4')
                    ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                    : 'bg-rose-500 hover:bg-rose-600 text-white'
                }`}
                title={isVi ? 'Nút đăng nhập có thêm lời dụ dỗ quà tặng!' : 'Login button contains prize lures!'}
              >
                {scenario.fakeSite.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DISCOVERED DIFFERENCES CHECKLIST */}
      <div className="bg-white rounded-3xl p-5 border border-purple-100 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-[#40356B] uppercase tracking-wider">
          {isVi ? 'Danh sách 5 điểm khác biệt đã phát hiện:' : 'Discovered 5 Differences Checklist:'}
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {scenario.differences.map((diff) => {
            const isFound = foundDiffIds.includes(diff.id);
            return (
              <div
                key={diff.id}
                className={`p-3 rounded-2xl border text-xs transition-all flex items-start gap-2 ${
                  isFound
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950 font-bold'
                    : 'bg-gray-50 border-gray-200 text-gray-400'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isFound ? 'text-emerald-600' : 'text-gray-300'}`} />
                <div>
                  <span>{diff.title}</span>
                  {isFound && <p className="text-[11px] font-normal text-emerald-800 mt-0.5">{diff.description}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* WIN OVERLAY */}
      {gameWon && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-emerald-600 text-white rounded-3xl shadow-xl flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black">{isVi ? 'CHÚC MỪNG BẠN!' : 'CONGRATULATIONS!'}</h3>
            <p className="text-xs text-emerald-100">
              {isVi
                ? 'Bạn đã tinh mắt tìm ra trọn vẹn 5 điểm khác biệt giữa trang thật và trang lừa đảo.'
                : 'You successfully exposed all 5 critical differences between genuine and phishing pages.'}
            </p>
          </div>
          <button onClick={onBackToHub} className="px-5 py-2.5 bg-white text-emerald-900 rounded-xl font-bold text-xs cursor-pointer">
            {isVi ? 'Về Glitch Zone' : 'Back to Glitch Zone'}
          </button>
        </motion.div>
      )}

      {/* GAMEOVER OVERLAY */}
      {gameOver && !gameWon && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 bg-rose-600 text-white rounded-3xl shadow-xl flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black">{isVi ? 'HẾT THỜI GIAN!' : 'TIME EXPIRED!'}</h3>
            <p className="text-xs text-rose-100">
              {isVi
                ? 'Thời gian đã trôi qua trước khi bạn tìm đủ 5 điểm khác biệt.'
                : 'Time expired before uncovering all 5 phishing differences.'}
            </p>
          </div>
          <button onClick={resetGame} className="px-5 py-2.5 bg-white text-rose-900 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer">
            <RotateCcw className="w-3.5 h-3.5" /> {isVi ? 'Thử lại' : 'Try Again'}
          </button>
        </motion.div>
      )}
    </div>
  );
};

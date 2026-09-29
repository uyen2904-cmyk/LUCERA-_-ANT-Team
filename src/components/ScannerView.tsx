import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Link2, Phone, AlertTriangle, ShieldCheck, XCircle, Info, Sparkles, Flag, Eye, Radio } from 'lucide-react';
import { analyzeLink, analyzePhone, SAMPLE_QUICK_TESTS } from '../data/scamDatabase';
import { LinkAnalysisResult, PhoneAnalysisResult } from '../types';
import { KienSangMascot } from './KienSangMascot';
import { playCorrectTingTing, playErrorBuzzer } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ScannerViewProps {
  onEarnReward?: (xp: number, coins: number, mapName?: string) => void;
  initialQuery?: string;
  streakDays?: number;
}

export const ScannerView: React.FC<ScannerViewProps> = ({ onEarnReward, initialQuery, streakDays = 0 }) => {
  const [activeMode, setActiveMode] = useState<'link' | 'phone'>('link');
  const [inputValue, setInputValue] = useState(initialQuery || '');
  const [linkResult, setLinkResult] = useState<LinkAnalysisResult | null>(null);
  const [phoneResult, setPhoneResult] = useState<PhoneAnalysisResult | null>(null);
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [reportedSuccessfully, setReportedSuccessfully] = useState(false);
  const { isPastel } = useTheme();
  const { isVi } = useLanguage();

  React.useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      setInputValue(initialQuery);
      if (/^\+?\d{8,15}$/.test(initialQuery.trim().replace(/\D/g, '')) && !initialQuery.includes('.')) {
        setActiveMode('phone');
        const res = analyzePhone(initialQuery.trim());
        setPhoneResult(res);
        setLinkResult(null);
      } else {
        setActiveMode('link');
        const res = analyzeLink(initialQuery.trim());
        setLinkResult(res);
        setPhoneResult(null);
      }
    }
  }, [initialQuery]);

  const handleScan = (valueToScan?: string) => {
    const val = valueToScan || inputValue;
    if (!val.trim()) return;

    setReportedSuccessfully(false);

    if (activeMode === 'link') {
      const res = analyzeLink(val);
      setLinkResult(res);
      setPhoneResult(null);
      if (res.riskLevel === 'safe') {
        playCorrectTingTing();
      } else if (res.riskLevel === 'dangerous') {
        playErrorBuzzer();
      }
      if (onEarnReward) {
        onEarnReward(15, 10, isVi ? 'Quét Radar Link' : 'Radar Link Scan');
      }
    } else {
      const res = analyzePhone(val);
      setPhoneResult(res);
      setLinkResult(null);
      if (res.riskLevel === 'safe') {
        playCorrectTingTing();
      } else if (res.riskLevel === 'dangerous') {
        playErrorBuzzer();
      }
      if (onEarnReward) {
        onEarnReward(15, 10, isVi ? 'Quét Radar SĐT' : 'Radar Phone Scan');
      }
    }
  };

  const handleQuickTest = (item: typeof SAMPLE_QUICK_TESTS[0]) => {
    setActiveMode(item.type as 'link' | 'phone');
    setInputValue(item.value);
    handleScan(item.value);
  };

  const handleReport = () => {
    setReportedSuccessfully(true);
    if (linkResult) {
      setLinkResult({ ...linkResult, communityReportCount: linkResult.communityReportCount + 1 });
    }
    if (phoneResult) {
      setPhoneResult({ ...phoneResult, communityReportCount: phoneResult.communityReportCount + 1 });
    }
    if (onEarnReward) {
      onEarnReward(25, 20, isVi ? 'Báo Cáo Cộng Đồng' : 'Community Scam Report');
    }
  };

  return (
    <div className={`w-full max-w-5xl mx-auto space-y-8 transition-colors ${
      isPastel ? 'text-slate-800' : 'text-white'
    }`}>
      {/* HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black border ${
          isPastel
            ? 'bg-cyan-100 text-cyan-900 border-cyan-200'
            : 'bg-cyan-950/70 text-cyan-300 border-cyan-500/40'
        }`}>
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isVi ? 'PHÂN TÍCH CHUYÊN SÂU ĐƯỜNG DẪN & SĐT 📡' : 'DEEP HEURISTIC URL & PHONE ENGINE 📡'}</span>
        </div>
        <h1 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${
          isPastel ? 'text-slate-900' : 'text-white'
        }`}>
          {isVi ? 'Quét Link & Tra Cứu Số Điện Thoại' : 'Link & Phone Scanner'}
        </h1>
        <p className={`text-sm sm:text-base font-medium ${
          isPastel ? 'text-slate-600' : 'text-slate-300'
        }`}>
          {isVi
            ? 'Bóc tách chuyên sâu từng thành phần của đường dẫn website và số điện thoại lạ. Chuông 🔔 Ting-Ting báo an toàn & 🚨 Eeee/Bzzzt cảnh báo lừa đảo!'
            : 'Deep heuristic decomposition for URLs and caller IDs. Chime 🔔 Ting-Ting indicates safe results while 🚨 Eeee/Bzzzt warns of danger!'}
        </p>
      </div>

      {/* INPUT / SCANNER CARD */}
      <div className={`rounded-3xl p-5 sm:p-7 border-2 shadow-2xl transition-all ${
        isPastel
          ? 'bg-white border-purple-200 text-slate-800'
          : 'bg-[#15122D] border-orange-500/30 text-white'
      }`}>
        {/* MODE SWITCHER */}
        <div className="flex items-center justify-center gap-2 p-1.5 bg-black/40 rounded-2xl w-fit mx-auto mb-6 border border-white/10">
          <button
            onClick={() => {
              setActiveMode('link');
              setInputValue('');
              setLinkResult(null);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMode === 'link'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Link2 className="w-4 h-4" />
            Scan Web Link / URL
          </button>
          <button
            onClick={() => {
              setActiveMode('phone');
              setInputValue('');
              setPhoneResult(null);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeMode === 'phone'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Phone className="w-4 h-4" />
            Check Phone / Robocall
          </button>
        </div>

        {/* INPUT BOX */}
        <div className="relative">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                {activeMode === 'link' ? <Search className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
                placeholder={
                  activeMode === 'link'
                    ? 'Paste URL to analyze (e.g. http://shopee-nhanqua-tri-an.xyz)...'
                    : 'Enter suspicious number (e.g. 0248889999 or +224...)...'
                }
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-black/50 border-2 border-white/10 focus:border-orange-500 focus:bg-black/80 focus:outline-none text-white font-semibold text-sm sm:text-base placeholder:text-gray-500 transition-all"
              />
            </div>
            <button
              onClick={() => handleScan()}
              disabled={!inputValue.trim()}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 text-white font-black text-sm sm:text-base tracking-wide shadow-lg shadow-orange-500/20 transition-all active:scale-98 flex items-center justify-center gap-2 flex-shrink-0 cursor-pointer"
            >
              <Search className="w-5 h-5" />
              SCAN NOW
            </button>
          </div>
        </div>

        {/* QUICK TEST SAMPLES */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <p className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-1.5">
            <span>⚡ Instant quick test scenarios:</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_QUICK_TESTS.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickTest(sample)}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-orange-200 font-semibold transition-all active:scale-95 text-left cursor-pointer"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ANALYSIS RESULT PRESENTATION */}
      <AnimatePresence mode="wait">
        {linkResult && (
          <motion.div
            key={linkResult.rawInput}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="bg-[#15122D] rounded-3xl p-6 sm:p-8 border-2 border-orange-500/30 shadow-2xl space-y-6"
          >
            {/* TOP SCAN RESULT BAR */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    linkResult.riskLevel === 'safe'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : linkResult.riskLevel === 'suspicious'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}
                >
                  {linkResult.riskLevel === 'safe' ? (
                    <ShieldCheck className="w-8 h-8" />
                  ) : linkResult.riskLevel === 'suspicious' ? (
                    <AlertTriangle className="w-8 h-8" />
                  ) : (
                    <XCircle className="w-8 h-8" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-bold tracking-widest text-gray-400">
                      🔍 Threat Verdict
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-black ${
                        linkResult.riskLevel === 'safe'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : linkResult.riskLevel === 'suspicious'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {linkResult.riskLevel === 'safe'
                        ? '🟢 Safe Link'
                        : linkResult.riskLevel === 'suspicious'
                        ? '🟡 Suspicious'
                        : '🔴 Malicious Trap'}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-white mt-0.5">
                    {linkResult.verdictTitle}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5 truncate max-w-md sm:max-w-lg font-mono">
                    {linkResult.normalizedUrl}
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS: "SHOW ME WHY" & REPORT */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowWhyModal(true)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-200 border border-orange-500/40 text-xs font-black shadow-xs transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  SHOW ME WHY
                </button>
                <button
                  onClick={handleReport}
                  disabled={reportedSuccessfully}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all disabled:opacity-60 cursor-pointer"
                >
                  <Flag className="w-4 h-4" />
                  {reportedSuccessfully ? 'Reported ✓' : `Flag Fraud (${linkResult.communityReportCount})`}
                </button>
              </div>
            </div>

            {/* STRUCTURED BREAKDOWN CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* URL Structure */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Domain Structure
                </span>
                <span className="text-xs font-black text-white mt-1 block truncate">
                  {linkResult.domain}
                </span>
                <span className="text-[10px] text-gray-500">
                  {linkResult.path || '/ (root)'}
                </span>
              </div>

              {/* Domain & TLD */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Top-Level Domain
                </span>
                <span className="text-xs font-black text-white mt-1 block">
                  {linkResult.tld || '.com'}
                </span>
                <span
                  className={`text-[10px] font-semibold ${
                    linkResult.flags.some((f) => f.category === 'suspicious_tld')
                      ? 'text-rose-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {linkResult.flags.some((f) => f.category === 'suspicious_tld')
                    ? 'Disposable / High-Risk TLD'
                    : 'Standard Registry TLD'}
                </span>
              </div>

              {/* HTTPS */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  SSL / HTTPS Security
                </span>
                <span className="text-xs font-black text-white mt-1 block">
                  {linkResult.hasHttps ? 'HTTPS (Encrypted)' : 'HTTP (Plaintext Insecure)'}
                </span>
                <span
                  className={`text-[10px] font-semibold ${
                    linkResult.hasHttps ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {linkResult.hasHttps ? 'Valid Certificate' : 'Missing SSL Encryption'}
                </span>
              </div>

              {/* Brand Impersonation */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Brand Impersonation
                </span>
                <span className="text-xs font-black text-white mt-1 block truncate">
                  {linkResult.impersonatedBrand || 'None Identified'}
                </span>
                <span
                  className={`text-[10px] font-semibold ${
                    linkResult.impersonatedBrand ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {linkResult.impersonatedBrand ? 'Malicious Impersonation' : 'Independent Entity'}
                </span>
              </div>
            </div>

            {/* SUMMARY & FLAGS DETECTED */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm font-black text-orange-300">
                  ⚠️ {linkResult.flags.length} Forensics Flag(s) Identified:
                </p>
                <span className="text-xs text-gray-400 font-semibold">
                  Threat Severity: {linkResult.riskScore}/100
                </span>
              </div>

              <div className="space-y-2">
                {linkResult.flags.map((flag) => (
                  <div
                    key={flag.id}
                    className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-start gap-2.5 text-xs text-left"
                  >
                    <div className="p-1 rounded bg-rose-500/20 text-rose-400 mt-0.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="font-bold text-white block">{flag.title}</span>
                      <p className="text-gray-300 mt-0.5">{flag.description}</p>
                      <p className="text-orange-300 text-[11px] font-medium mt-1">
                        💡 <em>{flag.explanation}</em>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/10 flex items-start gap-2 text-xs font-semibold text-gray-200">
                <Info className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Chief Investigator Advisory:</strong> {linkResult.recommendation}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {phoneResult && (
          <motion.div
            key={phoneResult.rawInput}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="bg-[#15122D] rounded-3xl p-6 sm:p-8 border-2 border-orange-500/30 shadow-2xl space-y-6"
          >
            {/* TOP CALL VERDICT */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    phoneResult.riskLevel === 'safe'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : phoneResult.riskLevel === 'suspicious'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}
                >
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase font-bold tracking-widest text-gray-400">
                      📞 Call Forensics
                    </span>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-black ${
                        phoneResult.riskLevel === 'safe'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : phoneResult.riskLevel === 'suspicious'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {phoneResult.riskLevel === 'safe'
                        ? '🟢 Clean Record'
                        : phoneResult.riskLevel === 'suspicious'
                        ? '🟡 Unverified Telemarketing'
                        : '🔴 Malicious Fraud / Spam'}
                    </span>
                  </div>
                  <h2 className="text-xl font-black text-white mt-0.5">
                    {phoneResult.verdictTitle}
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Caller ID: <strong className="text-orange-300 font-mono">{phoneResult.normalizedPhone}</strong> — Classification: {phoneResult.carrierOrType}
                  </p>
                </div>
              </div>

              {/* REPORT BUTTON */}
              <button
                onClick={handleReport}
                disabled={reportedSuccessfully}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all disabled:opacity-60 cursor-pointer"
              >
                <Flag className="w-4 h-4" />
                {reportedSuccessfully ? 'Reported ✓' : `Flag Fraud (${phoneResult.communityReportCount})`}
              </button>
            </div>

            {/* RECENT USER COMMUNITY REPORTS */}
            {phoneResult.recentReports.length > 0 && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl">
                <span className="text-xs font-bold text-rose-300 block mb-2">
                  📢 Recent Citizen Incident Reports:
                </span>
                <ul className="space-y-1.5 text-xs text-rose-200">
                  {phoneResult.recentReports.map((report, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400">•</span>
                      <span>{report}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ADVICE */}
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-xs text-gray-200 font-medium leading-relaxed">
              <strong className="text-orange-300">Safety Recommendation:</strong> {phoneResult.recommendation}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* "SHOW ME WHY" INTERACTIVE HIGHLIGHT MODAL */}
      <AnimatePresence>
        {showWhyModal && linkResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A081D]/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#15122D] rounded-3xl p-6 sm:p-8 max-w-2xl w-full border-2 border-orange-500/40 shadow-2xl space-y-6 text-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-500/20 rounded-xl text-orange-400 border border-orange-500/30">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">
                      👀 Show Me Why: Detailed URL Breakdown
                    </h3>
                    <p className="text-xs text-gray-400">
                      Why did the heuristic engine flag this web address?
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowWhyModal(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* URL HIGHLIGHT STRIP */}
              <div className="p-4 rounded-2xl bg-black/60 text-white font-mono text-sm sm:text-base break-all leading-relaxed shadow-inner border border-white/10">
                {linkResult.highlightSegments.map((seg, i) => (
                  <span
                    key={i}
                    className={`inline-block px-1.5 py-0.5 rounded transition-all ${
                      seg.isSuspicious
                        ? 'bg-rose-500 text-white font-bold border-b-2 border-rose-300 animate-pulse'
                        : 'text-emerald-400'
                    }`}
                    title={seg.reason || 'Standard syntax'}
                  >
                    {seg.text}
                  </span>
                ))}
              </div>

              {/* EXPLANATIONS LIST */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-orange-300 uppercase tracking-wider">
                  Illuminated Phishing Signatures:
                </h4>
                {linkResult.flags.map((flag) => (
                  <div key={flag.id} className="p-3 bg-black/40 rounded-xl border border-white/10 text-xs">
                    <div className="flex items-center gap-2 font-bold text-white">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      {flag.title}
                    </div>
                    <p className="text-gray-300 mt-1 pl-4">{flag.explanation}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowWhyModal(false)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs hover:from-orange-600 hover:to-amber-600 transition-all cursor-pointer"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER HELPER WITH MASCOT */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-orange-500/10 via-[#1C183B] to-amber-500/10 rounded-3xl border border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <KienSangMascot
            size="sm"
          />
        </div>
        <div className="text-xs text-orange-300/80 font-semibold text-center sm:text-right">
          💡 Tip: Maintain a 10-day streak to deploy the FPT Orange Ant sidekick across your investigations!
        </div>
      </div>
    </div>
  );
};

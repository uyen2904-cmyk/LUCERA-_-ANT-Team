import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Lightbulb, ExternalLink, X } from 'lucide-react';
import { MASCOT_IMAGES } from '../assets/mascots';
import { useLanguage } from '../context/LanguageContext';

interface KienSangMascotProps {
  size?: 'sm' | 'md' | 'lg';
  speechText?: string | null;
  onHintClick?: () => void;
  showHintButton?: boolean;
}

export const KienSangMascot: React.FC<KienSangMascotProps> = ({
  size = 'md',
  speechText,
  onHintClick,
  showHintButton = false
}) => {
  const { isVi } = useLanguage();
  const [showPhotoModal, setShowPhotoModal] = useState(false);

  const sizeMap = {
    sm: { box: 'w-12 h-12', svg: 48 },
    md: { box: 'w-20 h-20', svg: 76 },
    lg: { box: 'w-28 h-28', svg: 108 }
  };

  const handleMascotClick = () => {
    if (onHintClick) {
      onHintClick();
    } else {
      setShowPhotoModal(true);
    }
  };

  return (
    <div className="relative inline-flex items-center gap-3">
      <motion.div
        animate={{
          y: [-4, 4, -4],
          rotate: [-2, 2, -2]
        }}
        transition={{
          repeat: Infinity,
          duration: 2.8,
          ease: 'easeInOut'
        }}
        className={`relative ${sizeMap[size].box} flex-shrink-0 cursor-pointer select-none group`}
        onClick={handleMascotClick}
        title={isVi ? "Bạn Kiến Sáng - Linh vật màu cam FPT Schools đại diện cho trí tuệ & sáng tạo! (Click để xem)" : "Kien Sang - Orange FPT Schools mascot representing wisdom & creativity! (Click to view)"}
      >
        {/* Glowing Orange-Gold Halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/50 via-orange-500/40 to-yellow-300/40 blur-md group-hover:blur-xl group-hover:scale-110 transition-all duration-300" />

        {/* FPT Ant SVG Character with Signature Orange */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full relative z-10 drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* FPT Orange Gradient */}
            <radialGradient id="fptOrangeHead" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#FFA447" />
              <stop offset="65%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#E35500" />
            </radialGradient>
            <radialGradient id="fptOrangeBody" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FF8526" />
              <stop offset="70%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#D94800" />
            </radialGradient>
            {/* Glowing Bulb Gradient for "Sáng" */}
            <radialGradient id="glowingBulb" cx="35%" cy="35%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#FEF08A" />
              <stop offset="85%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>
          </defs>

          {/* Glowing Antennae with Lightbulbs ("Kiến Sáng") */}
          {/* Left Antenna */}
          <path
            d="M40 28 C 34 16, 26 12, 20 16"
            stroke="#D94800"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Left Bulb Glow */}
          <circle cx="19" cy="16" r="8" fill="#FBBF24" opacity="0.35" className="animate-ping" />
          <circle cx="19" cy="16" r="5.5" fill="url(#glowingBulb)" />
          <circle cx="18" cy="14.5" r="2" fill="#FFFFFF" />

          {/* Right Antenna */}
          <path
            d="M60 28 C 66 16, 74 12, 80 16"
            stroke="#D94800"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Right Bulb Glow */}
          <circle cx="81" cy="16" r="8" fill="#FBBF24" opacity="0.35" className="animate-ping" />
          <circle cx="81" cy="16" r="5.5" fill="url(#glowingBulb)" />
          <circle cx="80" cy="14.5" r="2" fill="#FFFFFF" />

          {/* Abdomen (Back section - Round, Cute, Shiny Orange) */}
          <ellipse cx="50" cy="74" rx="20" ry="16" fill="url(#fptOrangeBody)" />
          <ellipse cx="50" cy="71" rx="15" ry="10" fill="#FFA447" opacity="0.6" />
          {/* Cute ant stripes */}
          <path d="M37 72 Q 50 78 63 72" stroke="#B83A00" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M40 78 Q 50 83 60 78" stroke="#B83A00" strokeWidth="1.8" strokeLinecap="round" />

          {/* Thorax (Middle) */}
          <ellipse cx="50" cy="54" rx="14" ry="11" fill="#E35500" />
          <ellipse cx="50" cy="53" rx="11" ry="8" fill="#FF8526" />

          {/* Cute Little Legs */}
          <path d="M38 53 C 27 51, 20 59, 14 67" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />
          <path d="M62 53 C 73 51, 80 59, 86 67" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />
          <path d="M36 59 C 25 64, 21 73, 18 82" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />
          <path d="M64 59 C 75 64, 79 73, 82 82" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />

          {/* Head (Big, Round, Friendly) */}
          <ellipse cx="50" cy="35" rx="18" ry="16" fill="url(#fptOrangeHead)" />
          {/* Head light reflection highlight */}
          <ellipse cx="44" cy="27" rx="8" ry="4" fill="#FFFFFF" opacity="0.3" transform="rotate(-15 44 27)" />

          {/* Sparkling Big Eyes */}
          {/* Left Eye */}
          <ellipse cx="42" cy="34" rx="5" ry="6.5" fill="#18181B" />
          <circle cx="40.5" cy="32" r="2.2" fill="#FFFFFF" />
          <circle cx="44" cy="35.5" r="1.1" fill="#FFFFFF" />
          <ellipse cx="43" cy="37.5" rx="2.5" ry="1.2" fill="#F97316" opacity="0.6" />

          {/* Right Eye */}
          <ellipse cx="58" cy="34" rx="5" ry="6.5" fill="#18181B" />
          <circle cx="56.5" cy="32" r="2.2" fill="#FFFFFF" />
          <circle cx="60" cy="35.5" r="1.1" fill="#FFFFFF" />
          <ellipse cx="57" cy="37.5" rx="2.5" ry="1.2" fill="#F97316" opacity="0.6" />

          {/* Cute Cheerful Smile */}
          <path d="M46 42 Q 50 46 54 42" stroke="#9A3412" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <circle cx="50" cy="44" r="1.5" fill="#EF4444" opacity="0.7" />

          {/* Rosy Cheeks */}
          <circle cx="35" cy="38" r="3.2" fill="#F43F5E" opacity="0.55" />
          <circle cx="65" cy="38" r="3.2" fill="#F43F5E" opacity="0.55" />

          {/* Smart FPT Collar & Tie (Blue & White) */}
          <path d="M44 48 L 50 51 L 56 48 L 50 49 Z" fill="#FFFFFF" />
          {/* Blue Tie */}
          <path d="M49 50 L 51 50 L 52 56 L 50 59 L 48 56 Z" fill="#2563EB" />
        </svg>

        {/* Floating Sparkles Badge */}
        <motion.div
          animate={{ scale: [0.9, 1.25, 0.9], rotate: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full p-1 shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>

      {/* Speech bubble if provided */}
      {speechText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className="relative max-w-sm bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100/70 border-2 border-orange-300 rounded-2xl p-3 shadow-md text-xs sm:text-sm text-gray-800 leading-relaxed"
        >
          {/* Speech Arrow */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-3 h-3 bg-orange-50 border-l-2 border-b-2 border-orange-300 rotate-45" />
          <div className="flex items-start gap-2">
            <div className="p-1 rounded-full bg-orange-500 text-white flex-shrink-0 mt-0.5">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="font-extrabold text-orange-700 text-[11px] uppercase tracking-wider">
                  {isVi ? 'Gợi Ý Phân Tích' : 'Detective Clue'}
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              </div>
              <p className="text-gray-800 font-medium">{speechText}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Optional Hint Button */}
      {showHintButton && onHintClick && !speechText && (
        <button
          onClick={onHintClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          {isVi ? 'Hỏi Kiến Sáng' : 'Ask Kien Sang'}
        </button>
      )}

      {/* Modal displaying the 3D Render of Kiến Sáng FPT */}
      <AnimatePresence>
        {showPhotoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-orange-400"
            >
              <button
                onClick={() => setShowPhotoModal(false)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-square w-full bg-gradient-to-br from-orange-100 via-amber-50 to-orange-200">
                <img
                  src={MASCOT_IMAGES.kienSangFpt}
                  alt="Linh vật Kiến Sáng FPT màu cam"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-orange-950/80 via-orange-900/40 to-transparent p-4 text-white">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-500 text-[11px] font-bold uppercase tracking-wider">
                    {isVi ? 'Linh Vật FPT Schools' : 'FPT Schools Mascot'}
                  </span>
                  <h3 className="text-xl font-extrabold mt-1">{isVi ? 'Kiến Sáng 🐜' : 'Kien Sang 🐜'}</h3>
                  <p className="text-xs text-orange-100 mt-0.5 leading-snug">
                    {isVi
                      ? 'Sắc cam FPT rực rỡ tượng trưng cho sự đoàn kết, kiên trì và hai chiếc râu phát sáng biểu tượng cho ngọn đèn tri thức & sáng tạo không ngừng!'
                      : 'Bright FPT orange symbolizes solidarity, perseverance, and two luminous antennae representing knowledge & endless innovation!'}
                  </p>
                </div>
              </div>

              <div className="p-4 text-center bg-orange-50">
                <p className="text-xs text-orange-800 font-medium">
                  {isVi
                    ? 'Kiến Sáng sẽ luôn đồng hành chỉ điểm mấu chốt lừa đảo trong mọi thử thách!'
                    : 'Kien Sang accompanies you to pinpoint scam red flags in every challenge!'}
                </p>
                <button
                  onClick={() => setShowPhotoModal(false)}
                  className="mt-3 w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  {isVi ? 'Đồng Ý, Cùng Phá Án!' : 'Got It, Let\'s Solve Cases!'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KienSangMascot } from './KienSangMascot';
import { Sparkles, X, Shield, Heart, Sparkle, Trophy } from 'lucide-react';

export interface RobloxAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  equipped?: {
    hat: string;
    glasses: string;
    outfit: string;
    hand: string;
    skin?: string;
  };
  showCompanion?: boolean;
  companionSpeech?: string | null;
  interactive?: boolean;
  className?: string;
  faceType?: 'winning_smile' | 'chill' | 'check_it' | 'detective' | 'gamer';
  pose?: 'standing' | 'holding' | 'salute' | 'celebrate';
}

export const RobloxAvatar: React.FC<RobloxAvatarProps> = ({
  size = 'md',
  equipped = {
    hat: 'hat-detective',
    glasses: 'glasses-none',
    outfit: 'outfit-fpt-hoodie',
    hand: 'hand-magnifier',
    skin: 'skin-orange-fpt'
  },
  showCompanion = true,
  companionSpeech = null,
  interactive = true,
  className = '',
  faceType = 'winning_smile',
  pose = 'standing'
}) => {
  const [showModal, setShowModal] = useState(false);

  const sizeConfig = {
    sm: { width: 76, height: 96, scale: 0.75 },
    md: { width: 130, height: 160, scale: 1 },
    lg: { width: 180, height: 220, scale: 1.35 },
    xl: { width: 240, height: 295, scale: 1.8 }
  };

  // Determine skin tone (Classic Roblox yellow or custom skin)
  let headColor = '#F5CD2F'; // Classic Roblox Noob Bright Yellow
  let headShade = '#D8A91C';
  let armColor = '#F5CD2F';
  let armShade = '#D8A91C';

  if (equipped.skin === 'skin-orange-fpt') {
    headColor = '#FF7A00';
    headShade = '#D85D00';
    armColor = '#FF7A00';
    armShade = '#D85D00';
  } else if (equipped.skin === 'skin-cyber-cyan' || equipped.skin === 'neon-blue') {
    headColor = '#06B6D4';
    headShade = '#0891B2';
    armColor = '#06B6D4';
    armShade = '#0891B2';
  } else if (equipped.skin === 'skin-sakura-pink') {
    headColor = '#F472B6';
    headShade = '#DB2777';
    armColor = '#F472B6';
    armShade = '#DB2777';
  } else if (equipped.skin === 'skin-anime-natural') {
    headColor = '#FED7AA';
    headShade = '#FDBA74';
    armColor = '#FED7AA';
    armShade = '#FDBA74';
  } else if (equipped.skin === 'skin-gold-sun') {
    headColor = '#FBBF24';
    headShade = '#D97706';
    armColor = '#FBBF24';
    armShade = '#D97706';
  }

  return (
    <div className={`relative inline-flex items-end justify-center select-none ${className}`}>
      {/* 3D Roblox Avatar SVG */}
      <motion.div
        animate={interactive ? {
          y: [-2, 2, -2],
        } : undefined}
        transition={{
          repeat: Infinity,
          duration: 2.8,
          ease: 'easeInOut'
        }}
        style={{ width: sizeConfig[size].width, height: sizeConfig[size].height }}
        className="relative group cursor-pointer"
        onClick={() => {
          if (interactive && size !== 'sm') {
            setShowModal(true);
          }
        }}
        title="Nhân vật Roblox Thám Tử Lucera - Bấm để chiêm ngưỡng & xem thông số!"
      >
        {/* Glowing cyber aura on hover */}
        <div className="absolute inset-0 rounded-2xl blur-xl bg-orange-500/20 group-hover:bg-orange-500/40 transition-all opacity-70" />

        <svg
          viewBox="0 0 130 160"
          className="w-full h-full drop-shadow-2xl relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Roblox Stud Pattern */}
            <radialGradient id="studGrad" cx="45%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#000000" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
            </radialGradient>

            {/* Torso Gradients */}
            <linearGradient id="fptRobloxTorso" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFA447" />
              <stop offset="50%" stopColor="#FF6B00" />
              <stop offset="100%" stopColor="#CC4E00" />
            </linearGradient>

            <linearGradient id="detectiveCoatTorso" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D9B382" />
              <stop offset="100%" stopColor="#A3784A" />
            </linearGradient>

            <linearGradient id="cyberSuitTorso" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="60%" stopColor="#312E81" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>

            <linearGradient id="classicNoobTorso" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0099FF" />
              <stop offset="100%" stopColor="#0066CC" />
            </linearGradient>

            <linearGradient id="bloxyAwardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF275" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
          </defs>

          {/* === GROUND SHADOW === */}
          <ellipse cx="65" cy="154" rx="42" ry="6" fill="#0F172A" opacity="0.25" />

          {/* === ROBLOX BLOCKY LEGS (Left: 42-60, Right: 64-82) === */}
          <g id="roblox-legs">
            {/* Left Leg */}
            <rect x="42" y="104" width="20" height="46" rx="2" fill="#1E293B" />
            {/* Leg inner bevel/shadow */}
            <rect x="42" y="104" width="3" height="46" fill="#0F172A" opacity="0.3" />
            {/* Left Shoe sole */}
            <rect x="41" y="146" width="22" height="5" rx="1.5" fill="#FF6B00" />
            <rect x="43" y="147" width="18" height="2" fill="#FFFFFF" opacity="0.6" />

            {/* Right Leg */}
            <rect x="65" y="104" width="20" height="46" rx="2" fill="#1E293B" />
            {/* Leg inner highlight */}
            <rect x="82" y="104" width="3" height="46" fill="#FFFFFF" opacity="0.15" />
            {/* Right Shoe sole */}
            <rect x="64" y="146" width="22" height="5" rx="1.5" fill="#FF6B00" />
            <rect x="66" y="147" width="18" height="2" fill="#FFFFFF" opacity="0.6" />

            {/* Trouser Cuff Line */}
            <line x1="42" y1="140" x2="62" y2="140" stroke="#334155" strokeWidth="1.5" />
            <line x1="65" y1="140" x2="85" y2="140" stroke="#334155" strokeWidth="1.5" />
          </g>

          {/* === ROBLOX BLOCKY TORSO (36 to 91, height: 50) === */}
          <g id="roblox-torso">
            {/* Classic Noob Outfit */}
            {equipped.outfit === 'outfit-classic' && (
              <>
                <rect x="36" y="56" width="55" height="50" rx="2" fill="url(#classicNoobTorso)" />
                {/* Torso Top Stud Highlights */}
                <rect x="36" y="56" width="55" height="4" fill="#FFFFFF" opacity="0.2" />
                <rect x="36" y="56" width="4" height="50" fill="#000000" opacity="0.2" />
                {/* Classic Roblox Logo / Badge */}
                <rect x="58" y="74" width="12" height="12" rx="2.5" fill="#FFFFFF" transform="rotate(45 64 80)" />
                <rect x="61" y="77" width="6" height="6" rx="1" fill="#0066CC" transform="rotate(45 64 80)" />
              </>
            )}

            {/* FPT Orange & Navy Cyber Detective Suit */}
            {(equipped.outfit === 'outfit-fpt-hoodie' || equipped.outfit === 'outfit-fpt-jacket' || !['outfit-classic', 'outfit-detective-coat', 'outfit-cyber-suit', 'outfit-harajuku-hoodie', 'outfit-academy-uniform'].includes(equipped.outfit)) && (
              <>
                {/* Main Vest / Jacket */}
                <rect x="36" y="56" width="55" height="50" rx="2" fill="url(#fptRobloxTorso)" />
                {/* Bevel lighting */}
                <rect x="36" y="56" width="55" height="4" fill="#FFFFFF" opacity="0.25" />
                <rect x="36" y="56" width="4" height="50" fill="#000000" opacity="0.25" />

                {/* Navy Blue Side Panels */}
                <rect x="36" y="66" width="10" height="40" fill="#1E3A8A" />
                <rect x="81" y="66" width="10" height="40" fill="#1E3A8A" />

                {/* Crisp White Shirt Collar underneath */}
                <polygon points="56,56 63.5,69 71,56" fill="#FFFFFF" />
                {/* Royal Blue Necktie */}
                <polygon points="61,64 66,64 67,82 63.5,86 60,82" fill="#1E3A8A" />
                <circle cx="63.5" cy="65" r="1.5" fill="#3B82F6" />

                {/* Center Metal Zipper */}
                <line x1="63.5" y1="87" x2="63.5" y2="105" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="3 1" />

                {/* Golden Shield Detective Badge on Chest */}
                <polygon points="48,70 53,68 57,70 57,76 53,79 48,76" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
                <polygon points="50,72 53,70 55,72 55,75 53,77 50,75" fill="#FFA500" />
                <circle cx="52.5" cy="73.5" r="1" fill="#FFFFFF" />

                {/* Belt buckle */}
                <rect x="36" y="102" width="55" height="4" fill="#0F172A" />
                <rect x="58" y="100" width="11" height="6" rx="1" fill="#FFD700" />
              </>
            )}

            {/* Detective Trench Coat */}
            {equipped.outfit === 'outfit-detective-coat' && (
              <>
                <rect x="35" y="56" width="57" height="52" rx="2" fill="url(#detectiveCoatGrad)" />
                <rect x="35" y="56" width="57" height="4" fill="#FFFFFF" opacity="0.25" />
                <polygon points="55,56 63.5,70 72,56" fill="#FFFFFF" />
                <polygon points="61,64 66,64 67,82 63.5,86 60,82" fill="#DC2626" />
                {/* Double Breasted Buttons */}
                <circle cx="49" cy="76" r="2.5" fill="#3E2723" />
                <circle cx="49" cy="88" r="2.5" fill="#3E2723" />
                <circle cx="78" cy="76" r="2.5" fill="#3E2723" />
                <circle cx="78" cy="88" r="2.5" fill="#3E2723" />
                {/* Belt */}
                <rect x="35" y="96" width="57" height="6" fill="#795548" />
                <rect x="59" y="94" width="9" height="10" rx="1.5" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
              </>
            )}

            {/* Cyber Suit */}
            {equipped.outfit === 'outfit-cyber-suit' && (
              <>
                <rect x="36" y="56" width="55" height="50" rx="2" fill="url(#cyberSuitTorso)" />
                <rect x="36" y="56" width="55" height="4" fill="#67E8F9" opacity="0.4" />
                {/* Circuit lines */}
                <path d="M42 62 L 54 78 L 42 96" stroke="#22D3EE" strokeWidth="2" fill="none" />
                <path d="M85 62 L 73 78 L 85 96" stroke="#22D3EE" strokeWidth="2" fill="none" />
                {/* Glowing Core */}
                <circle cx="63.5" cy="78" r="7" fill="#0891B2" stroke="#22D3EE" strokeWidth="2" />
                <circle cx="63.5" cy="78" r="3" fill="#FFFFFF" className="animate-pulse" />
              </>
            )}

            {/* Academy Uniform */}
            {equipped.outfit === 'outfit-academy-uniform' && (
              <>
                <rect x="36" y="56" width="55" height="50" rx="2" fill="#1E293B" />
                <polygon points="54,56 63.5,72 73,56" fill="#FFFFFF" />
                <polygon points="61,64 66,64 67,80 63.5,84 60,80" fill="#E11D48" />
                <circle cx="48" cy="72" r="3" fill="#FBBF24" />
              </>
            )}

            {/* Harajuku Hoodie */}
            {equipped.outfit === 'outfit-harajuku-hoodie' && (
              <>
                <rect x="36" y="56" width="55" height="50" rx="2" fill="#F472B6" />
                <rect x="36" y="56" width="27" height="50" fill="#C084FC" />
                <circle cx="52" cy="78" r="5" fill="#FEF08A" />
                <circle cx="75" cy="78" r="4" fill="#67E8F9" />
              </>
            )}
          </g>

          {/* === ROBLOX ARMS (Left: 18-36, Right: 91-109) === */}
          <g id="roblox-arms">
            {/* Left Arm (Blocky Roblox arm) */}
            <rect x="18" y="57" width="18" height="46" rx="2" fill={armColor} />
            <rect x="18" y="57" width="18" height="3" fill="#FFFFFF" opacity="0.3" />
            <rect x="18" y="57" width="3" height="46" fill="#000000" opacity="0.25" />
            {/* Left Sleeve cuff if wearing jacket */}
            {equipped.outfit !== 'outfit-classic' && (
              <rect x="18" y="57" width="18" height="28" fill="#FF6B00" />
            )}
            {/* Left Roblox Hand (U-shaped block or cylinder) */}
            <circle cx="27" cy="104" r="5.5" fill={armColor} stroke={armShade} strokeWidth="1" />

            {/* Right Arm */}
            <rect x="91" y="57" width="18" height="46" rx="2" fill={armColor} />
            <rect x="91" y="57" width="18" height="3" fill="#FFFFFF" opacity="0.3" />
            <rect x="106" y="57" width="3" height="46" fill="#000000" opacity="0.25" />
            {/* Right Sleeve cuff */}
            {equipped.outfit !== 'outfit-classic' && (
              <rect x="91" y="57" width="18" height="28" fill="#FF6B00" />
            )}
            {/* Right Roblox Hand */}
            <circle cx="100" cy="104" r="5.5" fill={armColor} stroke={armShade} strokeWidth="1" />
          </g>

          {/* === ROBLOX HEAD WITH ICONIC STUD ON TOP === */}
          <g id="roblox-head">
            {/* Cylindrical Stud on Top of Head (Signature Roblox Feature) */}
            <rect x="56" y="10" width="15" height="7" rx="1.5" fill={headColor} />
            <ellipse cx="63.5" cy="10" rx="7.5" ry="2.8" fill="#FFFFFF" opacity="0.35" />
            <rect x="56" y="10" width="15" height="7" fill="url(#studGrad)" />

            {/* Main Blocky Head (Rounded rectangle: 42 to 85, width: 43, height: 41) */}
            <rect x="42" y="16" width="43" height="41" rx="5" fill={headColor} />
            {/* Head 3D Bevel Lighting */}
            <rect x="42" y="16" width="43" height="3.5" rx="2" fill="#FFFFFF" opacity="0.35" />
            <rect x="42" y="16" width="3.5" height="41" rx="2" fill="#000000" opacity="0.18" />
            <rect x="81.5" y="16" width="3.5" height="41" rx="2" fill="#FFFFFF" opacity="0.18" />

            {/* Neck join */}
            <rect x="57" y="54" width="13" height="3" fill={headShade} />

            {/* === ROBLOX FACES === */}
            {/* Winning Smile / Smart Detective Face */}
            <g id="roblox-face-features">
              {/* Left Eye */}
              <circle cx="54" cy="33" r="3.6" fill="#0F172A" />
              <circle cx="53" cy="31.8" r="1.2" fill="#FFFFFF" />
              <circle cx="55.2" cy="33.8" r="0.6" fill="#FFFFFF" />

              {/* Right Eye */}
              <circle cx="73" cy="33" r="3.6" fill="#0F172A" />
              <circle cx="72" cy="31.8" r="1.2" fill="#FFFFFF" />
              <circle cx="74.2" cy="33.8" r="0.6" fill="#FFFFFF" />

              {/* Winning Smile / Friendly Grin with Teeth */}
              <path
                d="M53 40 Q 63.5 49 74 40 Z"
                fill="#FFFFFF"
                stroke="#0F172A"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <line x1="56" y1="41" x2="71" y2="41" stroke="#E2E8F0" strokeWidth="1" />

              {/* Cute Cheek Blush (Rosy Roblox Kid) */}
              <ellipse cx="48" cy="39" rx="3.5" ry="2" fill="#F43F5E" opacity="0.45" />
              <ellipse cx="79" cy="39" rx="3.5" ry="2" fill="#F43F5E" opacity="0.45" />
            </g>
          </g>

          {/* === GLASSES / VISORS === */}
          <g id="roblox-glasses">
            {/* AR Hologram Scanner Visor */}
            {equipped.glasses === 'glasses-ar-scanner' && (
              <g>
                <rect x="44" y="27" width="39" height="12" rx="2" fill="#06B6D4" opacity="0.75" stroke="#22D3EE" strokeWidth="1.5" />
                <line x1="47" y1="33" x2="80" y2="33" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 2" />
                <circle cx="54" cy="33" r="2.5" stroke="#FFFFFF" strokeWidth="1" fill="none" />
              </g>
            )}

            {/* Detective Monocle */}
            {equipped.glasses === 'glasses-monocle' && (
              <g>
                <circle cx="54" cy="33" r="7.5" stroke="#F59E0B" strokeWidth="2" fill="#38BDF8" fillOpacity="0.3" />
                <path d="M48 37 Q 44 46 48 54" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
              </g>
            )}

            {/* Classic Round Glasses */}
            {equipped.glasses === 'glasses-round' && (
              <g>
                <circle cx="54" cy="33" r="6.5" stroke="#1E293B" strokeWidth="1.8" fill="none" />
                <circle cx="73" cy="33" r="6.5" stroke="#1E293B" strokeWidth="1.8" fill="none" />
                <line x1="60.5" y1="33" x2="66.5" y2="33" stroke="#1E293B" strokeWidth="2" />
              </g>
            )}

            {/* Neon Cool Shades */}
            {equipped.glasses === 'glasses-neon-shades' && (
              <g>
                <polygon points="45,29 61,29 59,38 47,38" fill="#0F172A" stroke="#06B6D4" strokeWidth="1.5" />
                <polygon points="66,29 82,29 80,38 68,38" fill="#0F172A" stroke="#06B6D4" strokeWidth="1.5" />
                <line x1="61" y1="31" x2="66" y2="31" stroke="#06B6D4" strokeWidth="2" />
              </g>
            )}
          </g>

          {/* === HATS & ROBLOX HEADWEAR === */}
          <g id="roblox-hat">
            {/* Detective Fedora Hat */}
            {equipped.hat === 'hat-detective' && (
              <g>
                {/* Wide Brim */}
                <ellipse cx="63.5" cy="18" rx="28" ry="9" fill="#B48A64" stroke="#8D623C" strokeWidth="1" />
                {/* Crown of Fedora */}
                <path d="M45 18 C 45 6, 52 4, 63.5 5 C 75 4, 82 6, 82 18 Z" fill="#936842" />
                <path d="M47 17 Q 63.5 21 80 17 L 81 20 Q 63.5 24 46 20 Z" fill="#FF6B00" />
                <circle cx="63.5" cy="8" r="2.5" fill="#FFD700" />
              </g>
            )}

            {/* Classic Red Roblox Snapback Cap */}
            {equipped.hat === 'hat-cyber-cap' && (
              <g>
                <path d="M45 17 C 45 8, 54 6, 63.5 6 C 73 6, 82 8, 82 17 Z" fill="#E11D48" />
                <rect x="44" y="16" width="39" height="5" rx="1.5" fill="#BE123C" />
                {/* Visor pointing right */}
                <polygon points="80,18 97,16 95,21 80,20" fill="#1E293B" />
                <rect x="58" y="10" width="11" height="5" rx="1" fill="#FFFFFF" />
                <text x="60" y="14" fontSize="4" fontWeight="bold" fill="#E11D48">ROBLOX</text>
              </g>
            )}

            {/* Cyber Cat Ear Headset */}
            {equipped.hat === 'hat-cat-headset' && (
              <g>
                <path d="M42 26 C 42 12, 85 12, 85 26" stroke="#1E1B4B" strokeWidth="4" strokeLinecap="round" fill="none" />
                <polygon points="46,16 51,4 57,14" fill="#A855F7" stroke="#7C3AED" strokeWidth="1" />
                <polygon points="48,14 51,7 55,13" fill="#F472B6" />
                <polygon points="81,16 76,4 70,14" fill="#A855F7" stroke="#7C3AED" strokeWidth="1" />
                <polygon points="79,14 76,7 72,13" fill="#F472B6" />
                <rect x="40" y="24" width="5" height="10" rx="2" fill="#06B6D4" />
                <rect x="82" y="24" width="5" height="10" rx="2" fill="#06B6D4" />
              </g>
            )}

            {/* Royal Cyber Crown */}
            {equipped.hat === 'hat-crown' && (
              <g>
                <polygon points="47,19 47,8 54,14 63.5,4 73,14 80,8 80,19" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
                <circle cx="63.5" cy="5" r="2" fill="#38BDF8" />
                <rect x="47" y="17" width="33" height="3" fill="#DAA520" />
              </g>
            )}

            {/* Wizard Hat */}
            {equipped.hat === 'hat-wizard' && (
              <g>
                <ellipse cx="63.5" cy="18" rx="29" ry="7" fill="#4C1D95" />
                <polygon points="47,17 63.5,-4 80,17" fill="#6D28D9" />
                <circle cx="63.5" cy="6" r="3" fill="#FDE047" />
              </g>
            )}
          </g>

          {/* === HAND ITEMS / GEARS === */}
          <g id="roblox-gear">
            {/* Classic Bloxy Cola */}
            {equipped.hand === 'hand-bubble-tea' && (
              <g transform="translate(98, 86)">
                {/* Red Bloxy Can */}
                <rect x="0" y="0" width="14" height="22" rx="3" fill="#DC2626" stroke="#991B1B" strokeWidth="1" />
                <rect x="2" y="2" width="10" height="4" rx="1" fill="#E5E7EB" />
                <rect x="2" y="8" width="10" height="7" rx="1" fill="#FFFFFF" />
                <text x="3" y="13" fontSize="4" fontWeight="black" fill="#DC2626">BLOXY</text>
                <ellipse cx="7" cy="2" rx="5" ry="1.5" fill="#9CA3AF" />
                {/* Sparkle Bubbles */}
                <circle cx="4" cy="-4" r="1.5" fill="#38BDF8" className="animate-ping" />
                <circle cx="10" cy="-2" r="1" fill="#38BDF8" />
              </g>
            )}

            {/* Holographic Magnifying Glass */}
            {equipped.hand === 'hand-magnifier' && (
              <g transform="translate(98, 76)">
                <line x1="0" y1="22" x2="-8" y2="34" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
                <line x1="0" y1="22" x2="-8" y2="34" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
                <circle cx="7" cy="12" r="14" stroke="#FF6B00" strokeWidth="3" fill="#38BDF8" fillOpacity="0.4" />
                <circle cx="7" cy="12" r="8" stroke="#FFFFFF" strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
                <line x1="7" y1="6" x2="7" y2="18" stroke="#FFFFFF" strokeWidth="1" />
                <line x1="1" y1="12" x2="13" y2="12" stroke="#FFFFFF" strokeWidth="1" />
                <ellipse cx="4" cy="8" rx="3" ry="1.5" fill="#FFFFFF" opacity="0.8" transform="rotate(-30 4 8)" />
              </g>
            )}

            {/* Holo Tablet Scanner */}
            {equipped.hand === 'hand-holo-pad' && (
              <g transform="translate(96, 82)">
                <rect x="0" y="0" width="22" height="28" rx="2.5" fill="#0F172A" stroke="#06B6D4" strokeWidth="1.5" />
                <rect x="2" y="2" width="18" height="24" rx="1.5" fill="#083344" />
                <circle cx="11" cy="14" r="6" stroke="#22D3EE" strokeWidth="1" fill="none" />
                <circle cx="11" cy="14" r="2" fill="#22C55E" />
                <line x1="4" y1="22" x2="18" y2="22" stroke="#67E8F9" strokeWidth="1" />
              </g>
            )}

            {/* Star Magic Wand */}
            {equipped.hand === 'hand-star-wand' && (
              <g transform="translate(98, 70)">
                <line x1="0" y1="36" x2="8" y2="6" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
                <polygon points="8,0 11,5 17,6 12,11 14,17 8,13 2,17 4,11 -1,6 5,5" fill="#FBBF24" />
                <circle cx="8" cy="8" r="2" fill="#FFFFFF" />
              </g>
            )}

            {/* Cyber Shield */}
            {equipped.hand === 'hand-shield' && (
              <g transform="translate(92, 80)">
                <polygon points="12,0 24,6 24,18 12,26 0,18 0,6" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
                <polygon points="12,4 20,8 20,16 12,22 4,16 4,8" fill="#38BDF8" opacity="0.6" />
                <line x1="12" y1="8" x2="12" y2="18" stroke="#FFFFFF" strokeWidth="1.5" />
              </g>
            )}

            {/* Golden Bloxy Award */}
            {equipped.hand === 'hand-badge' && (
              <g transform="translate(96, 78)">
                {/* Trophy Base */}
                <rect x="2" y="24" width="16" height="5" rx="1" fill="#78350F" />
                <rect x="5" y="19" width="10" height="5" fill="url(#bloxyAwardGrad)" />
                {/* Golden Blocky Figure */}
                <rect x="7" y="6" width="6" height="12" rx="1" fill="url(#bloxyAwardGrad)" stroke="#B8860B" strokeWidth="0.8" />
                <rect x="8" y="2" width="4" height="4" rx="0.5" fill="url(#bloxyAwardGrad)" />
                <circle cx="10" cy="1" r="1" fill="#FFD700" />
                {/* Shine Sparkle */}
                <polygon points="15,4 17,6 15,8 13,6" fill="#FFFFFF" />
              </g>
            )}
          </g>

          {/* Floating Holo Spark */}
          <circle cx="28" cy="46" r="2" fill="#FF7A00" opacity="0.8" className="animate-ping" />
        </svg>

        {/* ROBLOX Badge pill */}
        <div className="absolute top-1 left-1 bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-md shadow-md flex items-center gap-1 border border-white/30">
          <span className="w-1.5 h-1.5 rounded-xs bg-white inline-block transform rotate-45" />
          <span>ROBLOX</span>
        </div>
      </motion.div>

      {/* Floating Kien Sang FPT Companion Mascot */}
      {showCompanion && (
        <div className="absolute -top-3 -right-10 z-20">
          <KienSangMascot
            size={size === 'sm' ? 'sm' : size === 'xl' ? 'lg' : 'md'}
            speechText={companionSpeech}
          />
        </div>
      )}

      {/* Roblox Character Showcase Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1123]/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="relative w-full max-w-lg bg-gradient-to-b from-[#1C1836] via-[#241F47] to-[#16132D] rounded-3xl overflow-hidden shadow-2xl border-2 border-orange-500/60 text-white my-4"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Showcase Banner */}
              <div className="relative p-6 bg-gradient-to-br from-orange-600/30 via-purple-600/20 to-cyan-600/20 border-b border-white/10 flex flex-col items-center text-center">
                <div className="w-36 h-44 mb-2">
                  <RobloxAvatar
                    size="lg"
                    equipped={equipped}
                    showCompanion={true}
                    interactive={false}
                  />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-orange-500/20 border border-orange-400/40 text-orange-300 text-[11px] font-black uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  Roblox Cyber Detective Spec
                </div>
                <h3 className="text-2xl font-black font-['Plus_Jakarta_Sans','Be_Vietnam_Pro',sans-serif] text-white">
                  Chief Detective Roblox
                </h3>
                <p className="text-xs text-orange-200 mt-1 max-w-md">
                  Signature blocky Roblox character model styled with vibrant detective gear, ready to investigate malicious links and cyber deception!
                </p>
              </div>

              {/* Character Attributes */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-1.5 text-orange-400 font-black mb-1">
                      <Shield className="w-4 h-4" />
                      <span>Avatar Anatomy</span>
                    </div>
                    <p className="text-gray-300 text-[11px]">
                      Classic Roblox stud head, articulated blocky limbs, and iconic Winning Smile face!
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-black mb-1">
                      <Sparkle className="w-4 h-4" />
                      <span>Vibrant Wardrobe</span>
                    </div>
                    <p className="text-gray-300 text-[11px]">
                      FPT Amber & Navy tailored detective blazer with gold lapels and high-top sneakers.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-1.5 text-amber-400 font-black mb-1">
                      <Trophy className="w-4 h-4" />
                      <span>Investigation Gear</span>
                    </div>
                    <p className="text-gray-300 text-[11px]">
                      Refreshing Bloxy Cola, 10X forensic magnifier, and handheld quantum holo-datapad.
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-1.5 text-pink-400 font-black mb-1">
                      <Heart className="w-4 h-4" />
                      <span>Sidekick Companion</span>
                    </div>
                    <p className="text-gray-300 text-[11px]">
                      FPT Orange Ant hovering alongside with glowing antennae illuminating deceptive traps!
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-sm shadow-lg shadow-orange-500/30 transition-all active:scale-98 cursor-pointer"
                >
                  Awesome, Let's Return to 3D HQ!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

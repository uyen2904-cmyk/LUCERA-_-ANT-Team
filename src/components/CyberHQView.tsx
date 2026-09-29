import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  Moon,
  Building2,
  ShieldCheck,
  ShieldAlert,
  Users,
  Trophy,
  Palette,
  Eye,
  CheckCircle2,
  ChevronRight,
  Globe,
  Radio,
  Coffee,
  Bot,
  Compass,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Camera,
  Layers,
  Sparkles,
  ArrowRight,
  Flame,
  Volume2,
  Edit2,
  UtensilsCrossed,
  Headphones
} from 'lucide-react';
import { RobloxAvatar } from './RobloxAvatar';
import { UserProfile, NavTab } from '../types';
import { hackerMusic } from '../utils/hackerMusicEngine';
import { playTabSwitch } from '../utils/soundEffects';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';

interface CyberHQViewProps {
  profile: UserProfile;
  onEarnReward: (xp: number, coins: number, mapName?: string) => void;
  onNavigate: (tab: NavTab) => void;
  onOpenScannerWithQuery?: (query: string) => void;
  onOpenGuide?: () => void;
}

export interface ClientCase {
  id: string;
  clientName: string;
  avatarIcon: string;
  role: string;
  scamType: 'sms_bank' | 'free_robux' | 'fake_escrow' | 'phishing_email' | 'trojan_apk';
  situationVi: string;
  situationEn: string;
  suspiciousUrl: string;
  sender: string;
  threatLevel: 'high' | 'critical' | 'medium';
  rewardCoins: number;
  rewardXp: number;
  analysis: {
    realDomain: string;
    fakePart: string;
    urgencyTrickVi: string;
    urgencyTrickEn: string;
    dangerLevel: string;
  };
  solved: boolean;
}

const INITIAL_CASES: ClientCase[] = [
  {
    id: 'case-1',
    clientName: 'Senior Citizen Arthur (68)',
    avatarIcon: '👴',
    role: 'Retired Citizen & Online Banking User',
    scamType: 'sms_bank',
    situationVi: 'Tôi vừa nhận được tin nhắn SMS từ ngân hàng bảo tài khoản sẽ bị phong tỏa trong 2 tiếng nếu không nhấp vào đường link để xác minh!',
    situationEn: 'I received an urgent SMS claiming my bank account will be frozen within 2 hours unless I click the link to verify my identity!',
    suspiciousUrl: 'https://vietcom-ebank-xacminh247.xyz/login-secure',
    sender: '+84 908 112 349 (Brandname Spoofed)',
    threatLevel: 'critical',
    rewardCoins: 80,
    rewardXp: 120,
    analysis: {
      realDomain: 'vietcom-ebank-xacminh247.xyz',
      fakePart: 'Cheap .xyz TLD & hyphenated compound brand mimicry',
      urgencyTrickVi: 'Đe dọa khóa tài khoản trong 2 tiếng để nạn nhân hoảng sợ làm theo.',
      urgencyTrickEn: 'Threatens 2-hour account suspension to trigger panic and bypass critical thinking.',
      dangerLevel: 'Bank Impersonation & OTP Credential Harvesting'
    },
    solved: false
  },
  {
    id: 'case-2',
    clientName: 'Gamer Kevin (13)',
    avatarIcon: '🧒',
    role: 'Roblox Player & Discord Member',
    scamType: 'free_robux',
    situationVi: 'Một bạn trên mạng nhắn link bảo là sự kiện kỷ niệm tặng 15,000 Robux miễn phí chỉ cần đăng nhập tài khoản!',
    situationEn: 'A player messaged me on Discord offering 15,000 FREE ROBUX for an anniversary promo, just sign in with credentials!',
    suspiciousUrl: 'https://roblox-event-claim-free2026.top/robux-code',
    sender: 'RobloxGamer_999 (Discord DM)',
    threatLevel: 'high',
    rewardCoins: 70,
    rewardXp: 100,
    analysis: {
      realDomain: 'roblox-event-claim-free2026.top',
      fakePart: 'Suspicious .top TLD & phishing domain roblox-event-claim',
      urgencyTrickVi: 'Dụ dỗ Robux miễn phí nhằm chiếm đoạt tài khoản game và đồ hiếm.',
      urgencyTrickEn: 'Baiting with free virtual currency to steal gaming accounts and limited items.',
      dangerLevel: 'Roblox Account Hijack & Inventory Theft'
    },
    solved: false
  },
  {
    id: 'case-3',
    clientName: 'Shop Owner Clara (34)',
    avatarIcon: '👩',
    role: 'E-commerce Seller & Small Merchant',
    scamType: 'fake_escrow',
    situationVi: 'Khách hàng ở nước ngoài bảo đã chuyển 4,500,000đ qua cổng ZaloPay quốc tế và yêu cầu tôi nhấp link nhập mã OTP để nhận tiền.',
    situationEn: 'An overseas buyer claims to have wired $200 via international escrow and insists I click a link to input my banking OTP to release funds.',
    suspiciousUrl: 'https://zalopay-nhantien-nhanh247.site/xac-thuc-otp',
    sender: 'Buyer via Facebook Marketplace',
    threatLevel: 'critical',
    rewardCoins: 90,
    rewardXp: 150,
    analysis: {
      realDomain: 'zalopay-nhantien-nhanh247.site',
      fakePart: 'Malicious .site domain & fake gateway asking for OTP',
      urgencyTrickVi: 'Gửi biên lai giả để giục chủ shop nhập OTP rút sạch tiền ngân hàng.',
      urgencyTrickEn: 'Forged escrow receipt coercing seller to enter 2FA SMS code, draining bank account.',
      dangerLevel: 'Account Takeover via Phished 2FA / OTP'
    },
    solved: false
  },
  {
    id: 'case-4',
    clientName: 'Officer David (29)',
    avatarIcon: '👨‍💼',
    role: 'Corporate Accountant',
    scamType: 'phishing_email',
    situationVi: 'Tôi nhận được email có tiêu đề [IT HELPDESK KHẨN CẤP] yêu cầu đổi mật khẩu Microsoft 365 nếu không sẽ bị khóa hộp thư.',
    situationEn: 'I received an email titled [URGENT IT HELPDESK] demanding an immediate Microsoft 365 password reset or my corporate inbox will be locked.',
    suspiciousUrl: 'https://security-microsoft-update9.tk/login.php',
    sender: 'it-support@microsoft-security-alert.net',
    threatLevel: 'high',
    rewardCoins: 75,
    rewardXp: 110,
    analysis: {
      realDomain: 'security-microsoft-update9.tk',
      fakePart: 'Free .tk TLD commonly exploited by threat actors',
      urgencyTrickVi: 'Mạo danh bộ phận IT công ty để đánh cắp email nội bộ doanh nghiệp.',
      urgencyTrickEn: 'Impersonating internal IT helpdesk to harvest enterprise business credentials.',
      dangerLevel: 'Corporate Spear Phishing & Credential Harvest'
    },
    solved: false
  },
  {
    id: 'case-5',
    clientName: 'Mobile Gamer Leo (16)',
    avatarIcon: '👦',
    role: 'Android Gamer',
    scamType: 'trojan_apk',
    situationVi: 'Em thấy trên TikTok chia sẻ file tải app "Hack Kim Cương Tự Động" đuôi APK, nhưng khi mở lên nó đòi cấp quyền đọc tin nhắn SMS!',
    situationEn: 'A viral video provided a link to download an "Unlimited Diamonds Auto APK", but the installer demands full READ SMS permissions!',
    suspiciousUrl: 'https://freefire-hack-kimcuong-auto.fun/app-download.apk',
    sender: 'TikTok Bio Link @gamer_pro_freefire',
    threatLevel: 'critical',
    rewardCoins: 100,
    rewardXp: 160,
    analysis: {
      realDomain: 'freefire-hack-kimcuong-auto.fun',
      fakePart: 'Trojan APK disguised as a game mod requesting SMS access',
      urgencyTrickVi: 'Đòi quyền đọc tin nhắn SMS nhằm âm thầm lấy mã OTP ngân hàng của gia đình.',
      urgencyTrickEn: 'Requests invasive SMS permissions to silently intercept banking verification codes.',
      dangerLevel: 'Mobile Banking Trojan & SMS Interceptor Spyware'
    },
    solved: false
  }
];

// Expanded Decor Configuration Interface
interface HQDecorConfig {
  deskStyle: 'cyber_neon' | 'classic_wood' | 'holo_glass' | 'tactical_iron';
  chairStyle: 'cyber_throne' | 'chesterfield' | 'levitating';
  wallDisplay: 'threat_map' | 'lucera_crest' | 'matrix_rain' | 'hall_of_fame';
  floorRug: 'cyber_grid' | 'persian_carpet' | 'fpt_orange' | 'hazard_mat';
  plant: 'cyber_bonsai' | 'neon_sakura' | 'digital_cactus' | 'space_orchid';
  amenity: 'bloxy_dispenser' | 'coffee_bot' | 'quantum_server' | 'arcade_cab' | 'snack_buffet';
  pet: 'orange_ant' | 'cyber_doge' | 'recon_drone' | 'mecha_kitty';
  snack: 'pizza_box' | 'boba_tea' | 'ramen_bowl' | 'bloxy_burger' | 'sushi_boat' | 'donut_stack' | 'popcorn_tub' | 'dimsum_steamer' | 'taco_fiesta';
  lighting: 'neon_lasers' | 'ambient_tubes' | 'lava_lamp' | 'golden_sconces';
  windowVista: 'cyber_city' | 'cloud_layer' | 'neon_rain';
}

const DEFAULT_DECOR: HQDecorConfig = {
  deskStyle: 'cyber_neon',
  chairStyle: 'cyber_throne',
  wallDisplay: 'threat_map',
  floorRug: 'cyber_grid',
  plant: 'cyber_bonsai',
  amenity: 'bloxy_dispenser',
  pet: 'recon_drone',
  snack: 'pizza_box',
  lighting: 'neon_lasers',
  windowVista: 'cyber_city'
};

export const CyberHQView: React.FC<CyberHQViewProps> = ({
  profile,
  onEarnReward,
  onNavigate,
  onOpenScannerWithQuery,
  onOpenGuide
}) => {
  // Day / Night cycle state with local storage
  const [isDayMode, setIsDayMode] = useState<boolean>(() => {
    return localStorage.getItem('lucera_hq_time') === 'day';
  });

  // Global Language Context (English by default, 1 single button switches whole app)
  const { isVi, toggleLanguage } = useLanguage();
  const hqLang: 'en' | 'vi' = isVi ? 'vi' : 'en';

  // Headquarters Custom Name state
  const [hqName, setHqName] = useState<string>(() => {
    return localStorage.getItem('lucera_hq_name') || 'LUCERA PRIME CITADEL';
  });
  const [showRenameModal, setShowRenameModal] = useState<boolean>(false);
  const [tempHqName, setTempHqName] = useState<string>(hqName);

  // Snack / Food feast interactive feedback toast
  const [snackToast, setSnackToast] = useState<string | null>(null);

  // Client Cases State
  const [cases, setCases] = useState<ClientCase[]>(() => {
    try {
      const saved = localStorage.getItem('lucera_hq_cases');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_CASES;
  });

  // Active investigating case modal
  const [activeCase, setActiveCase] = useState<ClientCase | null>(null);

  // Expanded Decor system state
  const [showDecorModal, setShowDecorModal] = useState(false);
  const [decorCategory, setDecorCategory] = useState<'desk' | 'rug' | 'wall' | 'plant' | 'snack' | 'amenity' | 'pet' | 'vista' | 'name'>('snack');
  const [decor, setDecor] = useState<HQDecorConfig>(() => {
    try {
      const saved = localStorage.getItem('lucera_hq_decor_v3') || localStorage.getItem('lucera_hq_decor_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_DECOR,
          ...parsed,
          snack: parsed.snack || 'pizza_box'
        };
      }
    } catch {}
    return DEFAULT_DECOR;
  });

  // Interactive Munch Food function
  const triggerMunchFood = () => {
    const snackMessages: Record<string, { en: string; vi: string; icon: string }> = {
      pizza_box: {
        en: 'Munch munch! 🍕 Cheesy hot pepperoni pizza slice! Recharged 100% detective energy! :3',
        vi: 'Măm măm! 🍕 Miếng Pizza phô mai xúc xích nóng hổi kéo sợi! Nạp 100% năng lượng phá án! :3',
        icon: '🍕'
      },
      boba_tea: {
        en: 'Slurp! 🧋 Brown sugar boba milk tea with chewy pearls! Boosted 200% alertness! :3',
        vi: 'Rột rột! 🧋 Trà sữa trân châu đường đen ngọt ngào trứ danh! Tăng 200% độ tập trung! :3',
        icon: '🧋'
      },
      ramen_bowl: {
        en: 'Slurp slurp! 🍜 Steaming Tokyo cyber ramen with chashu! Detective mind razor-sharp! :3',
        vi: 'Xì xụp! 🍜 Tô mì Ramen xá xíu bốc khói thơm nức mũi! Tỉnh táo phát hiện mọi link lừa đảo! :3',
        icon: '🍜'
      },
      bloxy_burger: {
        en: 'Chomp chomp! 🍔 Bloxy cheese burger & crunchy golden fries! Ultra delicious! :3',
        vi: 'Cắn ngập răng! 🍔 Burger phô mai đẫm sốt & khoai tây giòn rụm! Ngon bá cháy bọ chét! :3',
        icon: '🍔'
      },
      sushi_boat: {
        en: 'Oishii! 🍣 Salmon nigiri & roe sushi boat! Peak investigation focus! :3',
        vi: 'Oishii! 🍣 Thuyền Sushi cá hồi & trứng cá chuồn tươi rói! Thần thái thám tử thăng hoa! :3',
        icon: '🍣'
      },
      donut_stack: {
        en: 'Sweet bite! 🍩 Matcha glazed donut with sprinkles! Dopamine maxed out! :3',
        vi: 'Ngọt lịm! 🍩 Bánh Donut kem matcha phủ cốm lấp lánh! Tiếp thêm nhiệt huyết săn lừa đảo! :3',
        icon: '🍩'
      },
      popcorn_tub: {
        en: 'Crunch crunch! 🍿 Warm buttery cheese popcorn! Watching cyber cases unfold! :3',
        vi: 'Rôm rốp! 🍿 Thùng bắp rang bơ phô mai thơm phức vừa ăn vừa theo dõi hồ sơ tội phạm mạng! :3',
        icon: '🍿'
      },
      dimsum_steamer: {
        en: 'Steaming hot! 🥟 Juicy shrimp dim sum basket! Comfort food for long cyber stakeouts! :3',
        vi: 'Nóng hổi! 🥟 Xửng Dim Sum há cảo tôm thịt thơm nức mũi! No căng bụng tiếp tục nhiệm vụ! :3',
        icon: '🥟'
      },
      taco_fiesta: {
        en: 'Crunchy fiesta! 🌮 Spicy beef & cheese taco! Full detective stamina! :3',
        vi: 'Giòn rụm! 🌮 Taco bò phô mai sốt cay Mexico giòn tan! Năng lượng dồi dào! :3',
        icon: '🌮'
      }
    };

    const item = snackMessages[decor.snack] || snackMessages.pizza_box;
    setSnackToast(hqLang === 'vi' ? item.vi : item.en);
    setTimeout(() => setSnackToast(null), 3500);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}
  };

  // -------------------------------------------------------------
  // 3D LOOK-AROUND CAMERA CONTROLS ENGINE (Drag to Rotate & Pan)
  // -------------------------------------------------------------
  const [yaw, setYaw] = useState<number>(0); // Horizontal rotation: -45 deg to +45 deg
  const [pitch, setPitch] = useState<number>(5); // Vertical tilt: -15 deg to +25 deg
  const [zoom, setZoom] = useState<number>(1.0); // 0.8x to 1.35x
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [autoOrbit, setAutoOrbit] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number; startYaw: number; startPitch: number }>({ x: 0, y: 0, startYaw: 0, startPitch: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto Orbit Effect
  useEffect(() => {
    if (!autoOrbit) return;
    const interval = setInterval(() => {
      setYaw((prev) => {
        const next = prev + 0.3;
        return next > 35 ? -35 : next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [autoOrbit]);

  // Mouse / Touch Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoOrbit(false);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startYaw: yaw,
      startPitch: pitch
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    
    // Sensitivity factor
    const newYaw = Math.max(-45, Math.min(45, dragStartRef.current.startYaw + deltaX * 0.25));
    const newPitch = Math.max(-15, Math.min(25, dragStartRef.current.startPitch - deltaY * 0.2));
    
    setYaw(newYaw);
    setPitch(newPitch);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setAutoOrbit(false);
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        startYaw: yaw,
        startPitch: pitch
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStartRef.current.x;
    const deltaY = e.touches[0].clientY - dragStartRef.current.y;

    const newYaw = Math.max(-45, Math.min(45, dragStartRef.current.startYaw + deltaX * 0.25));
    const newPitch = Math.max(-15, Math.min(25, dragStartRef.current.startPitch - deltaY * 0.2));

    setYaw(newYaw);
    setPitch(newPitch);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Camera Presets
  const setCameraPreset = (preset: 'desk' | 'reception' | 'threat_map' | 'balcony' | 'center') => {
    setAutoOrbit(false);
    if (preset === 'center') {
      setYaw(0);
      setPitch(5);
      setZoom(1.0);
    } else if (preset === 'desk') {
      setYaw(22);
      setPitch(2);
      setZoom(1.15);
    } else if (preset === 'reception') {
      setYaw(-25);
      setPitch(4);
      setZoom(1.12);
    } else if (preset === 'threat_map') {
      setYaw(15);
      setPitch(14);
      setZoom(1.2);
    } else if (preset === 'balcony') {
      setYaw(0);
      setPitch(-8);
      setZoom(0.9);
    }
  };

  // Save Day/Night & Decor
  useEffect(() => {
    localStorage.setItem('lucera_hq_time', isDayMode ? 'day' : 'night');
  }, [isDayMode]);

  useEffect(() => {
    try {
      localStorage.setItem('lucera_hq_decor_v3', JSON.stringify(decor));
    } catch {}
  }, [decor]);

  useEffect(() => {
    try {
      localStorage.setItem('lucera_hq_name', hqName);
    } catch {}
  }, [hqName]);

  useEffect(() => {
    try {
      localStorage.setItem('lucera_hq_cases', JSON.stringify(cases));
    } catch {}
  }, [cases]);

  // Solve a case
  const handleSolveCase = (verdict: 'block_scam' | 'allow') => {
    if (!activeCase) return;

    if (verdict === 'block_scam') {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {}

      onEarnReward(
        activeCase.rewardXp,
        activeCase.rewardCoins,
        hqLang === 'vi' ? `Hồ Sơ 3D HQ: ${activeCase.clientName}` : `3D HQ Mission: ${activeCase.clientName}`
      );

      setCases((prev) =>
        prev.map((c) => (c.id === activeCase.id ? { ...c, solved: true } : c))
      );
    }
  };

  const solvedCount = cases.filter((c) => c.solved).length;

  return (
    <div className="space-y-6 text-white select-none">
      {/* ========================================================================= */}
      {/* 1. TOP COMMAND BAR: DAY/NIGHT TOGGLE, ENGLISH STATUS METRICS & DECOR BTN */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#17142E] border-2 border-orange-500/40 shadow-2xl flex flex-wrap items-center justify-between gap-4">
        {/* Left: HQ Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 border border-orange-300/40">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-lg sm:text-xl font-black font-['Plus_Jakarta_Sans','Be_Vietnam_Pro',sans-serif] tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-white">
                {hqName}
              </span>
              <button
                onClick={() => {
                  setTempHqName(hqName);
                  setShowRenameModal(true);
                }}
                className="px-2.5 py-1 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-400/40 text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
                title="Đổi tên trụ sở / Rename Headquarters"
              >
                <Edit2 className="w-3 h-3 text-orange-300" />
                <span>{hqLang === 'en' ? 'Rename HQ' : 'Đổi tên'}</span>
              </button>
              <button
                onClick={triggerMunchFood}
                className="px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
                title="Thưởng thức món ngon nạp năng lượng :3"
              >
                <UtensilsCrossed className="w-3 h-3 text-amber-300" />
                <span>{hqLang === 'en' ? 'Snack Bar :3' : 'Ăn vặt :3'}</span>
              </button>
              <button
                onClick={() => {
                  playTabSwitch();
                  hackerMusic.togglePlay();
                }}
                className={`px-2.5 py-1 rounded-xl border text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm ${
                  hackerMusic.getIsPlaying()
                    ? 'bg-pink-500 text-white border-pink-300 shadow-pink-500/30 animate-pulse'
                    : 'bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border-pink-400/40'
                }`}
                title="Music with Hacker :3 - Bật/Tắt nhạc hacker chill"
              >
                <Headphones className="w-3 h-3 text-pink-300" />
                <span>{hackerMusic.getIsPlaying() ? 'Nhạc :3 (ON)' : 'Music :3'}</span>
              </button>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase animate-pulse">
                {hqLang === 'en' ? 'COMMAND ACTIVE' : 'ĐANG HOẠT ĐỘNG'}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-semibold flex items-center gap-2">
              <span className="flex items-center gap-1 text-emerald-400">
                <Radio className="w-3 h-3 animate-ping" />
                <span>ONLINE 100% OFFLINE</span>
              </span>
              <span>•</span>
              <span>CHIEF DETECTIVE:</span>
              <span className="text-orange-300 font-bold">{profile.noobName} (LV.{profile.level})</span>
            </p>
          </div>
        </div>

        {/* Center & Right Controls: DAY/NIGHT, ENGLISH/VI TOGGLE, DECOR HQ */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Day / Night Toggle ("chỉnh đc ngày đêm của trụ sở") */}
          <button
            onClick={() => setIsDayMode(!isDayMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs transition-all border shadow-md active:scale-95 cursor-pointer ${
              isDayMode
                ? 'bg-gradient-to-r from-amber-400 to-orange-400 text-slate-900 border-amber-300 shadow-amber-500/30'
                : 'bg-gradient-to-r from-indigo-900 to-purple-900 text-amber-200 border-purple-500/60 shadow-purple-900/40'
            }`}
            title="Toggle Day / Night Sky and Lighting in 3D Headquarters"
          >
            {isDayMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-900 fill-amber-300 animate-spin" style={{ animationDuration: '10s' }} />
                <span>CYBER DAYLIGHT</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>NEON NIGHTFALL</span>
              </>
            )}
          </button>

          {/* DUY NHẤT 1 NÚT NHẤN ĐỔI TOÀN BỘ NGÔN NGỮ (1-CLICK SWITCH) */}
          <button
            onClick={() => {
              playTabSwitch();
              toggleLanguage();
            }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-black transition-all cursor-pointer shadow-md active:scale-95 ${
              hqLang === 'vi'
                ? 'bg-rose-950/80 border-rose-500/70 text-rose-200 hover:bg-rose-900/80'
                : 'bg-indigo-950/80 border-cyan-400/70 text-cyan-200 hover:bg-indigo-900/80'
            }`}
            title={hqLang === 'vi' ? 'Bấm để đổi TOÀN BỘ ứng dụng sang TIẾNG ANH (1-Click)' : 'Click to switch ENTIRE app to VIETNAMESE (1-Click)'}
          >
            <span>{hqLang === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
            <span>{hqLang === 'vi' ? 'VI ➔ EN' : 'EN ➔ VI'}</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-md uppercase font-black ${
              hqLang === 'vi' ? 'bg-rose-500 text-white' : 'bg-cyan-500 text-black'
            }`}>
              {hqLang === 'vi' ? 'Đổi Hết' : '1-Click'}
            </span>
          </button>

          {/* Decorate HQ Button (Expanded Decor Studio) */}
          <button
            onClick={() => setShowDecorModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black border border-purple-400/50 shadow-lg shadow-purple-600/30 transition-all active:scale-95 cursor-pointer"
          >
            <Palette className="w-4 h-4 text-amber-300" />
            <span>{hqLang === 'en' ? 'DECOR STUDIO' : 'TRANG TRÍ TRỤ SỞ'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900 text-[9px] font-black">
              10 SLOTS
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ENGLISH TELEMETRY TILES: THREAT LEVEL, SOLVED CASES, ASSETS            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-white">
        <div className="p-3.5 rounded-2xl bg-[#1C1838] border border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-black">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-black tracking-wider">
              {hqLang === 'en' ? 'CYBER THREAT LEVEL' : 'MỨC ĐỘ NGUY HIỂM'}
            </div>
            <div className="text-sm sm:text-base font-black text-rose-400">
              DEFCON-2 / ELEVATED
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#1C1838] border border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-black">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-black tracking-wider">
              {hqLang === 'en' ? 'CITIZEN CASE QUEUE' : 'KHÁCH HÀNG ĐANG ĐỢI'}
            </div>
            <div className="text-sm sm:text-base font-black text-orange-300">
              {cases.filter((c) => !c.solved).length} PENDING INTAKE
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#1C1838] border border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-black tracking-wider">
              {hqLang === 'en' ? 'PROTECTED CITIZENS' : 'VỤ ÁN ĐÃ GIẢI CỨU'}
            </div>
            <div className="text-sm sm:text-base font-black text-emerald-400">
              {solvedCount} / {cases.length} RESOLVED
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#1C1838] border border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-gray-400 uppercase font-black tracking-wider">
              {hqLang === 'en' ? 'BUREAU BUDGET' : 'NGÂN SÁCH TRỤ SỞ'}
            </div>
            <div className="text-sm sm:text-base font-black text-amber-300">
              {profile.coins} COINS • {profile.xp} XP
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. INTERACTIVE 3D HEADQUARTERS ROOM: 360° LOOK-AROUND + CUSTOM DECOR     */}
      {/* ========================================================================= */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-orange-500/50 shadow-2xl bg-[#090714]">
        
        {/* CAMERA CONTROLS HUD (Top Overlay Inside 3D Room) */}
        <div className="relative z-20 p-3 sm:p-4 bg-black/60 backdrop-blur-md border-b border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Look Around Helper Instruction */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-orange-500/30 text-orange-300 border border-orange-400/40">
              <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '14s' }} />
            </div>
            <div>
              <span className="font-black text-white flex items-center gap-1.5">
                <span>3D LOOK-AROUND ROOM</span>
                <span className="text-[10px] font-normal text-orange-300">
                  (Drag mouse or swipe to look around!)
                </span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono">
                YAW: {Math.round(yaw)}° | PITCH: {Math.round(pitch)}° | ZOOM: {zoom.toFixed(1)}x
              </span>
            </div>
          </div>

          {/* Center: Camera Angle Presets */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => setCameraPreset('center')}
              className="px-2.5 py-1 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white font-bold text-[11px] transition-all cursor-pointer"
              title="Reset to center view"
            >
              🎯 Center
            </button>
            <button
              onClick={() => setCameraPreset('desk')}
              className="px-2.5 py-1 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white font-bold text-[11px] transition-all cursor-pointer"
              title="Focus on Command Desk & Roblox Avatar"
            >
              🖥️ Desk
            </button>
            <button
              onClick={() => setCameraPreset('reception')}
              className="px-2.5 py-1 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white font-bold text-[11px] transition-all cursor-pointer"
              title="Focus on Citizen Case Queue"
            >
              🚨 Cases
            </button>
            <button
              onClick={() => setCameraPreset('threat_map')}
              className="px-2.5 py-1 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white font-bold text-[11px] transition-all cursor-pointer"
              title="Focus on Global Threat Radar"
            >
              🌐 Radar
            </button>
            <button
              onClick={() => setCameraPreset('balcony')}
              className="px-2.5 py-1 rounded-xl hover:bg-white/10 text-gray-300 hover:text-white font-bold text-[11px] transition-all cursor-pointer"
              title="Panoramic Skyline Vista"
            >
              🌆 Vista
            </button>
          </div>

          {/* Right: Auto-Orbit, Zoom In / Out, Reset */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setAutoOrbit(!autoOrbit)}
              className={`px-3 py-1 rounded-xl font-bold text-[11px] border transition-all cursor-pointer flex items-center gap-1 ${
                autoOrbit
                  ? 'bg-cyan-500 text-slate-900 border-cyan-300 shadow-md animate-pulse'
                  : 'bg-white/10 hover:bg-white/20 text-gray-300 border-white/10'
              }`}
              title="Auto-rotate camera continuously"
            >
              <Camera className="w-3 h-3" />
              <span>{autoOrbit ? 'Auto-Orbit ON' : 'Auto-Orbit'}</span>
            </button>

            <button
              onClick={() => setZoom((prev) => Math.min(1.35, prev + 0.1))}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom((prev) => Math.max(0.8, prev - 0.1))}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setYaw(0);
                setPitch(5);
                setZoom(1.0);
                setAutoOrbit(false);
              }}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer"
              title="Reset Camera Orientation"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3D VIEWPORT CONTAINER */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative w-full h-[540px] sm:h-[600px] overflow-hidden cursor-grab active:cursor-grabbing select-none transition-colors duration-700 ${
            isDayMode ? 'bg-[#89CFF0]' : 'bg-[#080614]'
          }`}
          style={{ perspective: '1100px' }}
        >
          {/* DRAGGABLE 3D WORLD STAGE */}
          <div
            className="w-full h-full relative transition-transform duration-100 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: `scale(${zoom}) rotateX(${pitch}deg) rotateY(${yaw}deg)`
            }}
          >
            {/* ------------------------------------------------------------- */}
            {/* BACKGROUND: PANORAMIC CITY SKYLINE WINDOW WITH VISTA SELECTION */}
            {/* ------------------------------------------------------------- */}
            <div
              className="absolute inset-x-[-20%] top-[-20px] h-[340px] pointer-events-none transition-opacity duration-700 overflow-hidden"
              style={{ transform: 'translateZ(-280px)' }}
            >
              {isDayMode ? (
                /* DAYLIGHT SKYLINE */
                <div className="relative w-full h-full bg-gradient-to-b from-[#70BBE8] via-[#A0D4F5] to-[#D4E8F8]">
                  {/* Sun Flare */}
                  <div className="absolute top-8 right-[25%] w-36 h-36 bg-amber-200/60 rounded-full blur-2xl animate-pulse" />
                  <div className="absolute top-12 right-[27%] w-20 h-20 bg-white/95 rounded-full shadow-2xl shadow-amber-200" />
                  
                  {/* Vista: Cloud layer or skyscrapers */}
                  {decor.windowVista === 'cloud_layer' ? (
                    <div className="absolute bottom-0 inset-x-0 h-40 bg-white/70 blur-xl rounded-t-full opacity-80" />
                  ) : (
                    <div className="absolute bottom-0 inset-x-0 h-48 flex items-end justify-around opacity-40">
                      <div className="w-24 h-36 bg-sky-800 rounded-t-2xl" />
                      <div className="w-32 h-48 bg-sky-900 rounded-t-3xl" />
                      <div className="w-20 h-28 bg-sky-800 rounded-t-2xl" />
                      <div className="w-36 h-52 bg-sky-950 rounded-t-3xl" />
                      <div className="w-28 h-40 bg-sky-900 rounded-t-2xl" />
                    </div>
                  )}

                  {/* Flying Sky-Trams */}
                  <div className="absolute top-20 left-[10%] w-36 h-2.5 bg-white/70 rounded-full blur-xs animate-pulse" />
                </div>
              ) : (
                /* NEON NIGHT SKYLINE */
                <div className="relative w-full h-full bg-gradient-to-b from-[#060410] via-[#100A26] to-[#1C123D]">
                  {/* Twinkling Stars */}
                  <div className="absolute top-6 left-[20%] w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  <div className="absolute top-14 right-[30%] w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
                  <div className="absolute top-10 left-[50%] w-1 h-1 bg-amber-300 rounded-full" />
                  <div className="absolute top-24 left-[75%] w-2 h-2 bg-pink-400 rounded-full animate-pulse" />

                  {/* Neon Skyscrapers */}
                  <div className="absolute bottom-0 inset-x-0 h-48 flex items-end justify-around opacity-70">
                    <div className="w-24 h-36 bg-indigo-950 border-t-2 border-cyan-400/60 relative">
                      <span className="absolute top-2 left-2 text-[8px] font-black text-cyan-300">SCAM-ZERO</span>
                    </div>
                    <div className="w-36 h-52 bg-purple-950 border-t-2 border-pink-400/80 relative">
                      <span className="absolute top-4 left-3 text-[9px] font-black text-pink-300 tracking-wider">LUCERA HQ</span>
                    </div>
                    <div className="w-20 h-28 bg-indigo-950 border-t-2 border-amber-400/60" />
                    <div className="w-40 h-56 bg-purple-950 border-t-2 border-cyan-400/60" />
                  </div>

                  {/* Neon Hologram Billboards */}
                  <div className="absolute top-8 left-[12%] px-3 py-1.5 rounded-xl bg-pink-950/80 border border-pink-500 text-pink-300 text-[10px] font-black tracking-widest shadow-xl shadow-pink-500/50 animate-pulse">
                    ⚡ ZERO TRUST CYBER SHIELD
                  </div>
                </div>
              )}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* HOLOGRAPHIC NEON SIGNBOARD: CUSTOM HQ NAME                     */}
            {/* ------------------------------------------------------------- */}
            <div
              className="absolute top-4 left-1/2 -translate-x-1/2 z-15 pointer-events-auto transition-all duration-300"
              style={{ transform: 'translateZ(-140px)' }}
            >
              <button
                onClick={() => {
                  setTempHqName(hqName);
                  setShowRenameModal(true);
                }}
                className="group px-4 py-1.5 rounded-full bg-black/70 hover:bg-black/90 border border-orange-400/60 hover:border-orange-300 backdrop-blur-md shadow-lg shadow-orange-500/25 flex items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95"
                title="Bấm để đổi tên trụ sở / Click to rename HQ"
              >
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                <span className="text-xs sm:text-sm font-black tracking-widest uppercase font-['Plus_Jakarta_Sans','Be_Vietnam_Pro',sans-serif] text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-amber-200 to-yellow-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]">
                  ⚡ {hqName} ⚡
                </span>
                <Edit2 className="w-3 h-3 text-orange-300 opacity-60 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 3D FLOOR: RUG CUSTOMIZATION & CYBERNETIC PERSPECTIVE GRID     */}
            {/* ------------------------------------------------------------- */}
            <div
              className="absolute inset-x-[-20%] bottom-[-80px] h-[400px] pointer-events-none"
              style={{
                transform: 'rotateX(70deg) translateZ(-40px)',
                backgroundImage: `linear-gradient(${isDayMode ? '#0284C7' : '#8B5CF6'} 1px, transparent 1px), linear-gradient(90deg, ${isDayMode ? '#0284C7' : '#8B5CF6'} 1px, transparent 1px)`,
                backgroundSize: '48px 48px',
                opacity: 0.35
              }}
            />

            {/* CUSTOM FLOOR RUG (Directly in 3D perspective under the desk) */}
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-8 w-[380px] sm:w-[500px] h-[180px] rounded-3xl pointer-events-none transition-all duration-500 shadow-2xl flex items-center justify-center border"
              style={{
                transform: 'rotateX(60deg) translateZ(-20px)',
                background:
                  decor.floorRug === 'cyber_grid'
                    ? 'radial-gradient(circle, rgba(6,182,212,0.35) 0%, rgba(147,51,234,0.3) 70%, transparent 100%)'
                    : decor.floorRug === 'persian_carpet'
                    ? 'radial-gradient(circle, rgba(220,38,38,0.45) 0%, rgba(180,83,9,0.35) 60%, rgba(30,27,75,0.8) 100%)'
                    : decor.floorRug === 'fpt_orange'
                    ? 'radial-gradient(circle, rgba(249,115,22,0.45) 0%, rgba(245,158,11,0.35) 70%, transparent 100%)'
                    : 'repeating-linear-gradient(45deg, rgba(234,179,8,0.3) 0, rgba(234,179,8,0.3) 20px, rgba(0,0,0,0.5) 20px, rgba(0,0,0,0.5) 40px)',
                borderColor:
                  decor.floorRug === 'cyber_grid'
                    ? '#06b6d4'
                    : decor.floorRug === 'persian_carpet'
                    ? '#eab308'
                    : decor.floorRug === 'fpt_orange'
                    ? '#f97316'
                    : '#eab308'
              }}
            >
              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/70">
                  {decor.floorRug === 'cyber_grid' && '🔷 CYBER COMMAND HEXAGON'}
                  {decor.floorRug === 'persian_carpet' && '⚜️ ROYAL DETECTIVE WEAVE'}
                  {decor.floorRug === 'fpt_orange' && '🐜 FPT CIRCUIT CORE'}
                  {decor.floorRug === 'hazard_mat' && '⚠️ RESTRICTED CYBER ZONE'}
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* 3D WALL MOUNTED DISPLAYS (LEFT WALL & REAR)                    */}
            {/* ------------------------------------------------------------- */}
            <div
              className="absolute top-8 left-6 sm:left-12 z-10 transition-all duration-500"
              style={{ transform: 'translateZ(-120px) rotateY(15deg)' }}
            >
              {decor.wallDisplay === 'threat_map' && (
                <div className="p-3 rounded-2xl bg-black/70 border-2 border-cyan-400/60 shadow-xl shadow-cyan-500/20 backdrop-blur-md max-w-[220px]">
                  <div className="flex items-center gap-2 mb-1.5 text-cyan-300 text-xs font-black">
                    <Globe className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '24s' }} />
                    <span>GLOBAL THREAT RADAR</span>
                  </div>
                  <div className="h-16 w-full rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center relative overflow-hidden">
                    <div className="w-12 h-12 rounded-full border border-cyan-400/40 animate-ping absolute" />
                    <span className="text-[10px] font-mono text-cyan-200">DEFCON-2 ACTIVE</span>
                  </div>
                </div>
              )}

              {decor.wallDisplay === 'lucera_crest' && (
                <div className="p-3 rounded-2xl bg-gradient-to-tr from-orange-950/80 to-purple-950/80 border-2 border-orange-400/80 shadow-xl shadow-orange-500/20 backdrop-blur-md text-center max-w-[200px]">
                  <div className="text-3xl mb-1">🛡️</div>
                  <div className="text-xs font-black text-orange-300">LUCERA BUREAU CREST</div>
                  <p className="text-[9px] text-gray-300">Official Anti-Scam Shield</p>
                </div>
              )}

              {decor.wallDisplay === 'matrix_rain' && (
                <div className="p-3 rounded-2xl bg-black/90 border-2 border-emerald-500/70 shadow-xl shadow-emerald-500/20 max-w-[200px] font-mono text-[10px] text-emerald-400 leading-tight">
                  <div className="font-black text-xs text-white mb-1">MATRIX DECODER</div>
                  <div>01101001 01101110</div>
                  <div>11010010 00101101</div>
                  <div>PHISHING_BLOCKED</div>
                </div>
              )}

              {decor.wallDisplay === 'hall_of_fame' && (
                <div className="p-3 rounded-2xl bg-amber-950/80 border-2 border-amber-400 shadow-xl max-w-[200px] text-center">
                  <div className="text-2xl mb-1">🏆📜</div>
                  <div className="text-xs font-black text-amber-300">HALL OF FAME</div>
                  <p className="text-[9px] text-amber-100">Top Scam Detective 2026</p>
                </div>
              )}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* AMENITY MACHINE (Vending Machine / Coffee Bot / Server Rack)   */}
            {/* ------------------------------------------------------------- */}
            <div
              className="absolute bottom-28 left-6 sm:left-14 z-10 transition-all duration-500"
              style={{ transform: 'translateZ(-40px) rotateY(18deg)' }}
            >
              {decor.amenity === 'bloxy_dispenser' && (
                <div className="w-20 h-32 rounded-2xl bg-gradient-to-b from-red-600 to-red-900 border-2 border-red-400 shadow-xl shadow-red-500/30 p-2 flex flex-col justify-between items-center text-center">
                  <div className="text-[9px] font-black text-white bg-black/40 px-2 py-0.5 rounded-md">
                    BLOXY COLA
                  </div>
                  <span className="text-3xl animate-bounce">🧃</span>
                  <span className="text-[8px] text-red-200 font-bold">100% ICE COLD</span>
                </div>
              )}

              {decor.amenity === 'coffee_bot' && (
                <div className="w-20 h-28 rounded-2xl bg-gradient-to-b from-amber-700 to-stone-900 border-2 border-amber-400 shadow-xl p-2 flex flex-col justify-between items-center text-center">
                  <div className="text-[8px] font-black text-amber-200 bg-black/40 px-1.5 py-0.5 rounded-md">
                    COFFEE BOT
                  </div>
                  <Coffee className="w-8 h-8 text-amber-300 animate-pulse" />
                  <span className="text-[8px] text-amber-200 font-mono">STEAM READY</span>
                </div>
              )}

              {decor.amenity === 'quantum_server' && (
                <div className="w-20 h-36 rounded-2xl bg-slate-900 border-2 border-cyan-400 shadow-xl shadow-cyan-500/20 p-2 flex flex-col justify-between items-center font-mono">
                  <span className="text-[8px] text-cyan-300 font-black">AI SERVER</span>
                  <div className="space-y-1 w-full px-1">
                    <div className="h-1 bg-emerald-400 rounded-full animate-ping" />
                    <div className="h-1 bg-cyan-400 rounded-full" />
                    <div className="h-1 bg-amber-400 rounded-full" />
                  </div>
                  <span className="text-[7px] text-gray-400">99.9% UPTIME</span>
                </div>
              )}

              {decor.amenity === 'arcade_cab' && (
                <div className="w-20 h-32 rounded-2xl bg-gradient-to-b from-indigo-700 to-purple-950 border-2 border-pink-400 shadow-xl p-2 flex flex-col justify-between items-center text-center">
                  <span className="text-[8px] font-black text-yellow-300 bg-black/50 px-1.5 rounded">
                    SCAM BUST
                  </span>
                  <span className="text-2xl">🕹️</span>
                  <span className="text-[7px] text-pink-200">INSERT COIN</span>
                </div>
              )}

              {decor.amenity === 'snack_buffet' && (
                <div
                  onClick={triggerMunchFood}
                  className="w-24 h-32 rounded-2xl bg-gradient-to-b from-amber-600/40 via-orange-950/70 to-black/90 border-2 border-amber-400 shadow-xl shadow-amber-500/30 p-2 flex flex-col justify-between items-center text-center cursor-pointer hover:scale-105 transition-transform"
                  title="24/7 Detective Snack Bar & Buffet - Bấm để ăn vặt :3"
                >
                  <div className="text-[8px] font-black text-amber-200 bg-amber-500/30 px-1.5 py-0.5 rounded-md border border-amber-400/40">
                    BUFFET BAR :3
                  </div>
                  <div className="text-2xl animate-bounce" style={{ animationDuration: '2s' }}>
                    🍱🍕🧋
                  </div>
                  <span className="text-[8px] text-amber-200 font-bold">ALL-YOU-CAN-EAT</span>
                </div>
              )}
            </div>

            {/* ------------------------------------------------------------- */}
            {/* CENTER STAGE: CHIEF DESK, ROBLOX AVATAR, CHAIR & PET          */}
            {/* ------------------------------------------------------------- */}
            <div
              className="absolute left-1/2 -translate-x-1/2 bottom-16 sm:bottom-20 z-20 flex flex-col items-center"
              style={{ transform: 'translateZ(60px)' }}
            >
              {/* Dialogue Bubble above Roblox Avatar */}
              <div
                onClick={() => setCameraPreset('desk')}
                className={`mb-2.5 p-3 rounded-2xl border text-xs max-w-xs shadow-xl backdrop-blur-md cursor-pointer transition-transform hover:scale-105 ${
                  isDayMode
                    ? 'bg-white/95 text-slate-800 border-amber-300 shadow-amber-500/20'
                    : 'bg-[#1C173B]/95 text-orange-100 border-orange-500/80 shadow-orange-500/25'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="font-extrabold text-[11px] text-orange-400">
                    {profile.noobName}
                  </span>
                  <span className="text-[9px] text-gray-400 font-bold">Chief Detective</span>
                </div>
                <p className="leading-tight font-semibold text-[11px]">
                  {hqLang === 'en'
                    ? '"Citizens are bringing live scam link cases to our reception! Click on any case on the right to start forensic decoding!"'
                    : '"Các công dân đang chờ ở phòng tiếp tân bên phải! Hãy bấm vào một hồ sơ để bắt đầu bóc trần link lừa đảo nhé!"'}
                </p>
              </div>

              {/* ROBOTIC PET / SIDEKICK NEXT TO AVATAR */}
              <div className="relative flex items-end justify-center">
                {/* Pet placement (left side of avatar) */}
                <div className="absolute -left-12 bottom-6 z-10 transition-all hover:scale-110 cursor-pointer">
                  {decor.pet === 'orange_ant' && (
                    profile.streakDays >= 10 ? (
                      <div className="p-1.5 rounded-2xl bg-orange-500/20 border border-orange-400 text-center shadow-lg animate-bounce" style={{ animationDuration: '2.5s' }} title="FPT Kiến Sáng - Unlocked with 10-day defense streak!">
                        <span className="text-2xl">🐜</span>
                        <span className="block text-[8px] font-black text-orange-300">ORANGE ANT</span>
                      </div>
                    ) : (
                      <div className="p-1.5 rounded-2xl bg-black/60 border border-orange-500/40 text-center shadow-lg backdrop-blur-xs" title={`FPT Kiến Sáng is locked! Streak required: 10 days (Current: ${profile.streakDays}/10)`}>
                        <span className="text-2xl opacity-60">🔒🐜</span>
                        <span className="block text-[8px] font-black text-orange-400">LOCKED ANT</span>
                        <span className="block text-[7px] text-gray-400 font-bold">{profile.streakDays}/10 DAYS</span>
                      </div>
                    )
                  )}
                  {decor.pet === 'cyber_doge' && (
                    <div className="p-1.5 rounded-2xl bg-amber-500/20 border border-amber-400 text-center shadow-lg animate-pulse">
                      <span className="text-2xl">🐕‍🦺</span>
                      <span className="block text-[8px] font-black text-amber-300">CYBER DOGE</span>
                    </div>
                  )}
                  {decor.pet === 'recon_drone' && (
                    <div className="p-1.5 rounded-2xl bg-cyan-500/20 border border-cyan-400 text-center shadow-lg animate-bounce" style={{ animationDuration: '3.5s' }}>
                      <span className="text-2xl">🛸</span>
                      <span className="block text-[8px] font-black text-cyan-300">RECON DRONE</span>
                    </div>
                  )}
                  {decor.pet === 'mecha_kitty' && (
                    <div className="p-1.5 rounded-2xl bg-pink-500/20 border border-pink-400 text-center shadow-lg animate-pulse">
                      <span className="text-2xl">🐱</span>
                      <span className="block text-[8px] font-black text-pink-300">MECHA KITTY</span>
                    </div>
                  )}
                </div>

                {/* THE 3D ROBLOX DETECTIVE AVATAR */}
                <div className="w-36 sm:w-40 h-44 sm:h-48 relative z-20">
                  <RobloxAvatar
                    size="lg"
                    equipped={profile.equipped}
                    showCompanion={false}
                    interactive={true}
                  />
                </div>
              </div>

              {/* 3D COMMAND DESK VISUAL */}
              <div
                className={`w-72 sm:w-96 h-18 -mt-4 rounded-3xl border-2 flex items-center justify-between px-3.5 sm:px-5 shadow-2xl relative z-30 transition-all duration-500 ${
                  decor.deskStyle === 'cyber_neon'
                    ? 'bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-cyan-400 text-cyan-300 shadow-cyan-500/30'
                    : decor.deskStyle === 'classic_wood'
                    ? 'bg-gradient-to-r from-amber-950 via-stone-900 to-yellow-950 border-amber-500 text-amber-200'
                    : decor.deskStyle === 'holo_glass'
                    ? 'bg-white/20 backdrop-blur-xl border-white/50 text-white shadow-purple-500/20'
                    : 'bg-zinc-900 border-zinc-500 text-zinc-200 shadow-xl'
                }`}
              >
                {/* Desk Lamp or Holo Screen */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] sm:text-[11px] font-black tracking-wider truncate max-w-[80px] sm:max-w-[120px]">
                    {decor.deskStyle === 'cyber_neon' && 'QUANTUM CONSOLE'}
                    {decor.deskStyle === 'classic_wood' && 'MAHOGANY DESK'}
                    {decor.deskStyle === 'holo_glass' && 'HOLO GLASS 3000'}
                    {decor.deskStyle === 'tactical_iron' && 'TACTICAL STATION'}
                  </span>
                </div>

                {/* Center: Detective Food & Snacks Station (:3) */}
                <button
                  onClick={triggerMunchFood}
                  className="group relative px-2.5 py-1 rounded-2xl bg-black/50 hover:bg-black/75 border border-amber-400/50 hover:border-amber-300 transition-all flex items-center gap-1.5 cursor-pointer hover:scale-110 active:scale-95 shadow-lg shadow-amber-500/20"
                  title={hqLang === 'vi' ? 'Bấm để măm măm đồ ăn vỗ béo thám tử :3' : 'Click to munch delicious food snack :3'}
                >
                  <span className="text-xl sm:text-2xl transition-transform group-hover:rotate-12 inline-block">
                    {decor.snack === 'pizza_box' && '🍕'}
                    {decor.snack === 'boba_tea' && '🧋'}
                    {decor.snack === 'ramen_bowl' && '🍜'}
                    {decor.snack === 'bloxy_burger' && '🍔'}
                    {decor.snack === 'sushi_boat' && '🍣'}
                    {decor.snack === 'donut_stack' && '🍩'}
                    {decor.snack === 'popcorn_tub' && '🍿'}
                    {decor.snack === 'dimsum_steamer' && '🥟'}
                    {decor.snack === 'taco_fiesta' && '🌮'}
                  </span>
                  <span className="text-[9px] font-black text-amber-300 hidden sm:inline-block">
                    {decor.snack === 'pizza_box' && 'Pizza'}
                    {decor.snack === 'boba_tea' && 'Boba Tea'}
                    {decor.snack === 'ramen_bowl' && 'Ramen'}
                    {decor.snack === 'bloxy_burger' && 'Burger'}
                    {decor.snack === 'sushi_boat' && 'Sushi'}
                    {decor.snack === 'donut_stack' && 'Donuts'}
                    {decor.snack === 'popcorn_tub' && 'Popcorn'}
                    {decor.snack === 'dimsum_steamer' && 'Dim Sum'}
                    {decor.snack === 'taco_fiesta' && 'Tacos'}
                  </span>
                  <span className="text-[8px] bg-amber-500/30 text-amber-200 px-1 rounded font-mono font-bold">
                    :3
                  </span>
                  {/* Hot steam aroma animation */}
                  {(['ramen_bowl', 'dimsum_steamer', 'pizza_box'].includes(decor.snack)) && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] animate-bounce pointer-events-none">
                      ♨️
                    </span>
                  )}
                </button>

                {/* Desk Flora / Plant */}
                <div className="text-2xl transition-transform hover:scale-125 cursor-pointer" title="Office Plant">
                  {decor.plant === 'cyber_bonsai' && '🪴'}
                  {decor.plant === 'neon_sakura' && '🌸'}
                  {decor.plant === 'digital_cactus' && '🌵'}
                  {decor.plant === 'space_orchid' && '🪻'}
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT WING: CITIZEN CASE FILES QUEUE BOARD                    */}
            {/* ------------------------------------------------------------- */}
            <div
              className="absolute top-10 right-4 sm:right-10 z-20 w-72 sm:w-80 transition-all duration-500"
              style={{ transform: 'translateZ(-20px) rotateY(-18deg)' }}
            >
              <div
                className={`p-4 rounded-3xl border-2 backdrop-blur-xl shadow-2xl ${
                  isDayMode
                    ? 'bg-white/90 border-sky-300 text-slate-900 shadow-sky-500/20'
                    : 'bg-[#15122B]/95 border-orange-500/60 text-white shadow-orange-500/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base animate-bounce">🚨</span>
                    <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider">
                      {hqLang === 'en' ? 'CASE INTAKE BOARD' : 'HÀNG ĐỢI TIẾP NHẬN'}
                    </h4>
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-500 text-white">
                    {cases.filter((c) => !c.solved).length} ACTIVE
                  </span>
                </div>

                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {cases.map((clientCase) => (
                    <div
                      key={clientCase.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCase(clientCase);
                      }}
                      className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 group ${
                        clientCase.solved
                          ? isDayMode
                            ? 'bg-emerald-50 border-emerald-300 opacity-75'
                            : 'bg-emerald-950/40 border-emerald-500/30 opacity-75'
                          : isDayMode
                          ? 'bg-sky-50 hover:bg-sky-100 border-sky-200 shadow-sm hover:border-orange-400'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-orange-500/60 shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="text-xl p-1.5 rounded-xl bg-black/20 flex-shrink-0">
                          {clientCase.avatarIcon}
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-xs truncate max-w-[110px]">
                              {clientCase.clientName}
                            </span>
                            {clientCase.solved ? (
                              <span className="px-1 py-0.2 rounded text-[8px] font-black bg-emerald-500 text-white">
                                SOLVED
                              </span>
                            ) : (
                              <span className="px-1 py-0.2 rounded text-[8px] font-black bg-rose-500 text-white animate-pulse">
                                URGENT
                              </span>
                            )}
                          </div>
                          <p className={`text-[10px] truncate max-w-[130px] ${
                            isDayMode ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {hqLang === 'en' ? clientCase.situationEn : clientCase.situationVi}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="text-[10px] font-black text-amber-500">
                          +{clientCase.rewardCoins}🪙
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Floating Snack Munch Notification Toast */}
          <AnimatePresence>
            {snackToast && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="absolute top-16 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-black/90 border-2 border-amber-400 text-amber-200 text-xs sm:text-sm font-black shadow-2xl shadow-amber-500/40 backdrop-blur-md flex items-center gap-3 text-center pointer-events-none max-w-md"
              >
                <span className="text-2xl animate-bounce">😋</span>
                <span>{snackToast}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM QUICK ACTIONS IN 3D HQ */}
        <div className="relative z-20 p-3 sm:p-4 bg-black/60 backdrop-blur-md border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-bold">
            <span className="text-orange-400">💡 {hqLang === 'en' ? 'BUREAU SECURITY TIP:' : 'MẸO THÁM TỬ:'}</span>
            <span className={isDayMode ? 'text-slate-300' : 'text-gray-300'}>
              {hqLang === 'en'
                ? 'Always scrutinize domain endings like .xyz, .top, or .tk — reputable banks never use disposable cheap domains!'
                : 'Luôn soi kỹ đuôi tên miền (.xyz, .top, .tk) — các ngân hàng chính thống không bao giờ dùng tên miền giá rẻ!'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('scanner')}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 font-black transition-all border border-white/10 flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>{hqLang === 'en' ? 'Custom URL Scanner' : 'Mở Máy Quét Tự Do'}</span>
            </button>
            <button
              onClick={() => onNavigate('wardrobe')}
              className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>{hqLang === 'en' ? 'Roblox Wardrobe' : 'Tủ Đồ Roblox'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CLIENT CASE FORENSIC DECODER MODAL                                      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0A0D1E]/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="relative w-full max-w-2xl bg-gradient-to-b from-[#1C183B] via-[#241F4C] to-[#14112B] rounded-3xl overflow-hidden shadow-2xl border-2 border-orange-500 text-white my-4"
            >
              {/* Modal Top Header */}
              <div className="p-5 bg-gradient-to-r from-orange-600/40 via-purple-600/30 to-cyan-600/30 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl p-2 rounded-2xl bg-black/30">
                    {activeCase.avatarIcon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-black font-['Plus_Jakarta_Sans','Be_Vietnam_Pro',sans-serif]">
                        {activeCase.clientName}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white uppercase">
                        {activeCase.threatLevel}
                      </span>
                    </div>
                    <p className="text-xs text-orange-200">{activeCase.role}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveCase(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-5 text-left text-xs">
                {/* Step 1: The Client's Dilemma */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[11px] font-black text-orange-400 uppercase tracking-wider block mb-1">
                    💬 {hqLang === 'en' ? 'Citizen Testimony:' : 'Lời Cầu Cứu Của Khách Hàng:'}
                  </span>
                  <p className="text-sm font-semibold text-gray-100 leading-relaxed italic">
                    "{hqLang === 'en' ? activeCase.situationEn : activeCase.situationVi}"
                  </p>
                  <div className="mt-2 text-[11px] text-gray-400">
                    <span className="font-bold text-gray-300">Sender / Origin: </span>
                    <span>{activeCase.sender}</span>
                  </div>
                </div>

                {/* Step 2: The Suspicious Link under Examination */}
                <div className="p-4 rounded-2xl bg-[#0F0D24] border-2 border-cyan-500/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-cyan-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                      {hqLang === 'en' ? 'QUANTUM FORENSIC LINK SCAN' : 'MÁY GIẢI MÃ LƯỢNG TỬ ĐANG QUÉT'}
                    </span>
                    <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded-full font-bold">
                      {activeCase.analysis.dangerLevel}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/60 border border-cyan-500/30 font-mono text-xs text-rose-300 break-all select-all">
                    {activeCase.suspiciousUrl}
                  </div>

                  {/* Forensic Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-gray-400 block text-[10px] font-bold">REAL DOMAIN DETECTED:</span>
                      <span className="font-black text-rose-400 font-mono text-xs">{activeCase.analysis.realDomain}</span>
                      <p className="text-[10px] text-gray-300 mt-1">{activeCase.analysis.fakePart}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-gray-400 block text-[10px] font-bold">PSYCHOLOGICAL TRICK:</span>
                      <span className="font-bold text-amber-300 text-xs">
                        {hqLang === 'en' ? activeCase.analysis.urgencyTrickEn : activeCase.analysis.urgencyTrickVi}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 3: Detective Action / Verdict */}
                {activeCase.solved ? (
                  <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 text-emerald-400 font-black text-base">
                      <CheckCircle2 className="w-6 h-6" />
                      <span>{hqLang === 'en' ? 'CASE RESOLVED! CITIZEN PROTECTED!' : 'VỤ ÁN ĐÃ ĐƯỢC PHÁ! CÔNG DÂN AN TOÀN!'}</span>
                    </div>
                    <p className="text-xs text-emerald-200">
                      You successfully identified and blocked the phishing trap, earning{' '}
                      <strong>+{activeCase.rewardCoins} Coins</strong> &amp; <strong>+{activeCase.rewardXp} XP</strong>!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <span className="block text-xs font-black text-gray-300 uppercase tracking-wider text-center">
                      ⚖️ {hqLang === 'en' ? 'CHIEF DETECTIVE VERDICT:' : 'KẾT LUẬN CỦA THÁM TỬ TRƯỞNG:'}
                    </span>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleSolveCase('block_scam')}
                        className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                      >
                        <ShieldAlert className="w-5 h-5" />
                        <span>{hqLang === 'en' ? 'BLOCK SCAM LINK!' : 'CHẶN ĐÂY LÀ LỪA ĐẢO!'}</span>
                      </button>

                      <button
                        onClick={() => {
                          alert(hqLang === 'en' ? 'Warning: High risk scam indicators detected! Inspect the domain suffix carefully!' : 'Cảnh báo: Link này có dấu hiệu lừa đảo nguy hiểm! Hãy soi lại tên miền!');
                        }}
                        className="py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-gray-300 font-bold text-xs sm:text-sm border border-white/10 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                      >
                        <ShieldCheck className="w-5 h-5 text-emerald-400" />
                        <span>{hqLang === 'en' ? 'SAFE (ALLOW)' : 'BỎ QUA (CHO PHÉP)'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 5. VASTLY EXPANDED HQ DECOR STUDIO MODAL (9 Categories)                    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showDecorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0A0D1E]/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="relative w-full max-w-2xl bg-gradient-to-b from-[#1E193C] via-[#241F4C] to-[#15122E] rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-500 text-white my-4"
            >
              {/* Header */}
              <div className="p-5 bg-gradient-to-r from-purple-600/40 via-indigo-600/30 to-orange-600/30 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Palette className="w-6 h-6 text-amber-300" />
                  <div>
                    <h3 className="text-xl font-black font-['Plus_Jakarta_Sans','Be_Vietnam_Pro',sans-serif]">
                      {hqLang === 'en' ? '3D HQ DECOR STUDIO' : 'TRANG TRÍ TRỤ SỞ 3D'}
                    </h3>
                    <p className="text-[11px] text-gray-300">
                      Customize your command room with authentic 3D props & aesthetics
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDecorModal(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Category Selector Tabs */}
              <div className="flex items-center gap-1.5 p-3 overflow-x-auto no-scrollbar border-b border-white/10 bg-black/20 text-xs font-bold">
                {[
                  { id: 'snack', label: '🍕 Food & Snacks :3' },
                  { id: 'name', label: '🏢 HQ Name' },
                  { id: 'desk', label: '🖥️ Desk' },
                  { id: 'rug', label: '🧶 Floor Rug' },
                  { id: 'wall', label: '🌐 Wall Display' },
                  { id: 'plant', label: '🪴 Plant' },
                  { id: 'amenity', label: '⚡ Amenities' },
                  { id: 'pet', label: '🐾 Sidekick' },
                  { id: 'vista', label: '🌆 Skyline Vista' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setDecorCategory(tab.id as any)}
                    className={`px-3 py-1.5 rounded-xl flex-shrink-0 transition-all cursor-pointer ${
                      decorCategory === tab.id
                        ? 'bg-orange-500 text-white font-black shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Options Grid for Selected Category */}
              <div className="p-6 space-y-4 text-xs text-left max-h-[60vh] overflow-y-auto">
                {/* 0. FOOD & SNACKS (:3) */}
                {decorCategory === 'snack' && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-black text-amber-300 block uppercase tracking-wider">
                        🍕 Detective Food &amp; Snacks on Desk (Đồ ăn các thứ :3):
                      </span>
                      <button
                        onClick={triggerMunchFood}
                        className="px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <span>Munch Test :3</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-300 mb-3">
                      Select your favorite delicious fuel for long anti-scam stakeouts. Visible right on your command desk!
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'pizza_box', icon: '🍕', name: 'Cyber Pizza Box', vi: 'Pizza Bò Cay Phô Mai', desc: 'Cheesy pepperoni slice with dipping sauce' },
                        { id: 'boba_tea', icon: '🧋', name: 'Brown Sugar Boba', vi: 'Trà Sữa Trân Châu', desc: 'Sweet brown sugar milk tea with extra pearls' },
                        { id: 'ramen_bowl', icon: '🍜', name: 'Tokyo Cyber Ramen', vi: 'Mì Ramen Xá Xíu', desc: 'Steaming chashu broth & soft-boiled egg' },
                        { id: 'bloxy_burger', icon: '🍔', name: 'Bloxy Burger & Fries', vi: 'Burger Bò & Khoai Tây', desc: 'Double cheese burger with crunchy golden fries' },
                        { id: 'sushi_boat', icon: '🍣', name: 'Tokyo Sushi Boat', vi: 'Thuyền Sushi Cá Hồi', desc: 'Fresh salmon nigiri, roe & wasabi' },
                        { id: 'donut_stack', icon: '🍩', name: 'Matcha Donuts', vi: 'Bánh Donut Matcha', desc: 'Sweet green tea glaze with cyber sprinkles' },
                        { id: 'popcorn_tub', icon: '🍿', name: 'Cheese Popcorn Tub', vi: 'Bắp Rang Bơ Phô Mai', desc: 'Hot buttery cinema cheese popcorn' },
                        { id: 'dimsum_steamer', icon: '🥟', name: 'Dim Sum Steamer', vi: 'Xửng Dim Sum Há Cảo', desc: 'Steaming shrimp & pork dumplings' },
                        { id: 'taco_fiesta', icon: '🌮', name: 'Cyber Tacos', vi: 'Taco Bò Cay Giòn', desc: 'Crunchy beef taco with salsa & melted cheddar' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setDecor({ ...decor, snack: item.id as any });
                            triggerMunchFood();
                          }}
                          className={`p-3 rounded-2xl border transition-all text-center cursor-pointer relative ${
                            decor.snack === item.id
                              ? 'bg-amber-600/30 border-amber-400 text-white font-black shadow-lg shadow-amber-500/20 scale-102 ring-2 ring-amber-400/50'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-3xl block mb-1">{item.icon}</span>
                          <span className="font-bold block text-xs">{item.name}</span>
                          <span className="text-[10px] text-amber-300 block font-semibold">{item.vi}</span>
                          <span className="text-[9px] text-gray-400 block mt-0.5">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 0.5. HQ NAME */}
                {decorCategory === 'name' && (
                  <div className="space-y-4">
                    <span className="font-black text-orange-300 block uppercase tracking-wider">
                      🏢 Headquarters Name &amp; Identity (Đặt tên trụ sở):
                    </span>
                    <p className="text-[11px] text-gray-300">
                      Give your cyber detective citadel an iconic name. It will be showcased on the top command deck and displayed on the 3D holographic wall billboard!
                    </p>

                    <div className="p-4 rounded-2xl bg-black/40 border border-orange-400/30 space-y-3">
                      <label className="text-[11px] font-black text-orange-300 uppercase block">
                        Headquarters Name:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tempHqName}
                          onChange={(e) => setTempHqName(e.target.value)}
                          maxLength={36}
                          placeholder="e.g. LUCERA PRIME CITADEL"
                          className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/20 text-white text-xs font-bold focus:border-orange-400 focus:outline-none"
                        />
                        <button
                          onClick={() => {
                            const trimmed = tempHqName.trim() || 'LUCERA PRIME CITADEL';
                            setHqName(trimmed);
                            confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
                          }}
                          className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs transition-all cursor-pointer"
                        >
                          Update
                        </button>
                      </div>

                      <div className="pt-2">
                        <span className="text-[10px] text-gray-400 font-bold block mb-1.5 uppercase">
                          Quick Presets (Gợi ý tên độc đáo):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            'LUCERA PRIME CITADEL',
                            'Trụ Sở Thám Tử Bóng Đêm',
                            'Cyber Anti-Scam Base 3D',
                            'Tiệm Phá Án & Trà Sữa :3',
                            'FPT Cyber Defense Hub',
                            'Phòng Chỉ Huy Siêu Cấp Vip Pro',
                            'Neo Saigon Detective Station',
                            'Zero Trust Scam Hunters'
                          ].map((preset) => (
                            <button
                              key={preset}
                              onClick={() => {
                                setTempHqName(preset);
                                setHqName(preset);
                              }}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                                hqName === preset
                                  ? 'bg-orange-500/30 border-orange-400 text-orange-200'
                                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                              }`}
                            >
                              {preset}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 1. DESK */}
                {decorCategory === 'desk' && (
                  <div>
                    <span className="font-black text-cyan-300 block mb-2 uppercase tracking-wider">
                      Command Console Style:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: 'cyber_neon', icon: '🖥️', name: 'Cyber Neon Desk', desc: 'Glowing cyan LED trims' },
                        { id: 'classic_wood', icon: '🪵', name: 'Mahogany Wood', desc: 'Vintage detective style' },
                        { id: 'holo_glass', icon: '🔮', name: 'Holo Crystal Glass', desc: 'Anti-gravity clear glass' },
                        { id: 'tactical_iron', icon: '🛡️', name: 'Tactical Steel', desc: 'Matte stealth armor' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setDecor({ ...decor, deskStyle: item.id as any })}
                          className={`p-3 rounded-2xl border transition-all text-center cursor-pointer ${
                            decor.deskStyle === item.id
                              ? 'bg-cyan-600/30 border-cyan-400 text-white font-black shadow-md scale-102 ring-2 ring-cyan-400/50'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-2xl block mb-1">{item.icon}</span>
                          <span className="font-bold block">{item.name}</span>
                          <span className="text-[10px] text-gray-400">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. RUG */}
                {decorCategory === 'rug' && (
                  <div>
                    <span className="font-black text-amber-300 block mb-2 uppercase tracking-wider">
                      Floor Carpet & Zone Mat:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: 'cyber_grid', icon: '🔷', name: 'Cyber Hex Grid', desc: 'Cyan & purple LED glow' },
                        { id: 'persian_carpet', icon: '⚜️', name: 'Royal Persian', desc: 'Crimson gold ornate weave' },
                        { id: 'fpt_orange', icon: '🐜', name: 'FPT Circuit Mat', desc: 'Vibrant orange cyber ant' },
                        { id: 'hazard_mat', icon: '⚠️', name: 'Hazard Caution', desc: 'Restricted security zone' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setDecor({ ...decor, floorRug: item.id as any })}
                          className={`p-3 rounded-2xl border transition-all text-center cursor-pointer ${
                            decor.floorRug === item.id
                              ? 'bg-amber-600/30 border-amber-400 text-white font-black shadow-md scale-102 ring-2 ring-amber-400/50'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-2xl block mb-1">{item.icon}</span>
                          <span className="font-bold block">{item.name}</span>
                          <span className="text-[10px] text-gray-400">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. WALL DISPLAY */}
                {decorCategory === 'wall' && (
                  <div>
                    <span className="font-black text-purple-300 block mb-2 uppercase tracking-wider">
                      Wall Screen & Holo Art:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: 'threat_map', icon: '🌐', name: 'Threat World Radar', desc: 'Live spinning globe' },
                        { id: 'lucera_crest', icon: '🛡️', name: 'LUCERA Crest', desc: 'Golden Detective shield' },
                        { id: 'matrix_rain', icon: '💻', name: 'Matrix Code Rain', desc: 'Green hacker waterfall' },
                        { id: 'hall_of_fame', icon: '🏆', name: 'Hall of Fame', desc: 'Framed awards & trophies' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setDecor({ ...decor, wallDisplay: item.id as any })}
                          className={`p-3 rounded-2xl border transition-all text-center cursor-pointer ${
                            decor.wallDisplay === item.id
                              ? 'bg-purple-600/30 border-purple-400 text-white font-black shadow-md scale-102 ring-2 ring-purple-400/50'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-2xl block mb-1">{item.icon}</span>
                          <span className="font-bold block">{item.name}</span>
                          <span className="text-[10px] text-gray-400">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. PLANT */}
                {decorCategory === 'plant' && (
                  <div>
                    <span className="font-black text-emerald-300 block mb-2 uppercase tracking-wider">
                      Office Flora & Bio-Hologram:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: 'cyber_bonsai', icon: '🪴', name: 'Cyber Bonsai', desc: 'Japanese pine with LED' },
                        { id: 'neon_sakura', icon: '🌸', name: 'Neon Sakura', desc: 'Glowing cherry blossom' },
                        { id: 'digital_cactus', icon: '🌵', name: 'Digital Cactus', desc: 'Polygon holo-cactus' },
                        { id: 'space_orchid', icon: '🪻', name: 'Space Orchid', desc: 'Bioluminescent azure flora' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setDecor({ ...decor, plant: item.id as any })}
                          className={`p-3 rounded-2xl border transition-all text-center cursor-pointer ${
                            decor.plant === item.id
                              ? 'bg-emerald-600/30 border-emerald-400 text-white font-black shadow-md scale-102 ring-2 ring-emerald-400/50'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-2xl block mb-1">{item.icon}</span>
                          <span className="font-bold block">{item.name}</span>
                          <span className="text-[10px] text-gray-400">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. AMENITY */}
                {decorCategory === 'amenity' && (
                  <div>
                    <span className="font-black text-rose-300 block mb-2 uppercase tracking-wider">
                      Office Machine & Equipment:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {[
                        { id: 'bloxy_dispenser', icon: '🧃', name: 'Bloxy Cola Machine', desc: 'Classic red soda fridge' },
                        { id: 'coffee_bot', icon: '☕', name: 'Coffee Bot 3000', desc: 'Robotic barista machine' },
                        { id: 'snack_buffet', icon: '🍱', name: 'Snack Bar Buffet :3', desc: '24/7 unlimited buffet counter' },
                        { id: 'quantum_server', icon: '🖥️', name: 'AI Quantum Server', desc: 'Phishing threat computer' },
                        { id: 'arcade_cab', icon: '🕹️', name: 'Scam Bust Arcade', desc: 'Retro 80s coin-op machine' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setDecor({ ...decor, amenity: item.id as any })}
                          className={`p-3 rounded-2xl border transition-all text-center cursor-pointer ${
                            decor.amenity === item.id
                              ? 'bg-rose-600/30 border-rose-400 text-white font-black shadow-md scale-102 ring-2 ring-rose-400/50'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-2xl block mb-1">{item.icon}</span>
                          <span className="font-bold block">{item.name}</span>
                          <span className="text-[10px] text-gray-400">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. PET */}
                {decorCategory === 'pet' && (
                  <div>
                    <span className="font-black text-orange-300 block mb-2 uppercase tracking-wider">
                      Sidekick & Cyber Companion:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: 'recon_drone', icon: '🛸', name: 'Recon Drone', desc: 'Floating scanner sidekick' },
                        { id: 'cyber_doge', icon: '🐕‍🦺', name: 'Cyber Doge', desc: 'Cyberpunk golden shiba' },
                        { id: 'mecha_kitty', icon: '🐱', name: 'Mecha Kitty', desc: 'Neon pink robotic cat' },
                        { id: 'orange_ant', icon: '🐜', name: 'FPT Kiến Sáng', desc: 'Loyal orange ant mascot' }
                      ].map((item) => {
                        const isLocked = item.id === 'orange_ant' && profile.streakDays < 10;
                        return (
                          <button
                            key={item.id}
                            disabled={isLocked}
                            onClick={() => {
                              if (isLocked) return;
                              setDecor({ ...decor, pet: item.id as any });
                            }}
                            className={`p-3 rounded-2xl border transition-all text-center relative ${
                              isLocked
                                ? 'bg-black/40 border-white/5 opacity-50 cursor-not-allowed'
                                : decor.pet === item.id
                                ? 'bg-orange-600/30 border-orange-400 text-white font-black shadow-md scale-102 ring-2 ring-orange-400/50 cursor-pointer'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 cursor-pointer'
                            }`}
                          >
                            {isLocked && (
                              <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-orange-500/30 border border-orange-400/50 text-[9px] font-black text-orange-300">
                                🔒 {profile.streakDays}/10d
                              </div>
                            )}
                            <span className="text-2xl block mb-1">{item.icon}</span>
                            <span className="font-bold block text-xs">{item.name}</span>
                            <span className="text-[10px] text-gray-400 block mt-0.5">
                              {isLocked ? `Locked: 10-day streak needed (${profile.streakDays}/10d)` : item.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 7. VISTA */}
                {decorCategory === 'vista' && (
                  <div>
                    <span className="font-black text-blue-300 block mb-2 uppercase tracking-wider">
                      Panoramic Window Vista:
                    </span>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: 'cyber_city', icon: '🌆', name: 'Neon Metropolis', desc: 'Towering skyscrapers' },
                        { id: 'cloud_layer', icon: '☁️', name: 'High-Altitude Clouds', desc: 'Floating above sea level' },
                        { id: 'neon_rain', icon: '🌧️', name: 'Cyber Rainstorm', desc: 'Moody rainy cyber night' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setDecor({ ...decor, windowVista: item.id as any })}
                          className={`p-3 rounded-2xl border transition-all text-center cursor-pointer ${
                            decor.windowVista === item.id
                              ? 'bg-blue-600/30 border-blue-400 text-white font-black shadow-md scale-102 ring-2 ring-blue-400/50'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <span className="text-2xl block mb-1">{item.icon}</span>
                          <span className="font-bold block">{item.name}</span>
                          <span className="text-[10px] text-gray-400">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Apply Button */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setShowDecorModal(false);
                      confetti({
                        particleCount: 50,
                        spread: 60,
                        origin: { y: 0.6 }
                      });
                    }}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm shadow-lg shadow-orange-500/30 transition-all active:scale-95 cursor-pointer"
                  >
                    SAVE & APPLY TO 3D HEADQUARTERS
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 6. QUICK RENAME HEADQUARTERS MODAL ("đặt tên trụ sở")                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showRenameModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="relative w-full max-w-md bg-gradient-to-b from-[#1F193D] to-[#120F24] rounded-3xl overflow-hidden shadow-2xl border-2 border-orange-500 text-white p-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-black">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black font-['Plus_Jakarta_Sans','Be_Vietnam_Pro',sans-serif]">
                      {hqLang === 'en' ? 'RENAME HEADQUARTERS' : 'ĐẶT TÊN TRỤ SỞ 3D'}
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      {hqLang === 'en' ? 'Set custom title for your bureau & 3D room' : 'Tùy biến tên căn cứ & biển hiệu neon 3D'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowRenameModal(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-left">
                <div>
                  <label className="text-[11px] font-black text-orange-300 uppercase block mb-1.5">
                    {hqLang === 'en' ? 'Headquarters Name:' : 'Tên Trụ Sở Mới:'}
                  </label>
                  <input
                    type="text"
                    value={tempHqName}
                    onChange={(e) => setTempHqName(e.target.value)}
                    maxLength={36}
                    placeholder="e.g. LUCERA PRIME CITADEL"
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-white text-sm font-bold focus:border-orange-400 focus:outline-none"
                    autoFocus
                  />
                  <div className="flex justify-between items-center text-[10px] text-gray-400 mt-1 px-1">
                    <span>⚡ Displayed on 3D Neon Sign</span>
                    <span>{tempHqName.length}/36 chars</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-gray-400 font-bold block mb-2 uppercase">
                    {hqLang === 'en' ? 'Quick Name Presets:' : 'Gợi Ý Tên Căn Cứ Độc Đáo:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'LUCERA PRIME CITADEL',
                      'Trụ Sở Thám Tử Bóng Đêm',
                      'Cyber Anti-Scam Base 3D',
                      'Tiệm Phá Án & Trà Sữa :3',
                      'FPT Cyber Defense Hub',
                      'Phòng Chỉ Huy Siêu Cấp Vip Pro',
                      'Zero Trust Scam Hunters',
                      'Cyber Police Station 01'
                    ].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setTempHqName(preset)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                          tempHqName === preset
                            ? 'bg-orange-500/30 border-orange-400 text-orange-200'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => setShowRenameModal(false)}
                    className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all cursor-pointer"
                  >
                    {hqLang === 'en' ? 'Cancel' : 'Hủy'}
                  </button>
                  <button
                    onClick={() => {
                      const trimmed = tempHqName.trim() || 'LUCERA PRIME CITADEL';
                      setHqName(trimmed);
                      setShowRenameModal(false);
                      setSnackToast(`🏢 Trụ sở đã được đổi tên thành "${trimmed}"!`);
                      setTimeout(() => setSnackToast(null), 3000);
                      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
                    }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs shadow-lg shadow-orange-500/30 transition-all cursor-pointer active:scale-95"
                  >
                    {hqLang === 'en' ? 'Save Headquarters Name' : 'Lưu Tên Trụ Sở'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

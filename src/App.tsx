import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ScannerView } from './components/ScannerView';
import { GamesHub } from './components/GamesHub';
import { LearnView } from './components/LearnView';
import { WardrobeShop } from './components/WardrobeShop';
import { ProfileView } from './components/ProfileView';
import { WelcomeModal } from './components/WelcomeModal';
import { LoginModal } from './components/LoginModal';
import { CyberHQView } from './components/CyberHQView';
import { GuideModal } from './components/GuideModal';
import { UserProtocolView } from './components/UserProtocolView';
import { MusicWithHackerWidget } from './components/MusicWithHackerWidget';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { INITIAL_USER_PROFILE, calculateLevel } from './data/wardrobeItems';
import { UserProfile, DetectiveItem, NavTab, HackerRewardInfo } from './types';
import { HackerMoneyTopBar } from './components/HackerMoneyTopBar';
import { AllTheThingsView } from './components/AllTheThingsView';
import { trackStatEvent } from './utils/statsTracker';
import { playCorrectTingTing, playCoinReward } from './utils/soundEffects';
import confetti from 'canvas-confetti';

function MainAppContent() {
  const { theme, isPastel } = useTheme();
  const { isVi } = useLanguage();

  // Navigation State - Defaults to the 3D Cyber Headquarters
  const [currentTab, setCurrentTab] = useState<NavTab>('hq');
  const [scannerInitialQuery, setScannerInitialQuery] = useState<string>('');

  // Music with Hacker :3 modal state
  const [showMusicModal, setShowMusicModal] = useState<boolean>(false);

  // Authentication / Clearance Login State
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('lucera_logged_in') === 'true';
    } catch {
      return false;
    }
  });

  const [showLoginModal, setShowLoginModal] = useState<boolean>(() => {
    try {
      return localStorage.getItem('lucera_logged_in') !== 'true';
    } catch {
      return true;
    }
  });

  // Bilingual Guide Modal State
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);

  // User Profile State with LocalStorage Persistence
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('lucera_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Reset legacy mock profile if it has mock level 10 & 1250 XP
        if (parsed.xp === 1250 && parsed.coins === 450 && parsed.streakDays === 12) {
          return INITIAL_USER_PROFILE;
        }
        return parsed;
      }
    } catch {}
    return INITIAL_USER_PROFILE;
  });

  // Onboarding Modal State (only for brand new visits after login)
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(false);

  // Companion mascot state
  const [showCompanion, setShowCompanion] = useState(true);

  // Hacker's Money state - displayed on top bar after winning game maps
  const [lastHackerReward, setLastHackerReward] = useState<HackerRewardInfo | null>(() => {
    try {
      const saved = localStorage.getItem('lucera_last_hacker_reward');
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  // Sync profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lucera_user_profile', JSON.stringify(profile));
    } catch {}
  }, [profile]);

  // Playtime tracker (every minute increments defense duration)
  useEffect(() => {
    const timer = setInterval(() => {
      trackStatEvent('play_minute', 1);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Streak verification logic on app mount
  useEffect(() => {
    const lastLogin = localStorage.getItem('lucera_last_login');
    const today = new Date().toDateString();

    if (lastLogin !== today) {
      localStorage.setItem('lucera_last_login', today);
      setProfile((prev) => {
        const nextStreak = prev.streakDays + 1;
        const newBadges = [...prev.badges];
        if (nextStreak >= 7 && !newBadges.includes('badge-streak-7')) {
          newBadges.push('badge-streak-7');
        }
        if (nextStreak >= 10 && !newBadges.includes('badge-fpt-companion')) {
          newBadges.push('badge-fpt-companion');
        }
        return {
          ...prev,
          streakDays: nextStreak,
          badges: newBadges
        };
      });
    }
  }, []);

  // Login handler with username and clearance verification
  const handleLoginSuccess = (username: string) => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
    try {
      localStorage.setItem('lucera_logged_in', 'true');
    } catch {}

    setProfile((prev) => ({
      ...prev,
      name: username,
      noobName: username
    }));

    // New login lands on Home (Safe Lab) where the Rookie Guide is recommended!
    setCurrentTab('home');
    playCorrectTingTing();

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Earn rewards handler (XP & Coins) - Updates hacker's money bar on top & stats
  const handleEarnReward = (earnedXp: number, earnedCoins: number, sourceGameName?: string) => {
    playCoinReward();
    trackStatEvent('money_earned', earnedCoins);
    trackStatEvent('case_solved', 1);

    setProfile((prev) => {
      const newXp = prev.xp + earnedXp;
      const newCoins = prev.coins + earnedCoins;
      const levelData = calculateLevel(newXp);
      const newBadges = [...prev.badges];

      if (levelData.level >= 5 && !newBadges.includes('badge-first-scan')) {
        newBadges.push('badge-first-scan');
      }
      if (levelData.level >= 10 && !newBadges.includes('badge-scam-detective')) {
        newBadges.push('badge-scam-detective');
      }

      // Update and persist hacker's money bar notification
      const rewardInfo: HackerRewardInfo = {
        amount: earnedCoins,
        gameName: sourceGameName || (isVi ? 'Map Trò Chơi An Ninh' : 'Cyber Game Map'),
        totalCoins: newCoins,
        timestamp: Date.now()
      };
      setLastHackerReward(rewardInfo);
      try {
        localStorage.setItem('lucera_last_hacker_reward', JSON.stringify(rewardInfo));
      } catch {}

      return {
        ...prev,
        xp: newXp,
        coins: newCoins,
        level: levelData.level,
        title: levelData.title,
        gamesPlayed: prev.gamesPlayed + 1,
        badges: newBadges
      };
    });

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Equip wardrobe item handler
  const handleEquipItem = (category: 'hat' | 'glasses' | 'outfit' | 'hand' | 'skin', itemId: string) => {
    setProfile((prev) => ({
      ...prev,
      equipped: {
        ...prev.equipped,
        [category]: itemId
      }
    }));
  };

  // Buy wardrobe item handler
  const handleBuyItem = (item: DetectiveItem) => {
    if (profile.coins < item.price) return;
    playCoinReward();
    setProfile((prev) => ({
      ...prev,
      coins: prev.coins - item.price,
      unlockedItems: [...prev.unlockedItems, item.id],
      equipped: {
        ...prev.equipped,
        [item.category]: item.id
      }
    }));
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  // Claim manual streak reward
  const handleClaimDailyStreak = () => {
    playCoinReward();
    setProfile((prev) => ({
      ...prev,
      coins: prev.coins + 25,
      xp: prev.xp + 50
    }));
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.3 }
    });
  };

  // Quick scan trigger from home or cases
  const handleQuickScan = (query: string) => {
    setScannerInitialQuery(query);
    setCurrentTab('scanner');
  };

  // Name updates
  const handleUpdateNames = (name: string, noobName: string) => {
    setProfile((prev) => ({
      ...prev,
      name,
      noobName
    }));
  };

  // Comprehensive profile updates (name, alias, bio, motto)
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updated
    }));
  };

  // Create brand new profile with all stats starting at 0
  const handleCreateNewProfile = (newName: string, newNoobName: string, newBio: string) => {
    const freshProfile: UserProfile = {
      ...INITIAL_USER_PROFILE,
      name: newName.trim() || 'Agent Rookie',
      noobName: newNoobName.trim() || 'Detective Rookie',
      bio: newBio.trim() || 'Think twice. Click once.',
      level: 1,
      title: 'Rookie Detective 👶',
      xp: 0,
      coins: 0,
      streakDays: 0,
      scamsIdentified: 0,
      gamesPlayed: 0,
      accuracyRate: 0,
      badges: [],
      unlockedItems: [
        'hat-default',
        'glasses-none',
        'outfit-classic',
        'hand-none',
        'skin-anime-natural'
      ],
      equipped: {
        hat: 'hat-default',
        glasses: 'glasses-none',
        outfit: 'outfit-classic',
        hand: 'hand-none',
        skin: 'skin-anime-natural'
      }
    };
    setProfile(freshProfile);
    try {
      localStorage.setItem('lucera_user_profile', JSON.stringify(freshProfile));
      localStorage.setItem('lucera_last_login', new Date().toDateString());
    } catch {}
  };

  // Streak manual check-in from profile
  const handleStreakCheckIn = () => {
    playCoinReward();
    setProfile((prev) => {
      const nextStreak = prev.streakDays + 1;
      const newBadges = [...prev.badges];
      if (nextStreak >= 7 && !newBadges.includes('badge-streak-7')) {
        newBadges.push('badge-streak-7');
      }
      if (nextStreak >= 10 && !newBadges.includes('badge-fpt-companion')) {
        newBadges.push('badge-fpt-companion');
      }
      return {
        ...prev,
        streakDays: nextStreak,
        coins: prev.coins + 25,
        xp: prev.xp + 45,
        badges: newBadges
      };
    });
    try {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  return (
    <div className={`min-h-screen flex flex-col font-['Nunito','Be_Vietnam_Pro',sans-serif] selection:bg-orange-500 selection:text-white relative overflow-x-hidden transition-colors duration-300 ${
      isPastel
        ? 'bg-[#F9F7FD] text-slate-800'
        : 'bg-[#0E0B20] text-slate-100'
    }`}>
      
      {/* VIBRANT AMBIENT BACKGROUND GLOWS: DARK CYBER (DEEP PURPLE, RED, BLUE, BURNT ORANGE) vs PASTEL GLOW (LAVENDER, BABY BLUE, MINT, PEACH) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {isPastel ? (
          <>
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-pink-200/50 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-sky-200/50 rounded-full blur-3xl" />
            <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-purple-200/50 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-200/40 rounded-full blur-3xl" />
            <div 
              className="absolute inset-0 opacity-[0.04]" 
              style={{ backgroundImage: 'radial-gradient(#8b5cf6 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
            />
          </>
        ) : (
          <>
            <div className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-orange-600/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-[650px] h-[650px] bg-cyan-600/15 rounded-full blur-3xl" />
            <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-purple-700/20 rounded-full blur-3xl" />
            <div className="absolute top-2/3 right-10 w-[450px] h-[450px] bg-rose-600/15 rounded-full blur-3xl" />
            <div 
              className="absolute inset-0 opacity-[0.03]" 
              style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
            />
          </>
        )}
      </div>

      {/* HACKER'S MONEY TOP NOTIFICATION BAR (HIỆN RA KHI THẮNG MAP GAME) */}
      <HackerMoneyTopBar
        reward={lastHackerReward}
        onDismiss={() => setLastHackerReward(null)}
        onNavigateWardrobe={() => setCurrentTab('wardrobe')}
      />

      {/* STICKY TOP NAVBAR */}
      <div className="relative z-30">
        <Navbar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          profile={profile}
          lastHackerReward={lastHackerReward}
          onClaimDailyStreak={handleClaimDailyStreak}
          onOpenGuide={() => setShowGuideModal(true)}
          onOpenLogin={() => setShowLoginModal(true)}
          onOpenMusic={() => setShowMusicModal(true)}
        />
      </div>

      {/* MAIN BODY CONTENT ROUTER WITH ENHANCED ANIMATION TRANSITION */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <AnimatePresence mode="wait">
          
          {/* TAB: 3D CYBER HEADQUARTERS (HQ) */}
          {currentTab === 'hq' && (
            <motion.div
              key="hq"
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <CyberHQView
                profile={profile}
                onEarnReward={handleEarnReward}
                onNavigate={setCurrentTab}
                onOpenScannerWithQuery={handleQuickScan}
                onOpenGuide={() => setShowGuideModal(true)}
              />
            </motion.div>
          )}

          {/* TAB: SAFE LAB (TRANG CHỦ) */}
          {currentTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <HomeView
                onNavigate={setCurrentTab}
                onQuickScan={handleQuickScan}
                profile={profile}
                onOpenGuide={() => setShowGuideModal(true)}
              />
            </motion.div>
          )}

          {/* TAB: RADAR - SCANNER (CHECK IN & SĐT, QUÉT LINK) */}
          {currentTab === 'scanner' && (
            <motion.div
              key="scanner"
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <ScannerView
                initialQuery={scannerInitialQuery}
                onEarnReward={handleEarnReward}
                streakDays={profile.streakDays}
              />
            </motion.div>
          )}

          {/* TAB: GLITCH ZONE (KHU GAME - 6 MINIGAMES) */}
          {currentTab === 'games' && (
            <motion.div
              key="games"
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <GamesHub onEarnReward={handleEarnReward} />
            </motion.div>
          )}

          {/* TAB: KNOWLEDGE HUB (GÓC HỌC) */}
          {currentTab === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <LearnView onEarnReward={handleEarnReward} />
            </motion.div>
          )}

          {/* TAB: ARCON BUNKER (TỦ ĐỒ ARCON) */}
          {currentTab === 'wardrobe' && (
            <motion.div
              key="wardrobe"
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <WardrobeShop
                profile={profile}
                onEquipItem={handleEquipItem}
                onBuyItem={handleBuyItem}
                onToggleCompanion={() => setShowCompanion(!showCompanion)}
                showCompanion={showCompanion}
              />
            </motion.div>
          )}

          {/* TAB: ENCRYPTED INFO (HỒ SƠ) */}
          {currentTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <ProfileView
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                onCreateNewProfile={handleCreateNewProfile}
                onStreakCheckIn={handleStreakCheckIn}
                onUpdateNames={handleUpdateNames}
                onNavigateWardrobe={() => setCurrentTab('wardrobe')}
              />
            </motion.div>
          )}

          {/* TAB: USER PROTOCOL (SÁCH HƯỚNG DẪN MÀN HÌNH MÁY TÍNH ĐỜI CŨ GLITCH XANH LÁ) */}
          {currentTab === 'protocol' && (
            <motion.div
              key="protocol"
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <UserProtocolView onNavigateTab={setCurrentTab} />
            </motion.div>
          )}

          {/* TAB: ALL THE THINGS! (THỐNG KÊ CHI TIẾT NGÀY / TUẦN / TOÀN BỘ) */}
          {currentTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <AllTheThingsView
                profile={profile}
                onNavigateTab={setCurrentTab}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className={`w-full py-8 mt-12 text-center text-xs relative z-10 border-t transition-colors ${
        isPastel
          ? 'bg-white/80 border-purple-200 text-slate-500'
          : 'bg-[#120F29]/90 border-white/10 text-slate-400'
      }`}>
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`text-lg font-black ${isPastel ? 'text-purple-600' : 'text-orange-400'}`}>
              LUCERA
            </span>
            <span className={`text-[11px] ${isPastel ? 'text-slate-600' : 'text-slate-400'}`}>
              • 3D Cyber Detective Command Center & Roblox Hub
            </span>
          </div>

          <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold ${
            isPastel ? 'text-purple-700' : 'text-orange-300'
          }`}>
            <button onClick={() => setCurrentTab('hq')} className="hover:opacity-75 transition-opacity cursor-pointer">
              🏛️ 3D Headquarters
            </button>
            <button onClick={() => setCurrentTab('home')} className="hover:opacity-75 transition-opacity cursor-pointer">
              🧪 Safe Lab
            </button>
            <button onClick={() => setCurrentTab('scanner')} className="hover:opacity-75 transition-opacity cursor-pointer">
              📡 Radar - Scanner
            </button>
            <button onClick={() => setCurrentTab('games')} className="hover:opacity-75 transition-opacity cursor-pointer">
              🎮 Glitch Zone
            </button>
            <button onClick={() => setCurrentTab('learn')} className="hover:opacity-75 transition-opacity cursor-pointer">
              📚 Knowledge Hub
            </button>
            <button onClick={() => setCurrentTab('wardrobe')} className="hover:opacity-75 transition-opacity cursor-pointer">
              🎒 Arcon Bunker
            </button>
            <button onClick={() => setCurrentTab('profile')} className="hover:opacity-75 transition-opacity cursor-pointer">
              🗂️ Encrypted Info
            </button>
            <button onClick={() => setCurrentTab('protocol')} className={`hover:opacity-75 transition-opacity cursor-pointer font-bold ${
              isPastel ? 'text-emerald-700' : 'text-emerald-400'
            }`}>
              📟 User Protocol
            </button>
            <button
              onClick={() => setShowMusicModal(true)}
              className="hover:opacity-75 transition-opacity cursor-pointer font-black text-pink-400 flex items-center gap-1"
            >
              <span>🎧 Music with hacker :3</span>
            </button>
          </div>

          <div className="text-[11px] opacity-70">
            {isVi ? '© Biệt Đội An Ninh Mạng LUCERA • Hoạt Động Ngoại Tuyến 100%' : '© LUCERA Cyber Agency • 100% Offline Client-Side Engine'}
          </div>
        </div>
      </footer>

      {/* FLOATING CORNER WIDGET & MODAL: MUSIC WITH HACKER :3 */}
      <MusicWithHackerWidget
        externalOpen={showMusicModal}
        onExternalClose={() => setShowMusicModal(false)}
      />

      {/* POPUP: LOGIN MODAL (Password Protected HQ Clearance) */}
      <LoginModal
        isOpen={showLoginModal}
        onLoginSuccess={handleLoginSuccess}
        defaultUsername={profile.noobName || 'Agent Roblox'}
      />

      {/* POPUP: BILINGUAL GUIDE MODAL (Song Ngữ Anh - Việt) */}
      <GuideModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
      />

      {/* POPUP: WELCOME ONBOARDING MODAL */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onComplete={() => setShowWelcomeModal(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainAppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

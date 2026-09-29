import { DetectiveItem, BadgeInfo, UserProfile } from '../types';

export const WARDROBE_ITEMS: DetectiveItem[] = [
  // --- HATS & HAIRSTYLES ---
  {
    id: 'hat-default',
    name: 'Roblox Brown Layered Hair',
    category: 'hat',
    price: 0,
    icon: '✨',
    description: 'Classic blocky Roblox haircut with natural protagonist flair.',
    unlocked: true
  },
  {
    id: 'hat-cyber-cap',
    name: 'Classic Red Roblox Snapback',
    category: 'hat',
    price: 90,
    icon: '🧢',
    description: 'Iconic red baseball cap featuring the signature Roblox logo print.',
    unlocked: true
  },
  {
    id: 'hat-detective',
    name: 'Sherlock Detective Fedora',
    category: 'hat',
    price: 100,
    icon: '🕵️',
    description: 'Distinguished charcoal wool fedora boosting scam-detection intuition by 100%!',
    unlocked: true
  },
  {
    id: 'hat-cat-headset',
    name: 'Cyber Neon Cat-Ear Headset',
    category: 'hat',
    price: 160,
    icon: '🎧',
    description: 'Glowing RGB cat-ear gaming headset wired to incoming cyber threat frequencies.',
    unlocked: true
  },
  {
    id: 'hat-cyber-snapback',
    name: 'Cyber Lavender Snapback',
    category: 'hat',
    price: 180,
    icon: '🧢',
    description: 'Futuristic street-style snapback cap with an ultra-bright neon LED strip.',
    unlocked: false
  },
  {
    id: 'hat-sakura-ribbon',
    name: 'Sakura Anime Ribbon',
    category: 'hat',
    price: 120,
    icon: '🎀',
    description: 'Delicate pastel cherry-blossom pink hair bow with silk anime ribbons.',
    unlocked: false
  },
  {
    id: 'hat-wizard',
    name: 'Midnight Starlight Wizard Hat',
    category: 'hat',
    price: 240,
    icon: '🧙',
    description: 'Velvet deep-purple sorcerer hat adorned with sparkling gold cyber stars.',
    unlocked: false
  },
  {
    id: 'hat-crown',
    name: 'Royal Cyber Crown',
    category: 'hat',
    price: 350,
    icon: '👑',
    description: 'Prestige 24K gold crown encrusted with cyber rubies for master investigators.',
    unlocked: false
  },

  // --- GLASSES & VISORS ---
  {
    id: 'glasses-none',
    name: 'Sharp Detective Eyes',
    category: 'glasses',
    price: 0,
    icon: '👀',
    description: 'Bright, inquisitive gaze inspecting every single suspicious pixel and URL.',
    unlocked: true
  },
  {
    id: 'glasses-monocle',
    name: 'Gold Monocle of Truth',
    category: 'glasses',
    price: 80,
    icon: '🧐',
    description: 'Elegant brass-rimmed eyepiece revealing hidden phishing redirects.',
    unlocked: false
  },
  {
    id: 'glasses-round',
    name: 'Intellectual Scholar Spectacles',
    category: 'glasses',
    price: 110,
    icon: '👓',
    description: 'Classic tortoiseshell rounded spectacles giving an academic cyber forensic look.',
    unlocked: false
  },
  {
    id: 'glasses-heart',
    name: 'Kawaii Heart Sunglasses',
    category: 'glasses',
    price: 130,
    icon: '💖',
    description: 'Vibrant pink heart-shaped UV shades made for photogenic cyber sleuths.',
    unlocked: false
  },
  {
    id: 'glasses-neon-shades',
    name: 'Stealth Cyber Matrix Shades',
    category: 'glasses',
    price: 150,
    icon: '🕶️',
    description: 'Polarized dark eyewear protecting your eyes from flashing malicious popups.',
    unlocked: false
  },
  {
    id: 'glasses-ar-scanner',
    name: 'Holographic AR Link Scanner',
    category: 'glasses',
    price: 260,
    icon: '🥽',
    description: 'Heads-up augmented reality visor projecting instant phishing threat diagnostics.',
    unlocked: false
  },

  // --- OUTFITS (Diverse & Vibrant Roblox Styles) ---
  {
    id: 'outfit-fpt-hoodie',
    name: 'FPT Amber & Navy Detective Suit',
    category: 'outfit',
    price: 0,
    icon: '🎽',
    description: 'Signature vibrant orange and navy tailored detective blazer with gold tie.',
    unlocked: true
  },
  {
    id: 'outfit-classic',
    name: 'Legendary Roblox Noob Outfit',
    category: 'outfit',
    price: 50,
    icon: '👕',
    description: 'Iconic royal blue shirt paired with green trousers and blocky Roblox badge!',
    unlocked: true
  },
  {
    id: 'outfit-detective-coat',
    name: 'Sherlock Trenchcoat & Plaid Scarf',
    category: 'outfit',
    price: 170,
    icon: '🧥',
    description: 'Vintage double-breasted trenchcoat with classic British detective plaid scarf.',
    unlocked: false
  },
  {
    id: 'outfit-academy-uniform',
    name: 'Cyber Defense Academy Uniform',
    category: 'outfit',
    price: 190,
    icon: '👔',
    description: 'Formal prestige academy blazer with red tie and silver cyber shield pin.',
    unlocked: false
  },
  {
    id: 'outfit-harajuku-hoodie',
    name: 'Pastel Harajuku Streetwear Hoodie',
    category: 'outfit',
    price: 210,
    icon: '🌸',
    description: 'Sweet tri-color blend of candy pink, mint green, and lavender pastel street fashion.',
    unlocked: false
  },
  {
    id: 'outfit-cyber-suit',
    name: 'Quantum Techwear Neon Armor',
    category: 'outfit',
    price: 280,
    icon: '🦺',
    description: 'High-tech ballistic mesh suit equipped with illuminated neon safety circuits.',
    unlocked: false
  },
  {
    id: 'outfit-gamer-rgb',
    name: 'eSports Champion RGB Bomber Jacket',
    category: 'outfit',
    price: 290,
    icon: '🎮',
    description: 'Pro gaming championship bomber with dynamic pulsing RGB Chroma spectrum bands.',
    unlocked: false
  },
  {
    id: 'outfit-summer-yukata',
    name: 'Midnight Fireworks Festival Yukata',
    category: 'outfit',
    price: 320,
    icon: '🎆',
    description: 'Traditional summer cotton robe patterned with radiant golden fireworks.',
    unlocked: false
  },

  // --- HAND ITEMS ---
  {
    id: 'hand-none',
    name: 'Rapid Reflex Clicker',
    category: 'hand',
    price: 0,
    icon: '🖐️',
    description: 'Bare hands ready to click, drag, and neutralize scam URLs at lightning speed.',
    unlocked: true
  },
  {
    id: 'hand-magnifier',
    name: '10X Forensic Magnifying Glass',
    category: 'hand',
    price: 90,
    icon: '🔍',
    description: 'Polished glass lens exposing tiny domain typos and subtle character spoofing.',
    unlocked: true
  },
  {
    id: 'hand-holo-pad',
    name: 'Handheld Hologram Datapad',
    category: 'hand',
    price: 180,
    icon: '📱',
    description: 'Cyber forensic tablet projecting live domain DNS records and threat scores.',
    unlocked: false
  },
  {
    id: 'hand-bubble-tea',
    name: 'Sparkling Bloxy Cola Can',
    category: 'hand',
    price: 60,
    icon: '🧃',
    description: 'Chilled bubbly red Bloxy Cola restoring investigator energy all day long!',
    unlocked: true
  },
  {
    id: 'hand-star-wand',
    name: 'Cosmic Starlight Scepter',
    category: 'hand',
    price: 210,
    icon: '⭐',
    description: 'Mystic glowing scepter banishing malicious phishing trojans and spam bots.',
    unlocked: false
  },
  {
    id: 'hand-shield',
    name: 'Energy Aegis Riot Shield',
    category: 'hand',
    price: 240,
    icon: '🛡️',
    description: 'Forcefield barrier deflecting fraudulent OTP interception and banking malware.',
    unlocked: false
  },
  {
    id: 'hand-badge',
    name: 'Lucera Inspector Gold Star Badge',
    category: 'hand',
    price: 300,
    icon: '🎖️',
    description: 'Highest official accreditation issued by the Global Cyber Defense Council.',
    unlocked: false
  },

  // --- HAIR & SKIN COLORS ---
  {
    id: 'skin-anime-natural',
    name: 'Natural Espresso Brown Hair',
    category: 'skin',
    price: 0,
    icon: '👦',
    description: 'Warm, dependable detective appearance with a welcoming smile.',
    unlocked: true
  },
  {
    id: 'skin-orange-fpt',
    name: 'Vibrant FPT Amber Flame Hair',
    category: 'skin',
    price: 100,
    icon: '🦊',
    description: 'Radiant orange hairstyle brimming with curiosity, innovation, and youth.',
    unlocked: true
  },
  {
    id: 'skin-cyber-cyan',
    name: 'Sub-Zero Cyberpunk Cyan Hair',
    category: 'skin',
    price: 140,
    icon: '❄️',
    description: 'Frosty neon cyan strands evoking the poise of an elite ethical cyber hacker.',
    unlocked: false
  },
  {
    id: 'skin-sakura-pink',
    name: 'Cherry Blossom Kawaii Pink',
    category: 'skin',
    price: 160,
    icon: '🌸',
    description: 'Soft pastel sakura pink giving your detective an adorable anime appearance.',
    unlocked: false
  },
  {
    id: 'skin-gold-sun',
    name: 'Golden Solar Crown Hair',
    category: 'skin',
    price: 200,
    icon: '🌟',
    description: 'Dazzling spun-gold blond locks glowing like radiant morning sunlight.',
    unlocked: false
  },
  {
    id: 'skin-lavender-glow',
    name: 'Mystic Lavender Cyber Aura',
    category: 'skin',
    price: 250,
    icon: '🔮',
    description: 'Enchanting purple energy aura enveloping your character in protective light.',
    unlocked: false
  }
];

export const BADGES_LIST: BadgeInfo[] = [
  {
    id: 'badge-first-scan',
    name: 'First Blood Detection',
    description: 'Successfully inspected your very first suspicious link or phone number.',
    icon: '🔍',
    unlocked: false,
    requirement: 'Scan 1 URL or Phone'
  },
  {
    id: 'badge-scam-detective',
    name: 'Junior Sleuth',
    description: 'Uncovered every single deceptive clue in Scam Detective mode.',
    icon: '🕵️',
    unlocked: false,
    requirement: 'Win 1 Scam Detective case'
  },
  {
    id: 'badge-streak-7',
    name: 'Unbreakable Vigilance',
    description: 'Logged in and defended cyberspace for 7 consecutive days.',
    icon: '🔥',
    unlocked: false,
    requirement: '7-day login streak'
  },
  {
    id: 'badge-fpt-companion',
    name: 'Loyal Ant Mascot',
    description: 'Attained a 10-day streak! Unlocked the iconic FPT Orange Ant sidekick.',
    icon: '🐜',
    unlocked: false,
    requirement: '10+ day login streak'
  },
  {
    id: 'badge-radar-ace',
    name: 'Radar Reflex Ace',
    description: 'Scored a flawless combo in high-speed Scam Radar triage.',
    icon: '⚡',
    unlocked: false,
    requirement: 'Hit 5x streak in Scam Radar'
  },
  {
    id: 'badge-escape-master',
    name: 'Escape Room Mastermind',
    description: 'Solved all 5 locked terminal security riddles in Cyber Escape Room.',
    icon: '🏆',
    unlocked: false,
    requirement: 'Clear Escape Room'
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Agent Rookie',
  noobName: 'Detective Rookie',
  bio: 'Think twice. Click once.',
  level: 1,
  title: 'Rookie Detective 👶',
  xp: 0,
  coins: 0,
  streakDays: 0,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  scamsIdentified: 0,
  gamesPlayed: 0,
  accuracyRate: 0,
  equipped: {
    hat: 'hat-default',
    glasses: 'glasses-none',
    outfit: 'outfit-classic',
    hand: 'hand-none',
    skin: 'skin-anime-natural'
  },
  unlockedItems: [
    'hat-default',
    'glasses-none',
    'outfit-classic',
    'hand-none',
    'skin-anime-natural'
  ],
  badges: []
};

export const LEVEL_TIERS = [
  { level: 1, title: 'Rookie 👶', minXp: 0 },
  { level: 5, title: 'Link Finder 🔍', minXp: 400 },
  { level: 10, title: 'Scam Detective 🕵🏻', minXp: 1000 },
  { level: 20, title: 'Cyber Guardian 🛡️', minXp: 2500 },
  { level: 30, title: 'Scam Master 👑', minXp: 5000 }
];

export function calculateLevel(xp: number): { level: number; title: string; nextXp: number; progressPercent: number } {
  let currentTier = LEVEL_TIERS[0];
  let nextTier = LEVEL_TIERS[1];

  for (let i = 0; i < LEVEL_TIERS.length; i++) {
    if (xp >= LEVEL_TIERS[i].minXp) {
      currentTier = LEVEL_TIERS[i];
      nextTier = LEVEL_TIERS[i + 1] || { level: 50, title: 'Cyber Legend 🌟', minXp: 10000 };
    }
  }

  const range = nextTier.minXp - currentTier.minXp;
  const currentInRange = xp - currentTier.minXp;
  const progressPercent = Math.min(Math.max(Math.round((currentInRange / range) * 100), 5), 100);

  return {
    level: currentTier.level,
    title: currentTier.title,
    nextXp: nextTier.minXp,
    progressPercent
  };
}

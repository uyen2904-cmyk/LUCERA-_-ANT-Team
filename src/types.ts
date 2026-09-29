export type RiskLevel = 'safe' | 'suspicious' | 'dangerous';

export interface AnalysisFlag {
  id: string;
  category: 'protocol' | 'domain' | 'impersonation' | 'urgency' | 'typosquat' | 'suspicious_tld' | 'spam_report' | 'structure';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  matchedSegment?: string;
  explanation: string;
}

export interface LinkAnalysisResult {
  rawInput: string;
  normalizedUrl: string;
  riskLevel: RiskLevel;
  riskScore: number; // 0 to 100 (higher is riskier)
  protocol: string;
  hasHttps: boolean;
  domain: string;
  tld: string;
  path: string;
  impersonatedBrand: string | null;
  flags: AnalysisFlag[];
  highlightSegments: {
    text: string;
    isSuspicious: boolean;
    reason?: string;
  }[];
  verdictTitle: string;
  verdictSummary: string;
  recommendation: string;
  communityReportCount: number;
}

export interface PhoneAnalysisResult {
  rawInput: string;
  normalizedPhone: string;
  riskLevel: RiskLevel;
  riskScore: number;
  carrierOrType: string;
  scamType: string | null;
  flags: AnalysisFlag[];
  verdictTitle: string;
  verdictSummary: string;
  recommendation: string;
  communityReportCount: number;
  recentReports: string[];
}

export interface DetectiveItem {
  id: string;
  name: string;
  category: 'hat' | 'glasses' | 'outfit' | 'hand' | 'skin';
  price: number;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface HackerRewardInfo {
  amount: number;
  gameName: string;
  totalCoins: number;
  timestamp: number;
}

export interface UserProfile {
  name: string;
  noobName: string;
  bio?: string;
  level: number;
  title: string;
  xp: number;
  coins: number;
  streakDays: number;
  lastActiveDate: string;
  scamsIdentified: number;
  gamesPlayed: number;
  accuracyRate: number;
  equipped: {
    hat: string;
    glasses: string;
    outfit: string;
    hand: string;
    skin: string;
  };
  unlockedItems: string[];
  badges: string[];
}

export interface BadgeInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requirement: string;
}

export interface ScamDetectiveScenario {
  id: string;
  title: string;
  sender: string;
  time: string;
  avatarIcon: string;
  type: 'sms' | 'email' | 'social';
  tokens: {
    id: string;
    text: string;
    isClue: boolean;
    explanation?: string;
    category?: string;
  }[];
  totalClues: number;
  kienSangHint: string;
  fullMessageText: string;
  postExplanation: string;
}

export interface FakeOrRealDifference {
  id: string;
  xPercent: number; // For interactive hotspot detection
  yPercent: number;
  title: string;
  description: string;
}

export interface FakeOrRealScenario {
  id: string;
  brand: string;
  realSite: {
    url: string;
    title: string;
    logoText: string;
    buttonText: string;
    badge: string;
  };
  fakeSite: {
    url: string;
    title: string;
    logoText: string;
    buttonText: string;
    badge: string;
  };
  differences: FakeOrRealDifference[];
  kienSangHint: string;
}

export interface RadarLink {
  id: string;
  url: string;
  isScam: boolean;
  reason: string;
  brandMimicked?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | string;
}

export interface LinkPuzzlePiece {
  id: string;
  text: string;
  category: 'protocol' | 'domain' | 'path' | 'redflag';
  label: string;
}

export interface LinkPuzzleScenario {
  id: string;
  fullUrl: string;
  brand: string;
  pieces: LinkPuzzlePiece[];
  educationalInsight: string;
}

export interface DilemmaChoice {
  id: string;
  label: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface DilemmaScenario {
  id: string;
  title: string;
  context: string;
  icon: string;
  options: DilemmaChoice[];
}

export interface EscapeRoomStage {
  stageNumber: number;
  name: string;
  question: string;
  hint: string;
  clues: string[];
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export type NavTab = 'hq' | 'home' | 'scanner' | 'games' | 'learn' | 'wardrobe' | 'profile' | 'protocol' | 'stats';

export type StatsTimeframe = 'daily' | 'weekly' | 'allTime';

export interface TimeframeStats {
  casesSolved: number;
  questionsAnswered: number;
  scamsIdentified: number;
  hackerMoneyEarned: number;
  xpEarned: number;
  gamesWon: number;
  radarScans: number;
  playTimeMinutes: number;
  accuracyRate: number;
}

export interface DetailedUserStats {
  daily: TimeframeStats;
  weekly: TimeframeStats;
  allTime: TimeframeStats;
  lastUpdatedDate: string;
}

export interface CyberTip {
  id: number;
  code: string;
  title: string;
  content: string;
  category: 'url' | 'call' | 'otp' | 'general';
  miniQuiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

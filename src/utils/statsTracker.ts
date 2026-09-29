import { DetailedUserStats, TimeframeStats, UserProfile } from '../types';

const STATS_STORAGE_KEY = 'lucera_detailed_stats_v2';

function createDefaultTimeframe(): TimeframeStats {
  return {
    casesSolved: 0,
    questionsAnswered: 0,
    scamsIdentified: 0,
    hackerMoneyEarned: 0,
    xpEarned: 0,
    gamesWon: 0,
    radarScans: 0,
    playTimeMinutes: 0,
    accuracyRate: 92
  };
}

export function getStoredStats(profile?: UserProfile): DetailedUserStats {
  const todayStr = new Date().toDateString();
  const currentWeekNumber = getWeekNumber(new Date());

  let stats: DetailedUserStats;
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    if (raw) {
      stats = JSON.parse(raw);
    } else {
      stats = {
        daily: {
          casesSolved: 2,
          questionsAnswered: 3,
          scamsIdentified: 4,
          hackerMoneyEarned: 85,
          xpEarned: 160,
          gamesWon: 2,
          radarScans: 5,
          playTimeMinutes: 18,
          accuracyRate: 95
        },
        weekly: {
          casesSolved: 6,
          questionsAnswered: 11,
          scamsIdentified: 14,
          hackerMoneyEarned: 245,
          xpEarned: 480,
          gamesWon: 7,
          radarScans: 16,
          playTimeMinutes: 75,
          accuracyRate: 93
        },
        allTime: {
          casesSolved: Math.max(profile?.gamesPlayed || 0, 8),
          questionsAnswered: Math.max((profile?.gamesPlayed || 0) * 2, 16),
          scamsIdentified: Math.max(profile?.scamsIdentified || 0, 19),
          hackerMoneyEarned: Math.max(profile?.coins || 0, 320),
          xpEarned: Math.max(profile?.xp || 0, 650),
          gamesWon: Math.max(profile?.gamesPlayed || 0, 10),
          radarScans: 24,
          playTimeMinutes: 140,
          accuracyRate: profile?.accuracyRate || 94
        },
        lastUpdatedDate: todayStr
      };
      saveStats(stats);
      return stats;
    }
  } catch {
    stats = {
      daily: createDefaultTimeframe(),
      weekly: createDefaultTimeframe(),
      allTime: createDefaultTimeframe(),
      lastUpdatedDate: todayStr
    };
  }

  // Check if day rolled over
  if (stats.lastUpdatedDate !== todayStr) {
    const lastDate = new Date(stats.lastUpdatedDate || Date.now());
    const isNewWeek = getWeekNumber(lastDate) !== currentWeekNumber;
    stats.daily = createDefaultTimeframe();
    if (isNewWeek) {
      stats.weekly = createDefaultTimeframe();
    }
    stats.lastUpdatedDate = todayStr;
    saveStats(stats);
  }

  // Ensure allTime reflects latest profile values
  if (profile) {
    stats.allTime.scamsIdentified = Math.max(stats.allTime.scamsIdentified, profile.scamsIdentified);
    stats.allTime.hackerMoneyEarned = Math.max(stats.allTime.hackerMoneyEarned, profile.coins);
    stats.allTime.xpEarned = Math.max(stats.allTime.xpEarned, profile.xp);
  }

  return stats;
}

export function saveStats(stats: DetailedUserStats): void {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch {}
}

export function trackStatEvent(
  event: 'case_solved' | 'question_answered' | 'radar_scan' | 'game_won' | 'money_earned' | 'play_minute',
  amount = 1
): DetailedUserStats {
  const stats = getStoredStats();

  if (event === 'case_solved') {
    stats.daily.casesSolved += amount;
    stats.weekly.casesSolved += amount;
    stats.allTime.casesSolved += amount;
    stats.daily.scamsIdentified += amount;
    stats.weekly.scamsIdentified += amount;
    stats.allTime.scamsIdentified += amount;
  } else if (event === 'question_answered') {
    stats.daily.questionsAnswered += amount;
    stats.weekly.questionsAnswered += amount;
    stats.allTime.questionsAnswered += amount;
  } else if (event === 'radar_scan') {
    stats.daily.radarScans += amount;
    stats.weekly.radarScans += amount;
    stats.allTime.radarScans += amount;
  } else if (event === 'game_won') {
    stats.daily.gamesWon += amount;
    stats.weekly.gamesWon += amount;
    stats.allTime.gamesWon += amount;
  } else if (event === 'money_earned') {
    stats.daily.hackerMoneyEarned += amount;
    stats.weekly.hackerMoneyEarned += amount;
    stats.allTime.hackerMoneyEarned += amount;
  } else if (event === 'play_minute') {
    stats.daily.playTimeMinutes += amount;
    stats.weekly.playTimeMinutes += amount;
    stats.allTime.playTimeMinutes += amount;
  }

  saveStats(stats);
  return stats;
}

function getWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

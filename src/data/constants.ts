// Session configuration
export const SENTENCES_PER_SESSION = 12
export const TARGET_REPS = 3      // Graduate after 3 correct
export const MIN_GAP = 2          // Minimum sentences between repetitions
export const REVIEW_PRIORITY = 0.4 // 40% chance to pull from review queue

// XP configuration
export const XP_BASE = 15
export const XP_STREAK_BONUS = 5

// Levels
export const LEVELS = [
  { name: 'Seedling', emoji: '🌱', xp: 0 },
  { name: 'Explorer', emoji: '🔍', xp: 500 },
  { name: 'Writer', emoji: '✏️', xp: 1500 },
  { name: 'Star', emoji: '⭐', xp: 3000 },
  { name: 'Hero', emoji: '🦸', xp: 5000 },
  { name: 'Champion', emoji: '🏆', xp: 8000 },
  { name: 'Master', emoji: '👑', xp: 12000 },
] as const

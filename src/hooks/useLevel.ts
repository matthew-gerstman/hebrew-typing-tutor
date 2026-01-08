import { LEVELS } from '../data/constants'
import type { LevelInfo } from '../types'

export function getLevel(xp: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xp) {
      const current = LEVELS[i]
      const next = LEVELS[i + 1]
      const progress = next ? (xp - current.xp) / (next.xp - current.xp) : 1
      return { ...current, level: i + 1, progress, nextXp: next?.xp || current.xp }
    }
  }
  return { ...LEVELS[0], level: 1, progress: 0, nextXp: LEVELS[1].xp }
}

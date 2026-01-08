import { useState, useEffect, useCallback } from 'react'
import { XP_BASE, XP_STREAK_BONUS } from '../data/constants'
import { getLevel } from './useLevel'

const STORAGE_KEY = 'hebrew-typing-xp'

export function useXP() {
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? parseInt(saved, 10) : 0
  })
  const [streak, setStreak] = useState(0)
  const [showXp, setShowXp] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, xp.toString())
  }, [xp])

  const awardXP = useCallback(() => {
    const earned = XP_BASE + streak * XP_STREAK_BONUS
    const oldLevel = getLevel(xp)
    const newXp = xp + earned
    const newLevel = getLevel(newXp)
    
    setXp(newXp)
    setStreak(s => s + 1)
    setShowXp(true)
    setTimeout(() => setShowXp(false), 2000)

    return {
      earned,
      leveledUp: newLevel.level > oldLevel.level,
      newLevel,
    }
  }, [xp, streak])

  const resetStreak = useCallback(() => {
    setStreak(0)
  }, [])

  return {
    xp,
    streak,
    showXp,
    levelInfo: getLevel(xp),
    awardXP,
    resetStreak,
  }
}

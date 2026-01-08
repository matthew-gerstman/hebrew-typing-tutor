import { SENTENCES_PER_SESSION } from '../data/constants'
import type { LevelInfo, SessionStats } from '../types'

interface ProgressBarProps {
  sessionStats: SessionStats
  masteredCount: number
  inReviewCount: number
}

export function ProgressBar({ sessionStats, masteredCount, inReviewCount }: ProgressBarProps) {
  const progressPercent = (masteredCount / SENTENCES_PER_SESSION) * 100

  return (
    <div className="session-progress">
      <div className="progress-info">
        <span>Typed: {sessionStats.sentencesTyped}</span>
        <span>Mastered: {masteredCount}/{SENTENCES_PER_SESSION}</span>
        {inReviewCount > 0 && <span className="review-badge">🔄 {inReviewCount} review</span>}
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progressPercent}%` }} />
      </div>
    </div>
  )
}

interface XPBarProps {
  levelInfo: LevelInfo
  xp: number
  visible: boolean
}

export function XPBar({ levelInfo, xp, visible }: XPBarProps) {
  return (
    <div className={`xp-container ${visible ? 'visible' : ''}`}>
      <div className="xp-info">
        {levelInfo.emoji} {levelInfo.name} · {xp} / {levelInfo.nextXp} XP
      </div>
      <div className="xp-bar-container">
        <div className="xp-bar" style={{ width: `${levelInfo.progress * 100}%` }} />
      </div>
    </div>
  )
}

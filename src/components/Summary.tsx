import { useMemo } from 'react'
import type { SentenceState, SessionStats } from '../types'
import { TARGET_REPS } from '../data/constants'

interface SummaryProps {
  sessionSentences: SentenceState[]
  sessionStats: SessionStats
  masteredCount: number
  onRestart: () => void
}

export function Summary({ sessionSentences, sessionStats, masteredCount, onRestart }: SummaryProps) {
  const summarySentences = useMemo(() => {
    return sessionSentences.map(ss => ({
      hebrew: ss.sentence.hebrew,
      english: ss.sentence.english,
      timesShown: ss.timesShown,
      accuracy: ss.timesShown > 0 ? Math.round((ss.timesCorrect / ss.timesShown) * 100) : 0,
      mastered: ss.timesShown >= TARGET_REPS && ss.successStreak >= 1,
      inReview: ss.inReview,
    })).sort((a, b) => (b.mastered ? 1 : 0) - (a.mastered ? 1 : 0))
  }, [sessionSentences])

  const accuracy = Math.round(
    (sessionStats.sentencesCorrect / Math.max(sessionStats.sentencesTyped, 1)) * 100
  )

  return (
    <div className="summary-container">
      <h2>🎉 Session Complete!</h2>
      <div className="summary-stats">
        <div className="stat-box">
          <span className="stat-number">{sessionStats.sentencesTyped}</span>
          <span className="stat-label">Sentences</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{accuracy}%</span>
          <span className="stat-label">Accuracy</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{masteredCount}</span>
          <span className="stat-label">Mastered</span>
        </div>
      </div>
      
      <div className="word-results">
        <h3>Sentences Practiced</h3>
        {summarySentences.map(s => (
          <div key={s.hebrew} className={`word-result ${s.mastered ? 'mastered' : s.inReview ? 'review' : ''}`}>
            <div className="sentence-content">
              <span className="word-hebrew">{s.hebrew}</span>
              <span className="word-english">{s.english}</span>
            </div>
            <span className="word-stats">
              {s.mastered ? '✅' : s.inReview ? '🔄' : '📝'} {s.accuracy}%
            </span>
          </div>
        ))}
      </div>
      
      <button className="restart-btn" onClick={onRestart}>
        Start New Session
      </button>
    </div>
  )
}

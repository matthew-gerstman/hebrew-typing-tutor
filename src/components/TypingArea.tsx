import type { SentenceState } from '../types'
import { TARGET_REPS } from '../data/constants'

interface TypingAreaProps {
  currentSentence: SentenceState
  typedText: string
  areaState: 'normal' | 'complete' | 'error'
}

export function TypingArea({ currentSentence, typedText, areaState }: TypingAreaProps) {
  return (
    <div className={`typing-area ${areaState}`}>
      <div className="word-meta">
        {currentSentence.inReview && <span className="review-indicator">🔄 Review</span>}
        <span className="rep-counter">{currentSentence.timesShown + 1}/{TARGET_REPS}</span>
      </div>
      <div className="hebrew-text">
        {currentSentence.sentence.hebrew.split('').map((char, i) => (
          <span
            key={i}
            className={
              i < typedText.length
                ? typedText[i] === char ? 'typed-correct' : 'typed-incorrect'
                : i === typedText.length ? 'current' : 'pending'
            }
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      <div className="translation">{currentSentence.sentence.english}</div>
    </div>
  )
}

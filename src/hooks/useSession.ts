import { useState, useCallback } from 'react'
import { SENTENCES } from '../data/sentences'
import { SENTENCES_PER_SESSION, TARGET_REPS, MIN_GAP, REVIEW_PRIORITY } from '../data/constants'
import type { SentenceState, SessionStats } from '../types'

const createInitialStats = (): SessionStats => ({
  sentencesTyped: 0,
  sentencesCorrect: 0,
  sentencesIncorrect: 0,
  masteredSentences: [],
  reviewSentences: [],
  startTime: Date.now(),
})

const createSentenceState = (sentence: typeof SENTENCES[0]): SentenceState => ({
  sentence,
  timesShown: 0,
  timesCorrect: 0,
  timesIncorrect: 0,
  inReview: false,
  successStreak: 0,
  errorStreak: 0,
  lastShownIndex: -MIN_GAP - 1,
})

export function useSession(selectedTier: number) {
  const [sessionSentences, setSessionSentences] = useState<SentenceState[]>([])
  const [activeQueue, setActiveQueue] = useState<SentenceState[]>([])
  const [reviewQueue, setReviewQueue] = useState<SentenceState[]>([])
  const [sentenceIndex, setSentenceIndex] = useState(0)
  const [sessionStats, setSessionStats] = useState<SessionStats>(createInitialStats)

  const initializeSession = useCallback(() => {
    const tierSentences = SENTENCES.filter(s => s.tier <= selectedTier)
    const shuffled = [...tierSentences].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, SENTENCES_PER_SESSION)
    const states = selected.map(createSentenceState)
    
    setSessionSentences(states)
    setActiveQueue([...states])
    setReviewQueue([])
    setSentenceIndex(0)
    setSessionStats(createInitialStats())
  }, [selectedTier])

  const getNextSentence = useCallback((): SentenceState | null => {
    const allMastered = sessionSentences.every(ss => 
      ss.timesShown >= TARGET_REPS && ss.successStreak >= 1
    )
    if (allMastered && reviewQueue.length === 0) return null

    const canShow = (ss: SentenceState) => sentenceIndex - ss.lastShownIndex >= MIN_GAP

    // Try review queue first (40% chance)
    if (reviewQueue.length > 0 && Math.random() < REVIEW_PRIORITY) {
      const available = reviewQueue.filter(canShow)
      if (available.length > 0) return available[0]
    }

    // Try active queue
    const activeAvailable = activeQueue.filter(ss => canShow(ss) && ss.timesShown < TARGET_REPS)
    if (activeAvailable.length > 0) return activeAvailable[0]

    // Fallback to any available
    if (reviewQueue.length > 0) return reviewQueue[0]
    const needsReps = activeQueue.filter(ss => ss.timesShown < TARGET_REPS)
    return needsReps.length > 0 ? needsReps[0] : null
  }, [sessionSentences, activeQueue, reviewQueue, sentenceIndex])

  const updateSentenceState = useCallback((
    hebrew: string, 
    updates: Partial<SentenceState>
  ) => {
    setSessionSentences(prev => prev.map(s => 
      s.sentence.hebrew === hebrew ? { ...s, ...updates } : s
    ))
  }, [])

  const handleCompletion = useCallback((currentSentence: SentenceState, correct: boolean) => {
    const ss = currentSentence
    const updated: SentenceState = {
      ...ss,
      timesShown: ss.timesShown + 1,
      timesCorrect: correct ? ss.timesCorrect + 1 : ss.timesCorrect,
      timesIncorrect: correct ? ss.timesIncorrect : ss.timesIncorrect + 1,
      successStreak: correct ? ss.successStreak + 1 : 0,
      errorStreak: correct ? 0 : ss.errorStreak + 1,
      inReview: !correct || (ss.inReview && ss.successStreak < 1),
      lastShownIndex: sentenceIndex,
    }

    // Update session sentences
    setSessionSentences(prev => prev.map(s => 
      s.sentence.hebrew === ss.sentence.hebrew ? updated : s
    ))

    // Update queues
    if (!correct) {
      if (!ss.inReview) {
        setReviewQueue(prev => [...prev, updated])
      } else {
        setReviewQueue(prev => prev.map(s => 
          s.sentence.hebrew === ss.sentence.hebrew ? updated : s
        ))
      }
      setActiveQueue(prev => prev.filter(s => s.sentence.hebrew !== ss.sentence.hebrew))
    } else if (ss.inReview) {
      if (updated.successStreak >= 2) {
        setReviewQueue(prev => prev.filter(s => s.sentence.hebrew !== ss.sentence.hebrew))
        updated.inReview = false
      } else {
        setReviewQueue(prev => prev.map(s => 
          s.sentence.hebrew === ss.sentence.hebrew ? updated : s
        ))
      }
    } else {
      setActiveQueue(prev => prev.map(s => 
        s.sentence.hebrew === ss.sentence.hebrew ? updated : s
      ))
    }

    // Update stats
    setSessionStats(prev => ({
      ...prev,
      sentencesTyped: prev.sentencesTyped + 1,
      sentencesCorrect: correct ? prev.sentencesCorrect + 1 : prev.sentencesCorrect,
      sentencesIncorrect: correct ? prev.sentencesIncorrect : prev.sentencesIncorrect + 1,
      masteredSentences: updated.timesShown >= TARGET_REPS && updated.successStreak >= 1 
        && !prev.masteredSentences.includes(ss.sentence.hebrew)
        ? [...prev.masteredSentences, ss.sentence.hebrew]
        : prev.masteredSentences,
    }))

    setSentenceIndex(prev => prev + 1)
    return updated
  }, [sentenceIndex])

  const masteredCount = sessionSentences.filter(ss => 
    ss.timesShown >= TARGET_REPS && ss.successStreak >= 1
  ).length

  return {
    sessionSentences,
    sessionStats,
    activeQueue,
    reviewQueue,
    masteredCount,
    initializeSession,
    getNextSentence,
    handleCompletion,
    updateSentenceState,
  }
}

export interface Sentence {
  hebrew: string
  english: string
  tier: number
}

export interface SentenceState {
  sentence: Sentence
  timesShown: number
  timesCorrect: number
  timesIncorrect: number
  inReview: boolean
  successStreak: number
  errorStreak: number
  lastShownIndex: number
}

export interface SessionStats {
  sentencesTyped: number
  sentencesCorrect: number
  sentencesIncorrect: number
  masteredSentences: string[]
  reviewSentences: string[]
  startTime: number
}

export interface KeyConfig {
  hebrew: string
  english: string
  finger: string
}

export interface LevelInfo {
  name: string
  emoji: string
  xp: number
  level: number
  progress: number
  nextXp: number
}

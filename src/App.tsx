import { useState, useEffect, useCallback } from 'react'
import './App.css'

// Data
import { KEY_MAP, HEBREW_TO_KEY } from './data/keyboard'

// Hooks
import { useSession } from './hooks/useSession'
import { useXP } from './hooks/useXP'

// Components
import { Header } from './components/Header'
import { ProgressBar, XPBar } from './components/ProgressBar'
import { TypingArea } from './components/TypingArea'
import { Keyboard } from './components/Keyboard'
import { Summary } from './components/Summary'

// Types
import type { SentenceState } from './types'

function App() {
  // Theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => 
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )
  
  // Tier selection
  const [selectedTier, setSelectedTier] = useState(1)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  // Session management
  const {
    sessionSentences,
    sessionStats,
    reviewQueue,
    masteredCount,
    initializeSession,
    getNextSentence,
    handleCompletion,
    updateSentenceState,
  } = useSession(selectedTier)
  
  // XP & leveling
  const { xp, streak, showXp, levelInfo, awardXP, resetStreak } = useXP()
  
  // Typing state
  const [currentSentence, setCurrentSentence] = useState<SentenceState | null>(null)
  const [typedText, setTypedText] = useState('')
  const [pressedKey, setPressedKey] = useState<string | null>(null)
  const [areaState, setAreaState] = useState<'normal' | 'complete' | 'error'>('normal')
  
  // UI state
  const [toast, setToast] = useState<string | null>(null)
  const [showSummary, setShowSummary] = useState(false)

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Initialize session on tier change
  useEffect(() => {
    initializeSession()
    setShowSummary(false)
    setCurrentSentence(null)
    setTypedText('')
  }, [selectedTier, initializeSession])

  // Get next sentence when needed
  useEffect(() => {
    if (!currentSentence && sessionSentences.length > 0 && !showSummary) {
      const next = getNextSentence()
      if (next) {
        setCurrentSentence(next)
      } else {
        setShowSummary(true)
      }
    }
  }, [currentSentence, sessionSentences, getNextSentence, showSummary])

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }, [])

  const handleSentenceComplete = useCallback((correct: boolean) => {
    if (!currentSentence) return

    handleCompletion(currentSentence, correct)

    if (correct) {
      const { leveledUp, newLevel } = awardXP()
      if (leveledUp) {
        showToast(`Level up! ${newLevel.emoji} ${newLevel.name}`)
      }
    } else {
      resetStreak()
    }

    setCurrentSentence(null)
    setTypedText('')
  }, [currentSentence, handleCompletion, awardXP, resetStreak, showToast])

  const processKey = useCallback((key: string) => {
    if (!currentSentence || showSummary) return

    if (key === 'backspace') {
      setTypedText(prev => prev.slice(0, -1))
      return
    }

    const hebrewChar = KEY_MAP[key]
    if (!hebrewChar) return

    setPressedKey(key)
    setTimeout(() => setPressedKey(null), 80)

    const expected = currentSentence.sentence.hebrew[typedText.length]
    const newTyped = typedText + hebrewChar
    setTypedText(newTyped)

    if (hebrewChar === expected) {
      // Correct character
      if (newTyped === currentSentence.sentence.hebrew) {
        setAreaState('complete')
        setTimeout(() => {
          setAreaState('normal')
          handleSentenceComplete(true)
        }, 400)
      }
    } else {
      // Wrong character - show error but continue
      setAreaState('error')
      setTimeout(() => setAreaState('normal'), 150)
      
      // Track error
      if (!currentSentence.inReview) {
        updateSentenceState(currentSentence.sentence.hebrew, {
          timesIncorrect: currentSentence.timesIncorrect + 1,
          errorStreak: currentSentence.errorStreak + 1,
        })
      }
      
      // Complete with errors if at end
      if (newTyped.length === currentSentence.sentence.hebrew.length) {
        setTimeout(() => {
          setAreaState('normal')
          handleSentenceComplete(false)
        }, 400)
      }
    }
  }, [currentSentence, typedText, handleSentenceComplete, showSummary, updateSentenceState])

  // Keyboard event handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      if (key === 'backspace' || key === ' ' || KEY_MAP[key]) {
        e.preventDefault()
        processKey(key)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [processKey])

  // Calculate next key hint
  const nextKey = currentSentence && typedText.length < currentSentence.sentence.hebrew.length
    ? HEBREW_TO_KEY[currentSentence.sentence.hebrew[typedText.length]]
    : null

  const handleRestart = useCallback(() => {
    initializeSession()
    setShowSummary(false)
    setCurrentSentence(null)
    setTypedText('')
  }, [initializeSession])

  return (
    <div className="app" onClick={() => dropdownOpen && setDropdownOpen(false)}>
      <Header
        selectedTier={selectedTier}
        setSelectedTier={setSelectedTier}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        xp={xp}
        streak={streak}
        theme={theme}
        setTheme={setTheme}
      />

      <ProgressBar
        sessionStats={sessionStats}
        masteredCount={masteredCount}
        inReviewCount={reviewQueue.length}
      />

      <XPBar levelInfo={levelInfo} xp={xp} visible={showXp} />

      {showSummary ? (
        <Summary
          sessionSentences={sessionSentences}
          sessionStats={sessionStats}
          masteredCount={masteredCount}
          onRestart={handleRestart}
        />
      ) : currentSentence ? (
        <>
          <TypingArea
            currentSentence={currentSentence}
            typedText={typedText}
            areaState={areaState}
          />
          <Keyboard
            nextKey={nextKey}
            pressedKey={pressedKey}
            onKeyPress={processKey}
          />
        </>
      ) : null}

      <div className={`toast ${toast ? 'visible' : ''}`}>{toast}</div>
    </div>
  )
}

export default App

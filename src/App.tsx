import { useState, useEffect, useCallback } from 'react'
import './App.css'

// Hebrew keyboard layout with finger zones
const HEBREW_KEYBOARD = [
  [
    { hebrew: '/', english: 'Q', finger: 'pinky-l' },
    { hebrew: "'", english: 'W', finger: 'ring-l' },
    { hebrew: 'ק', english: 'E', finger: 'middle-l' },
    { hebrew: 'ר', english: 'R', finger: 'index-l' },
    { hebrew: 'א', english: 'T', finger: 'index-l' },
    { hebrew: 'ט', english: 'Y', finger: 'index-r' },
    { hebrew: 'ו', english: 'U', finger: 'index-r' },
    { hebrew: 'ן', english: 'I', finger: 'middle-r' },
    { hebrew: 'ם', english: 'O', finger: 'ring-r' },
    { hebrew: 'פ', english: 'P', finger: 'pinky-r' },
  ],
  [
    { hebrew: 'ש', english: 'A', finger: 'pinky-l' },
    { hebrew: 'ד', english: 'S', finger: 'ring-l' },
    { hebrew: 'ג', english: 'D', finger: 'middle-l' },
    { hebrew: 'כ', english: 'F', finger: 'index-l' },
    { hebrew: 'ע', english: 'G', finger: 'index-l' },
    { hebrew: 'י', english: 'H', finger: 'index-r' },
    { hebrew: 'ח', english: 'J', finger: 'index-r' },
    { hebrew: 'ל', english: 'K', finger: 'middle-r' },
    { hebrew: 'ך', english: 'L', finger: 'ring-r' },
    { hebrew: 'ף', english: ';', finger: 'pinky-r' },
  ],
  [
    { hebrew: 'ז', english: 'Z', finger: 'pinky-l' },
    { hebrew: 'ס', english: 'X', finger: 'ring-l' },
    { hebrew: 'ב', english: 'C', finger: 'middle-l' },
    { hebrew: 'ה', english: 'V', finger: 'index-l' },
    { hebrew: 'נ', english: 'B', finger: 'index-l' },
    { hebrew: 'מ', english: 'N', finger: 'index-r' },
    { hebrew: 'צ', english: 'M', finger: 'index-r' },
    { hebrew: 'ת', english: ',', finger: 'middle-r' },
    { hebrew: 'ץ', english: '.', finger: 'ring-r' },
  ]
]

const KEY_MAP: Record<string, string> = { ' ': ' ' }
const HEBREW_TO_KEY: Record<string, string> = { ' ': ' ' }
HEBREW_KEYBOARD.forEach(row => {
  row.forEach(key => {
    KEY_MAP[key.english.toLowerCase()] = key.hebrew
    HEBREW_TO_KEY[key.hebrew] = key.english.toLowerCase()
  })
})

const SENTENCES = [
  { sentence: 'הכלב רץ בגן', translation: 'The dog runs in the garden', category: 'animals' },
  { sentence: 'החתול ישן', translation: 'The cat sleeps', category: 'animals' },
  { sentence: 'הציפור שרה', translation: 'The bird sings', category: 'animals' },
  { sentence: 'הדג שוחה', translation: 'The fish swims', category: 'animals' },
  { sentence: 'אמא מבשלת', translation: 'Mom cooks', category: 'family' },
  { sentence: 'אבא קורא ספר', translation: 'Dad reads a book', category: 'family' },
  { sentence: 'אני אוהב אותך', translation: 'I love you', category: 'family' },
  { sentence: 'אני אוכל תפוח', translation: 'I eat an apple', category: 'food' },
  { sentence: 'הלחם טעים', translation: 'The bread is tasty', category: 'food' },
  { sentence: 'מים קרים', translation: 'Cold water', category: 'food' },
  { sentence: 'בית ספר', translation: 'School', category: 'school' },
  { sentence: 'אני כותב', translation: 'I write', category: 'school' },
  { sentence: 'השמש זורחת', translation: 'The sun shines', category: 'nature' },
  { sentence: 'הירח יפה', translation: 'The moon is beautiful', category: 'nature' },
  { sentence: 'הבית שלי', translation: 'My house', category: 'home' },
  { sentence: 'שמים כחולים', translation: 'Blue sky', category: 'colors' },
  { sentence: 'תפוח אדום', translation: 'Red apple', category: 'colors' },
  { sentence: 'בוקר טוב', translation: 'Good morning', category: 'greetings' },
  { sentence: 'תודה רבה', translation: 'Thank you', category: 'greetings' },
  { sentence: 'שלום', translation: 'Hello', category: 'greetings' },
]

const CATEGORIES = ['all', ...new Set(SENTENCES.map(s => s.category))]

const LEVELS = [
  { name: 'Seedling', emoji: '🌱', xp: 0 },
  { name: 'Explorer', emoji: '🔍', xp: 500 },
  { name: 'Writer', emoji: '✏️', xp: 1500 },
  { name: 'Star', emoji: '⭐', xp: 3000 },
  { name: 'Hero', emoji: '🦸', xp: 5000 },
  { name: 'Champion', emoji: '🏆', xp: 8000 },
  { name: 'Master', emoji: '👑', xp: 12000 },
]

function getLevel(xp: number) {
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

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => 
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )
  const [currentSentence, setCurrentSentence] = useState<typeof SENTENCES[0] | null>(null)
  const [typedText, setTypedText] = useState('')
  const [pressedKey, setPressedKey] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [completedSentences, setCompletedSentences] = useState<string[]>([])
  const [xp, setXp] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showXp, setShowXp] = useState(false)
  const [areaState, setAreaState] = useState<'normal' | 'complete' | 'error'>('normal')
  const [toast, setToast] = useState<string | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const getFilteredSentences = useCallback(() => {
    if (selectedCategory === 'all') return SENTENCES
    return SENTENCES.filter(s => s.category === selectedCategory)
  }, [selectedCategory])

  const getNextSentence = useCallback(() => {
    const filtered = getFilteredSentences()
    const available = filtered.filter(s => !completedSentences.includes(s.sentence))
    if (available.length === 0) {
      setCompletedSentences([])
      return filtered[Math.floor(Math.random() * filtered.length)]
    }
    return available[Math.floor(Math.random() * available.length)]
  }, [getFilteredSentences, completedSentences])

  useEffect(() => {
    setCurrentSentence(getNextSentence())
    setTypedText('')
    setDropdownOpen(false)
  }, [selectedCategory])

  useEffect(() => {
    if (!currentSentence) setCurrentSentence(getNextSentence())
  }, [currentSentence, getNextSentence])

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  const processKey = useCallback((key: string) => {
    if (!currentSentence) return

    if (key === 'backspace') {
      setTypedText(prev => prev.slice(0, -1))
      return
    }

    const hebrewChar = KEY_MAP[key]
    if (!hebrewChar) return

    setPressedKey(key)
    setTimeout(() => setPressedKey(null), 80)

    const expected = currentSentence.sentence[typedText.length]
    
    if (hebrewChar === expected) {
      const newTyped = typedText + hebrewChar
      setTypedText(newTyped)

      if (newTyped === currentSentence.sentence) {
        const earned = 10 + streak * 5
        const newXp = xp + earned
        setXp(newXp)
        setStreak(s => s + 1)
        setAreaState('complete')
        setShowXp(true)
        setCompletedSentences(prev => [...prev, currentSentence.sentence])
        
        const oldLvl = getLevel(xp)
        const newLvl = getLevel(newXp)
        if (newLvl.level > oldLvl.level) {
          showToast(`Level up! ${newLvl.emoji} ${newLvl.name}`)
        }

        setTimeout(() => {
          setAreaState('normal')
          setCurrentSentence(getNextSentence())
          setTypedText('')
          setTimeout(() => setShowXp(false), 2000)
        }, 500)
      }
    } else {
      setAreaState('error')
      setStreak(0)
      setTimeout(() => setAreaState('normal'), 250)
    }
  }, [currentSentence, typedText, streak, xp, getNextSentence])

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

  const nextKey = currentSentence && typedText.length < currentSentence.sentence.length
    ? HEBREW_TO_KEY[currentSentence.sentence[typedText.length]]
    : null

  const levelInfo = getLevel(xp)
  const categoryLabel = selectedCategory === 'all' ? 'All Categories' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)

  return (
    <div className="app" onClick={() => dropdownOpen && setDropdownOpen(false)}>
      <header className="header">
        <div className="category-wrapper" onClick={e => e.stopPropagation()}>
          <button className="category-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {categoryLabel} ▾
          </button>
          <div className={`category-dropdown ${dropdownOpen ? 'open' : ''}`}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={selectedCategory === cat ? 'active' : ''}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="header-right">
          <div className="stats">
            <span>⭐ {xp}</span>
            {streak > 1 && <span>🔥 {streak}</span>}
          </div>
          <button className="theme-toggle" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <div className={`xp-container ${showXp ? 'visible' : ''}`}>
        <div className="xp-info">{levelInfo.emoji} {levelInfo.name} · {xp} / {levelInfo.nextXp} XP</div>
        <div className="xp-bar-container">
          <div className="xp-bar" style={{ width: `${levelInfo.progress * 100}%` }} />
        </div>
      </div>

      <div className={`typing-area ${areaState}`}>
        {currentSentence && (
          <>
            <div className="hebrew-text">
              {currentSentence.sentence.split('').map((char, i) => (
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
            <div className="translation">{currentSentence.translation}</div>
          </>
        )}
      </div>

      <div className="keyboard">
        {HEBREW_KEYBOARD.map((row, ri) => (
          <div key={ri} className="keyboard-row">
            {row.map(key => (
              <button
                key={key.english}
                className={`key finger-${key.finger} ${key.english.toLowerCase() === nextKey ? 'hint' : ''} ${key.english.toLowerCase() === pressedKey ? 'pressed' : ''}`}
                onClick={() => processKey(key.english.toLowerCase())}
                type="button"
              >
                <span className="hebrew-char">{key.hebrew}</span>
                <span className="english-key">{key.english}</span>
              </button>
            ))}
          </div>
        ))}
        <div className="keyboard-row">
          <button className="key backspace-key finger-pinky-r" onClick={() => processKey('backspace')} type="button">
            ← Back
          </button>
          <button 
            className={`key space-key finger-thumb ${nextKey === ' ' ? 'hint' : ''}`}
            onClick={() => processKey(' ')} 
            type="button"
          >
            Space
          </button>
        </div>
      </div>

      <div className={`toast ${toast ? 'visible' : ''}`}>{toast}</div>
    </div>
  )
}

export default App

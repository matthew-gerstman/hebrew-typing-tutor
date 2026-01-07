import { useState, useEffect, useCallback } from 'react'
import './App.css'

// Hebrew keyboard layout (standard Israeli keyboard) with English key mappings
const HEBREW_KEYBOARD = [
  [
    { hebrew: '/', english: 'Q' },
    { hebrew: "'", english: 'W' },
    { hebrew: 'ק', english: 'E' },
    { hebrew: 'ר', english: 'R' },
    { hebrew: 'א', english: 'T' },
    { hebrew: 'ט', english: 'Y' },
    { hebrew: 'ו', english: 'U' },
    { hebrew: 'ן', english: 'I' },
    { hebrew: 'ם', english: 'O' },
    { hebrew: 'פ', english: 'P' },
  ],
  [
    { hebrew: 'ש', english: 'A' },
    { hebrew: 'ד', english: 'S' },
    { hebrew: 'ג', english: 'D' },
    { hebrew: 'כ', english: 'F' },
    { hebrew: 'ע', english: 'G' },
    { hebrew: 'י', english: 'H' },
    { hebrew: 'ח', english: 'J' },
    { hebrew: 'ל', english: 'K' },
    { hebrew: 'ך', english: 'L' },
    { hebrew: 'ף', english: ';' },
  ],
  [
    { hebrew: 'ז', english: 'Z' },
    { hebrew: 'ס', english: 'X' },
    { hebrew: 'ב', english: 'C' },
    { hebrew: 'ה', english: 'V' },
    { hebrew: 'נ', english: 'B' },
    { hebrew: 'מ', english: 'N' },
    { hebrew: 'צ', english: 'M' },
    { hebrew: 'ת', english: ',' },
    { hebrew: 'ץ', english: '.' },
  ]
]

// Map English keys to Hebrew letters
const KEY_MAP: Record<string, string> = {
  ' ': ' ', // space maps to space
}
HEBREW_KEYBOARD.forEach(row => {
  row.forEach(key => {
    KEY_MAP[key.english.toLowerCase()] = key.hebrew
  })
})

// Reverse map for finding which key to press for a Hebrew letter
const HEBREW_TO_KEY: Record<string, string> = {
  ' ': ' ',
}
Object.entries(KEY_MAP).forEach(([k, v]) => {
  if (v !== ' ') HEBREW_TO_KEY[v] = k
})

// Kid-friendly Hebrew sentences (3-7 words each)
const SENTENCES: { sentence: string; translation: string; category: string }[] = [
  // Animals
  { sentence: 'הכלב רץ בגן', translation: 'The dog runs in the garden', category: 'animals' },
  { sentence: 'החתול ישן על המיטה', translation: 'The cat sleeps on the bed', category: 'animals' },
  { sentence: 'הציפור שרה בבוקר', translation: 'The bird sings in the morning', category: 'animals' },
  { sentence: 'הדג שוחה במים', translation: 'The fish swims in the water', category: 'animals' },
  { sentence: 'הארנב אוכל גזר', translation: 'The rabbit eats a carrot', category: 'animals' },
  { sentence: 'הסוס דוהר בשדה', translation: 'The horse gallops in the field', category: 'animals' },
  { sentence: 'הפרה נותנת חלב', translation: 'The cow gives milk', category: 'animals' },
  { sentence: 'האריה חזק מאוד', translation: 'The lion is very strong', category: 'animals' },
  { sentence: 'הפיל גדול ואפור', translation: 'The elephant is big and gray', category: 'animals' },
  { sentence: 'הדוב אוהב דבש', translation: 'The bear loves honey', category: 'animals' },

  // Family
  { sentence: 'אמא מבשלת ארוחת ערב', translation: 'Mom cooks dinner', category: 'family' },
  { sentence: 'אבא קורא ספר', translation: 'Dad reads a book', category: 'family' },
  { sentence: 'אני אוהב את המשפחה שלי', translation: 'I love my family', category: 'family' },
  { sentence: 'סבא וסבתא באים לביקור', translation: 'Grandpa and grandma come to visit', category: 'family' },
  { sentence: 'האח שלי משחק כדורגל', translation: 'My brother plays soccer', category: 'family' },
  { sentence: 'האחות שלי לומדת מוזיקה', translation: 'My sister studies music', category: 'family' },
  { sentence: 'אנחנו אוכלים ביחד', translation: 'We eat together', category: 'family' },
  { sentence: 'המשפחה שלי גרה בבית גדול', translation: 'My family lives in a big house', category: 'family' },

  // Food
  { sentence: 'אני אוהב לאכול תפוחים', translation: 'I like to eat apples', category: 'food' },
  { sentence: 'הלחם טרי וטעים', translation: 'The bread is fresh and tasty', category: 'food' },
  { sentence: 'אני שותה מים קרים', translation: 'I drink cold water', category: 'food' },
  { sentence: 'העוגה מתוקה מאוד', translation: 'The cake is very sweet', category: 'food' },
  { sentence: 'אנחנו אוכלים ארוחת בוקר', translation: 'We eat breakfast', category: 'food' },
  { sentence: 'הגבינה על הפיצה', translation: 'The cheese is on the pizza', category: 'food' },
  { sentence: 'אני רוצה בננה בבקשה', translation: 'I want a banana please', category: 'food' },
  { sentence: 'החלב בכוס', translation: 'The milk is in the glass', category: 'food' },

  // School
  { sentence: 'אני הולך לבית ספר', translation: 'I go to school', category: 'school' },
  { sentence: 'המורה מלמדת מתמטיקה', translation: 'The teacher teaches math', category: 'school' },
  { sentence: 'אני כותב במחברת', translation: 'I write in the notebook', category: 'school' },
  { sentence: 'הספר על השולחן', translation: 'The book is on the table', category: 'school' },
  { sentence: 'אנחנו לומדים עברית', translation: 'We learn Hebrew', category: 'school' },
  { sentence: 'התלמידים יושבים בכיתה', translation: 'The students sit in class', category: 'school' },
  { sentence: 'יש לי עיפרון חדש', translation: 'I have a new pencil', category: 'school' },
  { sentence: 'השיעור מתחיל בשמונה', translation: 'The lesson starts at eight', category: 'school' },

  // Nature
  { sentence: 'השמש זורחת בשמים', translation: 'The sun shines in the sky', category: 'nature' },
  { sentence: 'הירח יפה בלילה', translation: 'The moon is beautiful at night', category: 'nature' },
  { sentence: 'העץ גבוה מאוד', translation: 'The tree is very tall', category: 'nature' },
  { sentence: 'הפרחים יפים באביב', translation: 'The flowers are beautiful in spring', category: 'nature' },
  { sentence: 'הים כחול וגדול', translation: 'The sea is blue and big', category: 'nature' },
  { sentence: 'יורד גשם בחורף', translation: 'It rains in winter', category: 'nature' },
  { sentence: 'הכוכבים נוצצים בלילה', translation: 'The stars twinkle at night', category: 'nature' },
  { sentence: 'ההר גבוה מהעצים', translation: 'The mountain is taller than the trees', category: 'nature' },

  // Home
  { sentence: 'הבית שלי יפה', translation: 'My house is beautiful', category: 'home' },
  { sentence: 'אני פותח את הדלת', translation: 'I open the door', category: 'home' },
  { sentence: 'החלון פתוח היום', translation: 'The window is open today', category: 'home' },
  { sentence: 'אני יושב על הכיסא', translation: 'I sit on the chair', category: 'home' },
  { sentence: 'המיטה שלי נוחה', translation: 'My bed is comfortable', category: 'home' },
  { sentence: 'השולחן בחדר האוכל', translation: 'The table is in the dining room', category: 'home' },
  { sentence: 'הטלפון על השולחן', translation: 'The phone is on the table', category: 'home' },
  { sentence: 'אני גר בדירה קטנה', translation: 'I live in a small apartment', category: 'home' },

  // Colors
  { sentence: 'השמים כחולים היום', translation: 'The sky is blue today', category: 'colors' },
  { sentence: 'התפוח אדום וטעים', translation: 'The apple is red and tasty', category: 'colors' },
  { sentence: 'העשב ירוק בגן', translation: 'The grass is green in the garden', category: 'colors' },
  { sentence: 'השמש צהובה ובוהקת', translation: 'The sun is yellow and bright', category: 'colors' },
  { sentence: 'השלג לבן וקר', translation: 'The snow is white and cold', category: 'colors' },
  { sentence: 'הלילה שחור וחשוך', translation: 'The night is black and dark', category: 'colors' },
  { sentence: 'הפרח סגול יפה', translation: 'The purple flower is beautiful', category: 'colors' },
  { sentence: 'הכתום צבע חם', translation: 'Orange is a warm color', category: 'colors' },

  // Actions
  { sentence: 'אני רץ בפארק', translation: 'I run in the park', category: 'actions' },
  { sentence: 'היא קופצת על המיטה', translation: 'She jumps on the bed', category: 'actions' },
  { sentence: 'הוא שר שיר יפה', translation: 'He sings a beautiful song', category: 'actions' },
  { sentence: 'אנחנו משחקים ביחד', translation: 'We play together', category: 'actions' },
  { sentence: 'הם רוקדים בשמחה', translation: 'They dance with joy', category: 'actions' },
  { sentence: 'אני צוחק עם חברים', translation: 'I laugh with friends', category: 'actions' },
  { sentence: 'היא מציירת תמונה יפה', translation: 'She draws a beautiful picture', category: 'actions' },
  { sentence: 'הוא בונה מגדל גבוה', translation: 'He builds a tall tower', category: 'actions' },

  // Greetings & Basics
  { sentence: 'בוקר טוב לכולם', translation: 'Good morning everyone', category: 'greetings' },
  { sentence: 'לילה טוב ילדים', translation: 'Good night children', category: 'greetings' },
  { sentence: 'תודה רבה לך', translation: 'Thank you very much', category: 'greetings' },
  { sentence: 'סליחה על האיחור', translation: 'Sorry for being late', category: 'greetings' },
  { sentence: 'מה שלומך היום', translation: 'How are you today', category: 'greetings' },
  { sentence: 'שלום וברוכים הבאים', translation: 'Hello and welcome', category: 'greetings' },
  { sentence: 'להתראות עד מחר', translation: 'Goodbye until tomorrow', category: 'greetings' },
  { sentence: 'בבקשה תעזור לי', translation: 'Please help me', category: 'greetings' },
]

const CATEGORIES = [...new Set(SENTENCES.map(s => s.category))]

function App() {
  const [currentSentence, setCurrentSentence] = useState<typeof SENTENCES[0] | null>(null)
  const [typedText, setTypedText] = useState('')
  const [pressedKey, setPressedKey] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [completedSentences, setCompletedSentences] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

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
  }, [selectedCategory])

  const processKey = useCallback((key: string) => {
    if (!currentSentence) return

    if (key === 'backspace') {
      setTypedText(prev => prev.slice(0, -1))
      setIsCorrect(null)
      return
    }

    const hebrewChar = KEY_MAP[key]
    if (hebrewChar) {
      setPressedKey(key)
      setTimeout(() => setPressedKey(null), 150)

      const newTyped = typedText + hebrewChar
      setTypedText(newTyped)

      const expectedChar = currentSentence.sentence[typedText.length]
      if (hebrewChar === expectedChar) {
        setIsCorrect(true)
        setTimeout(() => setIsCorrect(null), 200)
      } else {
        setIsCorrect(false)
        setStreak(0)
        setTimeout(() => setIsCorrect(null), 200)
      }

      if (newTyped === currentSentence.sentence) {
        setScore(prev => prev + (10 * (streak + 1)))
        setStreak(prev => prev + 1)
        setCompletedSentences(prev => [...prev, currentSentence.sentence])
        setTimeout(() => {
          setCurrentSentence(getNextSentence())
          setTypedText('')
        }, 700)
      }
    }
  }, [currentSentence, typedText, streak, getNextSentence])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key.toLowerCase()
    if (key === 'backspace' || key === ' ' || KEY_MAP[key]) {
      e.preventDefault()
      processKey(key)
    }
  }, [processKey])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (!currentSentence) {
      setCurrentSentence(getNextSentence())
    }
  }, [currentSentence, getNextSentence])

  const handleKeyClick = (englishKey: string) => {
    processKey(englishKey.toLowerCase())
  }

  const handleBackspace = () => {
    processKey('backspace')
  }

  const handleSpace = () => {
    processKey(' ')
  }

  const getNextExpectedKey = () => {
    if (!currentSentence || typedText.length >= currentSentence.sentence.length) return null
    const nextChar = currentSentence.sentence[typedText.length]
    if (nextChar === ' ') return ' '
    return HEBREW_TO_KEY[nextChar]
  }

  const nextKey = getNextExpectedKey()

  return (
    <div className="app">
      <header className="header">
        <h1>Hebrew Typing</h1>
        <div className="stats">
          <span className="score">⭐ {score}</span>
          <span className="streak">🔥 {streak}</span>
        </div>
      </header>

      <div className="category-selector">
        <button
          className={selectedCategory === 'all' ? 'active' : ''}
          onClick={() => setSelectedCategory('all')}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {currentSentence && (
        <div className={`word-display ${isCorrect === true ? 'correct' : isCorrect === false ? 'incorrect' : ''}`}>
          <div className="translation">{currentSentence.translation}</div>
          <div className="hebrew-word">
            {currentSentence.sentence.split('').map((char, i) => (
              <span
                key={i}
                className={
                  i < typedText.length
                    ? (typedText[i] === char ? 'typed-correct' : 'typed-incorrect')
                    : i === typedText.length
                      ? 'current'
                      : 'pending'
                }
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="keyboard">
        {HEBREW_KEYBOARD.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key) => {
              const isNextKey = key.english.toLowerCase() === nextKey
              const isPressed = key.english.toLowerCase() === pressedKey
              return (
                <button
                  key={key.english}
                  className={`key ${isNextKey ? 'hint' : ''} ${isPressed ? 'pressed' : ''}`}
                  onClick={() => handleKeyClick(key.english)}
                  type="button"
                >
                  <span className="hebrew-char">{key.hebrew}</span>
                  <span className="english-key">{key.english}</span>
                </button>
              )
            })}
          </div>
        ))}
        <div className="keyboard-row bottom-row">
          <button className="key backspace-key" onClick={handleBackspace} type="button">
            ← Back
          </button>
          <button 
            className={`key space-key ${nextKey === ' ' ? 'hint' : ''} ${pressedKey === ' ' ? 'pressed' : ''}`} 
            onClick={handleSpace} 
            type="button"
          >
            Space
          </button>
        </div>
      </div>

      <div className="instructions">
        Type the Hebrew sentence using your keyboard or tap the keys
      </div>
    </div>
  )
}

export default App

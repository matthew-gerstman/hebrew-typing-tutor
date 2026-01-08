import { useState, useEffect, useCallback, useMemo } from 'react'
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

// ============================================
// SENTENCE-BASED VOCABULARY DRILLING
// ============================================

interface Sentence {
  hebrew: string
  english: string
  tier: number
}

// Sentences with 5-7 words each, organized by tier
const SENTENCES: Sentence[] = [
  // TIER 1 - Basic sentences for beginners
  // Greetings & Daily
  { hebrew: 'שלום מה שלומך היום', english: 'Hello how are you today', tier: 1 },
  { hebrew: 'בוקר טוב לך ידידי', english: 'Good morning to you my friend', tier: 1 },
  { hebrew: 'ערב טוב מה נשמע', english: 'Good evening how is it going', tier: 1 },
  { hebrew: 'תודה רבה על הכל', english: 'Thank you very much for everything', tier: 1 },
  { hebrew: 'סליחה אני לא מבין', english: 'Sorry I do not understand', tier: 1 },
  { hebrew: 'בבקשה תעזור לי קצת', english: 'Please help me a little', tier: 1 },
  { hebrew: 'להתראות נתראה מחר בבוקר', english: 'Goodbye see you tomorrow morning', tier: 1 },
  
  // Family
  { hebrew: 'אמא ואבא גרים בבית', english: 'Mom and dad live at home', tier: 1 },
  { hebrew: 'יש לי אח ואחות', english: 'I have a brother and sister', tier: 1 },
  { hebrew: 'הילד והילדה משחקים בגן', english: 'The boy and girl play in the garden', tier: 1 },
  { hebrew: 'אמא מבשלת ארוחת ערב טעימה', english: 'Mom cooks a tasty dinner', tier: 1 },
  { hebrew: 'אבא קורא ספר לילדים', english: 'Dad reads a book to the children', tier: 1 },
  { hebrew: 'אני אוהב את המשפחה שלי', english: 'I love my family', tier: 1 },
  { hebrew: 'סבא וסבתא באים לבקר', english: 'Grandpa and grandma come to visit', tier: 1 },
  
  // Animals
  { hebrew: 'הכלב רץ מהר בגן', english: 'The dog runs fast in the garden', tier: 1 },
  { hebrew: 'החתול ישן על הספה', english: 'The cat sleeps on the sofa', tier: 1 },
  { hebrew: 'הציפור שרה בחלון שלי', english: 'The bird sings at my window', tier: 1 },
  { hebrew: 'הדג שוחה במים הקרים', english: 'The fish swims in the cold water', tier: 1 },
  { hebrew: 'יש לנו כלב חום גדול', english: 'We have a big brown dog', tier: 1 },
  { hebrew: 'החתול שלי אוהב לשחק', english: 'My cat loves to play', tier: 1 },
  { hebrew: 'ראיתי ציפור יפה בחוץ', english: 'I saw a beautiful bird outside', tier: 1 },
  
  // Food & Drink
  { hebrew: 'אני אוכל תפוח אדום טעים', english: 'I eat a tasty red apple', tier: 1 },
  { hebrew: 'הלחם הזה מאוד טעים', english: 'This bread is very tasty', tier: 1 },
  { hebrew: 'אני שותה מים קרים עכשיו', english: 'I drink cold water now', tier: 1 },
  { hebrew: 'אמא עשתה עוגה לארוחת ערב', english: 'Mom made a cake for dinner', tier: 1 },
  { hebrew: 'אני רוצה לאכול בננה', english: 'I want to eat a banana', tier: 1 },
  { hebrew: 'יש חלב טרי במקרר', english: 'There is fresh milk in the fridge', tier: 1 },
  { hebrew: 'הביצה הזאת טעימה מאוד', english: 'This egg is very tasty', tier: 1 },
  
  // Home
  { hebrew: 'הבית שלי גדול ויפה', english: 'My house is big and beautiful', tier: 1 },
  { hebrew: 'יש לנו חדר שינה קטן', english: 'We have a small bedroom', tier: 1 },
  { hebrew: 'השולחן עומד באמצע החדר', english: 'The table stands in the middle of the room', tier: 1 },
  { hebrew: 'אני יושב על הכיסא', english: 'I sit on the chair', tier: 1 },
  { hebrew: 'הדלת פתוחה והחלון סגור', english: 'The door is open and the window is closed', tier: 1 },
  { hebrew: 'יש תמונה יפה על הקיר', english: 'There is a beautiful picture on the wall', tier: 1 },
  { hebrew: 'המיטה שלי נוחה מאוד', english: 'My bed is very comfortable', tier: 1 },
  
  // Colors & Nature
  { hebrew: 'השמים כחולים והשמש זורחת', english: 'The sky is blue and the sun shines', tier: 1 },
  { hebrew: 'הירח יפה בלילה הזה', english: 'The moon is beautiful tonight', tier: 1 },
  { hebrew: 'יש פרחים אדומים בגינה', english: 'There are red flowers in the garden', tier: 1 },
  { hebrew: 'העץ הירוק גדול מאוד', english: 'The green tree is very big', tier: 1 },
  { hebrew: 'השלג לבן ויפה בחורף', english: 'The snow is white and beautiful in winter', tier: 1 },
  { hebrew: 'הים כחול והחול חם', english: 'The sea is blue and the sand is warm', tier: 1 },
  { hebrew: 'ראיתי קשת צבעונית בשמים', english: 'I saw a colorful rainbow in the sky', tier: 1 },
  
  // Time & Days
  { hebrew: 'היום יום שני בבוקר', english: 'Today is Monday morning', tier: 1 },
  { hebrew: 'מחר אני הולך לבית ספר', english: 'Tomorrow I go to school', tier: 1 },
  { hebrew: 'אתמול היה יום טוב מאוד', english: 'Yesterday was a very good day', tier: 1 },
  { hebrew: 'עכשיו השעה שמונה בערב', english: 'Now it is eight in the evening', tier: 1 },
  { hebrew: 'בלילה אני הולך לישון', english: 'At night I go to sleep', tier: 1 },
  { hebrew: 'בשבת אנחנו נחים בבית', english: 'On Saturday we rest at home', tier: 1 },
  { hebrew: 'ביום ראשון אני קם מוקדם', english: 'On Sunday I wake up early', tier: 1 },
  
  // School & Learning
  { hebrew: 'אני לומד עברית בבית ספר', english: 'I learn Hebrew at school', tier: 1 },
  { hebrew: 'המורה כותבת על הלוח', english: 'The teacher writes on the board', tier: 1 },
  { hebrew: 'יש לי ספר חדש לקרוא', english: 'I have a new book to read', tier: 1 },
  { hebrew: 'אני כותב במחברת שלי', english: 'I write in my notebook', tier: 1 },
  { hebrew: 'השיעור היה מעניין היום', english: 'The lesson was interesting today', tier: 1 },
  { hebrew: 'אני אוהב ללמוד דברים חדשים', english: 'I love to learn new things', tier: 1 },
  { hebrew: 'יש מבחן מחר בבוקר', english: 'There is a test tomorrow morning', tier: 1 },

  // TIER 2 - Intermediate sentences
  // Actions & Activities
  { hebrew: 'אני הולך לחנות לקנות אוכל', english: 'I go to the store to buy food', tier: 2 },
  { hebrew: 'היא רצה מהר מאוד בפארק', english: 'She runs very fast in the park', tier: 2 },
  { hebrew: 'הוא עושה שיעורי בית עכשיו', english: 'He does homework now', tier: 2 },
  { hebrew: 'אנחנו אוכלים ארוחת צהריים יחד', english: 'We eat lunch together', tier: 2 },
  { hebrew: 'הם משחקים כדורגל בחצר', english: 'They play soccer in the yard', tier: 2 },
  { hebrew: 'אני שומע מוזיקה יפה מאוד', english: 'I hear very beautiful music', tier: 2 },
  { hebrew: 'היא רואה סרט עם חברים', english: 'She watches a movie with friends', tier: 2 },
  { hebrew: 'הוא חושב על הבעיה הזאת', english: 'He thinks about this problem', tier: 2 },
  { hebrew: 'אנחנו יודעים את התשובה הנכונה', english: 'We know the correct answer', tier: 2 },
  { hebrew: 'הם רוצים לנסוע לים', english: 'They want to travel to the sea', tier: 2 },
  
  // Questions & Conversations
  { hebrew: 'מה אתה עושה היום בערב', english: 'What are you doing this evening', tier: 2 },
  { hebrew: 'איפה נמצא בית הספר שלך', english: 'Where is your school located', tier: 2 },
  { hebrew: 'מתי אתה בא לבקר אותנו', english: 'When are you coming to visit us', tier: 2 },
  { hebrew: 'למה הוא לא בא היום', english: 'Why did he not come today', tier: 2 },
  { hebrew: 'איך אני מגיע לתחנה הקרובה', english: 'How do I get to the nearest station', tier: 2 },
  { hebrew: 'מי זה האיש הזה שם', english: 'Who is that man over there', tier: 2 },
  { hebrew: 'כמה זה עולה בבקשה', english: 'How much does this cost please', tier: 2 },
  { hebrew: 'האם אתה יכול לעזור לי', english: 'Can you help me', tier: 2 },
  { hebrew: 'מה השעה עכשיו בבקשה', english: 'What time is it now please', tier: 2 },
  { hebrew: 'איזה יום היום בשבוע', english: 'What day is it today', tier: 2 },
  
  // City & Travel
  { hebrew: 'אני גר בעיר גדולה ויפה', english: 'I live in a big beautiful city', tier: 2 },
  { hebrew: 'הרחוב הזה ארוך מאוד', english: 'This street is very long', tier: 2 },
  { hebrew: 'המכונית שלי עומדת בחניה', english: 'My car is parked in the parking lot', tier: 2 },
  { hebrew: 'אני נוסע באוטובוס לעבודה', english: 'I travel by bus to work', tier: 2 },
  { hebrew: 'יש הרבה אנשים ברחוב היום', english: 'There are many people on the street today', tier: 2 },
  { hebrew: 'התחנה נמצאת ליד הבניין הגדול', english: 'The station is near the big building', tier: 2 },
  { hebrew: 'אני צריך לקנות כרטיס נסיעה', english: 'I need to buy a travel ticket', tier: 2 },
  { hebrew: 'הטיסה ממריאה בשעה עשר', english: 'The flight takes off at ten', tier: 2 },
  { hebrew: 'המלון נמצא במרכז העיר', english: 'The hotel is in the city center', tier: 2 },
  { hebrew: 'אנחנו מטיילים בארץ ישראל', english: 'We are traveling in Israel', tier: 2 },
  
  // Work & Money
  { hebrew: 'אני עובד במשרד כל יום', english: 'I work in an office every day', tier: 2 },
  { hebrew: 'העבודה שלי מעניינת מאוד', english: 'My work is very interesting', tier: 2 },
  { hebrew: 'יש לי פגישה חשובה היום', english: 'I have an important meeting today', tier: 2 },
  { hebrew: 'הוא מרוויח כסף טוב בעבודה', english: 'He earns good money at work', tier: 2 },
  { hebrew: 'אני צריך לשלם את החשבון', english: 'I need to pay the bill', tier: 2 },
  { hebrew: 'הבנק סגור ביום שבת', english: 'The bank is closed on Saturday', tier: 2 },
  { hebrew: 'יש לי מספיק כסף לקנות', english: 'I have enough money to buy', tier: 2 },
  { hebrew: 'המחיר הזה יקר מדי', english: 'This price is too expensive', tier: 2 },
  { hebrew: 'אני מחפש עבודה חדשה עכשיו', english: 'I am looking for a new job now', tier: 2 },
  { hebrew: 'הוא הבוס שלי בעבודה', english: 'He is my boss at work', tier: 2 },
  
  // Weather & Seasons
  { hebrew: 'היום חם מאוד בחוץ', english: 'Today it is very hot outside', tier: 2 },
  { hebrew: 'בחורף קר ויורד גשם', english: 'In winter it is cold and rainy', tier: 2 },
  { hebrew: 'הקיץ הזה חם במיוחד', english: 'This summer is especially hot', tier: 2 },
  { hebrew: 'יורד שלג בהרים הגבוהים', english: 'Snow falls in the high mountains', tier: 2 },
  { hebrew: 'הרוח חזקה היום בחוף', english: 'The wind is strong today at the beach', tier: 2 },
  { hebrew: 'יש עננים רבים בשמים', english: 'There are many clouds in the sky', tier: 2 },
  { hebrew: 'האביב הוא עונה יפה', english: 'Spring is a beautiful season', tier: 2 },
  { hebrew: 'בסתיו העלים נושרים מהעצים', english: 'In autumn leaves fall from trees', tier: 2 },
  { hebrew: 'מחר יהיה מזג אוויר נעים', english: 'Tomorrow the weather will be pleasant', tier: 2 },
  { hebrew: 'אני אוהב את הגשם בחורף', english: 'I love the rain in winter', tier: 2 },
  
  // Feelings & Opinions
  { hebrew: 'אני מרגיש טוב היום מאוד', english: 'I feel very good today', tier: 2 },
  { hebrew: 'היא שמחה לראות את החברים', english: 'She is happy to see the friends', tier: 2 },
  { hebrew: 'הוא עייף אחרי יום ארוך', english: 'He is tired after a long day', tier: 2 },
  { hebrew: 'אנחנו מתרגשים מהחדשות הטובות', english: 'We are excited about the good news', tier: 2 },
  { hebrew: 'אני חושב שזה רעיון טוב', english: 'I think this is a good idea', tier: 2 },
  { hebrew: 'היא מאמינה בך מאוד', english: 'She believes in you very much', tier: 2 },
  { hebrew: 'הוא מקווה להצליח במבחן', english: 'He hopes to succeed in the test', tier: 2 },
  { hebrew: 'אני מודאג מהמצב הזה', english: 'I am worried about this situation', tier: 2 },
  { hebrew: 'היא גאה בהישגים שלה', english: 'She is proud of her achievements', tier: 2 },
  { hebrew: 'אנחנו אסירי תודה על העזרה', english: 'We are grateful for the help', tier: 2 },
  
  // Numbers & Shopping
  { hebrew: 'אני רוצה לקנות שלושה תפוחים', english: 'I want to buy three apples', tier: 2 },
  { hebrew: 'יש לי חמישה שקלים בכיס', english: 'I have five shekels in my pocket', tier: 2 },
  { hebrew: 'הם קנו עשר ביצים בחנות', english: 'They bought ten eggs at the store', tier: 2 },
  { hebrew: 'המחיר הוא עשרים שקלים', english: 'The price is twenty shekels', tier: 2 },
  { hebrew: 'אנחנו צריכים מאה גרם גבינה', english: 'We need one hundred grams of cheese', tier: 2 },
  { hebrew: 'יש ארבעה אנשים בתור', english: 'There are four people in line', tier: 2 },
  { hebrew: 'הקופה נמצאת בסוף החנות', english: 'The register is at the end of the store', tier: 2 },
  { hebrew: 'אני משלם במזומן או בכרטיס', english: 'I pay in cash or by card', tier: 2 },
  { hebrew: 'יש הנחה של עשרים אחוז', english: 'There is a twenty percent discount', tier: 2 },
  { hebrew: 'הסל מלא במוצרים טובים', english: 'The basket is full of good products', tier: 2 },
  
  // Health & Body
  { hebrew: 'אני מרגיש לא טוב היום', english: 'I do not feel well today', tier: 2 },
  { hebrew: 'כואב לי הראש מאוד', english: 'My head hurts a lot', tier: 2 },
  { hebrew: 'אני צריך לראות רופא', english: 'I need to see a doctor', tier: 2 },
  { hebrew: 'היא לוקחת תרופה כל יום', english: 'She takes medicine every day', tier: 2 },
  { hebrew: 'הוא עושה ספורט בבוקר', english: 'He does sports in the morning', tier: 2 },
  { hebrew: 'חשוב לאכול אוכל בריא', english: 'It is important to eat healthy food', tier: 2 },
  { hebrew: 'אני שותה הרבה מים ביום', english: 'I drink a lot of water daily', tier: 2 },
  { hebrew: 'היא הולכת לישון מוקדם', english: 'She goes to sleep early', tier: 2 },
  { hebrew: 'הוא רץ חמישה קילומטר בבוקר', english: 'He runs five kilometers in the morning', tier: 2 },
  { hebrew: 'אנחנו צריכים לנוח יותר', english: 'We need to rest more', tier: 2 },
]

interface SentenceState {
  sentence: Sentence
  timesShown: number
  timesCorrect: number
  timesIncorrect: number
  inReview: boolean
  successStreak: number
  errorStreak: number
  lastShownIndex: number
}

interface SessionStats {
  sentencesTyped: number
  sentencesCorrect: number
  sentencesIncorrect: number
  masteredSentences: string[]
  reviewSentences: string[]
  startTime: number
}

// Constants for the drilling system
const SENTENCES_PER_SESSION = 12
const TARGET_REPS = 3   // Graduate after 3 correct
const MIN_GAP = 2       // Minimum sentences between repetitions
const REVIEW_PRIORITY = 0.4

// ============================================
// LEVELS & XP
// ============================================

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

// ============================================
// MAIN APP COMPONENT
// ============================================

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => 
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )
  
  // Session state
  const [sessionSentences, setSessionSentences] = useState<SentenceState[]>([])
  const [currentSentence, setCurrentSentence] = useState<SentenceState | null>(null)
  const [typedText, setTypedText] = useState('')
  const [pressedKey, setPressedKey] = useState<string | null>(null)
  const [sentenceIndex, setSentenceIndex] = useState(0)
  
  // Queues
  const [activeQueue, setActiveQueue] = useState<SentenceState[]>([])
  const [reviewQueue, setReviewQueue] = useState<SentenceState[]>([])
  
  // Stats & UI state
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    sentencesTyped: 0,
    sentencesCorrect: 0,
    sentencesIncorrect: 0,
    masteredSentences: [],
    reviewSentences: [],
    startTime: Date.now()
  })
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('hebrew-typing-xp')
    return saved ? parseInt(saved, 10) : 0
  })
  const [streak, setStreak] = useState(0)
  const [showXp, setShowXp] = useState(false)
  const [areaState, setAreaState] = useState<'normal' | 'complete' | 'error'>('normal')
  const [toast, setToast] = useState<string | null>(null)
  const [showSummary, setShowSummary] = useState(false)
  const [selectedTier, setSelectedTier] = useState(1)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Save XP to localStorage
  useEffect(() => {
    localStorage.setItem('hebrew-typing-xp', xp.toString())
  }, [xp])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  // Initialize session
  const initializeSession = useCallback((tier: number) => {
    const tierSentences = SENTENCES.filter(s => s.tier <= tier)
    const shuffled = [...tierSentences].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, SENTENCES_PER_SESSION)
    
    const sentenceStates: SentenceState[] = selected.map(sentence => ({
      sentence,
      timesShown: 0,
      timesCorrect: 0,
      timesIncorrect: 0,
      inReview: false,
      successStreak: 0,
      errorStreak: 0,
      lastShownIndex: -MIN_GAP - 1
    }))
    
    setSessionSentences(sentenceStates)
    setActiveQueue([...sentenceStates])
    setReviewQueue([])
    setSentenceIndex(0)
    setSessionStats({
      sentencesTyped: 0,
      sentencesCorrect: 0,
      sentencesIncorrect: 0,
      masteredSentences: [],
      reviewSentences: [],
      startTime: Date.now()
    })
    setShowSummary(false)
  }, [])

  // Start session on mount or tier change
  useEffect(() => {
    initializeSession(selectedTier)
  }, [selectedTier, initializeSession])

  // Get next sentence from queues with spacing logic
  const getNextSentence = useCallback((): SentenceState | null => {
    const allMastered = sessionSentences.every(ss => 
      ss.timesShown >= TARGET_REPS && ss.successStreak >= 1
    )
    const reviewEmpty = reviewQueue.length === 0
    
    if (allMastered && reviewEmpty) {
      return null
    }

    const canShow = (ss: SentenceState) => sentenceIndex - ss.lastShownIndex >= MIN_GAP

    if (reviewQueue.length > 0 && Math.random() < REVIEW_PRIORITY) {
      const available = reviewQueue.filter(canShow)
      if (available.length > 0) {
        return available[0]
      }
    }

    const activeAvailable = activeQueue.filter(ss => 
      canShow(ss) && ss.timesShown < TARGET_REPS
    )
    if (activeAvailable.length > 0) {
      return activeAvailable[0]
    }

    if (reviewQueue.length > 0) {
      return reviewQueue[0]
    }

    const needsReps = activeQueue.filter(ss => ss.timesShown < TARGET_REPS)
    if (needsReps.length > 0) {
      return needsReps[0]
    }

    return null
  }, [sessionSentences, activeQueue, reviewQueue, sentenceIndex])

  // Set next sentence
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

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  // Process sentence completion
  const handleSentenceComplete = useCallback((correct: boolean) => {
    if (!currentSentence) return

    const ss = currentSentence
    
    const updatedSentence: SentenceState = {
      ...ss,
      timesShown: ss.timesShown + 1,
      timesCorrect: correct ? ss.timesCorrect + 1 : ss.timesCorrect,
      timesIncorrect: correct ? ss.timesIncorrect : ss.timesIncorrect + 1,
      successStreak: correct ? ss.successStreak + 1 : 0,
      errorStreak: correct ? 0 : ss.errorStreak + 1,
      inReview: !correct || (ss.inReview && ss.successStreak < 1),
      lastShownIndex: sentenceIndex
    }

    setSessionSentences(prev => prev.map(s => 
      s.sentence.hebrew === ss.sentence.hebrew ? updatedSentence : s
    ))

    if (!correct) {
      if (!ss.inReview) {
        setReviewQueue(prev => [...prev, updatedSentence])
      } else {
        setReviewQueue(prev => prev.map(s => 
          s.sentence.hebrew === ss.sentence.hebrew ? updatedSentence : s
        ))
      }
      setActiveQueue(prev => prev.filter(s => s.sentence.hebrew !== ss.sentence.hebrew))
    } else {
      if (ss.inReview) {
        if (updatedSentence.successStreak >= 2) {
          setReviewQueue(prev => prev.filter(s => s.sentence.hebrew !== ss.sentence.hebrew))
          updatedSentence.inReview = false
        } else {
          setReviewQueue(prev => prev.map(s => 
            s.sentence.hebrew === ss.sentence.hebrew ? updatedSentence : s
          ))
        }
      } else {
        setActiveQueue(prev => prev.map(s => 
          s.sentence.hebrew === ss.sentence.hebrew ? updatedSentence : s
        ))
      }
    }

    setSessionStats(prev => ({
      ...prev,
      sentencesTyped: prev.sentencesTyped + 1,
      sentencesCorrect: correct ? prev.sentencesCorrect + 1 : prev.sentencesCorrect,
      sentencesIncorrect: correct ? prev.sentencesIncorrect : prev.sentencesIncorrect + 1,
      masteredSentences: updatedSentence.timesShown >= TARGET_REPS && updatedSentence.successStreak >= 1 && !prev.masteredSentences.includes(ss.sentence.hebrew)
        ? [...prev.masteredSentences, ss.sentence.hebrew]
        : prev.masteredSentences,
      reviewSentences: updatedSentence.inReview && !prev.reviewSentences.includes(ss.sentence.hebrew)
        ? [...prev.reviewSentences, ss.sentence.hebrew]
        : prev.reviewSentences.filter(h => h !== ss.sentence.hebrew || updatedSentence.inReview)
    }))

    if (correct) {
      const earned = 15 + streak * 5
      const newXp = xp + earned
      setXp(newXp)
      setStreak(s => s + 1)
      setShowXp(true)
      
      const oldLvl = getLevel(xp)
      const newLvl = getLevel(newXp)
      if (newLvl.level > oldLvl.level) {
        showToast(`Level up! ${newLvl.emoji} ${newLvl.name}`)
      }
      
      setTimeout(() => setShowXp(false), 2000)
    } else {
      setStreak(0)
    }

    setSentenceIndex(prev => prev + 1)
    setCurrentSentence(null)
    setTypedText('')
  }, [currentSentence, sentenceIndex, xp, streak])

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
    
    if (hebrewChar === expected) {
      const newTyped = typedText + hebrewChar
      setTypedText(newTyped)

      if (newTyped === currentSentence.sentence.hebrew) {
        setAreaState('complete')
        setTimeout(() => {
          setAreaState('normal')
          handleSentenceComplete(true)
        }, 400)
      }
    } else {
      setAreaState('error')
      setTimeout(() => {
        setAreaState('normal')
        handleSentenceComplete(false)
      }, 400)
    }
  }, [currentSentence, typedText, handleSentenceComplete, showSummary])

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

  const nextKey = currentSentence && typedText.length < currentSentence.sentence.hebrew.length
    ? HEBREW_TO_KEY[currentSentence.sentence.hebrew[typedText.length]]
    : null

  const levelInfo = getLevel(xp)
  
  const masteredCount = sessionSentences.filter(ss => 
    ss.timesShown >= TARGET_REPS && ss.successStreak >= 1
  ).length
  
  const inReviewCount = reviewQueue.length
  const progressPercent = (masteredCount / SENTENCES_PER_SESSION) * 100

  const summarySentences = useMemo(() => {
    return sessionSentences.map(ss => ({
      hebrew: ss.sentence.hebrew,
      english: ss.sentence.english,
      timesShown: ss.timesShown,
      accuracy: ss.timesShown > 0 ? Math.round((ss.timesCorrect / ss.timesShown) * 100) : 0,
      mastered: ss.timesShown >= TARGET_REPS && ss.successStreak >= 1,
      inReview: ss.inReview
    })).sort((a, b) => (b.mastered ? 1 : 0) - (a.mastered ? 1 : 0))
  }, [sessionSentences])

  const tier1Count = SENTENCES.filter(s => s.tier === 1).length
  const tier2Count = SENTENCES.filter(s => s.tier === 2).length

  return (
    <div className="app" onClick={() => dropdownOpen && setDropdownOpen(false)}>
      <header className="header">
        <div className="category-wrapper" onClick={e => e.stopPropagation()}>
          <button className="category-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
            Tier {selectedTier} ▾
          </button>
          <div className={`category-dropdown ${dropdownOpen ? 'open' : ''}`}>
            <button
              className={selectedTier === 1 ? 'active' : ''}
              onClick={() => setSelectedTier(1)}
            >
              Tier 1 ({tier1Count} sentences)
            </button>
            <button
              className={selectedTier === 2 ? 'active' : ''}
              onClick={() => setSelectedTier(2)}
            >
              All ({tier1Count + tier2Count} sentences)
            </button>
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

      <div className={`xp-container ${showXp ? 'visible' : ''}`}>
        <div className="xp-info">{levelInfo.emoji} {levelInfo.name} · {xp} / {levelInfo.nextXp} XP</div>
        <div className="xp-bar-container">
          <div className="xp-bar" style={{ width: `${levelInfo.progress * 100}%` }} />
        </div>
      </div>

      {showSummary ? (
        <div className="summary-container">
          <h2>🎉 Session Complete!</h2>
          <div className="summary-stats">
            <div className="stat-box">
              <span className="stat-number">{sessionStats.sentencesTyped}</span>
              <span className="stat-label">Sentences</span>
            </div>
            <div className="stat-box">
              <span className="stat-number">{Math.round((sessionStats.sentencesCorrect / Math.max(sessionStats.sentencesTyped, 1)) * 100)}%</span>
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
          
          <button className="restart-btn" onClick={() => initializeSession(selectedTier)}>
            Start New Session
          </button>
        </div>
      ) : (
        <div className={`typing-area ${areaState}`}>
          {currentSentence && (
            <>
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
            </>
          )}
        </div>
      )}

      {!showSummary && (
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
      )}

      <div className={`toast ${toast ? 'visible' : ''}`}>{toast}</div>
    </div>
  )
}

export default App

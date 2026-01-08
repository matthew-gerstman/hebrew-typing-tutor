import type { KeyConfig } from '../types'

export const HEBREW_KEYBOARD: KeyConfig[][] = [
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

// Build key mappings
export const KEY_MAP: Record<string, string> = { ' ': ' ' }
export const HEBREW_TO_KEY: Record<string, string> = { ' ': ' ' }

HEBREW_KEYBOARD.forEach(row => {
  row.forEach(key => {
    KEY_MAP[key.english.toLowerCase()] = key.hebrew
    HEBREW_TO_KEY[key.hebrew] = key.english.toLowerCase()
  })
})

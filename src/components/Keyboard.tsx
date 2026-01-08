import { HEBREW_KEYBOARD } from '../data/keyboard'

interface KeyboardProps {
  nextKey: string | null
  pressedKey: string | null
  onKeyPress: (key: string) => void
}

export function Keyboard({ nextKey, pressedKey, onKeyPress }: KeyboardProps) {
  return (
    <div className="keyboard">
      {HEBREW_KEYBOARD.map((row, ri) => (
        <div key={ri} className="keyboard-row">
          {row.map(key => (
            <button
              key={key.english}
              className={`key finger-${key.finger} ${key.english.toLowerCase() === nextKey ? 'hint' : ''} ${key.english.toLowerCase() === pressedKey ? 'pressed' : ''}`}
              onClick={() => onKeyPress(key.english.toLowerCase())}
              type="button"
            >
              <span className="hebrew-char">{key.hebrew}</span>
              <span className="english-key">{key.english}</span>
            </button>
          ))}
        </div>
      ))}
      <div className="keyboard-row">
        <button 
          className="key backspace-key finger-pinky-r" 
          onClick={() => onKeyPress('backspace')} 
          type="button"
        >
          ← Back
        </button>
        <button 
          className={`key space-key finger-thumb ${nextKey === ' ' ? 'hint' : ''}`}
          onClick={() => onKeyPress(' ')} 
          type="button"
        >
          Space
        </button>
      </div>
    </div>
  )
}

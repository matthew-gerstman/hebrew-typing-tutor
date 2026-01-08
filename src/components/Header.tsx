import { getTierCounts } from '../data/sentences'


interface HeaderProps {
  selectedTier: number
  setSelectedTier: (tier: number) => void
  dropdownOpen: boolean
  setDropdownOpen: (open: boolean) => void
  xp: number
  streak: number
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export function Header({
  selectedTier,
  setSelectedTier,
  dropdownOpen,
  setDropdownOpen,
  xp,
  streak,
  theme,
  setTheme,
}: HeaderProps) {
  const { tier1, total } = getTierCounts()

  return (
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
            Tier 1 ({tier1} sentences)
          </button>
          <button
            className={selectedTier === 2 ? 'active' : ''}
            onClick={() => setSelectedTier(2)}
          >
            All ({total} sentences)
          </button>
        </div>
      </div>
      <div className="header-right">
        <div className="stats">
          <span>⭐ {xp}</span>
          {streak > 1 && <span>🔥 {streak}</span>}
        </div>
        <button 
          className="theme-toggle" 
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}

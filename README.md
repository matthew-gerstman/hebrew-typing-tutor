# Hebrew Touch Typing Tutor 🇮🇱

An interactive web application designed to teach children touch typing skills in Hebrew using kid-friendly vocabulary and sentences.

## Features

- **70+ Hebrew sentences** across 9 categories (animals, family, food, school, nature, home, colors, actions, greetings)
- **3-7 word sentences** appropriate for ~10 year olds
- **On-screen Hebrew keyboard** showing both Hebrew and English characters
- **Visual typing feedback** - character-by-character highlighting with correct/incorrect indicators
- **Dark mode UI** matching Obvious design system
- **Fully responsive** - works on mobile, tablet, and desktop
- **Touch support** - tap keys on mobile devices
- **Score & streak tracking** for gamification

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and builds
- **CSS3** with CSS variables for theming

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Keyboard Layout

Uses the standard Israeli keyboard layout. Each key displays:
- **Top**: Hebrew character
- **Bottom**: Corresponding English key

The next expected key is highlighted in indigo to guide learners.

## Project Structure

```
src/
├── App.tsx        # Main application component
│                  # - Hebrew keyboard layout mapping
│                  # - Sentence data (70+ sentences)
│                  # - Typing logic and state management
├── App.css        # Styling (dark mode, responsive)
├── main.tsx       # React entry point
└── index.css      # Base styles
```

## Sentence Categories

| Category | Examples |
|----------|----------|
| Animals | הכלב רץ בגן (The dog runs in the garden) |
| Family | אמא מבשלת ארוחת ערב (Mom cooks dinner) |
| Food | אני אוהב לאכול תפוחים (I like to eat apples) |
| School | אני הולך לבית ספר (I go to school) |
| Nature | השמש זורחת בשמים (The sun shines in the sky) |
| Home | הבית שלי יפה (My house is beautiful) |
| Colors | השמים כחולים היום (The sky is blue today) |
| Actions | אני רץ בפארק (I run in the park) |
| Greetings | בוקר טוב לכולם (Good morning everyone) |

## Deployment

Currently hosted via Obvious at: `https://prj_6Luom74C-5173.hosted.obvious.ai`

To deploy elsewhere:
1. Run `npm run build`
2. Deploy the `dist/` folder to any static hosting (Vercel, Netlify, GitHub Pages, etc.)

## Future Enhancements

Potential improvements for future development:
- [ ] Progress tracking / persistence
- [ ] Difficulty levels (longer sentences, less common vocabulary)
- [ ] Sound effects for correct/incorrect typing
- [ ] Leaderboard functionality
- [ ] Custom sentence input
- [ ] Nikud (vowel marks) support
- [ ] Print keyboard layout reference sheet

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

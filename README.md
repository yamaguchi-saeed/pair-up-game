# 🎮 Pair Up - Memory Card Matching Game

A modern, responsive memory card matching game built with React. Test your memory by finding matching pairs across multiple themes with support for multiplayer gameplay.

![Game Preview](https://img.shields.io/badge/status-active-success.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🎯 Features

### Core Gameplay

- 🃏 **Multiple Themes**: Country flags (271), playing cards (52), fruits, Japan-themed, and custom uploads
- 👥 **Multiplayer Support**: 1-4 players with turn-based gameplay
- 🎚️ **Adjustable Difficulty**: Choose from 6 to 26 pairs (12-52 cards)
- 🏆 **Score Tracking**: Real-time score and move counting
- 🎨 **Responsive Design**: Optimized for mobile, tablet, and desktop

### User Experience

- 📤 **Custom Image Upload**: Upload your own images (min. 8 required)
- 🔄 **Dynamic Shuffling**: Different card arrangement every game
- 🎭 **Turn Notifications**: Clear visual feedback for turn changes
- 📱 **Collapsible Header**: Maximize screen space during gameplay
- ⚡ **Smooth Animations**: Polished card flips and transitions

### Technical Highlights

- ⚛️ **React Hooks**: Optimized with `useCallback`, `useMemo`, and `memo`
- 🔒 **Privacy-Focused**: User uploads stored in memory only, auto-deleted
- 🎨 **Modern UI**: Dark theme with gradient effects and responsive grids
- 🧹 **Clean Code**: Organized component structure with separation of concerns
- 🚀 **Performance**: Lazy loading images and optimized re-renders

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yamaguchi_saeed/pair-up-game.git
cd memory_game
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Add assets** (if not included)

- Place flag SVGs in `public/Assets/flags/`
- Place card SVGs in `public/Assets/svg_playing_cards/fronts/`

4. **Start development server**

```bash
npm run dev
# or
yarn dev
```

5. **Open in browser**

```
http://localhost:5173
```

---

## 📂 Project Structure

```
memory_game/
├── public/
│   └── Assets/
│       ├── flags/              # 271 country flag SVGs
│       └── svg_playing_cards/  # 52 playing card SVGs
│
├── src/
│   ├── Components/
│   │   ├── Card.jsx           # Individual card component
│   │   ├── GameHeader.jsx     # Controls and stats display
│   │   ├── WinMessage.jsx     # Victory screen
│   │   └── TurnNotification.jsx  # Turn change popup
│   │
│   ├── themes/
│   │   ├── flags.js           # Country flags theme
│   │   ├── cards.js           # Playing cards theme
│   │   ├── fruits.js          # Fruit emojis theme
│   │   ├── japan.js           # Japan-themed emojis
│   │   └── index.js           # Theme exports
│   │
│   ├── App.jsx                # Main game logic
│   ├── index.css              # Global styles
│   └── main.jsx               # React entry point
│
├── package.json
└── README.md
```

---

## 🎮 How to Play

### Single Player

1. Click "New Game" to start
2. Click any card to flip it face-up
3. Click another card to find its match
4. If cards match: They stay face-up, you earn 1 point
5. If cards don't match: They flip back after 1 second
6. Game ends when all pairs are found
7. Try to complete in minimum moves!

### Multiplayer (2-4 Players)

1. Select number of players before starting
2. Players take turns finding matches
3. **Bonus Turn**: If you find a match, go again!
4. If no match: Turn passes to next player
5. Winner: Player with most pairs when game ends

### Custom Images

1. Select "Custom" from theme dropdown
2. Click "Upload Images" button
3. Choose at least 8 image files
4. Click "New Game" to play with your images

---

## 🛠️ Tech Stack

### Frontend

- **React 18.x** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling with Flexbox/Grid

### Key Technologies

- **React Hooks**: useState, useEffect, useCallback, useMemo
- **React.memo**: Performance optimization
- **File API**: Custom image upload
- **Blob URLs**: Temporary image storage
- **CSS Transitions**: Smooth animations

---

## ⚙️ Configuration

### Adjusting Game Settings

**Card Count:**
Edit `src/Components/GameHeader.jsx`:

```javascript
<select id="pairs-select">
  <option value={6}>6 pairs (12 cards)</option>
  <option value={8}>8 pairs (16 cards)</option>
  // Add more options...
</select>
```

**Theme Colors:**
Edit `src/App.jsx`:

```javascript
const PLAYER_COLORS = [
  "#818cf8", // Player 1 - Indigo
  "#f472b6", // Player 2 - Pink
  "#34d399", // Player 3 - Green
  "#fbbf24", // Player 4 - Amber
];
```

**Timing Delays:**
Edit `src/App.jsx`:

```javascript
const MATCH_DELAY = 400; // Match animation (ms)
const MISMATCH_DELAY = 1000; // Non-match view time (ms)
const NOTIFICATION_DURATION = 2000; // Turn notification (ms)
```

---

## 🎨 Adding New Themes

### Step 1: Create Theme File

Create `src/themes/animals.js`:

```javascript
const animals = [
  { id: "dog", name: "Dog", src: "🐕" },
  { id: "cat", name: "Cat", src: "🐈" },
  { id: "lion", name: "Lion", src: "🦁" },
  // Add more animals...
];

export default animals;
```

### Step 2: Register Theme

Edit `src/themes/index.js`:

```javascript
import animals from "./animals";

const themes = {
  flags,
  cards,
  animals, // Add new theme
};
```

### Step 3: Add to UI

Edit `src/Components/GameHeader.jsx`:

```javascript
<select id="theme-select">
  <option value="flags">🏁 Flags</option>
  <option value="animals">🦁 Animals</option>
</select>
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Cards flip smoothly
- [ ] Matches are detected correctly
- [ ] Turn switching works in multiplayer
- [ ] Turn notification blocks clicks
- [ ] Win condition triggers properly
- [ ] Custom upload validates files
- [ ] Header collapses/expands
- [ ] Responsive on mobile/tablet/desktop

### Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

This creates a `dist/` folder with optimized files.

### Deploy to GitHub Pages

```bash
npm install gh-pages --save-dev
```

Add to `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/pair-up-game"
}
```

Deploy:

```bash
npm run deploy
```

### Other Hosting Options

- **Netlify**: Drag and drop `dist/` folder
- **Vercel**: Connect GitHub repository
- **Surge**: `surge dist/`

---

## 🎯 Performance Optimizations

### Implemented

- ✅ React.memo on Card component (prevents unnecessary re-renders)
- ✅ useCallback for event handlers (stable function references)
- ✅ useMemo for expensive calculations (theme data, winner)
- ✅ Lazy loading images (`loading="lazy"`)
- ✅ Cleanup of blob URLs (memory management)
- ✅ Efficient state updates (functional setState)

### Future Improvements

- [ ] Virtual scrolling for large card sets
- [ ] Web Workers for shuffling algorithm
- [ ] Service Worker for offline play
- [ ] LocalStorage for settings persistence

---

## 🐛 Known Issues

- Image upload limited by browser memory (~100MB typically)
- Very large card counts (52) may impact low-end devices

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use functional components with hooks
- Follow existing code structure
- Add comments for complex logic
- Test on multiple browsers
- Ensure responsive design

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👏 Acknowledgments

- Flag SVGs: [country-flags](https://github.com/lipis/flag-icons)
- Playing card SVGs: [svg-cards](https://www.tekeye.uk/playing_cards/svg-playing-cards)
- Emoji support: Native browser emojis
- Inspiration: Classic Memory concentration card game

---

## 📧 Contact

**Project Link**: [https://github.com/yamaguchi-saeed/pair-up-game](https://github.com/yamaguchi-saeed/concentration-game)

**Issues**: [https://github.com/yamaguchi-saeed/pair-up-game/issues](https://github.com/yamaguchi-saeed/concentration-game/issues)

---

## 🎮 Deployed App

### Vercel

**Live Demo:** https://pair-up-game.vercel.app/



---

**Made with ❤️ and ⚛️ React**

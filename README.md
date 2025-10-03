# VibePlay 🎵

VibePlay is a beautiful, modern music streaming web app built with React, TypeScript, Vite, and Tailwind CSS. It features animated page transitions, a global music player, trending playlists, search, and more.

## Features

- 🎧 Browse and play millions of songs from Saavn API
- 🔥 Trending songs and curated playlists
- 🎵 Global music player with animated controls
- 💖 Favorite songs and playlists
- 🔎 Powerful search with suggestions
- ⚡ Fast, responsive, and mobile-friendly UI
- 🌈 Beautiful design with Tailwind CSS and Lucide icons
- 🎬 Smooth page transitions using Framer Motion

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/)
- [Saavn.dev API](https://saavn.dev/)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/vibeplay.git
   cd vibeplay
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```sh
npm run build
```

### Lint and Type Check

```sh
npm run lint
npm run typecheck
```

## Project Structure

```
.
├── src/
│   ├── components/      # Reusable UI components
│   ├── context/         # React context for global state (music player)
│   ├── data/            # Static music data
│   ├── pages/           # Main app pages (Home, Browse, Search, etc.)
│   ├── services/        # API calls
│   ├── App.tsx          # App entry point
│   └── main.tsx         # React root
├── public/
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── package.json
└── ...
```

## Environment Variables

If you need to add API keys or environment variables, use the `.env` file.

## Credits

- Music data powered by [saavn.dev](https://saavn.dev/)
- UI icons from [Lucide](https://lucide.dev/)
- Images from [Pexels](https://pexels.com/)

## License

MIT

---

> Designed and built with ❤️ for music lovers.
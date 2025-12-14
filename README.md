# 🌟 AniSearch

A modern, visually stunning anime search and filter application built with React, Tailwind CSS, and ShadCN UI.

![AniSearch](https://via.placeholder.com/800x400?text=AniSearch+-+Discover+Your+Favorite+Anime)

## ✨ Features

### Core Features
- 🔍 **Smart Search** - Real-time anime search with debouncing for optimal performance
- 🏷️ **Genre Filtering** - Filter by multiple genres (Action, Drama, Fantasy, Romance, and more)
- 📊 **Sorting Options** - Sort results by ranking or title (ascending/descending)
- 📖 **Pagination** - Browse through pages of results seamlessly
- 📋 **Anime Details** - Modal view with detailed information for each anime

### Enhanced Features
- ❤️ **Favorites System** - Save your favorite anime to localStorage
- 🌓 **Dark/Light Mode** - Toggle between themes with system preference detection
- ✨ **Skeleton Loading** - Smooth loading states for better UX
- 📱 **Fully Responsive** - Works beautifully on all devices
- 🎨 **Micro-animations** - Hover effects, transitions, and smooth interactions

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **UI Components**: ShadCN/UI (Radix UI primitives)
- **Icons**: Lucide React
- **API**: AnimeDB (RapidAPI)

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/anisearch.git
   cd anisearch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_RAPIDAPI_KEY=your_rapidapi_key_here
   VITE_RAPIDAPI_HOST=anime-db.p.rapidapi.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
anisearch/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              # ShadCN UI components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   └── skeleton.tsx
│   │   ├── AnimeCard.tsx
│   │   ├── AnimeCardSkeleton.tsx
│   │   ├── AnimeDetailModal.tsx
│   │   ├── AnimeGrid.tsx
│   │   ├── FavoritesModal.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Pagination.tsx
│   │   └── SearchBar.tsx
│   ├── hooks/
│   │   ├── useAnimeSearch.ts
│   │   ├── useFavorites.ts
│   │   └── useTheme.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── services/
│   │   └── animeApi.ts
│   ├── types/
│   │   └── anime.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Design Features

- **Color Palette**: Deep purple/violet primary with vibrant pink accents
- **Typography**: Poppins for headings, Inter for body text
- **Visual Effects**: 
  - Glassmorphism cards
  - Gradient overlays
  - Smooth hover transitions
  - Animated loading skeletons
  - Glow effects

## 📡 API Reference

This app uses the [AnimeDB API](https://rapidapi.com/brian-elelate/api/anime-db) from RapidAPI.

### Endpoints Used

| Endpoint | Description |
|----------|-------------|
| `GET /anime` | Search and filter anime with pagination |
| `GET /anime/by-id/:id` | Get detailed anime information |

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | number | Page number for pagination |
| `size` | number | Number of results per page |
| `search` | string | Search query |
| `genres` | string | Comma-separated list of genres |
| `sortBy` | string | Sort field (ranking, title) |
| `sortOrder` | string | Sort order (asc, desc) |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [AnimeDB API](https://rapidapi.com/brian-elelate/api/anime-db) for the anime data
- [ShadCN/UI](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide Icons](https://lucide.dev/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

Made with ❤️ for anime lovers everywhere

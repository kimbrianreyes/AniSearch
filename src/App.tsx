import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { AnimeGrid } from './components/AnimeGrid';
import { Pagination } from './components/Pagination';
import { AnimeDetailModal } from './components/AnimeDetailModal';
import { FavoritesModal } from './components/FavoritesModal';
import { Footer } from './components/Footer';
import { useAnimeSearch } from './hooks/useAnimeSearch';
import { useFavorites } from './hooks/useFavorites';
import { useTheme } from './hooks/useTheme';
import type { Anime } from './types/anime';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './components/ui/button';

function App() {
  // Initialize theme
  useTheme();

  // State
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);

  // Hooks
  const {
    anime,
    loading,
    error,
    totalPages,
    totalResults,
    currentPage,
    updateSearch,
    updateGenres,
    updateSort,
    goToPage,
    clearFilters,
    refresh,
  } = useAnimeSearch();

  const {
    favorites,
    toggleFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount,
  } = useFavorites();

  // Handlers
  const handleViewDetails = useCallback((anime: Anime) => {
    setSelectedAnime(anime);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedAnime(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[128px]" />
      </div>

      {/* Header */}
      <Header
        favoritesCount={favoritesCount}
        onShowFavorites={() => setShowFavorites(true)}
      />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
            Discover Your Next{' '}
            <span className="gradient-text">Favorite Anime</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Search through thousands of anime, filter by genre, and find your perfect watch.
            Save your favorites and never miss a gem!
          </p>
        </section>

        {/* Search */}
        <section className="mb-12">
          <SearchBar
            onSearch={updateSearch}
            onGenreChange={updateGenres}
            onSortChange={updateSort}
            onClearFilters={clearFilters}
          />
        </section>

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-16 w-16 text-destructive mb-4" />
            <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={refresh} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        )}

        {/* Results */}
        {!error && (
          <>
            {/* Results count */}
            {!loading && totalResults > 0 && (
              <p className="text-sm text-muted-foreground mb-6">
                Found <span className="font-semibold text-foreground">{totalResults.toLocaleString()}</span> anime
              </p>
            )}

            {/* Anime Grid */}
            <AnimeGrid
              anime={anime}
              loading={loading}
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
              onViewDetails={handleViewDetails}
            />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
              onPageChange={goToPage}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AnimeDetailModal
        anime={selectedAnime}
        open={!!selectedAnime}
        onClose={handleCloseDetails}
        isFavorite={selectedAnime ? isFavorite(selectedAnime._id) : false}
        onToggleFavorite={toggleFavorite}
      />

      <FavoritesModal
        open={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        onRemoveFavorite={removeFavorite}
        onViewDetails={handleViewDetails}
        onClearAll={clearFavorites}
      />
    </div>
  );
}

export default App;

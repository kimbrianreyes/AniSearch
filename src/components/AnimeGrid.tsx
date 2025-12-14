import { AnimeCard } from './AnimeCard';
import { AnimeCardSkeleton } from './AnimeCardSkeleton';
import type { Anime } from '../types/anime';
import { SearchX } from 'lucide-react';

interface AnimeGridProps {
    anime: Anime[];
    loading: boolean;
    isFavorite: (id: string) => boolean;
    onToggleFavorite: (anime: Anime) => void;
    onViewDetails: (anime: Anime) => void;
}

export function AnimeGrid({
    anime,
    loading,
    isFavorite,
    onToggleFavorite,
    onViewDetails
}: AnimeGridProps) {
    // Loading state
    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                    <AnimeCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    // Empty state
    if (anime.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="relative mb-6">
                    <SearchX className="h-24 w-24 text-muted-foreground/30" />
                    <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                    No anime found
                </h3>
                <p className="text-muted-foreground max-w-md">
                    Try adjusting your search or filters to discover more amazing anime!
                </p>
            </div>
        );
    }

    // Anime grid
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {anime.map((item) => (
                <AnimeCard
                    key={item._id}
                    anime={item}
                    isFavorite={isFavorite(item._id)}
                    onToggleFavorite={onToggleFavorite}
                    onViewDetails={onViewDetails}
                />
            ))}
        </div>
    );
}

import { useState } from 'react';
import { Heart, Star, Play } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Anime } from '../types/anime';

interface AnimeCardProps {
    anime: Anime;
    isFavorite: boolean;
    onToggleFavorite: (anime: Anime) => void;
    onViewDetails: (anime: Anime) => void;
}

export function AnimeCard({ anime, isFavorite, onToggleFavorite, onViewDetails }: AnimeCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const imageUrl = anime.image || anime.thumb;
    const fallbackImage = 'https://via.placeholder.com/300x400?text=No+Image';

    return (
        <Card
            className="anime-card group relative overflow-hidden bg-card/50 hover:bg-card cursor-pointer border-0 shadow-xl"
            onClick={() => onViewDetails(anime)}
        >
            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden">
                {/* Loading Skeleton */}
                {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 shimmer bg-muted" />
                )}

                {/* Anime Image */}
                <img
                    src={imageError ? fallbackImage : imageUrl}
                    alt={anime.title}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => {
                        setImageError(true);
                        setImageLoaded(true);
                    }}
                    loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Ranking Badge */}
                {anime.hasRanking && anime.ranking && (
                    <div className="absolute top-3 left-3">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-yellow-500/90 text-yellow-950 font-bold text-sm shadow-lg">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            #{anime.ranking}
                        </div>
                    </div>
                )}

                {/* Favorite Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className={`absolute top-3 right-3 h-10 w-10 rounded-full backdrop-blur-sm transition-all duration-200 ${isFavorite
                        ? 'bg-pink-500/90 hover:bg-pink-600 text-white'
                        : 'bg-black/40 hover:bg-black/60 text-white'
                        }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(anime);
                    }}
                >
                    <Heart className={`h-5 w-5 transition-transform duration-200 ${isFavorite ? 'fill-current scale-110' : 'group-hover:scale-110'}`} />
                </Button>

                {/* Episode Count */}
                {anime.hasEpisode && anime.episodes && (
                    <div className="absolute bottom-16 left-3">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/90 text-primary-foreground text-xs font-medium">
                            <Play className="h-3 w-3 fill-current" />
                            {anime.episodes} eps
                        </div>
                    </div>
                )}

                {/* Title Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-heading font-bold text-white text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {anime.title}
                    </h3>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-1 mt-2">
                        {anime.genres.slice(0, 3).map((genre) => (
                            <Badge
                                key={genre}
                                variant="secondary"
                                className="text-[10px] px-1.5 py-0 bg-white/20 text-white border-none backdrop-blur-sm"
                            >
                                {genre}
                            </Badge>
                        ))}
                        {anime.genres.length > 3 && (
                            <Badge
                                variant="secondary"
                                className="text-[10px] px-1.5 py-0 bg-white/20 text-white border-none backdrop-blur-sm"
                            >
                                +{anime.genres.length - 3}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Card>
    );
}

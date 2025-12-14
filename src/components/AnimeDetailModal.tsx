import { Star, Play, ExternalLink, Heart, Calendar, Film } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Anime } from '../types/anime';

interface AnimeDetailModalProps {
    anime: Anime | null;
    open: boolean;
    onClose: () => void;
    isFavorite: boolean;
    onToggleFavorite: (anime: Anime) => void;
}

export function AnimeDetailModal({
    anime,
    open,
    onClose,
    isFavorite,
    onToggleFavorite
}: AnimeDetailModalProps) {
    if (!anime) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 bg-background/95 backdrop-blur-xl">
                {/* Hero Section */}
                <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                    <img
                        src={anime.image || anime.thumb}
                        alt={anime.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                    {/* Ranking */}
                    {anime.hasRanking && anime.ranking && (
                        <div className="absolute top-4 left-4">
                            <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-yellow-500 text-yellow-950 font-bold shadow-lg">
                                <Star className="h-4 w-4 fill-current" />
                                Rank #{anime.ranking}
                            </div>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 -mt-20 relative z-10">
                    <DialogHeader>
                        <DialogTitle className="text-2xl md:text-3xl font-heading gradient-text">
                            {anime.title}
                        </DialogTitle>
                    </DialogHeader>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-muted-foreground">
                        {anime.type && (
                            <div className="flex items-center gap-1.5">
                                <Film className="h-4 w-4" />
                                <span className="text-sm font-medium">{anime.type}</span>
                            </div>
                        )}
                        {anime.hasEpisode && anime.episodes && (
                            <div className="flex items-center gap-1.5">
                                <Play className="h-4 w-4" />
                                <span className="text-sm font-medium">{anime.episodes} Episodes</span>
                            </div>
                        )}
                        {anime.status && (
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm font-medium">{anime.status}</span>
                            </div>
                        )}
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {anime.genres.map((genre) => (
                            <Badge key={genre} variant="genre" className="text-sm">
                                {genre}
                            </Badge>
                        ))}
                    </div>

                    {/* Synopsis */}
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold font-heading mb-2">Synopsis</h4>
                        <p className="text-muted-foreground leading-relaxed">
                            {anime.synopsis || 'No synopsis available for this anime.'}
                        </p>
                    </div>

                    {/* Alternative Titles */}
                    {anime.alternativeTitles && anime.alternativeTitles.length > 0 && (
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold font-heading mb-2">Alternative Titles</h4>
                            <div className="flex flex-wrap gap-2">
                                {anime.alternativeTitles.map((title, index) => (
                                    <Badge key={index} variant="outline" className="text-sm">
                                        {title}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 mt-8">
                        <Button
                            onClick={() => onToggleFavorite(anime)}
                            variant={isFavorite ? 'default' : 'outline'}
                            className={`flex-1 sm:flex-none ${isFavorite ? 'bg-pink-500 hover:bg-pink-600' : ''}`}
                        >
                            <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                            {isFavorite ? 'In Favorites' : 'Add to Favorites'}
                        </Button>

                        {anime.link && (
                            <Button
                                variant="outline"
                                className="flex-1 sm:flex-none"
                                onClick={() => window.open(anime.link, '_blank')}
                            >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View on MAL
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

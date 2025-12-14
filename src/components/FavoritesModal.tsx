import { Heart, X } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { Anime } from '../types/anime';

interface FavoritesModalProps {
    open: boolean;
    onClose: () => void;
    favorites: Anime[];
    onRemoveFavorite: (animeId: string) => void;
    onViewDetails: (anime: Anime) => void;
    onClearAll: () => void;
}

export function FavoritesModal({
    open,
    onClose,
    favorites,
    onRemoveFavorite,
    onViewDetails,
    onClearAll,
}: FavoritesModalProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
                <DialogHeader className="flex-shrink-0">
                    <DialogTitle className="flex items-center gap-2 text-xl font-heading">
                        <Heart className="h-5 w-5 fill-pink-500 text-pink-500" />
                        My Favorites
                        {favorites.length > 0 && (
                            <Badge variant="secondary" className="ml-2">
                                {favorites.length}
                            </Badge>
                        )}
                    </DialogTitle>
                </DialogHeader>

                {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Heart className="h-16 w-16 text-muted-foreground/30 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                        <p className="text-muted-foreground text-sm">
                            Click the heart icon on any anime to add it to your favorites!
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Clear All Button */}
                        <div className="flex justify-end mb-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClearAll}
                                className="text-destructive hover:text-destructive"
                            >
                                Clear All
                            </Button>
                        </div>

                        {/* Favorites List */}
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                            {favorites.map((anime) => (
                                <div
                                    key={anime._id}
                                    className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                                >
                                    {/* Thumbnail */}
                                    <img
                                        src={anime.thumb || anime.image}
                                        alt={anime.title}
                                        className="w-16 h-20 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
                                        onClick={() => {
                                            onClose();
                                            setTimeout(() => onViewDetails(anime), 100);
                                        }}
                                    />

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h4
                                            className="font-semibold text-foreground truncate cursor-pointer hover:text-primary transition-colors"
                                            onClick={() => {
                                                onClose();
                                                setTimeout(() => onViewDetails(anime), 100);
                                            }}
                                        >
                                            {anime.title}
                                        </h4>
                                        <div className="flex flex-wrap gap-1 mt-1.5">
                                            {anime.genres.slice(0, 2).map((genre) => (
                                                <Badge
                                                    key={genre}
                                                    variant="outline"
                                                    className="text-[10px] px-1.5 py-0"
                                                >
                                                    {genre}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Remove Button */}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onRemoveFavorite(anime._id)}
                                        className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

import { Moon, Sun, Heart, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../hooks/useTheme';

interface HeaderProps {
    favoritesCount: number;
    onShowFavorites: () => void;
}

export function Header({ favoritesCount, onShowFavorites }: HeaderProps) {
    const { isDark, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-xl">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Sparkles className="h-8 w-8 text-primary animate-pulse" />
                        <div className="absolute inset-0 h-8 w-8 bg-primary/30 blur-xl rounded-full" />
                    </div>
                    <h1 className="text-2xl font-bold font-heading">
                        <span className="gradient-text">Ani</span>
                        <span className="text-foreground">Search</span>
                    </h1>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Favorites Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onShowFavorites}
                        className="relative"
                    >
                        <Heart className={`h-5 w-5 ${favoritesCount > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
                        {favoritesCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-pink-500 text-[10px] font-bold text-white flex items-center justify-center">
                                {favoritesCount > 99 ? '99+' : favoritesCount}
                            </span>
                        )}
                    </Button>

                    {/* Theme Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="relative overflow-hidden"
                    >
                        <Sun className={`h-5 w-5 absolute transition-all duration-300 ${isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
                        <Moon className={`h-5 w-5 transition-all duration-300 ${isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
                    </Button>
                </div>
            </div>
        </header>
    );
}

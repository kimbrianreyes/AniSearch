import { useState, useEffect, useCallback } from 'react';
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { GENRES } from '../types/anime';

interface SearchBarProps {
    onSearch: (query: string) => void;
    onGenreChange: (genres: string[]) => void;
    onSortChange: (sortBy: 'ranking' | 'title', sortOrder: 'asc' | 'desc') => void;
    onClearFilters: () => void;
}

export function SearchBar({ onSearch, onGenreChange, onSortChange, onClearFilters }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<'ranking' | 'title'>('ranking');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [showFilters, setShowFilters] = useState(false);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(query);
        }, 500);

        return () => clearTimeout(timer);
    }, [query, onSearch]);

    const handleGenreToggle = useCallback((genre: string) => {
        setSelectedGenres(prev => {
            const newGenres = prev.includes(genre)
                ? prev.filter(g => g !== genre)
                : [...prev, genre];
            onGenreChange(newGenres);
            return newGenres;
        });
    }, [onGenreChange]);

    const handleSortChange = useCallback((newSortBy: 'ranking' | 'title') => {
        setSortBy(newSortBy);
        onSortChange(newSortBy, sortOrder);
    }, [sortOrder, onSortChange]);

    const handleSortOrderChange = useCallback((newSortOrder: 'asc' | 'desc') => {
        setSortOrder(newSortOrder);
        onSortChange(sortBy, newSortOrder);
    }, [sortBy, onSortChange]);

    const handleClearAll = useCallback(() => {
        setQuery('');
        setSelectedGenres([]);
        setSortBy('ranking');
        setSortOrder('asc');
        onClearFilters();
    }, [onClearFilters]);

    const hasActiveFilters = query || selectedGenres.length > 0 || sortBy !== 'ranking' || sortOrder !== 'asc';

    return (
        <div className="w-full space-y-4">
            {/* Main Search Bar */}
            <div className="relative max-w-2xl mx-auto">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        type="text"
                        placeholder="Search for your favorite anime..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-12 pr-24 h-14 text-lg rounded-2xl bg-secondary/50 border-none focus:ring-2 focus:ring-primary/50 shadow-lg"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        {query && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setQuery('')}
                                className="h-8 w-8 rounded-full"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                        <Button
                            variant={showFilters ? 'default' : 'ghost'}
                            size="icon"
                            onClick={() => setShowFilters(!showFilters)}
                            className="h-10 w-10 rounded-xl"
                        >
                            <SlidersHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Filters Panel */}
            <div className={`overflow-hidden transition-all duration-300 ease-out ${showFilters ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-secondary/30 border space-y-6">
                    {/* Genres */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Genres</h3>
                        <div className="flex flex-wrap gap-2">
                            {GENRES.map((genre) => (
                                <Badge
                                    key={genre}
                                    variant={selectedGenres.includes(genre) ? 'default' : 'outline'}
                                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${selectedGenres.includes(genre)
                                            ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                                            : 'hover:bg-primary/10'
                                        }`}
                                    onClick={() => handleGenreToggle(genre)}
                                >
                                    {genre}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Sort Options */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Sort By</h3>
                            <div className="flex gap-2">
                                <Button
                                    variant={sortBy === 'ranking' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handleSortChange('ranking')}
                                    className="rounded-lg"
                                >
                                    Ranking
                                </Button>
                                <Button
                                    variant={sortBy === 'title' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handleSortChange('title')}
                                    className="rounded-lg"
                                >
                                    Title
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Order</h3>
                            <div className="flex gap-2">
                                <Button
                                    variant={sortOrder === 'asc' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handleSortOrderChange('asc')}
                                    className="rounded-lg"
                                >
                                    <ChevronDown className="h-4 w-4 rotate-180 mr-1" />
                                    Ascending
                                </Button>
                                <Button
                                    variant={sortOrder === 'desc' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => handleSortOrderChange('desc')}
                                    className="rounded-lg"
                                >
                                    <ChevronDown className="h-4 w-4 mr-1" />
                                    Descending
                                </Button>
                            </div>
                        </div>

                        {hasActiveFilters && (
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={handleClearAll}
                                className="ml-auto rounded-lg"
                            >
                                <X className="h-4 w-4 mr-1" />
                                Clear All
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Active Filters Display */}
            {selectedGenres.length > 0 && !showFilters && (
                <div className="flex flex-wrap justify-center gap-2">
                    {selectedGenres.map((genre) => (
                        <Badge
                            key={genre}
                            variant="genre"
                            className="cursor-pointer pl-2 pr-1 gap-1 group"
                            onClick={() => handleGenreToggle(genre)}
                        >
                            {genre}
                            <X className="h-3 w-3 opacity-50 group-hover:opacity-100" />
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}

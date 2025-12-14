import { useState, useEffect, useCallback } from 'react';
import type { Anime } from '../types/anime';

const STORAGE_KEY = 'anisearch-favorites';

export function useFavorites() {
    const [favorites, setFavorites] = useState<Anime[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = useCallback((anime: Anime) => {
        setFavorites(prev => {
            if (prev.some(a => a._id === anime._id)) return prev;
            return [...prev, anime];
        });
    }, []);

    const removeFavorite = useCallback((animeId: string) => {
        setFavorites(prev => prev.filter(a => a._id !== animeId));
    }, []);

    const toggleFavorite = useCallback((anime: Anime) => {
        setFavorites(prev => {
            const exists = prev.some(a => a._id === anime._id);
            if (exists) {
                return prev.filter(a => a._id !== anime._id);
            }
            return [...prev, anime];
        });
    }, []);

    const isFavorite = useCallback((animeId: string) => {
        return favorites.some(a => a._id === animeId);
    }, [favorites]);

    const clearFavorites = useCallback(() => {
        setFavorites([]);
    }, []);

    return {
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        favoritesCount: favorites.length,
    };
}

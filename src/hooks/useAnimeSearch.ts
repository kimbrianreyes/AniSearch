import { useState, useEffect, useCallback } from 'react';
import type { Anime, AnimeResponse, SearchParams } from '../types/anime';
import { fetchAnime } from '../services/animeApi';

export function useAnimeSearch() {
    const [anime, setAnime] = useState<Anime[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [searchParams, setSearchParams] = useState<SearchParams>({
        page: 1,
        size: 12,
        sortBy: 'ranking',
        sortOrder: 'asc',
    });

    const search = useCallback(async (params: SearchParams) => {
        setLoading(true);
        setError(null);

        try {
            const response: AnimeResponse = await fetchAnime(params);
            setAnime(response.data || []);
            setTotalPages(response.meta?.totalPage || 1);
            setTotalResults(response.meta?.totalData || 0);
            setCurrentPage(response.meta?.page || 1);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch anime');
            setAnime([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        search(searchParams);
    }, [searchParams, search]);

    const updateSearch = useCallback((query: string) => {
        setSearchParams(prev => ({ ...prev, search: query, page: 1 }));
    }, []);

    const updateGenres = useCallback((genres: string[]) => {
        setSearchParams(prev => ({
            ...prev,
            genres: genres.length > 0 ? genres.join(',') : undefined,
            page: 1
        }));
    }, []);

    const updateSort = useCallback((sortBy: 'ranking' | 'title', sortOrder: 'asc' | 'desc') => {
        setSearchParams(prev => ({ ...prev, sortBy, sortOrder, page: 1 }));
    }, []);

    const goToPage = useCallback((page: number) => {
        setSearchParams(prev => ({ ...prev, page }));
    }, []);

    const clearFilters = useCallback(() => {
        setSearchParams({
            page: 1,
            size: 12,
            sortBy: 'ranking',
            sortOrder: 'asc',
        });
    }, []);

    return {
        anime,
        loading,
        error,
        totalPages,
        totalResults,
        currentPage,
        searchParams,
        updateSearch,
        updateGenres,
        updateSort,
        goToPage,
        clearFilters,
        refresh: () => search(searchParams),
    };
}

import type { AnimeResponse, SearchParams } from '../types/anime';

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST;
const BASE_URL = `https://${RAPIDAPI_HOST}`;

export async function fetchAnime(params: SearchParams = {}): Promise<AnimeResponse> {
    const queryParams = new URLSearchParams();

    queryParams.append('page', String(params.page || 1));
    queryParams.append('size', String(params.size || 12));

    if (params.search) {
        queryParams.append('search', params.search);
    }

    if (params.genres) {
        queryParams.append('genres', params.genres);
    }

    if (params.sortBy) {
        queryParams.append('sortBy', params.sortBy);
    }

    if (params.sortOrder) {
        queryParams.append('sortOrder', params.sortOrder);
    }

    const response = await fetch(`${BASE_URL}/anime?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': RAPIDAPI_HOST,
        },
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export async function fetchAnimeById(id: string): Promise<any> {
    const response = await fetch(`${BASE_URL}/anime/by-id/${id}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': RAPIDAPI_HOST,
        },
    });

    if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

export interface Anime {
    _id: string;
    title: string;
    alternativeTitles?: string[];
    ranking: number;
    genres: string[];
    episodes?: number;
    hasEpisode: boolean;
    hasRanking: boolean;
    image: string;
    link: string;
    status: string;
    synopsis: string;
    thumb: string;
    type: string;
}

export interface AnimeResponse {
    data: Anime[];
    meta: {
        page: number;
        size: number;
        totalData: number;
        totalPage: number;
    };
}

export interface SearchParams {
    page?: number;
    size?: number;
    search?: string;
    genres?: string;
    sortBy?: 'ranking' | 'title';
    sortOrder?: 'asc' | 'desc';
}

export const GENRES = [
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Fantasy',
    'Horror',
    'Mystery',
    'Romance',
    'Sci-Fi',
    'Slice of Life',
    'Sports',
    'Supernatural',
    'Thriller'
] as const;

export type Genre = typeof GENRES[number];

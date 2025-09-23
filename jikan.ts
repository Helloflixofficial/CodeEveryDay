import axios from 'axios';

const JIKAN_BASE_URL = 'https://api.jikan.moe/v4';

export interface JikanAnime {
    mal_id: number;
    title: string;
    images: {
        jpg: {
            image_url: string;
            small_image_url: string;
            large_image_url: string;
        };
    };
    synopsis?: string;
    episodes?: number;
    status?: string;
    aired?: {
        string: string;
    };
    genres?: Array<{
        name: string;
    }>;
}

export interface JikanResponse<T> {
    data: T[];
    pagination: {
        current_page: number;
        has_next_page: boolean;
    };
}

const jikanClient = axios.create({
    baseURL: JIKAN_BASE_URL,
    timeout: 10000,
});

export const jikanAPI = {
    // Get top anime
    getTopAnime: async (page: number = 1): Promise<JikanResponse<JikanAnime>> => {
        try {
            const response = await jikanClient.get(`/top/anime?page=${page}`);
            return response.data;
        } catch (error) {
            console.error('Jikan top anime error:', error);
            throw error;
        }
    },

    // Get seasonal anime
    getSeasonalAnime: async (): Promise<JikanResponse<JikanAnime>> => {
        try {
            const response = await jikanClient.get('/seasons/now');
            return response.data;
        } catch (error) {
            console.error('Jikan seasonal anime error:', error);
            throw error;
        }
    },

    // Search anime
    searchAnime: async (query: string, page: number = 1): Promise<JikanResponse<JikanAnime>> => {
        try {
            const response = await jikanClient.get(`/anime?q=${encodeURIComponent(query)}&page=${page}`);
            return response.data;
        } catch (error) {
            console.error('Jikan search error:', error);
            throw error;
        }
    },

    // Get anime by ID
    getAnimeById: async (id: number): Promise<{ data: JikanAnime }> => {
        try {
            const response = await jikanClient.get(`/anime/${id}`);
            return response.data;
        } catch (error) {
            console.error('Jikan anime by ID error:', error);
            throw error;
        }
    }
};

// Convert Jikan data to our format
export const convertJikanToAnime = (jikanAnime: JikanAnime) => ({
    id: jikanAnime.mal_id.toString(),
    title: jikanAnime.title,
    image: jikanAnime.images.jpg.large_image_url,
    releaseDate: jikanAnime.aired?.string || '',
    description: jikanAnime.synopsis || '',
    totalEpisodes: jikanAnime.episodes || 0,
    status: jikanAnime.status || '',
    genres: jikanAnime.genres?.map(g => g.name) || []
});

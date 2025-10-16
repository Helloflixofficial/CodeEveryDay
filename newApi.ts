const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ||

export const fetchHomeData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// New function for anime details
export const fetchAnimeDetails = async (id: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/info?id=${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Anime Details API Error:', error);
        throw error;
    }
};

// Additional API functions you might need later
export const fetchEpisodes = async (id: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/episodes/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Episodes API Error:', error);
        throw error;
    }
};

export const fetchStreamingData = async (id: string, server: string = 'hd-1', type: string = 'sub') => {
    try {
        const response = await fetch(`${API_BASE_URL}/stream?id=${id}&server=${server}&type=${type}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Streaming API Error:', error);
        throw error;
    }
};

export const searchAnime = async (keyword: string, page: number = 1) => {
    try {
        const response = await fetch(`${API_BASE_URL}/search?keyword=${encodeURIComponent(keyword)}&page=${page}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Search API Error:', error);
        throw error;
    }
};

// Available categories for pagination
export const CATEGORIES = {
    TOP_AIRING: 'top-airing',
    MOST_POPULAR: 'most-popular',
    MOST_FAVORITE: 'most-favorite',
    COMPLETED: 'completed',
    RECENT_EPISODES: 'recent-episodes',
    MOVIES: 'movies',
    OVA: 'ova',
} as const;

import axios from 'axios';
import type { HomeData, AnimeDetails, Episode, StreamingInfo } from '@/types/anime';

const API_BASE_URL = '';
const PROXY_URL = '';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Get home page data (trending, spotlights, etc.)
export const getHomeData = async (): Promise<HomeData> => {
  try {
    const response = await api.get('/');
    return response.data.results;
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};

// Get anime details by ID
export const getAnimeDetails = async (id: string): Promise<{ data: AnimeDetails }> => {
  try {
    const response = await api.get(`/info?id=${id}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    throw error;
  }
};

// Get episode list for an anime
export const getEpisodes = async (id: string): Promise<{ totalEpisodes: number; episodes: Episode[] }> => {
  try {
    const response = await api.get(`/episodes/${id}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
};

// Get streaming info for an episode
export const getStreamingInfo = async (
  episodeId: string,
  server: string = 'hd-1',
  type: string = 'sub'
): Promise<StreamingInfo> => {
  try {
    const response = await api.get(`/stream?id=${episodeId}&server=${server}&type=${type}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching streaming info:', error);
    throw error;
  }
};

// Get proxied video URL
export const getProxiedUrl = (url: string): string => {
  return `${PROXY_URL}${encodeURIComponent(url)}`;
};

// Search anime
export const searchAnime = async (query: string, page: number = 1) => {
  try {
    const response = await api.get(`/search?keyword=${encodeURIComponent(query)}&page=${page}`);
    return response.data.results;
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
};

// Get anime by category
export const getAnimeByCategory = async (category: string, page: number = 1) => {
  try {
    const response = await api.get(`/${category}?page=${page}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

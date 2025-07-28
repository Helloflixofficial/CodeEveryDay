// lib/utils/api.ts

export class EnkaApiError extends Error {
    status?: number;

    constructor(message: string, status?: number) {
        super(message);
        this.name = 'EnkaApiError';
        this.status = status;
    }
}

export function validateUID(uid: string): boolean {
    // UID should be exactly 9 digits
    return /^\d{9}$/.test(uid);
}

export async function fetchEnkaData(uid: string) {
    try {
        const response = await fetch(`https://enka.network/api/uid/${uid}`, {
            headers: {
                'User-Agent': 'YourAppName/1.0.0' // Replace with your app name
            }
        });

        if (!response.ok) {
            let errorMessage = 'Failed to fetch data from Enka Network';

            switch (response.status) {
                case 400:
                    errorMessage = 'Invalid UID format';
                    break;
                case 404:
                    errorMessage = 'Player not found or profile is private';
                    break;
                case 424:
                    errorMessage = 'Player data is currently being updated. Please try again in a few minutes.';
                    break;
                case 429:
                    errorMessage = 'Rate limited. Please try again later.';
                    break;
                case 500:
                    errorMessage = 'Enka Network server error. Please try again later.';
                    break;
                case 503:
                    errorMessage = 'Enka Network is temporarily unavailable. Please try again later.';
                    break;
            }

            throw new EnkaApiError(errorMessage, response.status);
        }

        const data = await response.json();

        // Check if the response has the expected structure
        if (!data.playerInfo) {
            throw new EnkaApiError('Invalid response format from Enka Network');
        }

        return data;
    } catch (error) {
        if (error instanceof EnkaApiError) {
            throw error;
        }

        // Network or other errors
        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new EnkaApiError('Network error. Please check your connection and try again.');
        }

        throw new EnkaApiError('An unexpected error occurred while fetching data');
    }
}

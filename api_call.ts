import { EnkaApiResponse, AvatarInfo, CharacterStats, FormattedCharacter } from '../types/enka';
import { getCharacterName, getCharacterElement, getCharacterRarity } from './mappings';

export const ENKA_BASE_URL = 'https://enka.network/api/uid';

export class EnkaApiError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = 'EnkaApiError';
    }
}

export async function fetchEnkaData(uid: string): Promise<EnkaApiResponse> {
    try {
        const response = await fetch(`${ENKA_BASE_URL}/${uid}`, {
            next: { revalidate: 300 },
            headers: {
                'User-Agent': 'EnkaProfileViewer/1.0',
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new EnkaApiError('Player not found or profile is private', 404);
            }
            if (response.status === 429) {
                throw new EnkaApiError('Rate limit exceeded. Please try again later.', 429);
            }
            if (response.status >= 500) {
                throw new EnkaApiError('Enka Network server error. Please try again later.', response.status);
            }
            throw new EnkaApiError(`Failed to fetch data: ${response.statusText}`, response.status);
        }

        const data: EnkaApiResponse = await response.json();

        if (!data.playerInfo) {
            throw new EnkaApiError('Invalid response: No player info found');
        }

        return data;
    } catch (error) {
        if (error instanceof EnkaApiError) {
            throw error;
        }

        if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new EnkaApiError('Network error. Please check your connection.');
        }

        throw new EnkaApiError('An unexpected error occurred while fetching data.');
    }
}

export function extractCharacterStats(character: AvatarInfo): CharacterStats {
    const fightProps = character.fightPropMap;

    return {
        hp: Math.round(fightProps['2000'] || fightProps['1'] || 0),
        attack: Math.round(fightProps['2001'] || fightProps['4'] || 0),
        defense: Math.round(fightProps['2002'] || fightProps['7'] || 0),
        critRate: (fightProps['20'] || 0) * 100,
        critDamage: (fightProps['22'] || 0) * 100,
        energyRecharge: (fightProps['23'] || 1) * 100,
        elementalMastery: Math.round(fightProps['28'] || 0),
    };
}

export function formatCharacterData(character: AvatarInfo): FormattedCharacter {
    const weapon = character.equipList.find(eq => eq.flat.itemType === 'ITEM_WEAPON') || null;
    const artifacts = character.equipList.filter(eq => eq.flat.itemType === 'ITEM_RELIQUARY');

    return {
        id: character.avatarId,
        name: getCharacterName(character.avatarId),
        level: parseInt(character.propMap['4001']?.val || character.propMap['4001']?.ival || '1'),
        constellation: character.talentIdList?.length || 0,
        friendship: character.fetterInfo.expLevel,
        stats: extractCharacterStats(character),
        weapon,
        artifacts,
    };
}

export function validateUID(uid: string): boolean {
    const uidRegex = /^\d{9}$/;
    return uidRegex.test(uid);
}

export function getCharacterImageUrl(avatarId: number): string {
    return `/characters/${avatarId}.png`;
}

export function getWeaponImageUrl(itemId: number): string {
    return `/weapons/${itemId}.png`;
}

export function getArtifactImageUrl(itemId: number): string {
    return `/artifacts/${itemId}.png`;
}

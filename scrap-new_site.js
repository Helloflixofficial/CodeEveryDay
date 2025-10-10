import axios from 'axios';
import * as cheerio from 'cheerio';


const BASE_URL = 'https://gogoanimez.to/';

export const scrapeRecentReleases = async () => {
    try {
        // Fetch homepage HTML
        const { data } = await axios.get(BASE_URL);
        const $ = cheerio.load(data);

        const recentReleases = [];

        // Inspect the site: recent releases are under div.last_episodes > ul > li
        $('div.last_episodes > ul > li').each((i, el) => {
            const animeTitle = $(el).find('p.name > a').attr('title');
            const animeUrl = BASE_URL + $(el).find('p.name > a').attr('href');
            const animeImg = $(el).find('div > a > img').attr('src');
            const releasedDate = $(el).find('p.released').text().trim();

            recentReleases.push({
                animeTitle,
                animeUrl,
                animeImg,
                releasedDate
            });
        });

        return recentReleases;
    } catch (err) {
        console.log('Error scraping recent releases:', err);
        return { error: err.message };
    }
};

// Example usage
scrapeRecentReleases().then((res) => console.log(res));

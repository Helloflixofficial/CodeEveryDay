
import fetch from 'node-fetch';

const UID = 631331233; 

async function fetchRawEnkaData() {
    const apiUrl = `https://enka.network/u/${UID}/__data.json`;
    console.log(`Attempting to fetch raw data from: ${apiUrl}`);

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'MyGenshinApp/1.0 (Contact: your@email.com)' 
            }
        });

        if (!response.ok) {
            console.error(`HTTP Error! Status: ${response.status}`);
            console.error(`Response text: ${await response.text()}`);
            return;
        }

        const data = await response.json();
        console.log("Raw API Response for your UID:");
        console.log(JSON.stringify(data, null, 2));

        if (data.ttl !== undefined) {
            console.log(`\nTime to live (seconds until next refresh): ${data.ttl}`);
        }
        if (data.is_cache !== undefined) {
            console.log(`Is cached data: ${data.is_cache}`);
        }

    } catch (error) {
        console.error("Error fetching raw data directly:", error);
    }
}

fetchRawEnkaData();

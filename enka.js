import { EnkaClient } from "enka-network-api";

// Your Genshin Impact UID
const UID = 631331233;

async function fetchEnkaData() {
    const enka = new EnkaClient();

    try {
        console.log(`Attempting to fetch data for your UID: ${UID}`);
        const user = await enka.fetchUser(UID);

        console.log("\n--- Full 'user' object from enka-network-api (with circular reference handling) ---");
      
        const seen = new WeakSet();
        const replacer = (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return '[Circular]'; 
                }
                seen.add(value);
            }
            return value;
        };
        console.log(JSON.stringify(user, replacer, 2));
        console.log("--- End Full 'user' object ---\n");

  
        if (user.isPrivate !== undefined) {
            console.log(`Is user's profile set to private by the API: ${user.isPrivate}`);
        }
        if (user.characters.length === 0 && user.playerInfo === null) {
            console.log("Warning: User object indicates no player info and no characters. This suggests data is either private or empty for this UID as far as the library is concerned.");
        }


     
        if (user && user.playerInfo) {
            console.log("Player Info:");
            console.log(JSON.stringify(user.playerInfo, null, 2));
        } else {
            console.log("Player info not found via library's playerInfo property.");
        }

        if (user && user.characters && user.characters.length > 0) {
            console.log("\nCharacter Data:");
            const characterData = user.characters.map(char => char.data);
            console.log(JSON.stringify(characterData, null, 2));
        } else {
            console.log("No character data found via library's characters property or characters are private.");
        }


    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        await enka.close();
    }
}

fetchEnkaData();

import inquirer from 'inquirer';
import * as api from './api.js';
import * as db from './db.js';

// display helper
const printArtist = (artist) => {
    console.log('\n Artist Info:');
    console.log(`Name: ${artist.name}`);
    console.log(`Genre: ${artist.genre}`);
    console.log(`Popularity: ${artist.popularity}`);
    console.log(`Followers: ${artist.followers}`);
    console.log(`Spotify URL: ${artist.url}`);
    console.log('----------------------------');
};

// main search function
export const searchArtistByKeyboard = async (keyword) => {
    try {
        const data = await api.searchAPI(keyword);

        if (!data.items || data.items.length === 0) {
            console.log('No artists found');
            return;
        }

        const results = data.items;

        await db.insert('search_history_keyword', {keyword});

        const { selectedID } = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedID',
                message: 'Select an artist',
                choices: results.map((artist) => ({
                    name: `${artist.name} (${artist.genres?.join(', ') || 'Unknown'})`,
                    value: artist.id,
                })),
            },
        ]);
        // unfinished
        const selectedArtist = results.find((artist) => artist.id === selectedID);

        await db.insert('search_history_artist', selectedArtist);
        printArtist(selectedArtist);
        
    } catch (error) {
        console.error('Search Error:', error.message);
    }
};
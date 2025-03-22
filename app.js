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
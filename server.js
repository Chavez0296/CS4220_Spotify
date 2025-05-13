import express from 'express';

import db from './services/db.js';
import artists from './routes/artists.js';
import history from './routes/history.js';

const PORT = 8888;

// creates an express application instance
const app = express();

// handle requests to root url - localhost:8888
app.get('/', (req, res) => {
    res.send('Welcome to our Spotify App');
});

// use the artists router for routes starting with /artists
app.use('/artists', artists);

// use the history router for routes starting with /history
app.use('/history', history);

// start the server and connect to the database
// start server with command: npx run dev
const server = app.listen(PORT, async () => {
    await db.connect();
    console.log(`Server is listening on port: ${PORT}`);
});

const shutdown = async () => {
    // await the close mongo db connection
    await db.close();

    // close the server
    server.close(() => {
        console.log('Server shutdown.');
        process.exit(0);
    });
};

// SIGINT - manual interruption (ex: ctrl + c on Mac)
// SIGTERM - polite terminate (ex: docker shutting down the process)
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

const {gatherMovieData} = require('./gatherData');
const movieFiles = ['movie1.json', 'movie2.json', 'movie3.json', 'movie4.json']; //add files here
const {broadcastToSlack, broadcastToConsole, broadcastToDatabase, logData} = require('./broadCasters');
require('dotenv').config();

const broadcastData = async (data) => {
    if (process.env.ENABLE_SLACK_BROADCAST === 'true') {
        await broadcastToSlack(data);
    }
    if (process.env.ENABLE_DATABASE_BROADCAST === 'true') {
        await broadcastToDatabase(data);
    }
    if (process.env.ENABLE_CONSOLE_BROADCAST === 'true') {
        await broadcastToConsole(data);
    }
    if (process.env.ENABLE_LOG_BROADCAST === 'true') {
        await logData(data);
    }
    // ... other conditions for different destinations ...
};

(async () => {
    const movies = await gatherMovieData(movieFiles);
    for (const movie of movies) {
        await broadcastData(movie);
    }
})()
    .then(() => console.log('Movie processing completed.'))
    .catch(error => console.error('An error occurred:', error));
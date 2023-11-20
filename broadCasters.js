const { WebClient } = require('@slack/web-api');
const fs = require('fs');
const path = require('path');
const logFilePath = path.join(__dirname, 'movies.log');
const axios = require('axios');
require('dotenv').config();


const broadcastToSlack = async (data) => {
    try {
        const slackClient = new WebClient(process.env.SLACK_TOKEN);
        await slackClient.chat.postMessage({
            channel: process.env.SLACK_CHANNEL,
            text: broadcastMessage(data)
        });
    } catch (error) {
        console.error('Error posting message to Slack:', error);
    }
};

const broadcastToDatabase = async (data) => {

    async function getToken() {
        try {
            const response = await axios.get(`${process.env.DATABASE_MOVIE_API_LINK}/get-token`);
            return response.data.token;
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    }
    const token = await getToken();
    if (!token) {
        console.error('Failed to retrieve token. Cannot broadcast to movies API.');
        return;
    }

    try {
        await axios.post(`${process.env.DATABASE_MOVIE_API_LINK}/movies`, JSON.stringify(data), {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": `application/json` }
        });
        console.log('Movie data successfully broadcasted to API.');
    } catch (error) {
        console.error('Error broadcasting to movies API:', error);
    }
};

const broadcastToUI = async (data) => {
    // WebSocket logic
};
const broadcastToConsole = async (data) => {
    console.log(broadcastMessage(data));
};
const logData = async (data) => {
    fs.appendFile(logFilePath, broadcastMessage(data), (err) => {
        if (err) console.error('Error writing to log file:', err);
    });
};

const broadcastMessage = (data) => {
    return `${new Date().toISOString()} - New Movie: ${JSON.stringify(data)}\n`;
}
module.exports = {
    broadcastToSlack, broadcastToUI, broadcastToDatabase, logData, broadcastToConsole
}
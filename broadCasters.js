const { WebClient } = require('@slack/web-api');
const slackClient = new WebClient(process.env.SLACK_TOKEN);
const fs = require('fs');
const path = require('path');
const logFilePath = path.join(__dirname, 'movies.log');
const axios = require('axios');
const apiBaseURL = 'http://localhost:3000';
const broadcastToSlack = async (message) => {
    try {
        await slackClient.chat.postMessage({
            channel: process.env.SLACK_CHANNEL,
            text: message
        });
    } catch (error) {
        console.error('Error posting message to Slack:', error);
    }
};

const broadcastToDatabase = async (data) => {
    async function getToken() {
        try {
            const response = await axios.get(`${apiBaseURL}/get-token`);
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
        await axios.post(`${apiBaseURL}/movies`, data, {
            headers: { Authorization: `Bearer ${token}` }
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
    console.log(`${new Date().toISOString()} - New Movie: ${JSON.stringify(data)}\n`);
};
const logData = async (data) => {
    const logEntry = `${new Date().toISOString()} - New Movie: ${JSON.stringify(data)}\n`;
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) console.error('Error writing to log file:', err);
    });
};

module.exports = {
    broadcastToSlack, broadcastToUI, broadcastToDatabase, logData, broadcastToConsole
}
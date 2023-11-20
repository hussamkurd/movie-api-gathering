# Movie Data Gathering Project

## Description

This Node.js project is designed to gather movie information from JSON files and process this data for various purposes. It reads a predefined set of JSON files, each containing details of a movie, and then performs actions like logging, broadcasting to APIs, or storing this data in a database.

## Features

- Reads movie information from JSON files.
- Processes and aggregates data from multiple files.
- Can be extended to broadcast data to different destinations (APIs, databases, etc.).

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- Basic understanding of JavaScript and Node.js.

### Installation

1. **Clone the repository:**
```bash
  git clone https://github.com/hussamkurd/movie-api-gathering
  cd movie-api-gathering
```
2. **Update the .env file variables:** 
  ```bash
  ENABLE_SLACK_BROADCAST=false
  ENABLE_DATABASE_BROADCAST=true
  ENABLE_LOG_BROADCAST=true
  ENABLE_CONSOLE_BROADCAST=true
  SLACK_TOKEN=YOUR_SLACK_TOKEN
  SLACK_CHANNEL=YOUR_SLACK_CHANNEL
  
  DATABASE_MOVIE_API_LINK='http://localhost:3000'
  ```
3. In case you enable database broadcast, you will need to run the movie-api project on

   your local machine https://github.com/hussamkurd/movie-api/

   you can change the link DATABASE_MOVIE_API_LINK, the default is set to 'http://localhost:3000'
   
### Usage
After the installation 
Starting the Server Run the following command to start the API server:
```bash
npm start
```
Once you run the service, it will directly load all the movies in movies_store and broadcast it to the enabled channels
   
### Tests
no test is available at the moment


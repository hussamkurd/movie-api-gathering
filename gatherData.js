const fs = require('fs');
const path = require('path');
async function readMovieFile(fileName) {
    const filePath = path.join(__dirname, 'movies_store/' + fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
}

async function gatherMovieData(movieFiles) {
    const promises = movieFiles.map(file => readMovieFile(file));
    const movies = await Promise.all(promises);
    return movies;
}


module.exports = {gatherMovieData}

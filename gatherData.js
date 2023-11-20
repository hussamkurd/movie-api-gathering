const fs = require('fs');
const path = require('path');
async function readMovieFile(fileName) {
    const filePath = path.join(__dirname, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
}

async function gatherMovieData(movieFiles) {
    const movies = movieFiles.map(async (file) => {
        return await readMovieFile(file)
    });
    return movies;
}

module.exports = {gatherMovieData}

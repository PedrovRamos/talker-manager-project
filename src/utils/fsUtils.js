const fs = require('fs').promises;
const path = require('path');

async function readTalkerData() {
    try {
        const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
        const talker = JSON.parse(data);
        return talker;
    } catch (err) {
        console.log(`erro na leitura do arquivo: ${err}`);
    }
}

module.exports = {
    readTalkerData,
};

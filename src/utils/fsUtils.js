const fs = require('fs').promises;
const path = require('path');

const MISSION_DATA_PATH = '../talker.json';

async function readTalkerData() {
    try {
        const data = await fs.readFile(path.resolve(__dirname, MISSION_DATA_PATH));
        const talker = JSON.parse(data);
        return talker;
    } catch (err) {
        console.log(`erro na leitura do arquivo: ${err}`);
    }
}

async function writeNewTalkerData(newTalker) {
    try {
        const oldTalker = await readTalkerData();
        const allTalker = JSON.stringify([...oldTalker, newTalker]);
        await fs.writeFile(path.resolve(__dirname, MISSION_DATA_PATH), allTalker);
        return newTalker;
    } catch (err) {
        console.log(`erro na escrita do arquivo: ${err}`);
    }
}

module.exports = {
    readTalkerData,
    writeNewTalkerData,
};

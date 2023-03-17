const fs = require('fs').promises;
const path = require('path');

const TALKER_DATA_PATH = '../talker.json';

async function readTalkerData() {
    try {
        const data = await fs.readFile(path.resolve(__dirname, TALKER_DATA_PATH));
        const talker = JSON.parse(data);
        return talker;
    } catch (err) {
        console.log(`erro na leitura do arquivo: ${err}`);
    }
}

async function writeNewTalkerData(newTalker) {
    try {
        const { name, age, talk: { watchedAt, rate } } = newTalker;
        const oldTalker = await readTalkerData();
        const newTalkerWithId = {
            name,
            age,
            id: oldTalker.length += 1,
            talk: {
              watchedAt,
              rate,
            },
          };
        const allTalker = JSON.stringify([...oldTalker, newTalkerWithId]);
        await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), allTalker);
        return newTalkerWithId;
    } catch (err) {
        console.log(`erro na escrita do arquivo: ${err}`);
    }
}

async function updateTalkerData(id, newTalkerData) {
    const oldTalker = await readTalkerData();
    const newTalker = { id, ...newTalkerData };
    const updatedTalker = oldTalker.reduce((talkerList, currentTalker) => {
        if (currentTalker.id === newTalker.id) return [...talkerList, newTalker];
        return [...talkerList, currentTalker];
    }, []);

    const updateData = JSON.stringify(updatedTalker);

    await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), updateData);
    return newTalker;
}

module.exports = {
    readTalkerData,
    writeNewTalkerData,
    updateTalkerData,
};

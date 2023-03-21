const fs = require('fs').promises;
const { copyFileSync } = require('fs');
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
    try {
        const oldTalker = await readTalkerData();
        const oldTalkerOutNull = oldTalker.filter((each) => each !== null);
        const newTalker = { id, ...newTalkerData };
        const updatedTalker = oldTalkerOutNull.reduce((talkerList, currentTalker) => {
        if (currentTalker.id === newTalker.id) return [...talkerList, newTalker];
        return [...talkerList, currentTalker];
        }, []);
        const updateData = JSON.stringify(updatedTalker);
        await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), updateData);
        return newTalker;
    } catch (err) {
        console.log(`update data ${err}`);
    }
}
 
async function deleteTalkerData(id) {
    try {
        const oldTalker = await readTalkerData();
        const oldTalkerOutNull = oldTalker.filter((each) => each !== null); 
        const newTalker = oldTalkerOutNull.filter((curr) => curr.id !== id); 
        const updatedData = JSON.stringify(newTalker);
        await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), updatedData);
        return newTalker;
    } catch (err) {
            console.log(`erro em deletar arquivo ${err}`);
    }
}
 
module.exports = {
    readTalkerData,
    writeNewTalkerData,
    updateTalkerData,
    deleteTalkerData,
};

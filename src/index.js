const express = require('express');

const { readTalkerData, writeNewTalkerData } = require('./utils/fsUtils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_FAIL_STATUS = 404;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const talker = await readTalkerData();
  response.status(HTTP_OK_STATUS).send(talker);
});

app.get('/talker/:id', async (_request, response) => {
  try {
    const talker = await readTalkerData();
    const { id } = _request.params;
    const chosenTalker = talker.find((tal) => tal.id === Number(id));
    if (chosenTalker === undefined) throw new Error('pessoa palestrante não encontrada');
    response.status(HTTP_OK_STATUS).send(chosenTalker);
  } catch (err) {
    response.status(HTTP_FAIL_STATUS).send({ message: err.message });
  }
});

app.post('/talker', async (_request, response) => {
  const newTalker = _request.body;
  const newTalkerWrite = await writeNewTalkerData(newTalker);
  response.status(HTTP_CREATED_STATUS).send(newTalkerWrite);
});

app.post('/login', async (_request, response) => {
  // const { email, password } = _request.body;

  // tokenGen
  
  const token = (Math.random().toString(16).substring(2)
  + Math.random().toString(16).substring(2)).substring(0, 16);

  response.status(HTTP_OK_STATUS).send({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});

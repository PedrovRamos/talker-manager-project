const express = require('express');

const { readTalkerData, 
  writeNewTalkerData, 
  updateTalkerData,
  deleteTalkerData } = require('./utils/fsUtils');

  const { validateLogin, 
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationWatched,
  validationRate } = require('./utils/middlewaresUtil');

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
  return response.status(HTTP_OK_STATUS).send(talker);
});

app.get('/talker/:id', async (_request, response) => {
  try {
    const talker = await readTalkerData();
    const { id } = _request.params;
    const chosenTalker = talker.find((tal) => tal.id === Number(id));
    if (chosenTalker === undefined) throw new Error('Pessoa palestrante não encontrada');
    return response.status(HTTP_OK_STATUS).send(chosenTalker);
  } catch (err) {
    return response.status(HTTP_FAIL_STATUS).send({ message: err.message });
  }
});

app.post('/talker', 
validationToken, 
validationName, 
validationAge, 
validationTalk, 
validationWatched, 
validationRate, async (_request, response) => {
  const newTalker = _request.body;
  const newTalkerWrite = await writeNewTalkerData(newTalker);
  return response.status(HTTP_CREATED_STATUS).send(newTalkerWrite);
});

app.post('/login', validateLogin, async (_request, response) => {
  // tokenGen
  
  const token = (Math.random().toString(16).substring(2)
  + Math.random().toString(16).substring(2)).substring(0, 16);

  return response.status(HTTP_OK_STATUS).send({ token });
});

app.put('/talker/:id',
validationToken, 
validationName, 
validationAge, 
validationTalk, 
validationWatched, 
validationRate,
 async (req, res) => {
  try {
    const data = await readTalkerData();
    const id = +req.params.id;
    if (Number(id) > data.length + 1) throw new Error('Pessoa palestrante não encontrada');
    const { body } = req;
    const { name, age, talk } = body;
    const retorno = { id, name, age, talk };
    updateTalkerData(id, body);
    return res.status(200).json(retorno);
  } catch ({ message }) {
    return res.status(404).json({ message });
  }
});
 
app.delete('/talker/:id', validationToken, async (_request, response) => {
  try {
    const { id } = _request.params;
    await deleteTalkerData(Number(id));
    return response.status(204).send();
  } catch (err) {
    console.log('não foi');
  }
});

app.listen(PORT, validationToken, () => {
  console.log('Online');
});

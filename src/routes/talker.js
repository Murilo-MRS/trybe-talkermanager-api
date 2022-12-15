const express = require('express');
const { validateToken, validateTalkKeys, validateName,
  validateAge, validateTalk, validateRateInterval } = require('../middlewares/validate');

const router = express.Router();
const { readFile, writeFile } = require('../utils/fileHandle');

router.get('/', async (_req, res) => {
  const talkers = await readFile();
  
  if (!talkers) {
    return res.status(200).json([]);
  }

  return res.status(200).json(talkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile();
  
  const talker = talkers.find((e) => e.id === +id);

  if (!talker) {
    return res.status(404).json(
      {
        message: 'Pessoa palestrante não encontrada',
      },
    );
  }
  return res.status(200).json(talker);
});

router.post('/',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkKeys,
  validateRateInterval,
  async (req, res) => {
    const talkers = await readFile();
    const newTalker = { id: talkers[talkers.length - 1].id + 1, ...req.body };
    talkers.push(newTalker);
    const allTalkers = [...talkers, newTalker];
    writeFile(allTalkers);
    res.status(201).json(newTalker);
});

router.put('/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkKeys,
  validateRateInterval,
  async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    
    const talkers = await readFile();
    const index = talkers.findIndex((e) => e.id === +id);
    
    talkers[index] = { id: +id, ...body };
    const talkerUpdated = talkers.find((e) => e.id === +id);

    writeFile(talkers);
    res.status(200).json(talkerUpdated);
});

module.exports = router;
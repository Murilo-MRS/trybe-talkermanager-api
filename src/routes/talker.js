const express = require('express');

const router = express.Router();
const { readFile } = require('../utils/fileHandle');

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

module.exports = router;
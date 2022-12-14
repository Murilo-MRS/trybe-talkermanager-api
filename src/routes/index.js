const express = require('express');

const router = express.Router();
const { readFile } = require('../utils/fileHandle');

router.get('/', async (_req, res) => {
  const talker = await readFile();

  if (!talker) {
    return res.status(200).json([]);
  }

  res.status(200).json(talker);
});

module.exports = router;
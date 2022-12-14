const express = require('express');

const randonToken = require('../utils/randomToken');

const router = express.Router();

router.post('/', (_req, res) => {
  const generatedToken = randonToken();
  
  res.status(200).json({
    token: generatedToken,
  });
});

module.exports = router;
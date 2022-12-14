const express = require('express');
const { validateEmail } = require('../middlewares/validate');

const randonToken = require('../utils/randomToken');

const router = express.Router();

router.post('/', validateEmail, (_req, res) => {
  const generatedToken = randonToken();

  res.status(200).json({
    token: generatedToken,
  });
});

module.exports = router;
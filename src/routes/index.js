const express = require('express');

const router = express.Router();

const talker = require('./talker');
const login = require('./login');

router.use('/talker', talker);
router.use('/login', login);

module.exports = router;

const express = require('express');
const router = express.Router();
const quizData = require('../data/quiz.json');

router.get('/', (req, res) => {
  res.json(quizData);
});

module.exports = router;

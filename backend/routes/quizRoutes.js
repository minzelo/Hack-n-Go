// backend/routes/quizRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const quizPath = path.join(__dirname, '../data/quiz.json');

// GET /api/quiz → semua kategori utama
router.get('/', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(quizPath));
    const categories = data.map(category => ({
      id: category.id,
      categoryTitle: category.categoryTitle,
      description: category.description
    }));
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Gagal membaca data quiz' });
  }
});

// GET /api/quiz/:categoryId → semua quiz dalam kategori
router.get('/:categoryId', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(quizPath));
    const category = data.find(c => c.id === req.params.categoryId);
    if (!category) return res.status(404).json({ message: 'Kategori tidak ditemukan' });

    const quizList = category.quizzes.map(q => ({
      id: q.id,
      title: q.title,
      level: q.level,
      description: q.description
    }));

    res.json({
      categoryTitle: category.categoryTitle,
      quizzes: quizList
    });
  } catch (err) {
    res.status(500).json({ message: 'Gagal membaca quiz' });
  }
});

// GET /api/quiz/:categoryId/:quizId → ambil soal-soal dari 1 quiz
router.get('/:categoryId/:quizId', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(quizPath));
    const category = data.find(c => c.id === req.params.categoryId);
    if (!category) return res.status(404).json({ message: 'Kategori tidak ditemukan' });

    const quiz = category.quizzes.find(q => q.id === req.params.quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz tidak ditemukan' });

    res.json({
      title: quiz.title,
      level: quiz.level,
      questions: quiz.questions
    });
  } catch (err) {
    res.status(500).json({ message: 'Gagal membaca quiz detail' });
  }
});

module.exports = router;

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const quizPath = path.join(__dirname, '../data/quiz.json');

// GET /api/quiz → semua kategori quiz
router.get('/', (req, res) => {
  try {
    const quizzes = JSON.parse(fs.readFileSync(quizPath));
    const categories = quizzes.map(q => ({
      category: q.category,
      materials: q.materials.map(m => ({
        id: m.id,
        title: m.title,
        level: m.level
      }))
    }));
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Gagal membaca file quiz' });
  }
});

// GET /api/quiz/:materialId → ambil soal-soal untuk 1 materi
router.get('/:materialId', (req, res) => {
  try {
    const quizzes = JSON.parse(fs.readFileSync(quizPath));
    for (const cat of quizzes) {
      const found = cat.materials.find(m => m.id === req.params.materialId);
      if (found) return res.json(found);
    }
    res.status(404).json({ message: 'Materi tidak ditemukan' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal membaca kuis' });
  }
});

module.exports = router;

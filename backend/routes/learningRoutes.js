// backend/routes/learningRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const learningPath = path.join(__dirname, '../data/learning.json');

// GET /api/modules → semua kategori (ISO, OWASP, dst)
router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(learningPath));
  const categories = data.map(cat => ({
    id: cat.id,
    categoryTitle: cat.categoryTitle,
    description: cat.description
  }));
  res.json(categories);
});

// GET /api/modules/:categoryId → daftar modul dalam satu kategori
router.get('/:categoryId', (req, res) => {
  const data = JSON.parse(fs.readFileSync(learningPath));
  const category = data.find(c => c.id === req.params.categoryId);
  if (!category) return res.status(404).json({ message: 'Kategori tidak ditemukan' });

  const modules = category.modules.map(m => ({
    id: m.id,
    title: m.title,
    description: m.description,
    totalLessons: m.lessons.length
  }));

  res.json({
    categoryTitle: category.categoryTitle,
    modules: modules
  });
});

// GET /api/modules/:categoryId/:moduleId → daftar lesson dalam satu modul
router.get('/:categoryId/:moduleId', (req, res) => {
  const data = JSON.parse(fs.readFileSync(learningPath));
  const category = data.find(c => c.id === req.params.categoryId);
  if (!category) return res.status(404).json({ message: 'Kategori tidak ditemukan' });

  const module = category.modules.find(m => m.id === req.params.moduleId);
  if (!module) return res.status(404).json({ message: 'Modul tidak ditemukan' });

  const lessons = module.lessons.map(lesson => ({
    id: lesson.id,
    title: lesson.title
  }));

  res.json({
    moduleTitle: module.title,
    lessons: lessons
  });
});

// GET /api/modules/:categoryId/:moduleId/:lessonId → konten lesson
router.get('/:categoryId/:moduleId/:lessonId', (req, res) => {
  const data = JSON.parse(fs.readFileSync(learningPath));
  const category = data.find(c => c.id === req.params.categoryId);
  if (!category) return res.status(404).json({ message: 'Kategori tidak ditemukan' });

  const module = category.modules.find(m => m.id === req.params.moduleId);
  if (!module) return res.status(404).json({ message: 'Modul tidak ditemukan' });

  const lesson = module.lessons.find(l => l.id === req.params.lessonId);
  if (!lesson) return res.status(404).json({ message: 'Lesson tidak ditemukan' });

  res.json({
    title: lesson.title,
    content: lesson.content
  });
});

module.exports = router;

// backend/routes/learningRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const modulesPath = path.join(__dirname, '../data/learningModules.json');

// GET /api/modules - semua modul
router.get('/', (req, res) => {
  const modules = JSON.parse(fs.readFileSync(modulesPath));
  res.json(modules);
});

// GET /api/modules/:id - modul spesifik
router.get('/:id', (req, res) => {
  const modules = JSON.parse(fs.readFileSync(modulesPath));
  const module = modules.find(m => m.id === req.params.id);

  if (!module) return res.status(404).json({ message: 'Modul tidak ditemukan' });
  res.json(module);
});

module.exports = router;

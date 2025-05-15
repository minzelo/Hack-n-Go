// backend/routes/userRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFile = path.join(__dirname, '../data/users.json');

// GET /user/:username/profile
router.get('/:username/profile', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile));
  const user = users.find(u => u.username === req.params.username);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const profileData = {
    username: user.username,
    xp: user.xp,
    streak: user.streak,
    completedLessons: user.completedLessons,
    completedQuizzes: user.completedQuizzes,
    achievements: user.achievements
  };

  res.json(profileData);
});

// PATCH /user/:username/progress
router.patch('/:username/progress', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile));
  const userIndex = users.findIndex(u => u.username === req.params.username);
  if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

  const updates = req.body;
  users[userIndex] = { ...users[userIndex], ...updates };

  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.json({ message: 'Progress updated successfully' });
});

// POST /user/:username/submit-quiz
router.post('/:username/submit-quiz', (req, res) => {
  const { materialId, score } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile));
  const userIndex = users.findIndex(u => u.username === req.params.username);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const user = users[userIndex];

  if (!user.completedQuizzes.includes(materialId)) {
    user.completedQuizzes.push(materialId);
    user.xp += score * 10;
  }

  users[userIndex] = user;
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

  res.json({ message: 'Quiz result saved', newXP: user.xp });
});

// GET /user/leaderboard/all - tampilkan user dengan XP tertinggi
router.get('/leaderboard/all', (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersFile));

  const sorted = users
    .map(u => ({
      username: u.username,
      xp: u.xp
    }))
    .sort((a, b) => b.xp - a.xp);

  res.json(sorted);
});

module.exports = router;

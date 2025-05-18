const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

// === Import routes ===
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes');
const learningRoutes = require('./routes/learningRoutes'); // ✅ Untuk modul belajar

// === Middleware ===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // serve file static

// === API Routing ===
app.use('/api/quiz', quizRoutes);          // endpoint quiz
app.use('/user', userRoutes);              // endpoint user
app.use('/api/modules', learningRoutes);   // endpoint modul belajar

// === Helper functions ===
function getUsers() {
  const data = fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf-8');
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(
    path.join(__dirname, 'data', 'users.json'),
    JSON.stringify(users, null, 2)
  );
}

// === Login Route ===
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();

  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).send('Email tidak ditemukan.');

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) return res.status(401).send('Password salah.');

  res.send('Login berhasil!');
});

// === Register Route ===
app.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).send('Semua field wajib diisi.');
  }

  if (password !== confirmPassword) {
    return res.status(400).send('Password dan konfirmasi tidak cocok.');
  }

  const users = getUsers();
  const userExists = users.find(u => u.email === email);
  if (userExists) {
    return res.status(400).send('Email sudah terdaftar.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    username,
    email,
    password: hashedPassword,
    xp: 0,
    streak: 0,
    completedLessons: [],
    completedQuizzes: [],
    achievements: []
  };

  users.push(newUser);
  saveUsers(users);

  res.redirect('/login.html');
});

// === Start Server ===
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});

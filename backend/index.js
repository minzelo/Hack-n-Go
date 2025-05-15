const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt'); // ← tambahkan untuk hashing password
const app = express();
const port = 3000;

const quizRoutes = require('./routes/quizRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Routing untuk quiz
app.use('/api/quiz', quizRoutes);

// Helper function untuk membaca file users.json
function getUsers() {
  const data = fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf-8');
  return JSON.parse(data);
}

// Helper function untuk menulis ke users.json
function saveUsers(users) {
  fs.writeFileSync(
    path.join(__dirname, 'data', 'users.json'),
    JSON.stringify(users, null, 2)
  );
}

// ==================== ROUTE LOGIN ====================
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).send('Email tidak ditemukan.');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).send('Password salah.');
  }

  res.send('Login berhasil!');
});

// ==================== ROUTE REGISTER ====================
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
    password: hashedPassword
  };

  users.push(newUser);
  saveUsers(users);

  res.redirect('/login.html');
});

// ==================== START SERVER ====================
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

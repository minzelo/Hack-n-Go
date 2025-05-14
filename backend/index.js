const express = require('express');
const path = require('path'); // Untuk handle static file
const fs = require('fs');
const app = express();
const port = 3000;

const quizRoutes = require('./routes/quizRoutes');

// Middleware untuk parsing JSON dan form URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ← Tambahan penting untuk form login

// Serve file statis dari folder 'public' (untuk login.html dan lainnya)
app.use(express.static(path.join(__dirname, 'public')));

// Routing untuk quiz
app.use('/api/quiz', quizRoutes);

// Helper function untuk membaca file users.json
function getUsers() {
  const data = fs.readFileSync(path.join(__dirname, 'data', 'users.json'), 'utf-8');
  return JSON.parse(data);
}

// Route untuk handle login POST
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = getUsers();

  const matchedUser = users.find(user => user.email === email && user.password === password);

  if (matchedUser) {
    return res.send('Login berhasil!');
  } else {
    return res.status(401).send('Email atau password salah.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

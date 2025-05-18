## Hack-n-Go Backend

### Setup

1. `cd backend`
2. `npm install`
3. `npm run dev` untuk development

### Endpoint

# 🧠 Hack’n Go – Backend API Documentation

Ini adalah dokumentasi endpoint backend untuk proyek edukasi **Hack’n Go**, ditujukan bagi tim frontend dan developer lainnya yang ingin berinteraksi dengan server.

---

## 🚀 API Overview

- Base URL (local dev): `http://localhost:3000`
- Semua data disimpan dalam file JSON sederhana di folder `/data`

---

## 🔐 AUTHENTIKASI

### `POST /login`
Login user menggunakan email dan password.
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```
Response: "Login berhasil!" atau 401 jika gagal.

### `POST /register`
Registrasi user baru.
```json
{
  "username": "minzelo",
  "email": "minzelo@example.com",
  "password": "mypassword",
  "confirmPassword": "mypassword"
}
```
Response: Redirect ke /login.html jika sukses.

## 👤 USER PROFILE & PROGRESS

### `GET /user/:username/profile`
Ambil data profil dan progres user.
```json
{
  "username": "minzelo",
  "xp": 150,
  "streak": 5,
  "completedLessons": [...],
  "completedQuizzes": [...],
  "achievements": [...]
}
```
### `PATCH /user/:username/progress`
Update progres user.
```json
{
  "xp": 200,
  "streak": 3
}
```
### `POST /user/:username/submit-quiz`
Simpan hasil quiz dan tambahkan XP.
```json
{
  "materialId": "quiz_1",
  "score": 9
}
```
### `GET /user/leaderboard/all`
Ambil leaderboard user berdasarkan XP.
```json
[
  { "username": "admin", "xp": 300 },
  { "username": "minzelo", "xp": 150 }
]
```
## 🧠 LEARN MODULE

### `GET /api/modules`
Ambil semua kategori belajar.
```json
[
  {
    "id": "iso27001",
    "categoryTitle": "ISO 27001",
    "description": "..."
  }
]
```
### `GET /api/modules/:categoryId`
Ambil semua modul dari kategori.
```json
{
  "categoryTitle": "ISO 27001",
  "modules": [
    {
      "id": "password-security",
      "title": "Password Security",
      "description": "...",
      "totalLessons": 2
    }
  ]
}
```
### `GET /api/modules/:categoryId/:moduleId`
Ambil daftar lesson dari satu modul.
```json
{
  "moduleTitle": "Password Security",
  "lessons": [
    { "id": "password-basics", "title": "Password Basics" }
  ]
}
```
### `GET /api/modules/:categoryId/:moduleId/:lessonId`
Ambil konten lesson.
```json
{
  "title": "Password Basics",
  "content": [
    {
      "type": "paragraph",
      "text": "Passwords are your first line of defense..."
    },
    {
      "type": "list",
      "text": [
        "Use 12+ characters",
        "Add symbols",
        "Avoid personal info"
      ]
    },
    {
      "type": "code",
      "text": "SELECT * FROM users WHERE username = '$user'"
    }
  ]
}
```

## 🧪 QUIZ MODULE

### `GET /api/quiz`
Ambil daftar kategori quiz.
```json
[
  {
    "id": "iso27001",
    "categoryTitle": "ISO 27001",
    "description": "..."
  }
]
```
### `GET /api/quiz/:categoryId`
Ambil quiz dalam kategori.
```json
{
  "categoryTitle": "ISO 27001",
  "quizzes": [
    {
      "id": "password-security",
      "title": "Password Security",
      "level": "Beginner",
      "description": "..."
    }
  ]
}
```
### `GET /api/quiz/:categoryId/:quizId`
Ambil soal-soal dari 1 quiz.
```json
{
  "title": "Password Security",
  "level": "Beginner",
  "questions": [
    {
      "question": "Apa itu password manager?",
      "options": ["Tempat simpan password", "Tempat reset password"],
      "answer": 0
    }
  ]
}
```

## 📁 DATA FILES
/data/users.json – semua user, XP, progress

/data/quiz.json – semua soal quiz per kategori

/data/learning.json – materi belajar berjenjang

## 📌 CATATAN
Tidak ada session/cookie — gunakan localStorage di frontend untuk simpan login.

File JSON tidak boleh dibuka bersamaan manual + server karena raw editing bisa overwrite.

Sistem ini dirancang ringan untuk edukasi — bisa diupgrade ke database kapan saja.

👾 Hack’n Go dikembangkan oleh tim mahasiswa sebagai media pembelajaran keamanan siber.

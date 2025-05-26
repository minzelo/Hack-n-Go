// public/profile.js

// Sementara, hardcoded username-nya. Nanti bisa dari session/login.
const username = 'minzelo';

fetch(`/user/${username}/profile`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('username').textContent = data.username;
    document.getElementById('xp').textContent = data.xp;
    document.getElementById('streak').textContent = data.streak;

    // Quizzes
    const quizList = document.getElementById('completedQuizzes');
    data.completedQuizzes.forEach(q => {
      const li = document.createElement('li');
      li.textContent = q;
      quizList.appendChild(li);
    });

    // Achievements
    const achievementList = document.getElementById('achievements');
    data.achievements.forEach(a => {
      const li = document.createElement('li');
      li.textContent = a;
      achievementList.appendChild(li);
    });
  })
  .catch(err => {
    console.error('Error loading profile:', err);
    alert('Gagal memuat profil user.');
  });

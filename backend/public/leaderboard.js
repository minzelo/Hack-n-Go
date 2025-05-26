// public/leaderboard.js

fetch('/user/leaderboard/all')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('leaderboardList');
    data.forEach((user, index) => {
      const li = document.createElement('li');
      li.textContent = `${index + 1}. ${user.username} — ${user.xp} XP`;
      list.appendChild(li);
    });
  })
  .catch(err => {
    console.error('Gagal memuat leaderboard:', err);
  });

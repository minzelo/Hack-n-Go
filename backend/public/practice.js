// public/practice.js

const categoriesContainer = document.getElementById('categories');
const quizzesContainer = document.getElementById('quizzes');
const quizBox = document.getElementById('quizBox');
const quizTitle = document.getElementById('quizTitle');
const questionContainer = document.getElementById('questionContainer');

let currentCategory = null;
let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;

// STEP 1: Tampilkan kategori
fetch('/api/quiz')
  .then(res => res.json())
  .then(data => {
    data.forEach(cat => {
      const div = document.createElement('div');
      div.className = 'block';
      div.innerHTML = `
        <strong>${cat.categoryTitle}</strong><br>
        <p>${cat.description}</p>
        <button onclick="loadQuizzes('${cat.id}')">Choose Track</button>
      `;
      categoriesContainer.appendChild(div);
    });
  });

window.loadQuizzes = function(categoryId) {
  currentCategory = categoryId;
  categoriesContainer.style.display = 'none';
  quizzesContainer.innerHTML = '';

  fetch(`/api/quiz/${categoryId}`)
    .then(res => res.json())
    .then(data => {
      const title = document.createElement('h2');
      title.textContent = data.categoryTitle;
      quizzesContainer.appendChild(title);

      data.quizzes.forEach(quiz => {
        const div = document.createElement('div');
        div.className = 'block';
        div.innerHTML = `
          <strong>${quiz.title}</strong> (${quiz.level})<br>
          <p>${quiz.description}</p>
          <button onclick="startQuiz('${quiz.id}', '${quiz.title}')">Start Quiz</button>
        `;
        quizzesContainer.appendChild(div);
      });
    });
};

window.startQuiz = function(quizId, title) {
  currentQuiz = quizId;
  fetch(`/api/quiz/${currentCategory}/${quizId}`)
    .then(res => res.json())
    .then(data => {
      quizTitle.textContent = title;
      currentQuestionIndex = 0;
      score = 0;
      quizzesContainer.style.display = 'none';
      quizBox.style.display = 'block';
      currentQuizData = data;
      showQuestion();
    });
};

function showQuestion() {
  const q = currentQuizData.questions[currentQuestionIndex];
  if (!q) return showResult();

  questionContainer.innerHTML = `
    <div class="question">${currentQuestionIndex + 1}. ${q.question}</div>
    <div class="options">
      ${q.options.map((opt, i) => `
        <button onclick="checkAnswer(${i})">${opt}</button>
      `).join('')}
    </div>
  `;
}

window.checkAnswer = function(selected) {
  const correct = currentQuizData.questions[currentQuestionIndex].answer;
  if (selected === correct) score++;
  currentQuestionIndex++;
  showQuestion();
};

function showResult() {
  questionContainer.innerHTML = `
    <h3>Quiz Selesai!</h3>
    <p>Skor kamu: ${score} dari ${currentQuizData.questions.length}</p>
    <button onclick="location.reload()">Kembali ke Daftar Quiz</button>
  `;

  const username = localStorage.getItem('loggedInUser') || 'minzelo'; // ganti sesuai logic login
  fetch(`/user/${username}/submit-quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ materialId: currentQuiz, score: score })
  }).then(res => res.json()).then(data => {
    console.log('Hasil tersimpan:', data);
  });
}

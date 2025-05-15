// public/practice.js

const materialsContainer = document.getElementById('materials');
const quizBox = document.getElementById('quizBox');
const quizTitle = document.getElementById('quizTitle');
const questionContainer = document.getElementById('questionContainer');

let currentMaterial = null;
let currentQuestionIndex = 0;
let score = 0;

// Load materials
fetch('/api/quiz')
  .then(res => res.json())
  .then(data => {
    data.forEach(category => {
      const title = document.createElement('h2');
      title.textContent = category.category;
      materialsContainer.appendChild(title);

      category.materials.forEach(material => {
        const div = document.createElement('div');
        div.className = 'material';
        div.innerHTML = `
          <strong>${material.title}</strong><br>
          Level: ${material.level}<br>
          <button onclick="startQuiz('${material.id}', '${material.title}')">Mulai Quiz</button>
        `;
        materialsContainer.appendChild(div);
      });
    });
  });

window.startQuiz = function(materialId, title) {
  fetch(`/api/quiz/${materialId}`)
    .then(res => res.json())
    .then(data => {
      currentMaterial = data;
      currentQuestionIndex = 0;
      score = 0;
      quizTitle.textContent = title;
      materialsContainer.style.display = 'none';
      quizBox.style.display = 'block';
      showQuestion();
    });
};

function showQuestion() {
  const questionData = currentMaterial.questions[currentQuestionIndex];
  if (!questionData) {
    return showResult();
  }

  questionContainer.innerHTML = `
    <div class="question">${currentQuestionIndex + 1}. ${questionData.question}</div>
    <div class="options">
      ${questionData.options.map((opt, i) => `
        <button onclick="checkAnswer(${i})">${opt}</button>
      `).join('')}
    </div>
  `;
}

window.checkAnswer = function(selected) {
  const correct = currentMaterial.questions[currentQuestionIndex].answer;
  if (selected === correct) score++;
  currentQuestionIndex++;
  showQuestion();
};

function showResult() {
  questionContainer.innerHTML = `
    <h3>Quiz Selesai!</h3>
    <p>Skor kamu: ${score} dari ${currentMaterial.questions.length}</p>
    <button onclick="location.reload()">Kembali ke Daftar Quiz</button>
  `;

  // Kirim ke backend
  const username = 'minzelo'; // ← Ganti sesuai user login nantinya
  fetch(`/user/${username}/submit-quiz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      materialId: currentMaterial.id,
      score: score
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log('Hasil kuis disimpan:', data);
  })
  .catch(err => {
    console.error('Gagal menyimpan hasil kuis:', err);
  });
}

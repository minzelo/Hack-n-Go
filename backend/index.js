const express = require('express');
const app = express();
const port = 3000;

const quizRoutes = require('./routes/quizRoutes');

app.use(express.json());
app.use('/api/quiz', quizRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

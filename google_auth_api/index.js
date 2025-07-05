const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

// Load JSON from file
const reactQuestions = JSON.parse(fs.readFileSync(path.join('./questions.json')));

// API Endpoint
app.get('/api/questions/react', (req, res) => {
  res.json(reactQuestions);
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});

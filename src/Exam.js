import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar, Toolbar, Typography, Box, Avatar,
  FormControl, RadioGroup, FormControlLabel, Radio, Button
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Exam = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timer, setTimer] = useState(30);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/questions/${subject}`).then(res => setQuestions(res.data));
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.name) setUserName(user.name);
  }, [subject]);

  useEffect(() => {
    if (timer === 0) {
      handleNext();
    }
    const interval = setInterval(() => setTimer(t => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, [currentQ, timer]);

  const handleOptionChange = (e) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQ]: e.target.value });
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setTimer(30);
    } else {
      // Count correct, wrong, unanswered
      let correct = 0, wrong = 0, unanswered = 0;
      questions.forEach((q, i) => {
        if (!selectedAnswers[i]) unanswered++;
        else if (selectedAnswers[i] === q.answer) correct++;
        else wrong++;
      });

      navigate('/result', { state: { total: questions.length, correct, wrong, unanswered } });
    }
  };

  if (questions.length === 0) return <p>Loading...</p>;

  const question = questions[currentQ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <AppBar position="static" sx={{ backgroundColor: '#328ba8' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">{subject.toUpperCase()} Exam</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>{userName}</Typography>
            <Avatar><AccountCircleIcon /></Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: '40px 60px' }}>
        <Typography variant="h6" gutterBottom>Question {currentQ + 1}</Typography>
        <Typography variant="subtitle1" sx={{ mb: 3 }}>{question.question}</Typography>

        <FormControl component="fieldset">
          <RadioGroup value={selectedAnswers[currentQ] || ''} onChange={handleOptionChange}>
            {question.options.map((opt, idx) => (
              <FormControlLabel
                key={idx}
                value={opt}
                control={
                  <Radio
                    sx={{
                      color: '#1976d2',
                      '&.Mui-checked': {
                        color: '#4caf50', // green
                      },
                    }}
                  />
                }
                label={opt}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Typography sx={{ mt: 3 }} color="error">⏱ Time left: {timer} seconds</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '20px 60px' }}>
        <Button variant="contained" color="#328ba8" onClick={handleNext}>
          {currentQ === questions.length - 1 ? 'Submit' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default Exam;

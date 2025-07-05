import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, Box, Avatar, Button, List, ListItem, ListItemText
} from '@mui/material';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const COLORS = ['#4caf50', '#f44336', '#9e9e9e']; // green, red, grey

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const data = [
    { name: 'Correct', value: state.correct },
    { name: 'Wrong', value: state.wrong },
    { name: 'Unanswered', value: state.unanswered },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      {/* Top Bar */}
      <AppBar position="static" sx={{ backgroundColor: '#328ba8' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Result</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>{user?.name}</Typography>
            <Avatar><AccountCircleIcon /></Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        padding: 4
      }}>
        {/* Left: Pie Chart */}
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>

        {/* Right: Summary List */}
        <List>
          <ListItem>
            <ListItemText primary="Correct Answers" secondary={state.correct} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Wrong Answers" secondary={state.wrong} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Unanswered" secondary={state.unanswered} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Total Questions" secondary={state.total} />
          </ListItem>
        </List>
      </Box>

      {/* Bottom: Go to Home Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/home')}>
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default Result;

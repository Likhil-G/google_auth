import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton.js';
import Home from './Home.js';
import Exam from "./Exam";
import Result from './Result.js';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GoogleLoginButton />} />
        <Route path="/home" element={<Home />} />
        <Route path="/exam/:subject" element={<Exam />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

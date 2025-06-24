import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton.js';
import Home from './Home.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GoogleLoginButton />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

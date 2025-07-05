// src/Login.js
import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';

function Login() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Logged in as:', user.displayName);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return <button onClick={handleLogin}>Login with Google</button>;
}

export default Login;

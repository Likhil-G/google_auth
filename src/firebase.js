// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAh7YT3IktjIps-1A3tOSvY0h8H_JLGqBo",
  authDomain: "auth-45212.firebaseapp.com",
  projectId: "auth-45212",
  storageBucket: "auth-45212.firebasestorage.app",
  messagingSenderId: "827059182984",
  appId: "1:827059182984:web:8bcffb2140300b6722ae3d",
  measurementId: "G-ZJSYHNM9E1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

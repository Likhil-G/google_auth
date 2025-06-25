import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function GoogleLoginButton() {
  const navigate = useNavigate();

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '827059182984-3dg9di2l6ab7hg2483s2ea6jmte655b4.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  const handleCredentialResponse = async (response) => {
    const jwt = response.credential;
    const base64Url = jwt.split('.')[1];
    const base64 = decodeURIComponent(
      atob(base64Url)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const user = JSON.parse(base64);
    console.log('User:', user);

    // Save user email in Firestore
    try {
      await addDoc(collection(db, 'login_entries'), {
        email: user.email,
        name: user.name,
        picture: user.picture,
        loginTime: serverTimestamp(),
      });
      console.log('User saved to Firebase');
      navigate('/home');
    } catch (err) {
      console.error('Firebase error:', err);
    }
  };

  return <div id="google-signin-button"></div>;
}

export default GoogleLoginButton;

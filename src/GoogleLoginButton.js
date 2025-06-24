import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleCredentialResponse = (response) => {
    console.log('Encoded JWT ID token: ' + response.credential);

    // Optional: verify token with your backend here

    // Navigate to home page
    navigate('/Home');
  };

  return <div id="google-signin-button"></div>;
}

export default GoogleLoginButton;

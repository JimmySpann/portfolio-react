import React, { useState, useEffect } from 'react';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';

import setAuthHeader from './utils/setAuthHeader';

// ----------------------------------------------------------------------

export default function App() {
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set Auth Header
      setAuthHeader(token);
      // Decode Token
      const decodedToken = jwt_decode(token);
      // Set State
      setCurrentUser(decodedToken.id);
    }
  }, []);

  const setToken = (token) => {
    console.log('setToken Ran');
    // Store Token
    localStorage.setItem('token', token);
    // Set Auth Header
    setAuthHeader(token);
    // Decode Token
    const decodedToken = jwt_decode(token);
    // Set State
    setCurrentUser(decodedToken.id);
  };

  // const logout = () => {
  //   // Remove Token
  //   localStorage.removeItem('token');
  //   // Remove Auth Header
  //   setAuthHeader();
  //   // Set State
  //   setCurrentUser();
  //   // Redirect
  //   // props.history.push('/login');
  // };

  return (
    <ThemeConfig>
      <ScrollToTop />
      <Router currentUser={currentUser} setCurrentUser={setToken} />
    </ThemeConfig>
  );
}

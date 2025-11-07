
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Gallery from './pages/Gallery';
import NavBar from './components/NavBar';
import ProfilePage from "./pages/ProfilePage";
import UserProfile from './components/UserProfile';

import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4f40b4',
    },
  },
  typography: {
    fontFamily: '"Lilita One", system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
});

function AppContent() {
  const location = useLocation();
  // When using basename, location.pathname is already relative to basename
  // So '/login' will be '/login', not '/Momentos_PhotoGallery/login'
  const pathname = location.pathname;
  
  // Check if we're on login or signup pages (handle both with and without leading slash)
  const isAuthPage = 
    pathname === '/login' || 
    pathname === '/signup' || 
    pathname === '/' || 
    pathname === 'login' || 
    pathname === 'signup' ||
    pathname.endsWith('/login') || 
    pathname.endsWith('/signup');

  return (
    <>
      {/* NavBar only shows on non-auth pages (login/signup) */}
      {!isAuthPage && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/user/:username" element={<UserProfile />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: 'white', minHeight: '100vh', margin: 0, padding: 0 }}>
        <Router basename={import.meta.env.BASE_URL}>
          <AppContent />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;

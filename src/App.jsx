
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import Login from './pages/Login';
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
});

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {/* NavBar only shows on non-login pages */}
      {!isLoginPage && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
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
        <Router>
          <AppContent />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;

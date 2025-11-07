
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
  // Remove the base path from location.pathname for comparison
  const pathWithoutBase = location.pathname.replace(import.meta.env.BASE_URL, '') || '/';
  const isLoginPage = pathWithoutBase === '/login' || pathWithoutBase === '/';

  return (
    <>
      {/* NavBar only shows on non-login pages */}
      {!isLoginPage && <NavBar />}
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

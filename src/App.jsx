
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: 'white', minHeight: '100vh' }}>
        <Router>
          {/* NavBar outside Routes so it’s visible on all pages */}
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/profilepage" element={<ProfilePage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/user/:username" element={<UserProfile />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;

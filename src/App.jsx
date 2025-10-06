import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Box } from '@mui/material'
import Login from './pages/Login'
import Gallery from './pages/Gallery'
import NavBar from './components/NavBar'
import './App.css'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ backgroundColor: 'white', minHeight: '100vh' }}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/gallery" element={
              <div>
                <header>
                  <NavBar />
                </header>
                <main>
                  <Gallery />
                </main>
              </div>
            } />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  )
}

export default App
import React from 'react'
import './App.css'

import ProfilePage from './pages/ProfilePage';
function App() {
  return <ProfilePage />;
}
export default App;

import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Box } from '@mui/material'
import Login from './pages/Login'
import Gallery from './pages/Gallery'
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
        <Login />
        <Gallery />
      </Box>
    </ThemeProvider>
  )
}

import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Box } from '@mui/material'
import Login from './pages/Login'
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
      </Box>
    </ThemeProvider>
  )
}

export default App

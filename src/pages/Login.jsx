import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';

const Login = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left Section - Branding */}
      <Box sx={{ 
        flex: '0 0 45%',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Branding content will go here */}
      </Box>
      
      {/* Right Section - Login Form */}
      <Box sx={{ 
        flex: '0 0 55%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4
      }}>
        {/* Login form content will go here */}
      </Box>
    </Box>
  );
};

export default Login;

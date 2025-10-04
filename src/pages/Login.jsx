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
        <Box sx={{ textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              color: 'black',
              fontSize: '3rem',
              letterSpacing: '0.1em',
              mb: 2
            }}
          >
            MOMENTOS
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              color: 'black',
              letterSpacing: '0.05em'
            }}
          >
            CONNECT WITH PHOTOS
          </Typography>
        </Box>
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
        <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              color: 'black',
              fontSize: '2.5rem',
              mb: 2
            }}
          >
            LOGIN
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              color: 'black',
              fontSize: '1.1rem',
              mb: 4
            }}
          >
            WELCOME BACK! PLEASE LOGIN TO YOUR ACCOUNT
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

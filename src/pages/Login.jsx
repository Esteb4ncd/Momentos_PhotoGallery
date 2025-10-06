import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, TextField, Checkbox, FormControlLabel, Link, Button } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/gallery');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex' }}>
      {/* Left Section - Branding */}
      <Box sx={{ 
        flex: '0 0 50%',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px'
      }}>
        <Box sx={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              color: 'black',
              fontSize: '3.5rem',
              letterSpacing: '0.15em',
              mb: 3,
              lineHeight: 1.1
            }}
          >
            MOMENTOS
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              color: 'black',
              letterSpacing: '0.08em',
              fontSize: '1.4rem'
            }}
          >
            CONNECT WITH PHOTOS
          </Typography>
        </Box>
      </Box>
      
      {/* Right Section - Login Form */}
      <Box sx={{ 
        flex: '0 0 50%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 60px'
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
          
          {/* Input Fields */}
          <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 'bold',
                color: 'black',
                mb: 1
              }}
            >
              EMAIL/USERNAME
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                  border: '1px solid black',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '12px 14px',
                },
              }}
            />
          </Box>
          
          <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 'bold',
                color: 'black',
                mb: 1
              }}
            >
              PASSWORD
            </Typography>
            <TextField
              fullWidth
              type="password"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 0,
                  border: '1px solid black',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '12px 14px',
                },
              }}
            />
          </Box>
          
          {/* Remember Me and Forgot Password */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4
          }}>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: 'black',
                    '&.Mui-checked': {
                      color: 'black',
                    },
                    padding: '4px 8px 4px 0',
                  }}
                />
              }
              label={
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'black'
                  }}
                >
                  REMEMBER ME
                </Typography>
              }
            />
            <Link
              href="#"
              sx={{
                color: 'black',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              FORGOT PASSWORD?
            </Link>
          </Box>
          
          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            sx={{
              backgroundColor: '#f5f5f5',
              color: 'black',
              fontWeight: 'bold',
              fontSize: '1rem',
              py: 1.5,
              mb: 3,
              borderRadius: 0,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            LOGIN
          </Button>
          
          {/* Sign Up Link */}
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center'
            }}
          >
            DONT HAVE AN ACCOUNT?{' '}
            <Link
              href="#"
              sx={{
                color: 'black',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              SIGN UP
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
